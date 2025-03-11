import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/utils/startMongo";
import { Admin } from "@/types/Admin";
import { Attempt } from "@/types/Attempt";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password is required." }, { status: 400 });
        }

        let ip = req.headers.get("x-forwarded-for") || "";
        if (ip.includes(",")) {
            ip = ip.split(",")[0].trim();
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB_NAME);

        const attemptsCollection = db.collection<Attempt>("attempts");
        const adminsCollection = db.collection<Admin>("admins");

        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentAttempts = await attemptsCollection.find({
            ip,
            timestamp: { $gte: oneHourAgo },
        }).toArray();

        if (recentAttempts.length >= 10) {
            return NextResponse.json({ error: "Too many attempts, please try again later." }, { status: 429 });
        }

        const admin = await adminsCollection.findOne({ username });
        if (!admin) {
            await attemptsCollection.insertOne({
                ip,
                timestamp: new Date(),
                status: "failed",
            });
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            await attemptsCollection.insertOne({
                ip,
                timestamp: new Date(),
                status: "failed",
            });
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET environment variable is missing");
            process.exit(1);
        }

        const token = jwt.sign({ id: admin._id, role: "admin" }, jwtSecret, {
            expiresIn: "1h",
        });

        await attemptsCollection.insertOne({
            ip,
            timestamp: new Date(),
            status: "success",
        });

        return NextResponse.json({ token, message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
