import UserSchema from "../../../lib/models/user.model"
import connectMongoDB from "../../../lib/mongodb"

export const GET = async (req, res) => {
  try {
    await connectMongoDB()

    const allUsers = await UserSchema.find()

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}