import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import connectMongoDB from "../mongodb";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  try {
    connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (e: any) {
    if (e.code == "11000") {
      throw new Error(`You already have an account. Please Sign In`);
    } else {
      throw new Error(`🐞 creeped in 😢 ${e}`);
    }
  }
}
