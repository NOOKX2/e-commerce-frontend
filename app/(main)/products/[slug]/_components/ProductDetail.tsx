import { Product } from "@/types/product"
import ProductAction from "./ProductAction"

type ProductDetailProps = {
  product: Product
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className='flex h-full flex-col gap-6'>
      <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>{product.name}</h1>

      <span className="inline-flex w-fit items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
        {product.category?.name || "General"}
      </span>

      <div className='text-sm text-muted-foreground md:text-base'>
        <p>{product.description}</p>
      </div>

      <div className='mt-auto border-t border-black/5 pt-6'>
        <p className='text-3xl font-semibold text-neutral-900 md:text-4xl'>
          {`฿${product.price.toLocaleString()}`}
        </p>
        <ProductAction product={product} />
      </div>


    </div>
  )
}

export default ProductDetail
