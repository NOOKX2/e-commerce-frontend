import { Product } from "@/types/product"
import ProductAction from "./ProductAction"

type ProductDetailProps = {
  product: Product
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className='flex flex-col h-full gap-8'>
      <h1 className='text-5xl font-bold tracking-tight'>{product.name}</h1>

      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {product.category?.name || "General"}
      </span>

      <div className='mt-4 text-base text-muted-foreground prose'>
        <p>{product.description}</p>
      </div>

      <div className='mt-4'>
        <p className='text-4xl font-bold text-primary'>
          {`฿${product.price.toLocaleString()}`}
        </p>
        <ProductAction product={product} />
      </div>


    </div>
  )
}

export default ProductDetail
