import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(request,{params}){
    console.log(parseInt(params.id))
    const data = prisma.orders.findUnique({
        where: {
            customerId : parseInt(params.id)
        },
        include: {
            order : true
        }
    })

    if (data === null){
        return NextResponse.json({
            status : 201,
            message : `Order with customer ID ${params.id} is not found`,
            time : new Date().toISOString()
        })
    }else {
        return NextResponse.json({
            status : 201,
            message : `Order with customer ID ${params.id} found`,
            payload : data,
            time : new Date().toISOString()
        })
    }

}