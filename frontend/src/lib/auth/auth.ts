"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`${process.env.BACKEND_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        (await cookies()).set("token", token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            domain: process.env.SITE_HOSTNAME
        });

        redirect(`/admin`);
    } else {
        console.error("Login failed. Please try again.");
    }
}
