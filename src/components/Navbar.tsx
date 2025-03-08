"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext"; // استفاده از هوک سفارشی برای CartContext

export default function Navbar() {
  const { cartItems } = useCart(); // استفاده از هوک سفارشی برای دریافت cartItems

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      {/* لینک صفحه اصلی */}
      <Link href="/" className="text-xl font-bold">
        فروشگاه
      </Link>

      <div className="flex gap-6">
        {/* لینک سبد خرید */}
        <Link href="/cart" className="relative flex items-center">
          🛒 سبد خرید
          {/* نشانگر تعداد آیتم‌ها */}
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
