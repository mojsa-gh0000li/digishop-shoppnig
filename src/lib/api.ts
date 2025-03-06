const BASE_URL = "https://apidigishop.narinsoft.ir/api";

export interface Product {
  id: number;
  title: string;
  price: any;
  description: string;
  category: string;
  image: string;
  date:any;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`خطا در دریافت لیست محصولات: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("⚠️ خطا در دریافت محصولات:", error);
    throw error;
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`خطا در دریافت جزئیات محصول: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("⚠️ خطا در دریافت جزئیات محصول:", error);
    throw error;
  }
}

export async function fetchCategories(): Promise<Map<string, string>> {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error(`خطا در دریافت دسته‌بندی‌ها: ${res.status} ${res.statusText}`);

    const data: { _id: string; title: string }[] = await res.json();
    console.log("📦 دسته‌بندی‌های دریافت شده:", data);

    const categoryMap = new Map(data.map((cat) => [cat.title, cat._id]));
    return categoryMap;
  } catch (error) {
    console.error("⚠️ خطا در دریافت دسته‌بندی‌ها:", error);
    return new Map();
  }
}

export async function fetchProductsByCategory({
  category = "",
  sort = "date",
  query = "",
}: {
  category?: string;
  sort?: "date" | "price";
  query?: string;
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);
    if (query) params.append("query", query);

    const url = `${BASE_URL}/products?${params.toString()}`;
    console.log("📡 درخواست به:", url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`خطا در دریافت محصولات: ${res.status} ${res.statusText}`);

    const data = await res.json();
    console.log("📦 داده‌های دریافت شده:", data);
    return data;
  } catch (error) {
    console.error("⚠️ خطا در دریافت محصولات:", error);
    throw error;
  }
}
