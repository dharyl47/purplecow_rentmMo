'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import CreditCard from '../components/CreditCard';
import GCash from '../components/GCash';
import GrabPay from '../components/GrabPay';

export default function Cart() {
  const [paymentOption, setPaymentOption] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkoutID, setCheckoutID] = useState('');
  const router = useRouter();

  const displayPaymentForm = (paymentOption: any) => {
    const description = checkoutID;
    switch (paymentOption) {
      case 0:
        return <CreditCard amount={total} description={description} />;
      case 1:
        return <GCash amount={total} description={description} />;
      case 2:
        return <GrabPay amount={total} description={description} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const totalJSON = localStorage.getItem('totalPayment');
    const totalNumber = totalJSON ? JSON.parse(totalJSON) : 0;
    setTotal(totalNumber);

    const checkoutIDJSON = localStorage.getItem('checkoutID');
    const checkoutIDString = checkoutIDJSON ? JSON.parse(checkoutIDJSON) : '';
    setCheckoutID(checkoutIDString);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Payment</title>
      </Head>

      <main className="p-6">
        <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Select Payment Option</h1>
            <button
              className="px-4 py-2 bg-yellow-300 text-gray-800 rounded-md font-semibold hover:bg-yellow-400 transition"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>

          <form className="mt-6 flex flex-col space-y-4 md:flex-row md:justify-between">
            <label className="flex items-center">
              <input
                className="mr-2 form-radio h-5 w-5 text-green-500"
                name="paymentOption"
                type="radio"
                value={0}
                defaultChecked
                onChange={() => setPaymentOption(0)}
              />
              <span className="text-xl font-semibold">Credit Card</span>
            </label>
            <label className="flex items-center">
              <input
                className="mr-2 form-radio h-5 w-5 text-green-500"
                name="paymentOption"
                type="radio"
                value={1}
                onChange={() => setPaymentOption(1)}
              />
              <span className="text-xl font-semibold">GCash</span>
            </label>
            <label className="flex items-center">
              <input
                className="mr-2 form-radio h-5 w-5 text-green-500"
                name="paymentOption"
                type="radio"
                value={2}
                onChange={() => setPaymentOption(2)}
              />
              <span className="text-xl font-semibold">GrabPay</span>
            </label>
          </form>

          <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center">
            <div className="w-full md:w-1/3 p-4 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold">Payment ID: {checkoutID}</h2>
              <h3 className="text-xl font-bold mt-2">Amount to Pay: {total}</h3>
            </div>
            <div className="w-full md:w-2/3 mt-6 md:mt-0">{displayPaymentForm(paymentOption)}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
