import prisma from "@/prisma"

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
        throw new Error("Unable to connect to database.")
    }
}