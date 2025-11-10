import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
})

function CallbackComponent() {
  const { auth } = Route.useRouteContext()
  const search = Route.useSearch()

  useEffect(() => {
    const exchangeCodeForToken = async (code: string) => {
      try {
        // In a real app, this would be a call to your backend
        // which would then call the Instagram API to exchange the code for a token.
        // This is a placeholder for the full OAuth flow.
        console.log('Exchanging code for token:', code)

        // Simulate a successful token exchange
        const fakeToken = `fake_token_${Date.now()}`
        auth.login(fakeToken)
        
        // Redirect to the home page after successful login
        window.location.href = '/'
      } catch (error) {
        console.error('Error exchanging code for token:', error)
        // Handle error, e.g., redirect to a login failed page
        window.location.href = '/login?error=token_exchange_failed'
      }
    }

    if (search.code) {
      exchangeCodeForToken(search.code)
    } else if (search.error) {
      console.error('OAuth Error:', search.error, search.error_reason, search.error_description)
      window.location.href = `/login?error=${search.error}`
    }
  }, [auth, search])

  return (
    <div className="p-2">
      <p>Processing login...</p>
    </div>
  )
}