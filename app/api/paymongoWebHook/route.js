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
      console.log(responseData);

      return {
        status: 200,
        body: "Webhook Received",
      };
    } else if (
      data.attributes.type === "payment.paid " &&
      data.attributes.status === "paid"
    ) {
      console.log("Payment Paid");
      return {
        status: 200,
        body: "Payment Paid",
      };
    } else if (data.attributes.type === "payment.failed") {
      console.log("Payment Failed");
      return {
        status: 200,
        body: "Payment Failed",
      };
    } else {
      return {
        status: 405,
        body: "Method Not Allowed",
      };
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return {
      status: 500,
      body: "Internal Server Error",
    };
  }
}
