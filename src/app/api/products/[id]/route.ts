import dbConnect from '@/lib/mongoose'
import { productUpdateSchema } from '@/lib/validations/product'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  const product = await Product.findById(id).lean()

  if (!product) return NextResponse.json({ error: 'Not Found' }, { status: 404 })

  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  const body = await request.json()
  const parsed = productUpdateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const updated = await Product.findByIdAndUpdate(id, parsed.data, {
    new: true,
    runValidators: true,
  }).lean()

  return NextResponse.json(updated)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params

  const deleted = await Product.findByIdAndDelete(id).lean()

  if (!deleted) return NextResponse.json({ error: 'Not found' })

  return NextResponse.json(deleted)
}
