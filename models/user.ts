import mongoose, { Schema } from "mongoose";

const ResumeHeaderInfoSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true }, // email is being used as ID
    displayName: { type: String, required: true },
    contactInfo: {
      type: [
        {
          contactName: { type: String },
          contact: { type: String },
          _id: false,
        },
      ],
      _id: false,
    },
    location: { type: String },
    links: {
      type: [
        {
          linkName: { type: String },
          link: { type: String },
          _id: false,
        },
      ],
      _id: false,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const baseEducationSchema = new Schema({
  _id: { type: String, required: true },
  schoolName: { type: String, required: true },
  major: { type: String },
  degreeType: { type: String },
  gpa: { type: Schema.Types.Decimal128 },
  startDate: { type: Date },
  endDate: { type: Date },
});

const baseCertificateSchema = new Schema({
  _id: { type: String, required: true },
  certificateName: { type: String },
  organization: { type: String },
  issueDate: { type: Date },
});

const EducationSchema = new Schema(
  {
    ...baseEducationSchema.obj,
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const CertificateSchema = new Schema(
  {
    ...baseCertificateSchema.obj,
    email: { type: String, required: true }, // email is being used to find projects of this user
  },
  { timestamps: true }
);

const baseProjectSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true },
    projectName: { type: String, required: true },
    location: { type: String },
    positionTitle: { type: String },
    link: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: [String] },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    ...baseProjectSchema.obj,
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const baseExperienceSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    location: { type: String },
    positionTitle: { type: String },
    link: { type: String },
    experienceType: { type: String },
    startDate: { type: Date },
    endDate: {
      type: Schema.Types.Mixed,
      required: true,
    },
    description: { type: [String] },
  },
  { _id: false }
);

const ExperieceSchema = new Schema(
  {
    ...baseExperienceSchema.obj,
    email: { type: String, required: true }, // email is being used to find projects of this user
  },
  { timestamps: true }
);

const ResumeSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true },
    email: { type: String, required: true }, // email is being used to find projects of this user
    resumeName: { type: String, required: true },
    skills: { type: [String] },
    languages: { type: [String] },
    interests: { type: [String] },
    educations: {
      educations: [baseEducationSchema],
      hiddenEducations: { type: Map, of: Boolean },
      hiddenGPAs: { type: Map, of: Boolean },
      hiddenDates: { type: Map, of: Boolean },
      hideAll: { type: Boolean, default: false },
      relevantCourseWork: { type: String },
    },
    certificates: {
      certificates: [baseCertificateSchema],
      hiddenCertificates: { type: Map, of: Boolean },
      hideAll: { type: Boolean, default: false },
    },

    experiences: {
      experiences: [baseExperienceSchema],
      hiddenExperiences: { type: Map, of: Boolean },
      hideAll: { type: Boolean, default: false },
    },
    projects: {
      projects: [baseProjectSchema],
      hiddenProjects: { type: Map, of: Boolean },
      hiddenLocation: { type: Map, of: Boolean },
      hiddenDates: { type: Map, of: Boolean },
      hiddenPosition: { type: Map, of: Boolean },
      hideAll: { type: Boolean, default: false },
    },
    headerInfo: {
      headerInfo: ResumeHeaderInfoSchema,
      hideLocation: { type: Boolean, default: false },
      hiddenContacts: {
        type: Map,
        of: Boolean,
      },
      hiddenLinks: {
        type: Map,
        of: Boolean,
      },
    },
    pdfLink: { type: String },
  },
  { timestamps: true, _id: false }
);

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    isOnboarded: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
    stripeCustomerId: { type: String, unique: true },
    stripeSubscriptionId: { type: String, unique: true },
    stripePriceId: { type: String },
    stripeCurrentPeriodEnd: { type: Date },
    //subscriptionPlan: { type: String, default: "Newbie" },
    resumeCount: { type: Number, default: 0 },
    resumes: [{ type: String, ref: "Resume" }],
    skills: { type: [String] },
    languages: { type: [String] },
    interests: { type: [String] },
    AICalls: { type: Number, default: 0 },
    user: { type: String },
  },
  { timestamps: true }
);

export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export const Experience =
  mongoose.models.Experience || mongoose.model("Experience", ExperieceSchema);

export const Education =
  mongoose.models.Education || mongoose.model("Education", EducationSchema);

export const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);

export const Project =
  mongoose.models.userProject || mongoose.model("userProject", ProjectSchema);

export const ResumeHeaderInfo =
  mongoose.models.ResumeHeaderInfo ||
  mongoose.model("ResumeHeaderInfo", ResumeHeaderInfoSchema);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
