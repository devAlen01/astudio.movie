import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const { name, email } = body;
  try {
    const newData = {
      email,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const data = await prisma.user.create({
      data: newData,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
