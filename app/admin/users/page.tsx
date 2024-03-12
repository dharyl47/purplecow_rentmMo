"use client";

import React, { useState, useEffect, Suspense } from "react";

import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import DataTable from "@/components/admin/common/Tables/DataTables";

import ProtectedRoleRoutes from "@/utils/hoc/ProtectedRoleRoutes";

function Users() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/admin/users/find");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setUserData(data.user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const headers = [
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "Email", key: "email" },
    { title: "Language", key: "language" },
    { title: "Profession", key: "profession" },
    { title: "Role", key: "role" }
  ];

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold">Users</h1>

      {loading ? (
        <Loader />
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
