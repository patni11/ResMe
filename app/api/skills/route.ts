import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import authOptions from "@/lib/authOptions";
import { User } from "@/models/user";

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
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error(`User Not Found`);
    }

    const skills = user.skills;
    const languages = user.languages;
    const interests = user.interests;
    console.log(skills, languages, interests);
    return NextResponse.json(
      { skills: skills, languages: languages, interests: interests },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user: ${error.message}`,
    });
  }
}
