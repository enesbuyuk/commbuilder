import connect from "@/utils/startMongo";
export async function GET() {
    /*
    const limitParam = new URL(request.url).searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;
    */

    const client = await connect;
    const db = client.db("university-student-club");
    const collection = db.collection("announcements");
    
    const cursor = collection.find().sort({ date: -1 });
    
    /*if (limit) {
        cursor = cursor.limit(limit);
    }
    */

    const data = await cursor.toArray();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}