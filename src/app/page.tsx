'use client'
import ProductList from "@/components/ProductList";
import { useProducts } from "../hooks/useProducts";



export default function HomePage() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>در حال بارگذاری محصولات...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main >
      
      <div className="container mx-auto p-4">
        
         <ProductList />
      </div>
      
    </main>
  );
}

