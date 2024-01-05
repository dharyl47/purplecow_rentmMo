'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SuccessRedirect = () => {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<{
    amount: string;
    name: string;
    email: string;
    sourceId: string;
  } | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const publicKey = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC;

  useEffect(() => {
    // Retrieve payment details from localStorage
    const retrievedPaymentDetails = localStorage.getItem("paymentDetails");

    // Check if the retrieved value is not null before parsing
    if (retrievedPaymentDetails !== null) {
      const parsedDetails = JSON.parse(retrievedPaymentDetails);
      setPaymentDetails(parsedDetails);
      listenToPayment(parsedDetails.sourceId); // Start listening to payment status
    } else {
      // Handle the case when payment details are not available
      router.push("/paymongo/payment");
    }
  }, []);

  // Function to Listen to the Source in the Front End
  const listenToPayment = async (sourceId: string) => {
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (i === 1) {
        const sourceData = await fetch(
          "https://api.paymongo.com/v1/sources/" + sourceId,
          {
            headers: {
              // Base64 encoded public PayMongo API key.
              Authorization: `Basic ${Buffer.from(publicKey+"").toString(
                "base64"
              )}`,
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response.data);
            return response.data;
          });

        if (sourceData.attributes.status === "failed") {
          setPaymentStatus("Payment Failed");
          break;
        } else if (sourceData.attributes.status === "paid") {
          setPaymentStatus("Payment Success");
          break;
        } else {
          i = 5;
          setPaymentStatus(sourceData.attributes.status);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md">
      {paymentStatus !== "Payment Success" && (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 text-lg text-center">
            <p>
              We are still checking the payment for Transaction: {paymentDetails?.sourceId}. Please wait...
            </p>
          </div>
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
        {paymentStatus === "Payment Success" && (
          <>
           <h3 className="text-3l font-semibold mb-4 text-center">
            Transaction ID: {paymentDetails?.sourceId}
           </h3>
            
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Payment Successful
            </h2>
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-semibold">Amount Paid:</span>{" "}
                {paymentDetails?.amount}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Name:</span>{" "}
                {paymentDetails?.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span>{" "}
                {paymentDetails?.email}
              </p>
            </div>
            <p className="text-lg text-center">
              Thank you for your payment!
            </p>
          </>
        )}
        {paymentStatus === "Payment Failed" && (
          <p className="text-lg text-center text-red-500">
            Payment Failed. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default SuccessRedirect;
