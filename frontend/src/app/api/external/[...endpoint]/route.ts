import { NextRequest } from "next/server";

export async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string[] }> }
) {
  const resolvedParams = await params;
  const endpoint = resolvedParams?.endpoint;

  if (!endpoint || endpoint.length === 0) {
    return new Response(JSON.stringify({ error: "No endpoint specified" }), { status: 400 });
  }

  const backendPath = endpoint.join("/");

  const body = ["POST", "PUT", "PATCH"].includes(request.method || "")
    ? await request.text()
    : undefined;

  // Headers
  const headers: Record<string, string> = {
    "Content-Type": request.headers.get("content-type") || "application/json",
    "Authorization": `Bearer ${process.env.BACKEND_API_TOKEN || ""}`,
  };

  const incomingCookie = request.headers.get("cookie");
  if (incomingCookie) headers["Cookie"] = incomingCookie;

  // Fetch backend
  const backendUrl = new URL(`${process.env.BACKEND_URL}/${backendPath}`);
  backendUrl.search = request.nextUrl.search || "";

  const response = await fetch(backendUrl.toString(), {
    method: request.method,
    headers,
    body,
  });

  const text = await response.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  const payload = Array.isArray(data) ? data : { ...data, source: "proxied-through-nextjs" };

  return new Response(JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
    status: response.status,
  });
}

// Tüm HTTP metodları
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;