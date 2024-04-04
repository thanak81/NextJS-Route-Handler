import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(request,{params}){
    const customer_id = params.id;
    console.log(params.id)
    const data = await prisma.customers.findUnique({
        where: {customer_id : parseInt(customer_id)}
        
    })

    return NextResponse.json({data});
}