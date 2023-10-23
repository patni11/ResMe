import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  try {
    connectMongoDB();
    console.log("user");
    const user = await User.findOne({ email: email });

    if (user) {
      throw new Error("You already have an account, try signing in");
    } else {
      const hashedPassword = await bcrypt.hash(password, 5);
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();
    }
  } catch (e: any) {
    if (e.code == "11000") {
      throw new Error(`You already have an account. Please Sign In`);
    } else {
      throw new Error(`🐞 creeped in 😢 ${e}`);
    }
  }
}

export async function fetchTalent(email: string): Promise<string[][] | null> {
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(`User Not Found`);
    }

    const skills = user.skills;
    const languages = user.skills;
    const interests = user.skills;
    return [skills, languages, interests];
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
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

    if (path === "/skills") {
      revalidatePath(path);
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
