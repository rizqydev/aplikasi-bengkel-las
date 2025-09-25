import mongoose, { Document, Model } from 'mongoose'

export interface IProduct {
  name: string
  brand: string
  qty: number
  information?: string
}

export interface IProductDoc extends IProduct, Document {}

const ProductSchema = new mongoose.Schema<IProductDoc>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    qty: { type: Number, required: true, min: 0 },
    information: { type: String },
  },
  { timestamps: true },
)

const Product: Model<IProductDoc> =
  mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema)

export default Product
