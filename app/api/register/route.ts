import { connectToDB } from "@/lib/DB";
import User from "@/models/User";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
export const POST = async (req: {
  json: () => { name: string; email: string; password: string; image: string };
}) => {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword: string = await bcrypt.hash(password, 10);
    await connectToDB();
    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json("User Registred sucessesfuly", { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "an error ocured while creating your account" },
      { status: 500 }
    );
  }
};
