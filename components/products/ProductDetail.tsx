import { Product } from "@/types/product"
import ProductAction from "./ProductAction"

type ProductDetailProps = {
    product: Product
}

function ProductDetail({product}: ProductDetailProps) {
  return (
     <div className='flex flex-col h-full gap-8'>
          <h1 className='text-5xl font-bold tracking-tight'>{product.name}</h1>

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
