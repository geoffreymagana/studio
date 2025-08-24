import { authService } from './database';

export const AUTH_KEY = "happy-anniversary-auth";

export async function checkAuth() {
  try {
    // First check localStorage for better performance
    const localAuth = localStorage.getItem(AUTH_KEY) === "true";
    if (!localAuth) {
      return false;
    }

    // Only check database if localStorage says we're authenticated
    const dbAuth = await authService.getAuthStatus();
    if (!dbAuth) {
      // If DB says we're not auth'd, clear localStorage
      localStorage.removeItem(AUTH_KEY);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking auth status:', error);
    // On error, fall back to localStorage only
    return localStorage.getItem(AUTH_KEY) === "true";
  }
}

export async function setAuth(isAuthenticated: boolean) {
  try {
    await authService.setAuthStatus(isAuthenticated);
    if (isAuthenticated) {
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (error) {
    console.error('Error setting auth status:', error);
    // Still set localStorage even if DB fails
    if (isAuthenticated) {
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }
}
