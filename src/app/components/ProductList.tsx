'use client'

import React from 'react'

export default function ProductList({
  products,
  onRefresh,
}: {
  products: any[]
  onRefresh?: () => void
}) {
  async function remove(id: string) {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (!res.ok) return alert('Delete failed')
    onRefresh?.()
  }

  return (
    <div className="space-y-4">
      {products.length === 0 && <div>No products yet.</div>}
      {products.map((p) => (
        <div key={p._id} className="p-3 border rounded">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm">Brand: {p.brand}</div>
              <div className="text-sm">Qty: {p.qty}</div>
              {p.information && <div className="text-xs mt-1">{p.information}</div>}
            </div>
            <div className="flex items-start gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(p._id)}
                className="text-sm underline"
              >
                Copy ID
              </button>
              <button onClick={() => remove(p._id)} className="text-sm text-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
