import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()


export async function GET(){
    const data = await prisma.customers.findMany()
    return NextResponse.json(
      
        data.length < 0 ? {
            status : 400,
            message: "Data Not Found",
            time: new Date().toISOString()
        } : {
            status: 200,
            message: `Data is retrieve. Total data : ${data.length}`,
            payload: data,
            time: new Date().toISOString()
        }
    
    );
}