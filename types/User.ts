export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    aboutMe: string;
    language: string;
    profession: string;
    profilePicture: string;
    authProvider: string;
    role: 'customer' | 'admin' | 'host'; 
  }