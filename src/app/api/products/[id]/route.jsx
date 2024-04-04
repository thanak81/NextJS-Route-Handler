import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  console.log(isNaN(parseInt(params.id)));
  console.log(params.id);

  if (!isNaN(params.id)) {
    const data = await prisma.products.findUnique({
      where: {
        product_id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      data === null
        ? {
            status: 400,
            message: "ID Not Found",
            time: new Date().toISOString(),
          }
        : {
            status: 200,
            message: `Data found`,
            payload: data,
            time: new Date().toISOString(),
          }
    );
  } else {
    const data = await prisma.products.findMany({
      where: {
        product_name: params.id,
      },
    });
    return NextResponse.json(
      data.length <= 0
        ? {
            status: 400,
            message: "Product Name Not Found",
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
}

export async function DELETE(request, { params }) {
  const findProductByID = await prisma.products.findUnique({
    where: {
      product_id: parseInt(params.id),
    },
  });

  if (findProductByID === null) {
    return NextResponse.json({
      status: 404,
      message: "ID Not Found",
      time: new Date().toISOString(),
    });
  } else {
    const data = await prisma.products.delete({
      where: {
        product_id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      data === null
        ? {
            status: 404,
            message: "ID Not Found",
            time: new Date().toISOString(),
          }
        : {
            status: 200,
            message: "Product is successfully deleted",
            payload: data,
            time: new Date().toISOString(),
          }
    );
  }
}

export async function PUT(request, { params }) {
  const findProductByID = await prisma.products.findUnique({
    where: {
      product_id: parseInt(params.id),
    },
  });
  if (findProductByID === null) {
    return NextResponse.json({
      status: 404,
      message: "ID Not Found",
      time: new Date().toISOString(),
    });
  } else {
    const requestData = await request.json();
    const data = await prisma.products.update({
      where: {
        product_id: parseInt(params.id),
      },
      data: {
        product_name: requestData.product_name,
        price: requestData.price,
        categoryId: requestData.categoryId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Product is updated successfully",
      payload: data,
      time: new Date().toISOString(),
    });
  }
}
