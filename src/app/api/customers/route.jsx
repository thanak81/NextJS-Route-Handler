import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.customers.findMany();
  return NextResponse.json(
    data.length < 0
      ? {
          status: 400,
          message: "Data Not Found",
          time: new Date().toISOString(),
        }
      : {
          status: 200,
          message: `Customer lists retrieves. Total data : ${data.length}`,
          payload: data,
          time: new Date().toISOString(),
        }
  );
}

export async function POST(request, response) {
  const data = await request.json();

  const createdData = await prisma.customers.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: data.birth_date,
      
    },
  });
  return NextResponse.json({
    status: 201,
    payload: createdData,
    message: "Customers is successfully created",
    time: new Date().toISOString(),
  });
}
