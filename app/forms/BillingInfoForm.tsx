import React from "react";

import PaymentCard from "@/components/cards1/PaymentCard";

import { TextField } from "@mui/material";
import { ICar } from "@/types/types";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type Props = {
  handleChange: (e: any) => void;
  billingInfo: ICar;
};

const BillingInfoForm = ({ handleChange, billingInfo }: Props) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full">
          <PaymentCard />
        </div>
        <div className="flex items-center gap-4 sm:mt-6 mt-10">
          <div className="flex flex-col w-full">
            <label className="mb-3 text-sm leading-none text-gray-900">
              Listing Price
            </label>
            <TextField
              size="small"
              onChange={handleChange}
              value={billingInfo.price ?? ""}
              name="price"
              id="price"
              type="number"
              placeholder="Enter price per day"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-3 text-sm leading-none text-gray-900">
              Card Number
            </label>
            <TextField
              size="small"
              onChange={handleChange}
              value={billingInfo.cardNumber ?? ""}
              name="cardNumber"
              id="cardNumber"
              type="number"
              placeholder="Enter card number"
            />
          </div>
        </div>
        <div className="sm:mt-0 mt-5 flex items-center gap-4">
          <div className="flex flex-col sm:mt-5 mt-0 w-full">
            <label className="mb-3 text-sm leading-none text-gray-900">
              Expiration Date
            </label>
            {/* <TextField
              size="small"
              onChange={handleChange}
              value={billingInfo.cardExpiration ?? ""}
              name="cardExpiration"
              id="cardExpiration"
              type="string"
              placeholder="Enter expiration date"
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                onChange={value => {
                  // Check if value is a valid date string
                  if (typeof value === "string" || value instanceof Date) {
                    handleChange({
                      target: {
                        name: "cardExpiration",
                        value
                      }
                    });
                  }
                }}
                value={
                  billingInfo.cardExpiration &&
                  typeof billingInfo.cardExpiration === "string"
                    ? new Date(billingInfo.cardExpiration)
                    : null
                }
                name="cardExpiration"
                className="w-full"
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </div>

          <div className="flex flex-col sm:mt-5 mt-0 w-full">
            <label className="mb-3 text-sm leading-none text-gray-900">
              Security Code
            </label>
            <TextField
              size="small"
              onChange={handleChange}
              value={billingInfo.securityCode ?? ""}
              name="securityCode"
              id="securityCode"
              type="number"
              placeholder="Enter CVV"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingInfoForm;
