# Development Plan: Super Fast Instagram Client

## 1. Vision

To develop a high-performance, streamlined Instagram web client focused exclusively on robust authentication and a superior user feed experience, leveraging the official Instagram Basic Display API. The aim is to deliver a faster, cleaner, and more focused interface for viewing personal media.

---

## 2. Current Scope: Phase 1 - Authentication and User Feed

This phase is strictly focused on implementing secure user authentication and displaying the authenticated user's media feed.

### Milestone 1: Authentication

**Goal:** Implement a secure and reliable authentication flow using the Instagram Basic Display API via OAuth 2.0.

**Tasks:**

1.  **Developer App Setup:**
    *   Register a new application on the Meta for Developers portal.
    *   Obtain Client ID and Client Secret.
    *   Configure necessary permissions (scopes): `user_profile` and `user_media`.
    *   Set up the OAuth Redirect URI.

2.  **Login Flow Implementation:**
    *   Create a dedicated `/login` route (e.g., `src/routes/login.tsx`).
    *   Implement a "Login with Instagram" button to redirect users to the Instagram authorization URL.

3.  **OAuth Callback Handling:**
    *   Create a route/component for the `/auth/callback` redirect (e.g., `src/routes/auth/callback.tsx`).
    *   Securely exchange the authorization `code` for a short-lived access token on a server-side endpoint (to protect the Client Secret).
    *   Exchange the short-lived token for a long-lived access token.

4.  **Session Management:**
    *   Securely store the long-lived access token (e.g., `httpOnly` cookie).
    *   Implement an `AuthContext` (e.g., `src/utils/AuthContext.tsx`) to manage and provide authentication state.
    *   Create a utility for authenticated API calls, automatically attaching the access token.

### Milestone 2: User Feed Display

**Goal:** Build a highly performant, clean, and customizable display of the user's Instagram media feed.

**Tasks:**

1.  **API Data Fetching:**
    *   Utilize the Instagram Basic Display API's `/me/media` endpoint to fetch the authenticated user's posts.
    *   Integrate **TanStack Query** for efficient data fetching, caching, and state management.
    *   Implement infinite scrolling using `useInfiniteQuery` to load posts progressively.

2.  **Feed UI - Core Experience:**
    *   **Component-Based Display:** Use `src/components/PostCard.tsx` to render individual media items.
    *   **Chronological Order:** Display the feed in reverse chronological order.
    *   **Content Filtering (Basic):** Implement simple UI controls to filter by media type (e.g., photos, videos) if desired, handled client-side.
    *   **Ad-Free:** The feed will inherently be ad-free as it fetches directly from the user's media API.

3.  **Performance Optimization:**
    *   **Virtualization:** Implement list virtualization (e.g., **TanStack Virtual**) for large feeds to render only visible items.
    *   **Code Splitting:** Leverage Vite and TanStack Router for route-based code splitting to minimize initial load times.
    *   **Image Optimization:** Implement lazy loading and efficient image handling.

---

## 3. Technology Stack

*   **Framework:** React / TypeScript
*   **Build Tool:** Vite
*   **Routing:** TanStack Router
*   **Data Fetching & State:** TanStack Query
*   **UI Performance:** TanStack Virtual
*   **Styling:** Existing CSS setup (`src/styles/app.css`)

---

## 4. Out of Scope (Future Considerations - Not in Phase 1)

*   Viewing other user profiles.
*   Post detail pages (e.g., comments).
*   Liking, commenting, or creating posts (requires different API permissions).
*   Search functionality.