"use server";

import { Certificate } from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { Certificate as CertificateType } from "@/app/(mainApp)/education/pageTypes";

export async function fetchCertificates(email: string) {
  try {
    await connectMongoDB();
    const certificates: CertificateType[] = await Certificate.find({
      email: email,
    });
    if (!certificates) {
      throw new Error(`No Educaiton Found`);
    }
    return certificates;
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    throw new Error(`Failed to fetch certificatess: ${error.message}`);
  }
}

export async function updateCertificate(
  certificate: CertificateType,
  email: string,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await Certificate.findOneAndUpdate(
      { _id: certificate._id },
      {
        certificateName: certificate.certificateName,
        organization: certificate.organization,

        issueDate: certificate.issueDate,

        _id: certificate._id,
        email: email,
      },
      {
        upsert: true,
      }
    );

    revalidatePath(path || "/education");
  } catch (e) {
    throw new Error(`Failed to create/update Certificates: ${e}`);
  }
}

export async function deleteCertificate(id: string, path?: string) {
  const certificate = await Certificate.findById(id);
  if (!certificate) {
    throw new Error("Project not found");
  }

  await Certificate.deleteOne({ _id: certificate._id });
  if (path) {
    revalidatePath(path);
  }
}
