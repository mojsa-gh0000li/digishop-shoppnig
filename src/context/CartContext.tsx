"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalPrice: string;
}

// ایجاد کانتکست برای سبد خرید
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  // مدیریت کش با React Query
  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: () => {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    },
    staleTime: Infinity, // کش همیشه معتبر می‌ماند
  });

  // به‌روزرسانی داده‌ها در localStorage و کش
  const saveCartToLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    queryClient.setQueryData(["cart"], cart);
  };

  // اضافه کردن محصول به سبد خرید
  const addToCart = (item: CartItem) => {
    const updatedCart = cartItems.some((cartItem) => cartItem.id === item.id)
      ? cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...cartItems, { ...item, quantity: 1 }];

    saveCartToLocalStorage(updatedCart);
  };

  // حذف محصول از سبد خرید
  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCartToLocalStorage(updatedCart);
  };

  // به‌روزرسانی تعداد محصول در سبد خرید
  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    saveCartToLocalStorage(updatedCart);
  };

  // محاسبه مبلغ کل
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// هوک سفارشی برای استفاده از کانتکست
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
