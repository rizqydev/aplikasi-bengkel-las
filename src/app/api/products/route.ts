import dbConnect from '@/lib/mongoose'
import { productSchema } from '@/lib/validations/product'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()
  const products = await Product.find().sort({ createdAt: -1 }).lean()

  return NextResponse.json(products)
}

export async function POST(request: Request) {
  await dbConnect()
  const body = await request.json()

  const parsed = productSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const newProduct = new Product(parsed.data)
  await newProduct.save()

  return NextResponse.json(newProduct, { status: 201 })
}
