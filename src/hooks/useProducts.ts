import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/api";

export function useProducts() {
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // مدیریت اعتبار داده‌ها
  });

  return {
    products,
    loading: isLoading,
    error: isError ? "خطا در دریافت محصولات" : null,
  };
}
