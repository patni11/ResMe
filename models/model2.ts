import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    certificateName: String,
    organization: String,
    issueDate: Date,
    certificateId: String,
  },
  { timestamps: true }
);

const EducationSchema = new mongoose.Schema(
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

const ExperieceSchema = new mongoose.Schema(
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

const ProjectSchema = new mongoose.Schema(
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

const Resume = new mongoose.Schema(
  {
    userId: String,
    header: {
      username: String,
      contactInfo: [String],
      links: [String],
    },
    educations: [EducationSchema],
    certificates: [CertificateSchema],
    experiences: [ExperieceSchema],
    projects: [ProjectSchema],
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
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

    certificates: [
      {
        certificateName: String,
        organization: String,
        issueDate: Date,
        id: String,
      },
    ],

    educations: [
      {
        schoolName: String,
        manor: String,
        degreeType: String,
        gpa: Number,
        startDate: Date,
        endDate: Date,
        id: String,
      },
    ],

    experiences: [
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
    ],
    projects: [
      {
        projectName: String,
        location: String,
        positionTitle: String,
        startDate: Date,
        endDate: Date,
        description: String,
        id: String,
      },
    ],
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
        educations: [String], // contains educaitons IDs to link to add education data
        certificates: [String], // contains certificates IDs to link to add certificates data
        experiences: [String], // contains experiences IDs to link to add experiences data
        projects: [String], // contains projects IDs to link to add projects data
        skills: [String],
        languages: [String],
        interests: [String],
        id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Certificate =
  mongoose.models.Certificate || mongoose.model("Certificate", UserSchema);

export default Certificate;
