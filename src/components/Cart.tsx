"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // استفاده از هوک سفارشی

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {cartItems.length > 0 ? (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-gray-600">{Number(item.price).toLocaleString()} تومان</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">سبد خرید شما خالی است.</p>
      )}
    </div>
  );
};

export default CartPage;
