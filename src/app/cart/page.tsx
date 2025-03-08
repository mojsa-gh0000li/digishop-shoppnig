"use client";

import { useCart } from "@/context/CartContext"; // استفاده از هوک سفارشی CartContext
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart(); // استفاده از useCart

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="text-lg">سبد خرید شما خالی است.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => router.push("/")}
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-start">سبد خرید</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg flex flex-col items-center shadow-md hover:shadow-lg transition"
          >
            <Image
              src={item.image.startsWith("http") ? item.image : `https://apidigishop.narinsoft.ir${item.image}`}
              alt={item.title}
              width={150}
              height={150}
              className="rounded-lg object-cover w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]"
            />
            <h2 className="text-lg font-semibold mt-2 text-center">{item.title}</h2>
            <p className="text-gray-600 text-center">
              قیمت: {Number(item.price).toLocaleString()} تومان
            </p>

            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full text-center"
              onClick={() => removeFromCart(item.id)}
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-xl font-bold text-center sm:text-start mb-4 sm:mb-0">
          مبلغ کل: {totalPrice} تومان
        </h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto">
          پرداخت
        </button>
      </div>
    </div>
  );
}
