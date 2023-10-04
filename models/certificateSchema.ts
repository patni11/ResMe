import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    certificateName: String,
    organization: String,
    issueDate: Date,
    certificateId: String,
  },
  {
    timestamps: true,
  }
);

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);

export default Certificate;
