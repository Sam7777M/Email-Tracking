import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log(`Connected to mongoDB`)
    } catch (error) {
        console.error("Error",error)
        process.exit(1)
    }
}