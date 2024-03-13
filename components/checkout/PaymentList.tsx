"use client";
import { useState, useEffect } from "react";

interface Payment {
  id: string;

  attributes: {
    amount: number;
    billing: {
      name: string;
      email: string;
      phone: string;
    };
    status: string;
    fee: number;
    net_amount: number;
    source: {
      type: string;
      id: string;
    };
    // Include other attributes needed
  };

  // Add other necessary properties
}

const PaymentList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.paymongo.com/v1/payments?limit=100",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                "sk_test_ijkQphjvMWN5iCXaixJzNzT1"
              ).toString("base64")}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPayments(data.data);
        } else {
          console.error("Failed to fetch payments");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="payment-list p-4">
      <h1 className="text-2xl font-bold mb-4">Payment List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Fee</th>
              <th className="px-4 py-2">Net</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Status</th>
              {/* Add more table headers for other attributes */}
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="bg-white">
                <td className="border px-4 py-2">
                  Payment ID: {payment.id}
                  <br /> Source ID: {payment.attributes.source.id}
                </td>
                <td className="border px-4 py-2">
                  {payment.attributes.billing.name}
                </td>
                <td className="border px-4 py-2">
                  {payment.attributes.billing.email}
                </td>
                <td className="border px-4 py-2">
                  {payment.attributes.billing.phone}
                </td>
                <td className="border px-4 py-2">
                  {payment.attributes.amount}
                </td>
                <td className="border px-4 py-2">{payment.attributes.fee}</td>
                <td className="border px-4 py-2">
                  {payment.attributes.net_amount}
                </td>
                <td className="border px-4 py-2">
                  {payment.attributes.source.type}
                </td>
                <td className="border px-4 py-2">
                  {payment.attributes.status}
                </td>
                {/* Add more table cells for other attributes */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
