import bcrypt from 'bcryptjs';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create users
    const user1 = await prisma.users.create({
      data: {
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authProvider: 'email',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        password: await bcrypt.hash('test123', 10),
        phoneNumber: '1234567890',
        profession: 'Software Engineer',
        profilePicture: "",
      },
    });

    const user2 = await prisma.users.create({
      data: {
        aboutMe: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        authProvider: 'email',
        email: 'user2@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        language: 'en',
        password: await bcrypt.hash('test123', 10),
        phoneNumber: '0987654321',
        profession: 'Data Scientist',
        profilePicture: "",
      },
    });

    // Create listings
    await prisma.listings.createMany({
      data: [
        {
          brand: 'Nissan',
          carRegistrationNumber: 'MNO012',
          cardExpiration: new Date('2024-08-25'),
          cardNumber: '8024 6790 1357 2468',
          city: 'Baguio City',
          country: 'Philippines',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          email: 'owner5@example.com',
          lat: '16.4023', // Latitude for Baguio City
          licensePlateNumber: 'JKL456',
          lon: '120.5960', // Longitude for Baguio City
          mobileNumber: '789-012-3456',
          model: 'X-Trail',
          ownerId: user1.id,
          price: '55',
          securityCode: '901',
          state: 'Cordillera Administrative Region',
          street: '567 Maple St',
          vehiclePhotos: [],
          carAvailability: {
                checked: true,
                startDate: new Date(), // Example start date
                endDate: new Date('2024-08-25') // Example end date
          },
          features: {
                allWheelDrive: true,
                androidAuto: true,
                appleCarPlay: false,
                automaticTransmission: true,
                auxInput: true,
                backUpCamera: true,
                bikeRack: false,
                converTible: false,
                gps: true,
                petFriendly: true,
                tollPass: true,
                usbCharger: true
          }
        },
        {
          brand: 'BMW',
          carRegistrationNumber: 'PQR789',
          cardExpiration: new Date('2024-11-10'),
          cardNumber: '6790 1357 8024 2468',
          city: 'Cagayan de Oro City',
          country: 'Philippines',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          email: 'owner6@example.com',
          lat: '8.4542', // Latitude for Cagayan de Oro City
          licensePlateNumber: 'MNO345',
          lon: '124.6319', // Longitude for Cagayan de Oro City
          mobileNumber: '012-345-6789',
          model: '3 Series',
          ownerId: user2.id,
          price: '65',
          securityCode: '234',
          state: 'Northern Mindanao',
          street: '678 Oak St',
          vehiclePhotos: [],
          carAvailability: {
                checked: true,
                startDate: new Date(), // Example start date
                endDate: new Date('2024-11-10') // Example end date
          },
          features: {
                allWheelDrive: false,
                androidAuto: true,
                appleCarPlay: true,
                automaticTransmission: true,
                auxInput: true,
                backUpCamera: true,
                bikeRack: false,
                converTible: true,
                gps: true,
                petFriendly: true,
                tollPass: false,
                usbCharger: true
          }
        },
        {
          brand: 'Ford',
          carRegistrationNumber: 'GHI789',
          cardExpiration: new Date('2025-03-15'),
          cardNumber: '2468 1357 8024 6790',
          city: 'Cebu City',
          country: 'Philippines',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          email: 'owner3@example.com',
          lat: '10.3157', // Latitude for Cebu City
          licensePlateNumber: 'DEF012',
          lon: '123.8854', // Longitude for Cebu City
          mobileNumber: '321-987-6543',
          model: 'Mustang',
          ownerId: user1.id,
          price: '60',
          securityCode: '789',
          state: 'Central Visayas',
          street: '789 Oak St',
          vehiclePhotos: [],
          carAvailability: {
                checked: true,
                startDate: new Date(), // Example start date
                endDate: new Date('2025-03-15') // Example end date
          },
          features: {
                allWheelDrive: false,
                androidAuto: true,
                appleCarPlay: true,
                automaticTransmission: true,
                auxInput: true,
                backUpCamera: true,
                bikeRack: false,
                converTible: true,
                gps: true,
                petFriendly: true,
                tollPass: false,
                usbCharger: true
          }
        },
        {
          brand: 'Chevrolet',
          carRegistrationNumber: 'JKL345',
          cardExpiration: new Date('2024-09-20'),
          cardNumber: '1357 2468 6790 8024',
          city: 'Quezon City',
          country: 'Philippines',
          description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          email: 'owner4@example.com',
          lat: '14.6760', // Latitude for Quezon City
          licensePlateNumber: 'GHI123',
          lon: '121.0437', // Longitude for Quezon City
          mobileNumber: '654-321-9870',
          model: 'Suburban',
          ownerId: user2.id,
          price: '70',
          securityCode: '890',
          state: 'Metro Manila',
          street: '890 Pine St',
          vehiclePhotos: [],
          carAvailability: {
                checked: true,
                startDate: new Date(), // Example start date
                endDate: new Date('2024-09-20') // Example end date
          },
          features: {
                allWheelDrive: true,
                androidAuto: true,
                appleCarPlay: true,
                automaticTransmission: true,
                auxInput: true,
                backUpCamera: true,
                bikeRack: false,
                converTible: false,
                gps: true,
                petFriendly: true,
                tollPass: true,
                usbCharger: true
          }
        },
        {
          brand: 'Toyota',
          carRegistrationNumber: 'ABC123',
          cardExpiration: new Date('2025-06-30'),
          cardNumber: '9870 5432 1234 8765',
          city: 'Davao City',
          country: 'Philippines',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          email: 'owner5@example.com',
          lat: '7.0732', // Latitude for another location in Davao
          licensePlateNumber: 'XYZ456',
          lon: '125.6129', // Longitude for another location in Davao
          mobileNumber: '789-012-3456',
          model: 'Corolla',
          ownerId: user1.id,
          price: '50',
          securityCode: '123',
          state: 'Davao',
          street: '456 Maple St',
          vehiclePhotos: [],
          carAvailability: {
            checked: true,
            startDate: new Date(), // Example start date
            endDate: new Date('2025-06-30') // Example end date
          },
          features: {
            allWheelDrive: false,
            androidAuto: true,
            appleCarPlay: true,
            automaticTransmission: true,
            auxInput: true,
            backUpCamera: true,
            bikeRack: false,
            converTible: false,
            gps: true,
            petFriendly: true,
            tollPass: false,
            usbCharger: true
          }
        },
        {
          brand: 'Honda',
          carRegistrationNumber: 'DEF456',
          cardExpiration: new Date('2024-12-10'),
          cardNumber: '2468 1357 8024 6790',
          city: 'Davao City',
          country: 'Philippines',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          email: 'owner6@example.com',
          lat: '7.0647', // Latitude for another location in Davao
          licensePlateNumber: 'LMN789',
          lon: '125.6079', // Longitude for another location in Davao
          mobileNumber: '890-123-4567',
          model: 'Civic',
          ownerId: user2.id,
          price: '55',
          securityCode: '456',
          state: 'Davao',
          street: '789 Oak St',
          vehiclePhotos: [],
          carAvailability: {
            checked: true,
            startDate: new Date(), // Example start date
            endDate: new Date('2024-12-10') // Example end date
          },
          features: {
            allWheelDrive: false,
            androidAuto: true,
            appleCarPlay: true,
            automaticTransmission: true,
            auxInput: true,
            backUpCamera: true,
            bikeRack: false,
            converTible: false,
            gps: true,
            petFriendly: true,
            tollPass: false,
            usbCharger: true
          }
        },
        {
          brand: 'Nissan',
          carRegistrationNumber: 'GHI789',
          cardExpiration: new Date('2025-09-25'),
          cardNumber: '8024 6790 1357 2468',
          city: 'Davao City',
          country: 'Philippines',
          description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
          email: 'owner7@example.com',
          lat: '7.0990', // Latitude for another location in Davao
          licensePlateNumber: 'OPQ012',
          lon: '125.6117', // Longitude for another location in Davao
          mobileNumber: '901-234-5678',
          model: 'X-Trail',
          ownerId: user1.id,
          price: '65',
          securityCode: '789',
          state: 'Davao',
          street: '123 Pine St',
          vehiclePhotos: [],
          carAvailability: {
            checked: true,
            startDate: new Date(), // Example start date
            endDate: new Date('2025-09-25') // Example end date
          },
          features: {
            allWheelDrive: true,
            androidAuto: true,
            appleCarPlay: true,
            automaticTransmission: true,
            auxInput: true,
            backUpCamera: true,
            bikeRack: false,
            converTible: false,
            gps: true,
            petFriendly: true,
            tollPass: false,
            usbCharger: true
          }
        },
        {
          brand: 'Mitsubishi',
          carRegistrationNumber: 'JKL012',
          cardExpiration: new Date('2024-11-30'),
          cardNumber: '8024 6790 2468 1357',
          city: 'Davao City',
          country: 'Philippines',
          description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
          email: 'owner8@example.com',
          lat: '7.1068', // Latitude for another location in Davao
          licensePlateNumber: 'RST345',
          lon: '125.6112', // Longitude for another location in Davao
          mobileNumber: '345-678-9012',
          model: 'Montero Sport',
          ownerId: user2.id,
          price: '75',
          securityCode: '012',
          state: 'Davao',
          street: '456 Cedar St',
          vehiclePhotos: [],
          carAvailability: {
            checked: true,
            startDate: new Date(), // Example start date
            endDate: new Date('2024-11-30') // Example end date
          },
          features: {
            allWheelDrive: true,
            androidAuto: true,
            appleCarPlay: true,
            automaticTransmission: true,
            auxInput: true,
            backUpCamera: true,
            bikeRack: false,
            converTible: false,
            gps: true,
            petFriendly: true,
            tollPass: false,
            usbCharger: true
          }
        },
        {
          brand: 'Hyundai',
          carRegistrationNumber: 'MNO789',
          cardExpiration: new Date('2025-08-15'),
          cardNumber: '6790 2468 1357 8024',
          city: 'Davao City',
          country: 'Philippines',
          description: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
          email: 'owner9@example.com',
          lat: '7.1173', // Latitude for another location in Davao
          licensePlateNumber: 'UVW456',
          lon: '125.6129', // Longitude for another location in Davao
          mobileNumber: '567-890-1234',
          model: 'Accent',
          ownerId: user1.id,
          price: '45',
          securityCode: '789',
          state: 'Davao',
          street: '789 Elm St',
          vehiclePhotos: [],
          carAvailability: {
            checked: true,
            startDate: new Date(), // Example start date
            endDate: new Date('2025-08-15') // Example end date
          },
          features: {
            allWheelDrive: false,
            androidAuto: true,
            appleCarPlay: true,
            automaticTransmission: true,
            auxInput: true,
            backUpCamera: true,
            bikeRack: false,
            converTible: false,
            gps: true,
            petFriendly: true,
            tollPass: false,
            usbCharger: true
          }
        }
        
      ],
    });
    
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
