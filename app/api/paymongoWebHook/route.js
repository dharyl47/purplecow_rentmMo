"use client";

import fetch from "node-fetch";

export async function POST(request) {
  try {
    const requestData = await request.json();
    const { data } = requestData;

    if (data.attributes.type === "source.chargeable") {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            process.env.PAYMONGO_SECRET
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount: data.attributes.data.attributes.amount,
              source: {
                id: `${data.attributes.data.id}`,
                type: `${data.attributes.data.type}`,
              },
              description: data.attributes.data.attributes.description,
              currency: "PHP",
              statement_descriptor:
                data.attributes.data.attributes.statement_descriptor,
            },
          },
        }),
      };

      const response = await fetch(
        "https://api.paymongo.com/v1/payments",
        options
      );

      if (!response.ok) {
        throw new Error(`Paymongo API request failed: ${response.statusText}`);
      }

      const responseData = await response.json();

      return new Response("Webhook Received", { status: 200 });
    } else if (
      data.attributes.type === "payment.paid " &&
      data.attributes.status === "paid"
    ) {
      console.log("Payment Paid");
      return new Response("Payment Paid", { status: 200 });
    } else if (data.attributes.type === "payment.failed") {
      console.log("Payment Failed");
      return new Response("Payment Failed", { status: 200 });

    } else {
      return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
