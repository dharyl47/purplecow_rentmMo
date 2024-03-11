"use client";

import React, { Suspense } from "react";

// Components
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import DataTable from "@/components/admin/common/Tables/DataTables";

// Hoc
import ProtectedRoleRoutes from "@/utils/hoc/ProtectedRoleRoutes";

async function getAllUsers() {
  const res = await fetch("http://localhost:3000/api/admin/users/find");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Users = async () => {
  const fetchUsers = await getAllUsers();

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

      <Suspense fallback={<div>Loading...</div>}>
        <DataTable headers={headers} data={fetchUsers.user} itemsPerPage={10} />
      </Suspense>
    </DefaultLayout>
  );
};

export default ProtectedRoleRoutes(Users, ["admin"]);
