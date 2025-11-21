import { notFound } from 'next/navigation';
import { Product, ApiResponse } from '@/types/api'; 
import ProductImage from '@/components/products/ProductImage';
import ProductDetail from '@/components/products/ProductDetail';


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
    <div className='grid grid-cols-1 md:grid-cols-2 gap-15 py-24'>
        <ProductImage product={product}/>
        <ProductDetail product={product} />
     </div>
  )
}

export default ProductDetailPage
