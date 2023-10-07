import mongoose, { Schema, mongo } from "mongoose";

const CertificateSchema = new Schema(
  {
    certificateName: String,
    organization: String,
    issueDate: Date,
    certificateId: String,
  },
  { timestamps: true }
);

const EducationSchema = new Schema(
  {
    schoolName: String,
    manor: String,
    degreeType: String,
    gpa: Number,
    startDate: Date,
    endDate: Date,
    id: String,
  },
  { timestamps: true }
);

const ExperieceSchema = new Schema(
  {
    company: String,
    location: String,
    positionTitle: String,
    experienceType: String,
    startDate: Date,
    endDate: Date || "working",
    description: String,
    id: String,
  },
  { timestamps: true }
);

const ProjectSchema = new Schema(
  {
    projectName: String,
    location: String,
    positionTitle: String,
    startDate: Date,
    endDate: Date,
    description: String,
    id: String,
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    userPlatformDetails: {
      name: String,
      email: String,
      password: String,
      stripeCustomerId: String,
      stripeSubscriptionId: String,
      stripePriceId: String,
      stripeCurrentPeriodEnd: Date,
    },

    userDetails: {
      resumeName: String,
      contractInfo: [String],
      links: [String],
    },

    skills: [String],
    languages: [String],
    interests: [String],

    resumes: [
      {
        header: {
          username: String,
          contactInfo: [String],
          links: [String],
        },
        educations: [{ type: Schema.Types.ObjectId, ref: "Education" }],
        certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
        experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
        projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
        skills: [String],
        languages: [String],
        interests: [String],
      },
    ],

    educations: [{ type: Schema.Types.ObjectId, ref: "Education" }],
    certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
    experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

const TempUserSchema = new Schema(
  {
    _id: { type: String, required: true },
    displayName: { type: String, required: true },
    contactInfo: [
      {
        contact: { type: String, required: true },
      },
    ],
    location: { type: String },
    links: [
      {
        linkName: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// const Certificate =
//   mongoose.models.Certificate || mongoose.model("Certificate", UserSchema);

const User =
  mongoose.models.TempUserSchema ||
  mongoose.model("TempUserSchema", TempUserSchema);

export default User;
