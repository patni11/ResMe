"use server";

import User from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";

import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";

export async function fetchUser(userId: string) {
  try {
    await connectMongoDB();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return { error: "User not found" };
    }

    // console.log("DB USER", user);
    return user;
  } catch (error: any) {
    //console.log("Failed to fetch user", error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser(
  userInfo: UserInfo,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await User.findOneAndUpdate(
      { _id: userInfo.id },
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

    if (path === "/userInfo") {
      revalidatePath(path);
    }
  } catch (e) {
    throw new Error(`Failed to create/update userData: ${e}`);
  }
}
