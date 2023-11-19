"use server";
import { revalidatePath } from "next/cache";
import { deleteResume, updateResumeName } from "@/lib/actions/resumes.action";

export async function deleteFunc(resumeId: string, email: string) {
  const res = await deleteResume(resumeId, email);
  return res;
}

export async function renameResume(resumeId: string, newName: string) {
  await updateResumeName(resumeId, newName);
  revalidatePath("/dashboard");
}
