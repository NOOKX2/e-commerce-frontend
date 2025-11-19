import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Product, ApiResponse } from '@/types/api'; 
import { Package } from 'lucide-react';
import ProductAction from '@/components/client/ProductAction';


async function getProductBySlug(slug: string): Promise<Product | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/products/${slug}`;

  try {
    const res = await fetch(apiUrl, {
      //next: { revalidate: 3600 }, //activate in production
      cache: "no-store"
    });
    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Product with slug '${slug}' not found (404).`);
        return null;
      }

      const errorText = await res.text();
      throw new Error(`Failed to fetch product: ${res.status} ${errorText}`);

    }

    const response: ApiResponse<Product> = await res.json();
    return response.data
  }
  catch (error) {
    console.error(`Error fetching product with slug '${slug}':`, error);
    return null;

  }
}

async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const resolveParams = await params
  const { slug } = resolveParams
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className='mx-auto max-w-4xl py-12 px-4'>
      <div className="flex sm:flex-col md:flex-row gap-8 items-center">
        <div className='w-1/2'>
          <div className='relative aspect-square rounded-lg overflow-hidden bg-mutted'>
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className='object-cover'
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Package className="h-24 w-24" />
              </div>

            )}

          </div>
        </div>
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
      </div>

    </div>
  )
}

export default ProductDetailPage
