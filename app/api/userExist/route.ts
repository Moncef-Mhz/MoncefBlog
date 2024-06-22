import { connectToDB } from "@/lib/DB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
  }
}
