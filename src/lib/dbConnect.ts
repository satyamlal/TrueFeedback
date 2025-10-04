import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to DB.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log("db : ", db);
    connection.isConnected = db.connections[0].readyState;
    console.log("db.connections : ", db.connections);

    console.log("DB connected successfully!");
  } catch (error) {
    console.log("DB connection failed!", error);
    process.exit();
  }
};
