"use client";

import React, { useState, useEffect, Suspense } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/dashboard/Layout/DefaultLayout";
import DataTable from "@/components/tables1/DataTables";
import axios from "axios";

const headers = [
  { title: "First Name", key: "firstName" },
  { title: "Last Name", key: "lastName" },
  { title: "Email", key: "email" },
  { title: "Language", key: "language" },
  { title: "Profession", key: "profession" },
  { title: "Role", key: "role" }
];

function Users() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/admin/users/find");
        const data = response.data;
        setUserData(data.user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">All Users</h1>

      {loading ? (
        <Loader positionStart />
      ) : (
        <Suspense fallback={<Loader />}>
          {userData && (
            <DataTable headers={headers} data={userData} itemsPerPage={10} />
          )}
        </Suspense>
      )}
    </DefaultLayout>
  );
}

export default Users;
