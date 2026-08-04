import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        cachedConnection = await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB is connected!");
        return cachedConnection;
    } catch (error) {
        console.log("Database error: ", error);
        throw error;
    }
};

export default connectDB;