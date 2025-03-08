import axios from "axios";

const BASE_URL = "https://apidigishop.narinsoft.ir/api";

export interface Product {
  _id: string; // آیدی محصول
  title: string; // عنوان محصول
  price: number; // قیمت محصول
  description: string; // توضیحات محصول
  category: string; // دسته‌بندی محصول
  image: string; // تصویر محصول
  date: string; // تاریخ محصول
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// دریافت لیست کامل محصولات
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await apiClient.get("/products");
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("⚠️ خطا در دریافت محصولات:", error.message);
    } else {
      console.error("⚠️ خطای ناشناخته:", error);
    }
    throw error;
  }
};

// دریافت جزئیات یک محصول براساس آیدی
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("⚠️ خطا در دریافت جزئیات محصول:", error.message);
    } else {
      console.error("⚠️ خطای ناشناخته:", error);
    }
    throw error;
  }
};

// دریافت دسته‌بندی‌ها
export const fetchCategories = async (): Promise<{ _id: string; title: string }[]> => {
  try {
    const { data } = await apiClient.get<{ _id: string; title: string }[]>(
      "/categories"
    );
    return data; // برگرداندن آرایه دسته‌بندی‌ها
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("⚠️ خطا در دریافت دسته‌بندی‌ها:", error.message);
    } else {
      console.error("⚠️ خطای ناشناخته:", error);
    }
    return []; // بازگشت آرایه خالی در صورت خطا
  }
};

export const fetchProductsByCategory = async ({
  category = "",
  sort = "date",
  query = "",
}: {
  category?: string;
  sort?: "date" | "price";
  query?: string;
}): Promise<Product[]> => {
  try {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (sort) params.sort = sort;
    if (query) params.query = query;

    const { data } = await apiClient.get("/products", { params });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("⚠️ خطا در دریافت محصولات:", error.message);
    } else {
      console.error("⚠️ خطای ناشناخته:", error);
    }
    throw error;
  }
};
