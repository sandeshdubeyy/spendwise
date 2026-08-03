import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        // Reuse the existing connection on warm starts, instead of
        // reconnecting on every single request.
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB is connected!");
    } catch (error) {
        console.log("Database error: ", error);
        // No process.exit here — that's fatal in a serverless environment
        // and crashes the entire function instead of failing gracefully.
    }
}

export default connectDB;