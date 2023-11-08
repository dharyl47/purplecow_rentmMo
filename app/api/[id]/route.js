import { NextResponse } from 'next/server';
import connectMongoDB from '../../lib/mongodb';
import UserSchema from '../../models/userProfile'

export async function PUT(request, { params }) {
const  { id } = params;
const { newName: name} = await request.json();
await connectMongoDB();
await UserSchema.findByIdAndUpdate(id, { name });
return NextResponse.json({message: "User (Name) updated."}, {status: 200});
}

export async function GET( request, { params }){
    const { id } = params;
    await connectMongoDB();
    const user = await UserSchema.findOne({ _id: id});
    return NextResponse.json({ user }, { status: 200});
}