"use client";
import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "../styles/Home.module.css";
import plainT from "@/public/assets/noImage.jpg";

// Product Placeholder
// Normally this is an API Call to pull data from db
const product = {
  id: "1",
  name: "Vios To Rent",
  description: "Davao City",
  price: 11000.0,
  stock: 1,
};

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  // Add to Cart Placeholder
  // Normally this is an API Call to push data to the db and updating the cart
  // We simulate this by saving to local storage
  const AddToCart = (product: any, quantity: any) => {
    if (quantity > 0) {
      const cartItems = [];
      cartItems.push({
        product,
        quantity,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      router.push("/paymongo/cart");
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Online Store Example</title>
        <meta
          name="description"
          content="Next.js - Paymongo Integration Tutorial"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <section className={styles.grid}>
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              <Image src={plainT} alt={`${product.name} image`} />
            </div>
            <div>
              <div className={styles.productInfo}>
                <h2>{product.name} </h2>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>Php {product.price}</p>
              </div>
              <div className={styles.productOrder}>
                <h3>Book Now</h3>
                <p>{product.stock} units available</p>
                <div className={styles.quantityContainer}>
                  {/* <button
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    disabled={quantity <= 0}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
                    onClick={() => {
                      if (quantity < product.stock) {
                        setQuantity(quantity + 1);
                      }
                    }}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button> */}
                </div>
                <button
                  className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
                  onClick={() => {
                    AddToCart(product, quantity);
                  }}
                  disabled={quantity == 0}
                >
                  Add to Cart &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
