import { Experience } from "@/models/user";
import { Experience as ExperienceType } from "@/lib/types/types";
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
    const experiences: ExperienceType[] = await Experience.find({
      email: session?.user?.email,
    }).lean();
    if (!experiences) {
      throw new Error(`No Experience Found`);
    }

    return NextResponse.json({ experiences }, { status: 200 });
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user: ${error.message}`,
    });
  }
}
