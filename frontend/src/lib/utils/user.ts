import {cookies} from "next/headers";
import {User} from "@/types/User";

export async function getUser() {
    try {
        const cookieStore = await cookies();
        const token =  cookieStore.get('token')?.value;

        if (!token) {
            return null;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/external/auth`, {
            method: 'GET',
            headers: {
                'Cookie': `token=${token}`
            },
            credentials: 'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.user as User;
    } catch (err) {
        console.error('Error fetching user:', err);
        return null;
    }
}
