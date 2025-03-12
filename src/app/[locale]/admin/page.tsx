'use client'
import React, { useEffect, useState } from 'react';

interface User {
    id: string;
    username: string;
}

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/admin/token');

                if (!response.ok) {
                    throw new Error('Unauthorized');
                }

                const data = await response.json();
                setUser(data.user);
            } catch (err: any) {
                setError(err.message);
                if (err.message === 'Unauthorized') {
                    window.location.href = '/admin/sign-in';
                }
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return (
            <div>
                <h1>Error: {error}</h1>
            </div>
        );
    }

    if (user) {
        return (
            <div>
                <h1>Welcome, {user.username}</h1>
                <p>Admin page content here...</p>
            </div>
        );
    }

    return <div>Loading...</div>;
}
