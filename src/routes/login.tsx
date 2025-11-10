import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const { auth } = Route.useRouteContext()

  const handleLogin = () => {
    // Redirect to Instagram's authorization endpoint
    const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID
    const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI
    const scope = 'user_profile,user_media'
    const responseType = 'code'

    if (!clientId || !redirectUri) {
      console.error(
        'VITE_INSTAGRAM_CLIENT_ID and VITE_INSTAGRAM_REDIRECT_URI must be set in your .env file.',
      )
      return
    }

    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`

    window.location.href = authUrl
  }

  return (
    <div className="p-2">
      <h3>Welcome!</h3>
      <p>Please log in to view your Instagram feed.</p>
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
        Login with Instagram
      </button>
    </div>
  )
}