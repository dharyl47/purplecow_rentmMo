import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Creating our options for the Create a Payment Intent Call
    const optionsIntent = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          process.env.PAYMONGO_SECRET
        ).toString("base64")}`, // HTTP Basic Auth and Encoding
      },
    };

    try {
      const response = await axios.post(
        "https://api.paymongo.com/v1/payment_intents",
        req.body,
        optionsIntent
      );

      if (response.data.errors) {
        console.log(JSON.stringify(response.data.errors));
      } else {
        res.status(200).json({ body: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
  }
}
