"use server";

import { ResumeHeaderInfo } from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { UserInfo } from "@/lib/types";

export async function fetchResumeHeaderInfo(email: string) {
  try {
    await connectMongoDB();
    const user: UserInfo | null = await ResumeHeaderInfo.findOne({
      _id: email,
    }).lean();
    // console.log("DB USER", user);

    return user;
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateResumeHeaderInfo(
  userInfo: UserInfo,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await ResumeHeaderInfo.findOneAndUpdate(
      { _id: userInfo.email },
      {
        displayName: userInfo.displayName,
        contactInfo: userInfo.contactInfo,
        location: userInfo.location,
        links: userInfo.links,
      },
      {
        upsert: true,
      }
    );

    revalidatePath(path || "/userInfo");
  } catch (e) {
    throw new Error(`Failed to create/update userData: ${e}`);
  }
}
