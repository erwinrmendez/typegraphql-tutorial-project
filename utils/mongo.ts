import mongoose, { ConnectOptions } from "mongoose";
import config from "config";

export async function connectToMongoDB() {
  try {
    const dbUri = config.get("dbUri") as string;
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
