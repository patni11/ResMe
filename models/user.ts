import mongoose, { Schema } from "mongoose";

// const CertificateSchema = new Schema(
//   {
//     certificateName: String,
//     organization: String,
//     issueDate: Date,
//     certificateId: String,
//   },
//   { timestamps: true }
// );

// const EducationSchema = new Schema(
//   {
//     schoolName: String,
//     manor: String,
//     degreeType: String,
//     gpa: Number,
//     startDate: Date,
//     endDate: Date,
//     id: String,
//   },
//   { timestamps: true }
// );

// const ExperieceSchema = new Schema(
//   {
//     company: String,
//     location: String,
//     positionTitle: String,
//     experienceType: String,
//     startDate: Date,
//     endDate: Date || "working",
//     description: String,
//     id: String,
//   },
//   { timestamps: true }
// );

// const UserSchema = new Schema(
//   {
//     userPlatformDetails: {
//       name: String,
//       email: String,
//       password: String,
//       stripeCustomerId: String,
//       stripeSubscriptionId: String,
//       stripePriceId: String,
//       stripeCurrentPeriodEnd: Date,
//     },

//     userDetails: {
//       resumeName: String,
//       contractInfo: [String],
//       links: [String],
//     },

//     skills: [String],
//     languages: [String],
//     interests: [String],

//     resumes: [
//       {
//         header: {
//           username: String,
//           contactInfo: [String],
//           links: [String],
//         },
//         educations: [{ type: Schema.Types.ObjectId, ref: "Education" }],
//         certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
//         experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
//         projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
//         skills: [String],
//         languages: [String],
//         interests: [String],
//       },
//     ],

//     educations: [{ type: Schema.Types.ObjectId, ref: "Education" }],
//     certificates: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
//     experiences: [{ type: Schema.Types.ObjectId, ref: "Experience" }],
//     projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
//   },
//   {
//     timestamps: true,
//   }
// );

const ResumeHeaderInfoSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true }, // email is being used as ID
    displayName: { type: String, required: true },
    contactInfo: {
      type: [
        {
          contact: { type: String, required: true },
          _id: false,
        },
      ],
      _id: false,
    },
    location: { type: String },
    links: {
      type: [
        {
          linkName: { type: String, required: true },
          link: { type: String, required: true },
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

const ProjectSchema = new Schema(
  {
    email: { type: String, required: true }, // email is being used to find projects of this user
    projectName: { type: String, required: true },
    location: { type: String },
    positionTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    stripePriceId: {
      type: String,
    },
    stripeCurrentPeriodEnd: {
      type: Date,
    },
    resumeHeaderInfo: {
      type: Schema.Types.ObjectId,
      ref: "ResumeHeaderInfo",
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    skills: {
      type: [String],
    },
    languages: {
      type: [String],
    },
    interests: {
      type: [String],
    },
  },
  { timestamps: true }
);

console.log("mongoose.models:", mongoose.models);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

export const Project =
  mongoose.models.userProject || mongoose.model("userProject", ProjectSchema);

export const ResumeHeaderInfo =
  mongoose.models.ResumeHeaderInfo ||
  mongoose.model("ResumeHeaderInfo", ResumeHeaderInfoSchema);
