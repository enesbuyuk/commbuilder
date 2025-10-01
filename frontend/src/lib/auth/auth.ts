"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error("Login failed");
    return;
  }

  const json = await response.json();

  const token = json.token;

  const headerStore = await headers();
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    domain: headerStore.get("host") || "localhost",
    // secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}
