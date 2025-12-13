import { auth } from "../firebase";
// import { API_URL } from "./config";

// console.log("API_URL =>", process.env.REACT_APP_API_URL);
// console.log("API_KEY =>", process.env.REACT_APP_API_KEY);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// const API_URL = getConfig('REACT_APP_API_URL') || "http://localhost:5000";

async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken(/* forceRefresh */ true);
}

/**
 * apiFetch(path, opts)
 * - path: starts with '/' e.g. '/api/transactions/add'
 * - opts: fetch options (method, body, headers)
 * Returns parsed JSON if response is JSON, otherwise returns Response object.
 */
export async function apiFetch(path, opts = {}) {
  const token = await getIdToken();
  const headers = {
    ...(opts.headers || {}),
  };

  if (!headers["Content-Type"] && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${txt || res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res; // caller handles blob/text
}
