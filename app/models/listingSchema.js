import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    brand: String,
    carAvailability: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    carRegistrationNumber: String,
    city: String,
    country: String,
    email: String,
    licensePlateNumber: String,
    mobileNumber: String,
    model: String,
    price: String,
    state: String,
    street: String,
    vehiclePhotos: [String], // Change the type to an array of strings
    zipCode: String,
    lat: String,
    lon: String,
  },
  {
    timestamps: true,
  }
);

const ListingModel = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default ListingModel;
