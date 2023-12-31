'use client';
import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from 'next/navigation';

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
    router.push("/paymongo/payment");
  };

  return (
    <div className="container">
      <Head>
        <title>Test Cart</title>
      </Head>

      <main className="main">
       
        <section className={styles.cart}>
          <div className={styles.cartHeader}>
            <h2>Cart</h2>
            <button
              onClick={() => {
                router.back();
              }}
              className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
            >
              Back
            </button>
          </div>
          {cart ? (
            <ul className={styles.cartList}>
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
          <hr />
          <div className={styles.cartFooter}>
            <button
              onClick={() => {
                ProceedPayment(total);
              }}
              className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
            >
              Proceed to Payment
            </button>
            <p>
              Total: <span>Php {total}</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
