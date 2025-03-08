import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../lib/api";

interface SearchBarProps {
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: "date" | "price") => void;
  onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onCategoryChange,
  onSortChange,
  onQueryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<"date" | "price">("date");
  const [selectedQuery, setSelectedQuery] = useState<string>("");

  // دریافت دسته‌بندی‌ها با React Query
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // اعتبار داده‌ها برای ۵ دقیقه
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
   
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value as "date" | "price";
    setSelectedSort(sortValue);
    onSortChange(sortValue);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuery(event.target.value);

    onQueryChange(event.target.value);
  };

  return (
    <div className="max-w-52 h-fit p-3 border rounded-lg bg-white shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-3">جستجو</h1>

      {/* فیلد ورودی برای جستجو */}
      <input
        type="text"
        placeholder="نام محصول"
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedQuery}
        onChange={handleQueryChange}
      />

      {/* انتخاب دسته‌بندی */}
      {isLoading ? (
        <p>در حال بارگذاری دسته‌بندی‌ها...</p>
      ) : isError ? (
        <p className="text-red-500">خطا در دریافت دسته‌بندی‌ها</p>
      ) : (
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((category: { _id: string; title: string }) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      )}

      {/* انتخاب مرتب‌سازی */}
      <select
        onChange={handleSortChange}
        value={selectedSort}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="date">جدید ترین</option>
        <option value="price">گران ترین</option>
      </select>

      {/* دکمه جستجو */}
      <button
        className="w-full p-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => {
          onCategoryChange(selectedCategory);
          onSortChange(selectedSort);
          onQueryChange(selectedQuery);
        }}
      >
        جستجو
      </button>
    </div>
  );
};

export default SearchBar;
