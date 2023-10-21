import { ResumeHeaderInfo } from "@/models/user";
import connectMongoDB from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
  // { params }: { params: { email: string } }
) {
  //const { email } = params;
  //console.log("received params:", params);
  try {
    await connectMongoDB();
    const headerInfo = await ResumeHeaderInfo.findOne({
      _id: "shubhpatni2002@gmail.com",
    });
    console.log("Making API Call");
    return NextResponse.json({ headerInfo }, { status: 200 });
  } catch (error: any) {
    //console.log("Failed to fetch user", error);
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
