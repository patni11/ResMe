import connectMongoDB from "@/lib/mongodb";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user";
import { z } from "zod";
import { getPDFLink } from "@/lib/actions/resumes.action";

const f = createUploadthing();

const isSubscribed = async (req: Request) => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || !session?.user?.email) {
    throw new Error("User not found");
  }
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: session.user.email });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    return NextResponse.json({
      status: 404,
      message: `Failed to fetch user: ${error.message}`,
    });
  }
};

export const ourFileRouter = {
  pdfUploader: f({ blob: { maxFileSize: "2MB" } })
    .input(z.object({ resumeId: z.string() }))
    .middleware(async ({ req, input }) => {
      //const user = await isSubscribed(req);
      //if (!user) throw new Error("Unauthorized");

      const session: Session | null = await getServerSession(authOptions);
      if (!session || !session?.user?.email) {
        throw new Error("User not found");
      }

      const existingLink = await getPDFLink(input.resumeId);
      // if (existingLink) {
      //   // delete from upload thing
      //   await utapi.deleteFiles(existingLink);
      // }
      console.log("middleware link", existingLink);
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { success: true };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        //  uploadedBy: metadata.userId
        success: true,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
