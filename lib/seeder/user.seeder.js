import connectDB from '../mongodb';
import UserSchema from "@/lib/models/user.model";

const seedUsers = async () => {
  await connectDB();

  try {
    // Generate an array of 5 sample users without using a loop
    const sampleUsers = Array.from({ length: 5 }, generateFakeUser);

    console.log(sampleUsers);

    await UserSchema.insertMany(users);
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
    process.exit(1);
  }
};

seedUsers();
