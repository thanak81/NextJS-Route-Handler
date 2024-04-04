import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.products.findMany();

  return NextResponse.json(
    data.length <= 0
      ? {
          status: 400,
          message: "Data Not Found",
          time: new Date().toISOString(),
        }
      : {
          status: 200,
          message: `Data is retrieve. Total data : ${data.length}`,
          payload: data,
          time: new Date().toISOString(),
        }
  );
}

export async function POST(request,response){

  const getAllProducts = await prisma.products.findMany();
  const data = await request.json();
  let check = false;

  getAllProducts.forEach((product)=>{
    if(data.product_name === product.product_name){
      console.log(product.product_name)
      console.log(data.product_name)
      console.log("equal")
      check = true;
     return;
    }else{
      console.log(product.product_name)
      console.log(data.product_name)
      console.log("this is wrong hahaa")
    }    
  })
  if(check){
    return NextResponse.json({
      status: 400,
      message: "Product is already exist",
      time: new Date().toISOString()
     })
    }
  
const createdData = await prisma.products.create(
  {
    data:{
      product_name: data.product_name,
      price: parseFloat(data.price),
      categoryId : parseInt(data.categoryId)
    }
  }
)
 return NextResponse.json({
  status: 200,
  payload: createdData,
  message: "Product is successfully created",
  time: new Date().toISOString()
 })
}
