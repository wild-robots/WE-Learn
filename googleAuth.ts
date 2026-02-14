// Declare Google GIS types
declare global {
    interface Window {
        google: {
            accounts: {
                oauth2: {
                    initTokenClient: (config: TokenClientConfig) => TokenClient;
                    hasGrantedAllScopes: (tokenResponse: TokenResponse, firstScope: string, ...restScopes: string[]) => boolean;
                };
            };
        };
    }
}

interface TokenClientConfig {
    client_id: string;
    scope: string;
    callback: (response: TokenResponse) => void;
    error_callback?: (error: any) => void;
}

interface TokenResponse {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    error?: string;
    error_description?: string;
    error_uri?: string;
}

interface TokenClient {
    requestAccessToken: (overrideConfig?: { scope?: string; prompt?: string }) => void;
}

// Scopes required for the application
export const SCOPES = {
    CLASSROOM_COURSES: 'https://www.googleapis.com/auth/classroom.courses',
    CLASSROOM_COURSEWORK: 'https://www.googleapis.com/auth/classroom.coursework.students',
    CLASSROOM_ROSTERS: 'https://www.googleapis.com/auth/classroom.rosters',
    CALENDAR_EVENTS: 'https://www.googleapis.com/auth/calendar.events',
};

let tokenClient: TokenClient | null = null;
let accessToken: string | null = null;
let tokenExpiresAt: number = 0;
let grantedScopes: Set<string> = new Set();

/**
 * Check if the current token is still valid and has the required scopes.
 */
const hasValidToken = (requiredScopes: string[]): boolean => {
    if (!accessToken || Date.now() >= tokenExpiresAt) {
        return false;
    }
    return requiredScopes.every(scope => grantedScopes.has(scope));
};

/**
 * Request specific scopes from the user using Google Identity Services.
 * Caches the token and only re-prompts if expired or scopes are missing.
 */
export const requestStepUpAuth = (requiredScopes: string[]): Promise<string> => {
    // Return cached token if still valid and has required scopes
    if (hasValidToken(requiredScopes) && accessToken) {
        return Promise.resolve(accessToken);
    }

    return new Promise((resolve, reject) => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

        if (!clientId) {
            reject(new Error("Missing VITE_GOOGLE_CLIENT_ID in environment variables."));
            return;
        }

        if (!window.google) {
            reject(new Error("Google Identity Services script not loaded."));
            return;
        }

        try {
            tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: requiredScopes.join(' '),
                callback: (response: TokenResponse) => {
                    if (response.error) {
                        console.error("GIS Error:", response);
                        reject(new Error(response.error_description || response.error));
                        return;
                    }

                    if (response.access_token) {
                        accessToken = response.access_token;
                        // Cache expiry with 60s safety margin
                        tokenExpiresAt = Date.now() + ((response.expires_in - 60) * 1000);
                        // Track granted scopes
                        response.scope.split(' ').forEach(s => grantedScopes.add(s));
                        resolve(response.access_token);
                    } else {
                        reject(new Error("No access token received."));
                    }
                },
                error_callback: (err) => {
                    console.error("GIS System Error:", err);
                    reject(err);
                }
            });

            tokenClient.requestAccessToken({ scope: requiredScopes.join(' ') });

        } catch (error) {
            console.error("Failed to initialize TokenClient", error);
            reject(error);
        }
    });
};

/**
 * Get the current access token if valid.
 */
export const getStoredToken = () => {
    if (Date.now() >= tokenExpiresAt) {
        accessToken = null;
        return null;
    }
    return accessToken;
};

/**
 * Clear stored token (e.g., on sign-out).
 */
export const clearToken = () => {
    accessToken = null;
    tokenExpiresAt = 0;
    grantedScopes.clear();
};
