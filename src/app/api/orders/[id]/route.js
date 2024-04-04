import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, { params }) {

      const data = await prisma.orders.findUnique({
        where: {
          order_id: parseInt(params.id),
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
  }

export async function DELETE(request, { params }) {
    const findOrderByID = await prisma.orders.findUnique({
      where: {
        order_id: parseInt(params.id),
      },
    });
  
    if (findOrderByID === null) {
      return NextResponse.json({
        status: 404,
        message: "ID Not Found",
        time: new Date().toISOString(),
      });
    } else {
      const data = await prisma.orders.delete({
        where: {
          order_id: parseInt(params.id),
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
              message: "Order is successfully deleted",
              payload: data,
              time: new Date().toISOString(),
            }
      );
    }
  }
  
  export async function PUT(request, { params }) {
    const findOrdertyID = await prisma.orders.findUnique({
      where: {
        order_id: parseInt(params.id),
      },
    });
    if (findOrdertyID === null) {
      return NextResponse.json({
        status: 404,
        message: "ID Not Found",
        time: new Date().toISOString(),
      });
    } else {
      const requestData = await request.json();
      const data = await prisma.orders.update({
        where: {
          order_id: parseInt(params.id),
        },
        data: {
            productId: requestData.productId,
            order_qty: requestData.order_qty,
            customerId: requestData.customerId,
          },
      });
  
      return NextResponse.json({
        status: 200,
        message: "Order is updated successfully",
        payload: data,
        time: new Date().toISOString(),
      });
    }
  }