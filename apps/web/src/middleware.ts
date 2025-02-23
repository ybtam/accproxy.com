import { auth } from '@repo/sdk/auth'

const publicPages = [ '/']

export default auth(req => {
  // If the user is not authenticated, redirect them to the /login page
  if (!req.auth && !publicPages.includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
