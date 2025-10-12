import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function getEndpoint(params: any) {
  const ep = params?.endpoint;
  if (!ep) return "";
  return Array.isArray(ep) ? ep.join("/") : ep;
}

async function getRequestBody(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (["POST", "PUT", "PATCH"].includes(req.method || "")) {
    if (contentType.includes("multipart/form-data")) return await req.formData();
    return await req.text();
  }
  return undefined;
}

function getForwardHeaders(req: NextRequest) {
  const safeHeaders = ["content-type", "accept", "accept-language"];
  const headers: Record<string, string> = {};
  safeHeaders.forEach(h => {
    const val = req.headers.get(h);
    if (val) headers[h] = val;
  });

  if (process.env.BACKEND_API_TOKEN) headers["Authorization"] = `Bearer ${process.env.BACKEND_API_TOKEN}`;
  const tokenCookie = req.cookies.get("token");
  if (tokenCookie) headers["Cookie"] = `token=${tokenCookie.value}`;

  return headers;
}

async function proxy(req: NextRequest, context: { params: Promise<any> }) {
  try {
    const params = await context.params;
    const backendPath = getEndpoint(params);
    if (!backendPath) return NextResponse.json({ error: "No endpoint specified" }, { status: 400 });

    const backendUrl = new URL(`${process.env.BACKEND_URL}/${backendPath}`);
    backendUrl.search = req.nextUrl.search || "";

    const response = await fetch(backendUrl.toString(), {
      method: req.method,
      headers: getForwardHeaders(req),
      body: await getRequestBody(req) as any,
      signal: AbortSignal.timeout(25000),
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });

  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
