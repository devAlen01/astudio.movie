import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const data = await prisma.movie.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const { name, poster, movieID, releaseDate, voteAverage, userID, mediaType } =
    body;
  try {
    const newData = {
      name,
      poster,
      movieID,
      releaseDate,
      userID,
      mediaType,
      voteAverage: String(voteAverage),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const data = await prisma.movie.create({
      data: newData,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
