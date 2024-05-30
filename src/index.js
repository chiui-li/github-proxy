/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const proxyPath = '/https://'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const pathname = url.pathname
    if (pathname.startsWith(proxyPath)) {
      const targetUrl = pathname.slice(1)
      const headers = new Headers(request.headers)
      headers.set('host', url.host)
      return fetch(targetUrl + url.search, {
        method: request.method,
        headers: headers,
        body: request.body,
      })
    }
    return new Response('Hello World!');
  },
};
