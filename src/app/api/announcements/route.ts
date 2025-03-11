import { NextResponse } from "next/server";
import clientPromise from "@/utils/startMongo";

export async function GET(request: Request) {
    try {
        const limitParam = new URL(request.url).searchParams.get("limit");
        const limit = limitParam ? parseInt(limitParam) : 100; // Default limit

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB_NAME);
        const collection = db.collection("announcements");

        const cursor = collection.find().sort({ announcement_date: -1 }).limit(limit);
        const data = await cursor.toArray();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Announcements fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch announcements" },
            { status: 500 }
        );
    }
}
