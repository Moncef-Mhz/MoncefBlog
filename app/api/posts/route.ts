import { connectToDB } from "@/lib/DB";
import Posts from "@/models/Posts";
import { NextApiRequest } from "next";
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

export const POST = async (req) => {
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

export const GET = async (req) => {
  const url = req.url ? new URL(req.url) : new URL("/");
  const Searchparams = new URLSearchParams(url.searchParams);

  const page: number =
    Searchparams.get("page") !== null ? parseInt(Searchparams.get("page")!) : 0;
  const perPage: number = 10;

  try {
    await connectToDB();
    const Article = await Posts.find({})
      .sort({ createdAt: -1 })
      .skip(perPage * page)
      .limit(perPage);
    return NextResponse.json(Article, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};
