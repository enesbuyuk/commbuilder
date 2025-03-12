'use client';
import {useTranslations} from "next-intl";
import React, {useState} from "react";
import Image from "next/image";

export default function AdminSignIn() {
    const translations = {
        generalTranslations: useTranslations("General"),
        pageTranslations: useTranslations("AdminPage"),
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
            } else {
                setErrorMessage(data.error || "Login failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className={"w-full max-w-md p-6"}>
                <Image
                    className={"rounded-lg shadow-lg"}
                    src={"/theme/admin/admin-login-page.webp"}
                    alt="Admin Login"
                    width={800}
                    height={600}
                    unoptimized={true}
                />
            </div>
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {translations.pageTranslations("title")}
                </h2>
                {errorMessage && (
                    <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">
                            {translations.pageTranslations("username")}
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            {translations.pageTranslations("password")}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : translations.pageTranslations("login")}
                    </button>
                </form>
            </div>
        </div>
    );
}
