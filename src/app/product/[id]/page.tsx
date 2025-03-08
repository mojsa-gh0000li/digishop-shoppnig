"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/context/CartContext"; // استفاده از هوک سفارشی برای CartContext
import Image from "next/image";
import { useState } from "react";

export default function ProductPage() {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const { product, isLoading, error } = useProduct(id); // استفاده از هوک useProduct
  const { addToCart } = useCart(); // استفاده از هوک useCart

  if (isLoading)
    return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">خطا در دریافت اطلاعات محصول</p>
    );
  if (!product)
    return <p className="text-center text-gray-600">محصولی یافت نشد</p>;

  const cartItem = {
    id: id ?? "",
    title: product.title,
    price: product.price,
    image: `https://apidigishop.narinsoft.ir/${product.image}`,
    quantity: 1,
  };

  const handleAddToCart = () => {
    console.log("data", cartItem);
    addToCart(cartItem);
    setIsAddedToCart(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <Image
          src={`https://apidigishop.narinsoft.ir/${product.image}`}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg"
        />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-600 mt-2 text-center">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600 mt-4">
          {Number(product.price).toLocaleString()} تومان
        </p>
        <button
          className={`mt-4 px-6 py-2 ${
            isAddedToCart ? "bg-gray-500" : "bg-blue-500"
          } text-white rounded-lg transition`}
          onClick={handleAddToCart}
          disabled={isAddedToCart}
        >
          {isAddedToCart ? "افزوده شد" : "افزودن به سبد خرید"}
        </button>
      </div>
    </div>
  );
}
