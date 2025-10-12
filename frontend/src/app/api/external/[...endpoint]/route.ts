import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;
const BACKEND_API_TOKEN = process.env.BACKEND_API_TOKEN;

const ALLOWED_HEADERS = ['content-type', 'accept', 'content-length'];

async function proxyHandler(
  req: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> }
) {
  try {
    const { endpoint } = await context.params;
    const backendPath = endpoint.join("/");

    const targetUrl = `${BACKEND_URL}/${backendPath}${req.nextUrl.search}`;

    // Forward allowed headers
    const headers: Record<string, string> = {};
    ALLOWED_HEADERS.forEach(h => {
      const val = req.headers.get(h);
      if (val) headers[h] = val;
    });

    // Forward token cookie if present
    const cookie = req.headers.get("cookie");
    if (cookie) {
      const match = cookie.match(/token=[^;]+/);
      if (match) headers['cookie'] = match[0];
    }

    // Add backend API token
    if (BACKEND_API_TOKEN) {
      headers['authorization'] = `Bearer ${BACKEND_API_TOKEN}`;
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      signal: AbortSignal.timeout(30000),
    };

    // Handle body for non-GET/HEAD requests
    if (!['GET', 'HEAD'].includes(req.method)) {
      // Edge Request body needs to be read via .text() or .json()
      fetchOptions.body = await req.text();
    }

    // Fetch backend
    const response = await fetch(targetUrl, fetchOptions);

    // Return response to client
    const resHeaders = new Headers(response.headers);
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });

  } catch (error) {
    console.error('[PROXY_ERROR]', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return NextResponse.json({ error: "Request timeout", details: error.message }, { status: 504 });
      }
      if (error.message.includes('fetch failed')) {
        return NextResponse.json({ error: "Cannot connect to backend", details: error.message, backend: BACKEND_URL }, { status: 502 });
      }
      return NextResponse.json({ error: "Proxy request failed", details: error.message, type: error.name }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown proxy error", details: String(error) }, { status: 500 });
  }
}

// Export all HTTP methods
export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const PATCH = proxyHandler;
export const DELETE = proxyHandler;

// Handle OPTIONS (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
