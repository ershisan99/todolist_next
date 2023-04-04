export const noRefetch = {
  refetchInterval: 1000 * 60 * 60,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchIntervalInBackground: false,
  retry: false,
} as const;
