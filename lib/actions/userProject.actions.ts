"use server";

import { Project } from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { Project as ProjectType } from "@/lib/types";

export async function fetchUserProjects(
  email: string
): Promise<ProjectType[] | null> {
  try {
    await connectMongoDB();
    const projects: ProjectType[] = await Project.find({ email: email });
    if (!projects) {
      throw new Error(`No Projects Found`);
    }

    return projects;
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function updateProject(
  project: ProjectType,
  email: string,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await Project.findOneAndUpdate(
      { _id: project._id },
      {
        projectName: project.projectName,
        location: project.location,
        positionTitle: project.positionTitle,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description
          .split("\n")
          .filter((item) => item.trim() !== ""),
        email: email,
      },
      {
        upsert: true,
      }
    );

    revalidatePath(path || "/projects");
  } catch (e) {
    throw new Error(`Failed to create/update project: ${e}`);
  }
}

export async function deleteProject(id: string, path?: string) {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }

  await Project.deleteOne({ _id: project._id });
  if (path) {
    revalidatePath(path);
  }
}
