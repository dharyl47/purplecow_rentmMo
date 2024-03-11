"use client";
import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/navigation";

import styles from "../styles/Cart.module.css";

interface CartItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  // Add any other properties according to your actual data structure
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Getting the Cart
  useEffect(() => {
    const cartItemsJSON = localStorage.getItem("cartItems");
    const cartItems = !!cartItemsJSON ? JSON.parse(cartItemsJSON) : undefined;
    setCart(cartItems);
  }, []);

  // Updating Total Price
  useEffect(() => {
    if (cart && total == 0) {
      cart.map((item: any) => {
        setTotal(total + item.quantity * item.product.price);
      });
    }
  }, [cart, total]);

  const ProceedPayment = (total: any) => {
    localStorage.setItem("totalPayment", JSON.stringify(total));
    localStorage.setItem("checkoutID", JSON.stringify(`${Date.now()}-Guide`));
    router.push("/payment");
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Test Cart</title>
      </Head>

      <main className="p-6 h-full flex flex-col justify-center">
        <section className="flex flex-col justify-between h-1/2	mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Cart</h1>
            <button
              onClick={() => {
                router.back();
              }}
              className="text-black rounded-full px-5 py-3 font-bold bg-yellow-300 text-sm shadow-md  transition"
            >
              Back
            </button>
          </div>
          <div className="flex-1">
            {cart ? (
              <ul className={`${styles.cartList}`}>
                <li className={styles.cartListLabel}>
                  <p>Product</p>
                  <div>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                  </div>
                </li>
                {cart.map((item: any, index: any) => {
                  return (
                    <li key={index}>
                      <p>{item.product.name}</p>
                      <div>
                        <p>Php {item.product.price}</p>
                        <p>{item.quantity}</p>
                        <p>Php {item.product.price * item.quantity}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Loading..</p>
            )}
            <hr className="mt-5" />
          </div>

          <div className="flex flex-row place-content-between items-center mt-5">
            <p>
              Total: <span>Php {total}</span>
            </p>

            <button
              onClick={() => {
                ProceedPayment(total);
              }}
              className="text-black rounded-full px-5 py-3 font-bold bg-yellow-300 text-sm shadow-md transition"
            >
              Proceed to Payment
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
