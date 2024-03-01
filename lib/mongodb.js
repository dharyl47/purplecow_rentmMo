import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (Error) {
        console.log("Error")
    }
};

export default connectMongoDB;