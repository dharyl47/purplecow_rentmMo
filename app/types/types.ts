export interface ICar {
	_id?: string;
	brand: string;
	model: string;
	street: string;
	street1: string;
	street2: string;
	city: string;
	email: string;
	mobileNumber: string;
	state: string;
	country: string;
	price: number | null;
	zipCode: string;
	licensePlateNumber: string;
	lat: string;
	lon: string;
	carRegistrationNumber: string;
	carAvailability: ICarAvailability;
	vehiclePhotos: string[];
}

interface ICarAvailability {
	startDate: Date;
	endDate: Date;
}

export interface UserUpdate {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	profession: string;
	language: string;
	aboutMe: string;
}
