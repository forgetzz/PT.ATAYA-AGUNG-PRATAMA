"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(data);
      } catch (err) {
        setError("Gagal memuat produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 py-6 md:px-8">
      <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        Produk Saya
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardContent className="p-0">
                <Skeleton className="w-full h-40 rounded-t-2xl" />
              </CardContent>
              <CardHeader>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-gray-500 text-center">Belum ada produk.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm mx-auto"
            >
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-40 rounded-t-2xl"
                />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {product.name}
                </CardTitle>
                <p className="text-red-500 font-bold text-sm">
                  Rp {product.price.toLocaleString()}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
