import { connectToDB } from "@/lib/DB";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

type PostsType = {
  title: string;
  slug: string;
  author: string;
  description: string;
  content: string;
  image: string;
  tag: string;
};

export const POST = async (req: {
  json: () => PromiseLike<PostsType> | PostsType;
}) => {
  const { title, slug, author, description, content, image, tag } =
    await req.json();

  try {
    await connectToDB();
    const post = await Posts.create({
      title,
      slug,
      author,
      description,
      content,
      image,
      tag,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};

export const GET = async () => {};
