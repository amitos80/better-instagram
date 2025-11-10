/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { AuthProvider, useAuth } from '~/utils/AuthContext'

// ... (imports remain the same)

export const Route = createRootRoute({
  // ... (beforeLoad remains the same)
  head: () => ({
    // ... (head remains the same)
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  component: () => (
    <AuthProvider>
      <RootDocument />
    </AuthProvider>
  ),
})

function RootDocument() {
  const { isAuthenticated, logout, accessToken } = useAuth();

  const { data: user } = useQuery({
    queryKey: ['userProfile', accessToken],
    queryFn: () => fetchInstagramApi<IUserProfile>('/me?fields=id,username', accessToken!),
    enabled: !!accessToken,
  });

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="p-2 flex justify-between items-center text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <div className="flex items-center gap-4">
            {user && <p className="text-sm font-semibold">Welcome, {user.username}</p>}
            {isAuthenticated ? (
              <button onClick={logout} className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-700">
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                activeProps={{
                  className: 'font-bold',
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
