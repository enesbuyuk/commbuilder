import { NextRequest, NextResponse } from "next/server";

async function proxy(req: NextRequest, context: { params: Promise<any> }) {
  try {
    const params = await context.params;
    const endpointParam = params?.endpoint;
    const endpoint = Array.isArray(endpointParam) ? endpointParam : [endpointParam];

    if (!endpoint || endpoint.length === 0) {
      return NextResponse.json({ error: "No endpoint specified" }, { status: 400 });
    }

    const backendPath = endpoint.join("/");

    // Better body handling
    let body: string | FormData | undefined;
    const contentType = req.headers.get("content-type") || "";
    
    if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
      if (contentType.includes("multipart/form-data")) {
        body = await req.formData();
      } else {
        body = await req.text();
      }
    }

    const headers: Record<string, string> = {};
    
    // Only forward specific safe headers
    const safeHeaders = ["content-type", "accept", "accept-language"];
    safeHeaders.forEach(header => {
      const value = req.headers.get(header);
      if (value) headers[header] = value;
    });

    // Add backend auth
    if (process.env.BACKEND_API_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BACKEND_API_TOKEN}`;
    }

    const authCookie = req.cookies.get("token"); 
    if (authCookie) {
      headers["Cookie"] = `token=${authCookie.value}`;
    }

    const backendUrl = new URL(`${process.env.BACKEND_URL}/${backendPath}`);
    backendUrl.search = req.nextUrl.search || "";

    const response = await fetch(backendUrl.toString(), {
      method: req.method,
      headers,
      body: body as any,
    });

    // Forward important response headers
    const responseHeaders = new Headers();
    const headersToForward = ["content-type", "set-cookie", "cache-control"];
    headersToForward.forEach(header => {
      const value = response.headers.get(header);
      if (value) responseHeaders.set(header, value);
    });

    let data;
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    const payload = Array.isArray(data) 
      ? data 
      : { ...data, source: "proxied-through-nextjs" };

    return NextResponse.json(payload, { 
      status: response.status,
      headers: responseHeaders 
    });

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Proxy request failed" }, 
      { status: 500 }
    );
  }
}

export const GET = (req: NextRequest, ctx: { params: Promise<any> }) => proxy(req, ctx);
export const POST = (req: NextRequest, ctx: { params: Promise<any> }) => proxy(req, ctx);
export const PUT = (req: NextRequest, ctx: { params: Promise<any> }) => proxy(req, ctx);
export const PATCH = (req: NextRequest, ctx: { params: Promise<any> }) => proxy(req, ctx);
export const DELETE = (req: NextRequest, ctx: { params: Promise<any> }) => proxy(req, ctx);
export const OPTIONS = (req: NextRequest, ctx: { params: Promise<any> }) => proxy(req, ctx);