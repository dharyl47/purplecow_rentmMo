export interface ICar {
	_id?: string;
	brand?: string;
	model?: string;
	street?: string;
	street1?: string;
	street2?: string;
	city?: string;
	email?: string;
	mobileNumber?: string;
	state?: string;
	county?: string;
	country?: string;
	price?: number | 0 | undefined;
	zipCode?: string;
	licensePlateNumber?: string;
	lat?: string;
	lon?: string;
	carRegistrationNumber?: string;
	carAvailability?: ICarAvailability;
	vehiclePhotos?: string[];
	description?: string;
	reviews?: ICarreviews;
	features?: ICarfeatures;
	[key: string]:
    | string
    | number
    | null
    | string[]
    | ICarAvailability
	| ICarreviews
	| ICarfeatures
	| boolean
    | undefined; // Extend to allow ICarAvailability
}

interface ICarAvailability {
	startDate: Date;
	endDate: Date;
	checked: boolean;
}

interface ICarreviews {
	name: string;
	date: Date;
	starRating: string;
	feedback: string;
}

interface ICarfeatures {
	automaticTransmission: boolean;
	allWheelDrive: boolean;
	androidAuto: boolean;
	appleCarPlay: boolean;
	auxInput: boolean;
	backUpCamera: boolean;
	bikeRack: boolean;
	converTible: boolean;
	gps: boolean;
	petFriendly: boolean;
	tollPass: boolean;
	usbCharger: boolean;
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

