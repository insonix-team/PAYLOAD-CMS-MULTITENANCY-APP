/* Simple live-preview redirect handler.
	 Accepts `?slug=...` and redirects to `/${slug}` so the admin can preview pages.
	 This is a lightweight fallback when the `@payloadcms/next` helper isn't available.
*/
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') || '';
    const tenant = url.searchParams.get('tenant') || '';

    if (!slug || !tenant) {
      return new Response('Missing slug or tenant', { status: 400 });
    }

    // Build URL with tenant and slug
    const destination = new URL(`/${tenant}/${slug}`, request.url);

    return Response.redirect(destination.toString(), 302);
  } catch (err: Error | unknown) {
    console.error('Error:', err);
    return new Response(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      status: 500,
    });
  }
}
