import React, { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState<Map<string, string>>(new Map());

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<"date" | "price">("date");
  const [selectedQuery, setSelectedQuery] = useState<string>("");

  useEffect(() => {
    fetchCategories()
      .then((categoryMap) => setCategories(categoryMap))
      .catch((error) => console.error("⚠️ Error fetching categories:", error));
  }, []);


  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value as "date" | "price");
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedQuery(event.target.value);
  };

  const handleSearch = () => {
    onCategoryChange(selectedCategory);
    onSortChange(selectedSort);
    onQueryChange(selectedQuery);
  };

  return (
    <div className="max-w-52 h-fit p-3 border rounded-lg bg-white shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-3">جستجو</h1>

      <input
        type="text"
        placeholder="نام محصول"
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedQuery}
        onChange={handleQueryChange}
      />

      <select
        onChange={handleCategoryChange}
        value={selectedCategory}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">دسته بندی</option>
        {Array.from(categories.entries()).map(([title, id]) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>

      <select
        onChange={handleSortChange}
        value={selectedSort}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="date">جدید ترین</option>
        <option value="price">گران ترین</option>
      </select>

      <button
        className="w-full p-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSearch} 
      >
        جستجو
      </button>
    </div>
  );
};

export default SearchBar;
