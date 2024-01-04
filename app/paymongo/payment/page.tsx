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
    if (paymentOption == 0) {
      return <CreditCard amount={total} description={description} />;
    } else if (paymentOption == 1) {
      return <GCash amount={total} description={description} />;
    } else if (paymentOption == 2) {
      return <GrabPay amount={total} description={description} />;
    }
  };

  // Getting the Checkout Information
  useEffect(() => {
    const totalJSON = localStorage.getItem('totalPayment');
    const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
    setTotal(totalNumber);

    const checkoutIDJSON = localStorage.getItem('checkoutID');
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : '';
    setCheckoutID(checkoutIDString);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Test</title>
      </Head>

      <main className="main">
        <section className="w-90vw min-h-45vh max-w-900px mx-auto">
          <div className="flex justify-between items-center">
            <h1>Select Payment Option</h1>
            <button
              className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </button>
          </div>

          <form className="flex justify-around flex-wrap">
            <label className="bg-white rounded-2xl relative w-full max-w-250px m-2 p-2 hover:shadow-md">
              <input
                className="w-6 h-6 mr-2"
                name="paymentOption"
                type="radio"
                value={0}
                defaultChecked
                onChange={() => setPaymentOption(0)}
              />
              <span className="cursor-pointer">
                <span className="text-green-500 font-bold text-xl">Credit Card</span>
              </span>
            </label>
            <label className="bg-white rounded-2xl relative w-full max-w-250px m-2 p-2 hover:shadow-md">
              <input
                className="w-6 h-6 mr-2"
                name="paymentOption"
                type="radio"
                value={1}
                onChange={() => setPaymentOption(1)}
              />
              <span className="cursor-pointer">
                <span className="text-green-500 font-bold text-xl">GCash</span>
              </span>
            </label>
            <label className="bg-white rounded-2xl relative w-full max-w-250px m-2 p-2 hover:shadow-md">
              <input
                className="w-6 h-6 mr-2"
                name="paymentOption"
                type="radio"
                value={2}
                onChange={() => setPaymentOption(2)}
              />
              <span className="cursor-pointer">
                <span className="text-green-500 font-bold text-xl">GrabPay</span>
              </span>
            </label>
          </form>
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-40 min-w-300px p-4">
              <h2>Payment for ID {checkoutID}</h2>
              <h3>Amount to pay: {total}</h3>
            </div>
            <div className="w-60">{displayPaymentForm(paymentOption)}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
