import { ResumeHeaderInfo } from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";

export async function GET(
  request: NextRequest
  // { params }: { params: { email: string } }
) {
  //const { email } = params;
  //console.log("received params:", params);
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user, user not found`,
    });
  }

  try {
    await connectMongoDB();
    const headerInfo = await ResumeHeaderInfo.findOne({
      _id: session?.user?.email,
    }).lean();

    return NextResponse.json({ headerInfo }, { status: 200 });
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user: ${error.message}`,
    });
  }
}

// export async function fetchResumeHeaderInfo(email: string) {
//   try {
//     await connectMongoDB();
//     const user = await ResumeHeaderInfo.findOne({ _id: email });
//     // console.log("DB USER", user);
//     return user;
//   } catch (error: any) {
//     //console.log("Failed to fetch user", error);
//     throw new Error(`Failed to fetch user: ${error.message}`);
//   }
// }

// export async function updateResumeHeaderInfo(
//   userInfo: UserInfo,
//   path?: string
// ): Promise<void> {
//   try {
//     connectMongoDB();
//     await ResumeHeaderInfo.findOneAndUpdate(
//       { _id: userInfo.email },
//       {
//         displayName: userInfo.displayName,
//         contactInfo: userInfo.contactInfo,
//         location: userInfo.location,
//         links: userInfo.links,
//       },
//       {
//         upsert: true,
//       }
//     );

//     if (path === "/userInfo") {
//       revalidatePath(path);
//     }
//   } catch (e) {
//     throw new Error(`Failed to create/update userData: ${e}`);
//   }
// }
