/**
 * Exchanges an authorization code for a short-lived access token.
 *
 * @param code The authorization code received from Instagram's OAuth redirect.
 * @returns A promise that resolves with the access token.
 * @throws An error if the token exchange fails.
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const clientId = import.meta.env.VITE_INSTAGRAM_APP_ID;
  const clientSecret = import.meta.env.VITE_INSTAGRAM_APP_SECRET;
  const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

  // SECURITY WARNING: In a production application, the client secret must NEVER be
  // exposed in the frontend. This token exchange should be handled by a secure
  // backend or a serverless function to protect the secret.
  if (
    !clientSecret ||
    clientSecret === 'your_app_secret' ||
    !clientId ||
    clientId === 'your_app_id'
  ) {
    throw new Error(
      'Instagram App ID or Secret is not configured. Please check your .env file.',
    );
  }

  const body = new URLSearchParams();
  body.append('client_id', clientId);
  body.append('client_secret', clientSecret);
  body.append('grant_type', 'authorization_code');
  body.append('redirect_uri', redirectUri);
  body.append('code', code);

  const response = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_message || 'Failed to exchange code for token.');
  }

  if (!data.access_token) {
    throw new Error('Access token not found in the response.');
  }

  return data.access_token;
}

/**
 * Fetches data from the Instagram Basic Display API.
 *
 * @param endpoint The API endpoint to fetch (e.g., '/me/media').
 * @param accessToken The user's access token.
 * @returns A promise that resolves with the JSON data from the API.
 */
export async function fetchInstagramApi<T>(
  endpoint: string,
  accessToken: string,
): Promise<T> {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `https://graph.instagram.com${endpoint}${separator}access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'An API error occurred.');
  }

  return data as T;
}
