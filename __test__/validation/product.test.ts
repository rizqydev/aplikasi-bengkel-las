// @ts-nocheck
import { productSchema } from '@/lib/validations/product'

describe('Product validation', () => {
  it('accepts valid input', () => {
    const result = productSchema.safeParse({
      name: 'Test',
      brand: 'BrandX',
      qty: 5,
      information: 'info',
    })

    expect(result.success).toBe(true)
  })
})
