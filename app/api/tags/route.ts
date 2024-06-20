import { connectToDB } from "@/lib/DB";
import Tags from "@/models/Tags";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDB();
    const tags = await Tags.find();
    return NextResponse.json(tags, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};

export const POST = async (req: {
  json: () => PromiseLike<{ name: string }> | { name: string };
}) => {
  const { name } = await req.json();
  try {
    connectToDB();
    const tags = await Tags.create({ name });
    return NextResponse.json(tags, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
