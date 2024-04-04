import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  const data =await  prisma.categories.findUnique({
      where: {
        category_id: parseInt(params.id)
      },
      include: {  
        product:true
      }
  });

  return NextResponse.json({
    status: 200,
    message: "Categories List Retrieves",
    payload: data,
    time: new Date().toISOString(),
  });
};
