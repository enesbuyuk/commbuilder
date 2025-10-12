import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_API_TOKEN = process.env.BACKEND_API_TOKEN;

const ALLOWED_HEADERS = ['content-type', 'accept', 'content-length'];

async function proxy(
  req: NextRequest, 
  context: { params: Promise<{ endpoint: string[] }> }
) {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "BACKEND_URL not defined" }, { status: 500 });
  }

  try {
    const params = await context.params;
    const backendPath = params.endpoint?.join("/") || "";
    const targetUrl = `${BACKEND_URL}/${backendPath}${req.nextUrl.search}`;

    // Forward allowed headers
    const headers: Record<string, string> = {};
    ALLOWED_HEADERS.forEach(h => {
      const val = req.headers.get(h);
      if (val) headers[h] = val;
    });

    // Forward cookie token if present
    const cookie = req.headers.get("cookie");
    if (cookie) {
      const match = cookie.match(/token=[^;]+/);
      if (match) headers['cookie'] = match[0];
    }

    // Add backend API token
    if (BACKEND_API_TOKEN) {
      headers['authorization'] = `Bearer ${BACKEND_API_TOKEN}`;
    }

    // Body handling
    let body: BodyInit | undefined;
    if (!['GET', 'HEAD'].includes(req.method)) {
      body = await req.text();
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    // Build response headers
    const resHeaders = new Headers(response.headers);
    resHeaders.set('Access-Control-Allow-Origin', '*');
    resHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    resHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const respBody = await response.arrayBuffer();
    return new NextResponse(respBody, {
      status: response.status,
      headers: resHeaders,
    });

  } catch (err) {
    console.error('[PROXY_ERROR]', err);
    return NextResponse.json({ error: "Proxy failed", details: String(err) }, { status: 500 });
  }
}

// Export all methods
export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}