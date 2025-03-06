import { useState, useEffect } from "react";
import { fetchProductById } from "@/lib/api";
import { Product } from "@/lib/api"; 
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("مشکلی در دریافت اطلاعات محصول پیش آمد.");
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  return { product, isLoading, error };
}

