import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(request,{params}){
    const customer_id = params.id;
    console.log(params.id)
    const data = await prisma.customers.findUnique({
        where: {customer_id : parseInt(customer_id)}
    })
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
    const findCustomersID = await prisma.customers.findUnique({
      where: {
        customer_id: parseInt(params.id),
      },
    });
  
    if (findCustomersID === null) {
      return NextResponse.json({
        status: 404,
        message: "ID Not Found",
        time: new Date().toISOString(),
      });
    } else {
      const data = await prisma.customers.delete({
        where: {
          customer_id: parseInt(params.id),
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
              message: "Customer is successfully deleted",
              payload: data,
              time: new Date().toISOString(),
            }
      );
    }
  }


  export async function PUT(request, { params }) {
    const findCustomerByID = await prisma.customers.findUnique({
      where: {
        customer_id: parseInt(params.id),
      },
    });
    if (findCustomerByID === null) {
      return NextResponse.json({
        status: 404,
        message: "ID Not Found",
        time: new Date().toISOString(),
      });
    } else {
      const requestData = await request.json();
      const data = await prisma.customers.update({
        where: {
            customer_id: parseInt(params.id),
        },
        data: {
          first_name: requestData.first_name,
          last_name: requestData.last_name,
          birth_date: requestData.birth_date,
        },
      });
  
      return NextResponse.json({
        status: 200,
        message: "Customer is updated successfully",
        payload: data,
        time: new Date().toISOString(),
      });
    }
  }
  