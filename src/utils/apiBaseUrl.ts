// src/utils/apiBaseUrl.ts
// Utility to get the backend API base URL from environment variables

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export default apiBaseUrl;
