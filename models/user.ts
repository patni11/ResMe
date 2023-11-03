import mongoose, { Schema } from "mongoose";

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
    _id: { type: String, required: true, unique: true },
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

const EducationSchema = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true }, // email is being used to find projects of this user
    schoolName: { type: String, required: true },
    major: { type: String, required: true },
    degreeType: { type: String, required: true },
    gpa: { type: Schema.Types.Decimal128, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const CertificateSchema = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true }, // email is being used to find projects of this user
    certificateName: { type: String, required: true },
    organization: { type: String, required: true },
    issueDate: { type: Date },
  },
  { timestamps: true }
);
const ExperieceSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true },
    email: { type: String, required: true }, // email is being used to find projects of this user
    company: { type: String, required: true },
    location: { type: String, required: true },
    positionTitle: { type: String, required: true },
    experienceType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (props: any) {
          return props.value === "working" || props.value instanceof Date;
        },
        message: (props: any) =>
          `${props.value} is not a valid endDate! It should be a Date or 'working'.`,
      },
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ResumeSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  email: { type: String, required: true }, // email is being used to find projects of this user
  resumeName: { type: String, required: true },
  skills: { type: [String] },
  languages: { type: [String] },
  interests: { type: [String] },
  educations: [EducationSchema],
  certificates: [CertificateSchema],
  experiences: [ExperieceSchema],
  projects: [ProjectSchema],
  headerInfo: [ResumeHeaderInfoSchema],
});

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    stripePriceId: { type: String },
    stripeCurrentPeriodEnd: { type: Date },
    resumeCount: { type: Number },
    resumes: [{ type: Schema.Types.ObjectId, ref: "ResumeSchema" }],
    skills: { type: [String] },
    languages: { type: [String] },
    interests: { type: [String] },
  },
  { timestamps: true }
);

export const Experience =
  mongoose.models.Experience || mongoose.model("Experience", ExperieceSchema);

export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

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
