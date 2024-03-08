// utils/fakeData.js
import faker from 'faker';
import bcrypt from 'bcrypt';

export const generateFakeUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hash("test123", 10),
    phoneNumber: faker.phone.phoneNumber(),
    aboutMe: faker.lorem.paragraph(),
    language: faker.random.locale(),
    profession: faker.name.jobTitle(),
    profilePicture: faker.image.avatar(),
    // authProvider: faker.random.arrayElement(['email', 'google', 'facebook']),
    role: faker.random.arrayElement(['user', 'admin'])
  };
};
