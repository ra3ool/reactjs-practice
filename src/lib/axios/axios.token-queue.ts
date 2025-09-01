let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * Subscribe to be notified when token is refreshed
 */
export const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

/**
 * Notify all subscribers about new token
 */
export const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

/**
 * Getter & Setter for refresh state
 */
export const tokenQueue = {
  get isRefreshing() {
    return isRefreshing;
  },
  set isRefreshing(value: boolean) {
    isRefreshing = value;
  },
};
