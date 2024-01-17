import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import ListingInfoForm from '../forms/ListingInfoForm';
import BillingInfoForm from '../forms/BillingInfoForm';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import { BsPersonFill, BsCreditCardFill, BsCarFrontFill } from 'react-icons/bs';
import { Alert } from '@mui/material';
import { ICar } from '../types/types.js';

type Props = {
	itemData: any;
	handleChangeUpdate?: (x: any, y: any, c: any, s: any, ct: any, s1: any, s2: any, zc: any) => void;
    handleChangeUpdates: (b: any, m: any, lp: any, cr: any) => void;
    onSubmit: (updatedData: Partial<ICar>) => void; // Prop to handle the form submission and update
};

export default function ListingStepper({ itemData, onSubmit, handleChangeUpdates }: Props) {
	const [activeStep, setActiveStep] = React.useState(0);
	const [isLastStep, setIsLastStep] = React.useState(false);
	const [isFirstStep, setIsFirstStep] = React.useState(false);
	const [isComplete, setIsComplete] = React.useState(true);

	const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
	const handlePrev = () => (!isFirstStep && setIsComplete(true)) || setActiveStep((cur) => cur - 1);

	const [listingInfo, setListingInfo] = useState(itemData);

	useEffect(() => {
		setListingInfo(itemData);
	}, [itemData]);

	const handleChange = (e: any) => {
		if (e.target.name == 'startDate' || e.target.name == 'endDate') {
			setListingInfo({
				...listingInfo,
				carAvailability: { ...listingInfo.carAvailability, [e.target.name]: e.target.value },
			});
		} else setListingInfo({ ...listingInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();

		try {
			const formData = new FormData();

			for (const key in listingInfo) {
				if (key === 'vehiclePhotos') {
					const vehiclePhotos = listingInfo[key] as File[];
					vehiclePhotos.forEach((photo, index) => {
						formData.append('vehiclePhotos', photo); // Use the same field name for all images
					});
				} else if (key === 'carAvailability') {
					formData.append(key, JSON.stringify(listingInfo[key]));
				} else {
					formData.append(key, listingInfo[key]);
				}
			}
			onSubmit({
				...listingInfo, // Include the existing listingInfo data
				// You may want to add additional fields or modify the data as needed
			  });

			window.location.href = 'profile';
		} catch (error) {
			setIsComplete(false);
			console.log(error);
		}
	};

const handleChangeUpdate = (x: any, y: any, c: any, s: any, ct: any, s1: any, s2: any, zc: any) => {
    // Define the functionality for handleChangeUpdate if required
  };
	const renderStepContent = () => {
		return (
			<>
				<div className={`step-${activeStep}`}>
					{activeStep === 0 && (
						<div>
							<PersonalInfoForm handleChange={handleChange} handleChangeUpdate={handleChangeUpdate} personalInfo={listingInfo} />
						</div>
					)}
					{activeStep === 1 && (
						<div>
							<ListingInfoForm handleChange={handleChange} handleChangeUpdates={handleChangeUpdates} listingInfo={listingInfo} />
						</div>
					)}
					{activeStep === 2 && (
						<div>
							<BillingInfoForm handleChange={handleChange} billingInfo={listingInfo} />
						</div>
					)}
				</div>
			</>
		);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col min-h-[720px] self-center w-full bg-white px-4 py-10 sm:p-12 shadow-searchbox rounded-lg mt-5 m-2 justify-between'
			>
				<div>
					<h1
						tabIndex={0}
						role='heading'
						aria-label='profile information'
						className='focus:outline-none text-3xl font-bold text-dark900'
					>
						Update Your Listing
					</h1>
					<p role='contentinfo' className=' focus:outline-none text-sm font-light leading-tight text-gray-600 mt-4'>
						Update the data for the listing. It will take a couple of minutes. <br />
					</p>
					<div className='w-full px-2 pt-5 flex flex-col '>
						<Stepper
							activeStep={activeStep}
							isLastStep={(value) => setIsLastStep(value)}
							isFirstStep={(value) => setIsFirstStep(value)}
						>
							<Step onClick={() => setActiveStep(0)} className=' cursor-pointer'>
								<BsPersonFill className='h-5 w-5 rounded-full' />
							</Step>
							<Step onClick={() => setActiveStep(1)} className=' cursor-pointer'>
								<BsCarFrontFill className='h-5 w-5' />
							</Step>
							<Step onClick={() => setActiveStep(2)} className=' cursor-pointer'>
								<BsCreditCardFill className='h-5 w-5' />
							</Step>
						</Stepper>
						<div className='mt-5 w-max text-center'>
							<Typography className='font-semibold font-Messina-Sans text-center'>
								{activeStep == 0 ? 'Personal Information' : ''}
								{activeStep == 1 ? 'Listing Information' : ''}
								{activeStep == 2 ? 'Billing Information' : ''}
							</Typography>
						</div>
					</div>
				</div>
				{renderStepContent()}
				<div className={`w-fill transition-transform ${isComplete ? 'scale-y-0 fixed' : 'scale-y-100 relative '}`}>
					<Alert severity='warning'>
						Please fill the necessary information - <strong>Check all steps!</strong>
					</Alert>
				</div>
				<div className='border-t-2 border-dark200 h-full block items-end'>
					<div className='flex pt-3'>
						<button
							type='button'
							onClick={handlePrev}
							className='rounded-full px-4 py-2 bg-dark200 ring-dark400 disabled:hidden hover:shadow-md transition-shadow'
							disabled={isFirstStep}
						>
							{'Back'}
						</button>
						<div className='flex flex-auto' />
						<button
							hidden={activeStep == 2}
							type='button'
							onClick={handleNext}
							className='rounded-full px-4 py-2 bg-yellow hover:shadow-md transition-shadow'
						>
							Next
						</button>
						<button
							hidden={activeStep < 2}
							type='submit'
							className='rounded-full px-4 py-2 bg-yellow hover:shadow-md transition-shadow'
						>
							Finish
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
