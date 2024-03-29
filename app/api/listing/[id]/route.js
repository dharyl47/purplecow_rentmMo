import { NextResponse } from "next/server";

import { connectMongoDB, ListingsModel } from "@/lib/mongodb";

export async function GET(req, res) {
  try {
    await connectMongoDB();
    const { params } = res;
    const { id } = params;

    // Fetch listings by owner ID
    const listings = await ListingsModel.find({ ownerId: id }).populate(
      "ownerId"
    );

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings by ownerId:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
