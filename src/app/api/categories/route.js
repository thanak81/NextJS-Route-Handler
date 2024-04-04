import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const GET = async () => {
  const getAllCategory = await prisma.categories.findMany();

  return NextResponse.json(
    getAllCategory.length <= 0
      ? {
          status: 400,
          message: "Data Not Found",
          time: new Date().toISOString(),
        }
      : {
          status: 200,
          message: "Categories Lists Retrives",
          payload: getAllCategory,
          time: new Date().toISOString(),
        }
  );
};

export const POST = async (request) => {
  const data = await request.json();
  const getAllCategory = await prisma.categories.findMany();
  let check = false;

  getAllCategory.forEach((category) => {
    if (data.category_name === category.category_name) {
      console.log("equal");
      check = true;
        console.log(category.category_name)
      return;
    } else {
      console.log("this is not equal hahaa");
    }
  });
  if (check) {
    return NextResponse.json({
      status: 400,
      message: "Category is already exist",
      time: new Date().toISOString(),
    });
  }

  const createCategory = await prisma.categories.create({
    data: {
      category_name: data.category_name,
    },
  });


  return NextResponse.json({
    status: 201,
    payload: createCategory,
    message: "Category is successfully created",
    time: new Date().toISOString()
   })
};
