import { NextRequest, NextResponse } from "next/server";

async function handler(
  req: NextRequest,
  context: { params: Promise<{ endpoint: string[] }> }
) {
  try {
    const { params } = context;
    const resolvedParams = await params; 
    const backendPath = resolvedParams.endpoint.join("/");

    const targetUrl = new URL(backendPath, process.env.BACKEND_URL);
    targetUrl.search = req.nextUrl.search;


    // Only forward safe headers
    const headers = new Headers();
    
    // Whitelist specific headers if needed
    const contentType = req.headers.get("content-type");
    if (contentType) {
      headers.set("content-type", contentType);
    }

    const accept = req.headers.get("accept");
    if (accept) {
      headers.set("accept", accept);
    }

    // Only forward specific cookie (token)
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => c.trim());
      const tokenCookie = cookies.find(c => c.startsWith('token='));
      if (tokenCookie) {
        headers.set("cookie", tokenCookie);
      }
    }

    // Add API token for backend authentication
    if (process.env.BACKEND_API_TOKEN) {
      headers.set("Authorization", `Bearer ${process.env.BACKEND_API_TOKEN}`);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
      duplex: 'half',
    } as RequestInit);

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

  } catch (error) {
    console.error("[PROXY_ERROR]", error);
    return NextResponse.json(
      { error: "Proxy request failed." },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
