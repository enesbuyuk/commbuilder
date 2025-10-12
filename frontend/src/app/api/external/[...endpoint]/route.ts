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

    const headers = new Headers(req.headers);
    headers.delete("host");
    headers.delete("x-forwarded-for");
    headers.delete("x-forwarded-proto");

    if (process.env.BACKEND_API_TOKEN) {
      headers.set("Authorization", `Bearer ${process.env.BACKEND_API_TOKEN}`);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
    });

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
