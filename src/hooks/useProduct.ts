import { useQuery } from "@tanstack/react-query";
import { fetchProductById, Product } from "@/lib/api";

export function useProduct(id: string) {
  const { data: product = null, isLoading, isError, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // فراخوانی تنها زمانی انجام می‌شود که id مقداردهی شده باشد
  });

  return {
    product,
    isLoading,
    error: isError ? "مشکلی در دریافت اطلاعات محصول پیش آمد." : null,
  };
}
