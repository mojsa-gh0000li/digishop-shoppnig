import { CartProvider } from "@/context/CartContext";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "دیجی شاپ",
  description: "فروشگاه آنلاین با Next.js 15 و React Query",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-100 text-gray-900">
        <ReactQueryProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
