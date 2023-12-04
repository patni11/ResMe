"use server";
//import { getServerSession } from "next-auth/next";
//import authOptions, { Session } from "@/lib/authOptions";
import { User } from "@/models/user";
import { getUserEmailFromSession } from "./utils.action";
//import bcrypt from "bcryptjs";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { ResumeHeaderInfo } from "@/models/user";
import { User as UserType } from "../types";
export async function deleteUser(email: string) {
  try {
    // Connect to the MongoDB server
    const db = await connectMongoDB();
    if (!db) {
      return { error: "Check your internet, could not connect to database" };
    }
    // Get a reference to the database
    // List all collections in the database
    const collections = await db.listCollections().toArray();

    // Iterate through each collection
    for (const collection of collections) {
      const collectionName = collection.name;

      if (collectionName === "resumeheaderinfos") {
        await ResumeHeaderInfo.deleteOne({ _id: email });
      }

      // Delete entries in the collection containing the target email
      await db.collection(collectionName).deleteMany({ email: email });
      console.log(
        `Deleted entries in ${collectionName} collection containing email ${email}`
      );
    }
  } catch (err) {
    console.error("Error deleting entries:", err);
    throw new Error("Error deleting entries");
  }
}

export async function createUser({ email }: { email: string }) {
  try {
    connectMongoDB();

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        isOnboarded: false,
        resumeCount: 0,
        resumes: [],
        skills: [],
        languages: [],
        interests: [],
        AICalls: 0,
      },
      {
        upsert: true,
      }
    );
  } catch (e: any) {
    if (e.code == "11000") {
      throw new Error(`You already have an account. Please Sign In`);
    } else {
      console.log("Error creating user", e);
      throw new Error(`🐞 creeped in 😢 ${e}`);
    }
  }
}

export async function fetchUser(): Promise<UserType> {
  try {
    const email = await getUserEmailFromSession();
    await connectMongoDB();
    const user: UserType | null = await User.findOne({ email: email }).lean();
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: unknown) {
    console.log("Failed to fetch user", error);
    throw new Error("Failed to fetch user");
  }
}

export async function fetchUserAICalls(): Promise<{
  AICalls: number;
  stripePriceId: string;
}> {
  try {
    const email = await getUserEmailFromSession();
    await connectMongoDB();

    const user: { AICalls: number; stripePriceId: string } | null =
      await User.findOne({
        email: email,
      })
        .select("AICalls stripePriceId")
        .lean();

    if (!user) {
      throw new Error(`User Not Found`);
    }

    return user;
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function fetchUserResumes(): Promise<{
  resumes: string[];
  email: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
  name?: string;
}> {
  try {
    const email = await getUserEmailFromSession();
    await connectMongoDB();
    const user: { resumes: string[]; email: string } | null =
      await User.findOne({
        email: email,
      })
        .select("resumes email stripePriceId stripeCurrentPeriodEnd name")
        .lean();
    if (!user) {
      throw new Error(`User Not Found`);
    }

    return user;
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function updateUserAICalls() {
  try {
    const email = await getUserEmailFromSession();
    if (!email) {
      throw new Error(`User Not Authenticated`);
    }

    await connectMongoDB();
    const res = await User.findOneAndUpdate(
      { email: email },
      { $inc: { AICalls: 1 } } // Increment AICall by 1 or initialize it with 1 if it doesn't exist
    );

    if (!res) {
      throw new Error(`User Not Found`);
    }
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function fetchDashboardData(): Promise<{
  isOnboarded: boolean;
  email: string;

  resumes: Array<{
    id: string;
    resumeName: string;
    updatedAt: Date;
    pdfLink: string;
  }>;
  stripePriceId?: string;
} | null> {
  try {
    const email = await getUserEmailFromSession();
    await connectMongoDB();
    // Fetch specific fields from User and populate specific fields from Resume
    const user: {
      isOnboarded: boolean;
      email: string;

      resumes:
        | {
            id: string;
            resumeName: string;
            updatedAt: Date;
            pdfLink: string;
          }[];
      stripePriceId?: string;
    } | null = await User.findOne({ email: email })
      .select("isOnboarded email resumes stripePriceId stripeCurrentPeriodEnd") // Select specific fields from User
      .populate({
        path: "resumes", // Assuming 'resumes' is an array of Resume references
        select: "_id resumeName updatedAt pdfLink", // Select specific fields from Resume
      })
      .lean();

    if (!user) {
      throw new Error(`User Not Found`);
    }

    // Extracting the desired fields to return
    const result = {
      isOnboarded: user.isOnboarded,
      email: user.email,
      resumes: user.resumes.map((resume: any) => ({
        id: resume._id,
        resumeName: resume.resumeName,
        updatedAt: resume.updatedAt,
        pdfLink: resume.pdfLink,
      })),
    };

    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch dashboard data: ${error.message}`);
  }
}

export async function fetchTalent(email: string): Promise<string[][] | null> {
  try {
    await connectMongoDB();
    // Fetch only skills, languages, and interests fields
    const user = await User.findOne(
      { email: email },
      "skills languages interests"
    );
    if (!user) {
      throw new Error(`User Not Found`);
    }

    const skills = user.skills || [];
    const languages = user.languages || [];
    const interests = user.interests || [];
    return [skills, languages, interests];
  } catch (error) {
    //console.log("Failed to fetch talent details", error);
    throw new Error(`Failed to fetch talent details: ${error}`);
  }
}

export async function updateSkills(
  email: string,
  updatedSkills: string[],
  path?: string
) {
  try {
    connectMongoDB();
    await User.findOneAndUpdate(
      { email: email },
      {
        skills: updatedSkills,
      }
    );
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/skills");
    }
  } catch (e) {
    throw new Error(`Failed to create/update project: ${e}`);
  }
}

export async function updateInterests(
  email: string,
  updatedSkills: string[],
  path?: string
) {
  try {
    connectMongoDB();
    await User.findOneAndUpdate(
      { email: email },
      {
        interests: updatedSkills,
      }
    );

    if (path === "/skills") {
      revalidatePath(path);
    }
  } catch (e) {
    throw new Error(`Failed to create/update project: ${e}`);
  }
}

export async function updateLanguages(
  email: string,
  updatedSkills: string[],
  path?: string
) {
  try {
    connectMongoDB();
    await User.findOneAndUpdate(
      { email: email },
      {
        languages: updatedSkills,
      }
    );

    if (path === "/skills") {
      revalidatePath(path);
    }
  } catch (e) {
    throw new Error(`Failed to create/update project: ${e}`);
  }
}

export async function onboardUser(path?: string) {
  try {
    const email = await getUserEmailFromSession();
    await connectMongoDB();
    await User.findOneAndUpdate(
      { email: email },
      {
        isOnboarded: true,
      }
    );
    if (path != undefined) {
      revalidatePath(path);
    }
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}
