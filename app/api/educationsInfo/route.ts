import { Education } from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import authOptions from "@/lib/authOptions";

export async function GET(request: NextRequest) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user, user not found`,
    });
  }
  try {
    await connectMongoDB();
    const educations = await Education.find({
      email: session?.user?.email,
    });

    return NextResponse.json({ educations }, { status: 200 });
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user: ${error.message}`,
    });
  }
}
