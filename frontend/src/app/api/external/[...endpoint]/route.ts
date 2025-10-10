import { NextRequest, NextResponse } from "next/server";

async function proxy(req: NextRequest, params: any) {
  const endpointParam = params?.endpoint;
  const endpoint = Array.isArray(endpointParam) ? endpointParam : [endpointParam];

  if (!endpoint || endpoint.length === 0) {
    return NextResponse.json({ error: "No endpoint specified" }, { status: 400 });
  }

  const backendPath = endpoint.join("/");

  const body = ["POST", "PUT", "PATCH"].includes(req.method || "")
    ? await req.text()
    : undefined;

  const headers: Record<string, string> = {
    "Content-Type": req.headers.get("content-type") || "application/json",
    "Authorization": `Bearer ${process.env.BACKEND_API_TOKEN || ""}`,
  };

  const tokenCookie = req.headers.get("cookie");
  if (tokenCookie) headers["Cookie"] = tokenCookie;

  const backendUrl = new URL(`${process.env.BACKEND_URL}/${backendPath}`);
  backendUrl.search = req.nextUrl.search || "";

  const response = await fetch(backendUrl.toString(), {
    method: req.method,
    headers,
    body,
  });

  let data;
  const text = await response.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  const payload = Array.isArray(data) ? data : { ...data, source: "proxied-through-nextjs" };

  return NextResponse.json(payload, { status: response.status });
}

export const GET = (req: NextRequest, ctx: { params: any }) => proxy(req, ctx);
export const POST = (req: NextRequest, ctx: { params: any }) => proxy(req, ctx);
export const PUT = (req: NextRequest, ctx: { params: any }) => proxy(req, ctx);
export const PATCH = (req: NextRequest, ctx: { params: any }) => proxy(req, ctx);
export const DELETE = (req: NextRequest, ctx: { params: any }) => proxy(req, ctx);
export const OPTIONS = (req: NextRequest, ctx: { params: any }) => proxy(req, ctx);