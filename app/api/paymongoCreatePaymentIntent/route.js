import fetch from "node-fetch";

export async function POST(request, res) {
  console.log("Accessed the POST route 11", res.length + " " + request.length); // Added console log here

  const optionsIntent = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        "sk_test_ijkQphjvMWN5iCXaixJzNzT1"
      ).toString("base64")}`,
    },
    body: JSON.stringify(request.body), // Use request.body instead of req.body
  };

  try {
    const response = await fetch(
      "https://api.paymongo.com/v1/payment_intents",
      optionsIntent
    );
    console.log("Accessed the POST route 22");
    const responseData = await response.json();
 console.log("Accessed the POST route 33", responseData);
    if (responseData.errors) {
      console.log(JSON.stringify(responseData.errors));
      res.status(400).json({ error: responseData.errors }); // Sending error response
    } else {
      res.status(200).json({ body: responseData }); // Sending success response
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Sending error response for server errors
  }
}
