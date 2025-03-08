import React, { useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory, Product } from "@/lib/api";

const ProductList: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<"date" | "price">("date");
  const [query, setQuery] = useState<string>("");

  // استفاده از React Query برای دریافت محصولات
  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products", category, sort, query],
    queryFn: () =>
      fetchProductsByCategory({
        category,
        sort,
        query,
      }),
    staleTime: 5 * 60 * 1000, // اعتبار کش برای ۵ دقیقه
  });

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleSortChange = (selectedSort: "date" | "price") => {
    setSort(selectedSort);
  };

  const handleQueryChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div className="flex flex-row max-md:flex-col gap-4 justify-evenly mx-auto">
      {/* نوار جستجو */}
      <SearchBar
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onQueryChange={handleQueryChange}
      />

      {/* وضعیت بارگذاری */}
      {isLoading && <p>در حال بارگذاری...</p>}

      {/* مدیریت خطا */}
      {isError && (
        <p className="text-red-500">
          خطا در دریافت محصولات. لطفاً بعداً دوباره تلاش کنید.
        </p>
      )}

      {/* لیست محصولات */}
      <div className="flex flex-wrap gap-4 mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          !isLoading &&
          !isError && (
            <p className="text-gray-600">
              محصولی برای دسته‌بندی یا جستجوی شما پیدا نشد.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
