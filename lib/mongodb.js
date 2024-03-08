import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectMongoDB;