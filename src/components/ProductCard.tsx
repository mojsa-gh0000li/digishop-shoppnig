import Link from "next/link";
import { Product } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="max-w-52 border flex flex-col items-center rounded-lg p-3">
      <img
        src={`https://apidigishop.narinsoft.ir/${product.image}`}
        alt={product.title}
        className="w-40 h-fit object-cover rounded-lg overflow-hidden"
      />
      
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-gray-700">
        {Number(product.price).toLocaleString()} تومان
      </p>
      <Link href={`/product/${product._id}`} className="text-blue-500">
        مشاهده جزئیات
      </Link>
    </div>
  );
}
