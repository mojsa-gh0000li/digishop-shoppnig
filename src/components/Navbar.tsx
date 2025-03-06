"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;

  const { cartItems } = cartContext;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">فروشگاه</Link>
      <div className="flex gap-6">
        <Link href="/cart" className="relative flex items-center">
          🛒 سبد خرید
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}