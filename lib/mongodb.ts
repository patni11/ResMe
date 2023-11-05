import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    return console.error("Missing MONGODB_URI");
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    return connection.connection.db;
  } catch (err) {
    console.error(err);
  }
};

export default connectMongoDB;
