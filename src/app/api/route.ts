// /src/app/api/test-db/route.ts (App Router 기준)
import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function GET() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return NextResponse.json({ message: "✅ Connected to MongoDB" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "❌ Failed to connect", error: String(err) },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
