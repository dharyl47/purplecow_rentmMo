import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    pickUpLocation: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
