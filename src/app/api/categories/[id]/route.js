import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  const id = parseInt(params.id);
  if(!isNaN(params.id)){
    const getCategoryByID = await prisma.categories.findUnique({
      where: {
        category_id: id,
      },
    });
    return NextResponse.json(
      getCategoryByID === null
        ? {
            status: 400,
            message: "ID Not Found",
            time: new Date().toISOString(),
          }
        : {
            status: 200,
            message: `Data found`,
            payload: getCategoryByID,
            time: new Date().toISOString(),
          }
    );
  }else {
    const data = await prisma.categories.findMany({
      where: {
        category_name : params.id
      }
    })
    return NextResponse.json(
      data.length <= 0
        ? {
            status: 400,
            message: "Category Name Not Found",
            time: new Date().toISOString(),
          }
        : {
            status: 200,
            message: `Data found`,
            payload: data,
            time: new Date().toISOString(),
          }
    );
  }

};

export const PUT = async (request, { params }) => {
  const data = await request.json();
  const id = parseInt(params.id);
  const findCategoryByID = await prisma.categories.findUnique({
    where: {
      category_id: id,
    },
  });

  if (findCategoryByID === null) {
    return NextResponse.json({
      status: 400,
      message: "ID Not Found",
      time: new Date().toISOString(),
    });
  } else {
    const updateCategory = await prisma.categories.update({
      where: {
        category_id: id,
      },
      data: {
        category_name: data.category_name,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Category is succesfully updated",
      payload: updateCategory,
      time: new Date().toISOString(),
    });
  }
};

// Jlom tver 🥲

// export const DELETE= async (request, { params }) => {
//   const id = parseInt(params.id);
//   console.log(id)
//   const findCategoryByID = await prisma.categories.findUnique({
//     where: {
//       category_id: id,
//     },
//   });
//   if (findCategoryByID === null) {
//     return NextResponse.json({
//       status: 400,
//       message: "ID Not Found",
//       time: new Date().toISOString(),
//     });
//   } else {
//     const deleteCategory = await prisma.categories.delete({
//       where: {
//         category_id: id,
//       },
//     });

//     return NextResponse.json({
//       status: 200,
//       message: "Category is succesfully deleted",
//       payload: deleteCategory,
//       time: new Date().toISOString(),
//     });
//   }
// };
