import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    return console.error("Missing MONGODB_URI");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
  }
};

export default connectMongoDB;
