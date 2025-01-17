import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB, { // Corrected the variable name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`MongoDB connected`);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
