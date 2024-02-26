export const initialInfoState = {
	brand: '',
	model: '',
	street: '',
	city: '',
	email: '',
	mobileNumber: '',
	state: '',
	country: '',
	price: null,
	zipCode: '',
	lat: '',
	lon: '',
	licensePlateNumber: '',
	carRegistrationNumber: '',
	carAvailability: { startDate: new Date(), endDate: new Date(), checked: false },
	vehiclePhotos: [],
	description: '',
	reviews:{
		name: '',
		date: new Date(),
		starRating: "",
		feedback: ''
	},
	features: {
		automaticTransmission: false,
		allWheelDrive: false,
		androidAuto: false,
		appleCarPlay: false,
		auxInput: false,
		backUpCamera: false,
		bikeRack: false,
		converTible: false,
		gps: false,
		petFriendly: false,
		tollPass: false,
		usbCharger: false
	}
};

export const initialUserUpdate = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	profession: '',
	language: '',
	aboutMe: '',
};

export const initialUserProfile = {
	firstName: '',
	lastName: '',
	createdAt: '',
	phoneNumber: '',
	profession: '',
	email: '',
	unitAddress: '',
	city: '',
	state: '',
	country: '',
	isLicensed: false,
	isVerified: false,
	badge: '',
	language: '',
	aboutMe: '',
};
