import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorText = res.statusText;
    
    try {
      // Try to parse the response as JSON to get a more detailed error message
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorJson = await res.clone().json();
        if (errorJson.message) {
          errorText = errorJson.message;
        } else if (errorJson.error) {
          errorText = errorJson.error;
        }
      } else {
        errorText = await res.text() || res.statusText;
      }
    } catch (e) {
      // If parsing fails, try to get the text
      try {
        errorText = await res.text() || res.statusText;
      } catch (textError) {
        console.error('Failed to parse error response:', textError);
        // Keep the default statusText if text extraction fails
      }
    }
    
    const error = new Error(`${res.status}: ${errorText}`);
    (error as any).status = res.status;
    (error as any).statusText = res.statusText;
    throw error;
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.log(`Making ${method} request to ${url}`, data ? 'with data' : 'without data');
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    console.log(`Response from ${url}:`, res.status, res.statusText);
    
    // Handle authentication errors specially for better error messages
    if (res.status === 401) {
      if (url !== '/api/login') {
        console.warn('Authentication required. Redirecting to login page...');
      }
      throw new Error("Authentication required. Please log in.");
    }

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`Error in API request to ${url}:`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      console.log(`QueryFn: Fetching ${queryKey[0]}`);
      
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      
      console.log(`QueryFn: Response from ${queryKey[0]}:`, res.status, res.statusText);

      if (res.status === 401) {
        console.log(`QueryFn: Unauthorized access to ${queryKey[0]}`);
        if (unauthorizedBehavior === "returnNull") {
          console.log(`QueryFn: Returning null for unauthorized request to ${queryKey[0]}`);
          return null;
        } else {
          console.warn(`QueryFn: Throwing error for unauthorized request to ${queryKey[0]}`);
          throw new Error("Authentication required. Please log in.");
        }
      }

      await throwIfResNotOk(res);
      
      const data = await res.json();
      console.log(`QueryFn: Successfully parsed data from ${queryKey[0]}`);
      return data;
    } catch (error) {
      console.error(`QueryFn: Error in request to ${queryKey[0]}:`, error);
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
