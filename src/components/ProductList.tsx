import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { fetchProductsByCategory, Product } from "@/lib/api";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sort, setsort] = useState<"date" | "price">("date");
  const [query, setQuery] = useState<string>("");


  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProductsByCategory({
          category,
          sort,
          query,
        });
        setProducts(fetchedProducts);
        setError("");
      } catch (error) {
        setError("Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, sort, query]);


  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };


  const handlesortChange = (selectedsort: "date" | "price") => {
    setsort(selectedsort);
  };


  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  return (
    <div className="flex flex-row max-md:flex-col gap-4 justify-evenly  mx-auto">
  
      <SearchBar
        onCategoryChange={handleCategoryChange}
        onSortChange={handlesortChange}
        onQueryChange={handleQueryChange}
      />

      {loading && <p></p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-4 mx-auto ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
