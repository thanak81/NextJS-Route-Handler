import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const getAllOrder = await prisma.orders.findMany();

  return NextResponse.json(
    getAllOrder.length <= 0
      ? {
          status: 400,
          message: "Data Not Found",
          time: new Date().toISOString(),
        }
      : {
          status: 200,
          message: "Order Lists Retrives",
          payload: getAllOrder,
          time: new Date().toISOString(),
        }
  );
};

export const POST = async (request, response) => {
  const data = await request.json();
  const product = await prisma.products.findUnique({
    where: {
      product_id: data.productId,
    },
  });

  const customer = await prisma.customers.findUnique({
    where: {
      customer_id: data.customerId,
    },
  });
  if (product === null || customer === null) {
    return NextResponse.json({
      status: 400,
      message: "Product or Customer ID does not exist",
      time: new Date().toISOString(),
    });
  } else {
    const createdData = await prisma.orders.create({
      data: {
        productId: data.productId,
        order_qty: data.order_qty,
        customerId: data.customerId,
        order_total: data.order_qty * product.price,
        order_data: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Order is ordered!! Thank you cher",
      payload: createdData,
      time: new Date().toISOString(),
    });
  }
};
