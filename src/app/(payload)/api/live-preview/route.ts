/* Simple live-preview redirect handler.
	 Accepts `?slug=...` and redirects to `/${slug}` so the admin can preview pages.
	 This is a lightweight fallback when the `@payloadcms/next` helper isn't available.
*/
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug') || ''

    if (!slug) {
      return new Response('Missing slug', { status: 400 })
    }

    const destination = `/${slug}`
    return Response.redirect(destination, 302)
  } catch (err) {
    return new Response('Error processing live preview', { status: 500 })
  }
}
