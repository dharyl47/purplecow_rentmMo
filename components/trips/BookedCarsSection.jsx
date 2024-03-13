import React from 'react'


import CardPagination from "@/components/common/CardPagination";
const data = [
  {
    _id: "65efe028f9026683452c25a1",
    user: {
      _id: "65eebd002223169e86243e1c",
      firstName: "Juan",
      lastName: "Test",
      email: "juan@gmail.com",
      password: "$2a$10$USgvoQhvfCTKd7WVZAphP.mrt7B1wJc1CNyeBhsogkd47O8qK65eG",
      phoneNumber: "09123456789",
      aboutMe: "",
      language: "English",
      profession: "Web developer",
      profilePicture: "https://cdn-icons-png.flaticon.com/128/3940/3940417.png",
      authProvider: "form",
      role: "customer",
      createdAt: "2024-03-11T08:12:48.406Z",
      updatedAt: "2024-03-13T02:55:29.272Z",
      __v: 0,
      chats: []
    },
    car: {
      carAvailability: {
        startDate: "2024-03-11T07:23:51.678Z",
        endDate: "2024-03-11T07:23:51.678Z",
        checked: true
      },
      features: {
        automaticTransmission: true,
        allWheelDrive: true,
        androidAuto: true,
        appleCarPlay: true,
        auxInput: false,
        backUpCamera: false,
        bikeRack: false,
        convertible: true,
        gps: true,
        petFriendly: true,
        tollPass: true,
        usbCharger: false
      },
      _id: "65eeb1b92d87f6b553de4997",
      ownerId: {
        _id: "65eeb1702d87f6b553de4991",
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: "$2a$10$b9CeexDFA3htObwV6hLg5u8tR2FEYuVpT0/Y9kexxVaJf6/kQ5EMC",
        phoneNumber: "09123456789",
        aboutMe: "lorem ipsum dolor testing test test",
        language: "English",
        profession: "Web Developer",
        profilePicture: "https://cdn-icons-png.flaticon.com/128/4333/4333609.png",
        authProvider: "form",
        role: "host",
        createdAt: "2024-03-11T07:23:28.386Z",
        updatedAt: "2024-03-13T06:30:59.552Z",
        __v: 0,
        chats: []
      },
      brand: "Nova",
      carRegistrationNumber: "123123",
      description: "lorem ipsum dolor testing",
      city: "Davao City",
      country: "Philippines",
      email: "john@gmail.com",
      licensePlateNumber: "NOV-2024",
      mobileNumber: "09123456789",
      model: "Nebula N3000",
      price: "150",
      state: "Davao del Sur",
      street: "Juan Luna Street",
      vehiclePhotos: [
        "blog_image_three_columns_7.png"
      ],
      zipCode: "8016",
      lat: "7.072343983414228",
      lon: "125.6160728332195",
      cardNumber: "123123",
      cardExpiration: "2024-04-15T16:00:00.000Z",
      securityCode: "123123",
      createdAt: "2024-03-11T07:24:41.427Z",
      updatedAt: "2024-03-11T07:24:41.427Z",
      __v: 0
    },
    startDate: "2024-03-11T16:00:00.000Z",
    endDate: "2024-03-15T16:00:00.000Z",
    totalPrice: 1000,
    status: "pending",
    createdAt: "2024-03-12T04:55:04.632Z",
    updatedAt: "2024-03-13T07:12:42.788Z",
    __v: 0
  }
];


const BookedCarsSection = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Booked Cars</h1>
       <CardPagination itemsPerPage={3} data={data} />
    </div>
  )
}

export default BookedCarsSection