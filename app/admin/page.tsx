import { Metadata } from "next";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";

export const metadata: Metadata = {
  title:
    "RentMo | Admin",
  description: "",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        Home Page
      </DefaultLayout>
    </>
  );
}
