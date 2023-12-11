import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { getPDFLink, updatePDFLink } from "@/lib/actions/resumes.action";
import { UTApi } from "uploadthing/server";
//import { getUserSubscriptionPlan } from "@/lib/stripe";

const utapi = new UTApi();

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ blob: { maxFileSize: "2MB" } })
    .input(z.object({ resumeId: z.string() }))
    .middleware(async ({ req, input }) => {
      //AUTH CHECK
      // const subscriptionPlan = await getUserSubscriptionPlan();
      // if (!subscriptionPlan.isSubscribed) {
      //   return { success: false, message: "Not Subscribed" };
      // } TODO:Uncomment this

      const existingLink = await getPDFLink(input.resumeId);
      if (existingLink) {
        // delete from upload thing
        await utapi.deleteFiles(existingLink);
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        success: true,
        message: "Upload complete",
        resumeId: input.resumeId,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //      console.log("Upload complete for userId:", metadata.userId);
      console.log("ON UPLOAD COMPLETE");
      if (!metadata.success || !metadata.resumeId) {
        return {
          success: metadata.success || false,
          message: metadata.message,
          key: undefined,
          resumeId: metadata.resumeId,
        };
      }

      await updatePDFLink(metadata.resumeId, file.key); //update link in db

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        //  uploadedBy: metadata.userId
        success: true,
        message: metadata.message,
        key: file.key,
        resumeId: metadata.resumeId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
