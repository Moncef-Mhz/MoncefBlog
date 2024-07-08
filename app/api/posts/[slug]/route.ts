import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/DB";
import Posts from "@/models/Posts";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    await connectToDB();
    const post = await Posts.findOne({ slug });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { _id, title, slug, description, tag, content, image } =
    await request.json();

  try {
    await connectToDB();
    const post = await Posts.findByIdAndUpdate(_id, {
      title,
      slug,
      description,
      tag,
      content,
      image,
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
