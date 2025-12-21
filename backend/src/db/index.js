import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\nMongoDB Connected!! DB HOST ${connectionInstance.connection.host}`);
    } catch(error) {
        console.log("MONGODB connection errror ", error);
        process.exit(1);
    }
}

export default connectDB;