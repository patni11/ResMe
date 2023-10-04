import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Certificate from "@/models/certificateSchema";

export async function POST(request: NextRequest) {
  const { certificateName, organization, issueDate, certificateId } =
    await request.json();

  if (!certificateName || !organization || !issueDate || !certificateId) {
    return NextResponse.json({
      message: "Missing required fields",
      success: false,
    });
  }

  await connectMongoDB();

  await Certificate.create({
    certificateName,
    organization,
    issueDate,
    certificateId,
  });

  return NextResponse.json({
    message: "Certificate added successfully",
    success: true,
  });
}
