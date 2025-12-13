/**
 * Get config from:
 * 1. window._env_ → Kubernetes / Docker runtime config
 * 2. process.env → Local React dev mode
 */
export const getConfig = (key) => {
  if (typeof window !== "undefined" && window._env_ && window._env_[key]) {
    return window._env_[key];
  }
  return process.env[key];
};

// Export helpers
export const API_URL = getConfig("REACT_APP_API_URL") || "http://localhost:5000";

export const FIREBASE_CONFIG = {
  apiKey: getConfig("REACT_APP_API_KEY"),
  authDomain: getConfig("REACT_APP_AUTH_DOMAIN"),
  projectId: getConfig("REACT_APP_PROJECT_ID"),
  storageBucket: getConfig("REACT_APP_STORAGE_BUCKET"),
  messagingSenderId: getConfig("REACT_APP_MESSAGING_SENDER_ID"),
  appId: getConfig("REACT_APP_APP_ID"),
  measurementId: getConfig("REACT_APP_MEASUREMENT_ID"),
};
