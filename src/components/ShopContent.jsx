"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShopContent({ brandId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated Axios call since exact endpoint is unknown without seeing shop-content.component.ts
    // Replace with actual API integration based on the Angular component.
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`YOUR_API_ENDPOINT?brand=${brandId}`);
        // setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [brandId]);

  return (
    <div className="page-width py-12">
      <h2 className="text-3xl font-bold mb-6">Shop Products {brandId ? `- Brand ${brandId}` : ""}</h2>
      
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found or still connecting API...</p>
      )}
    </div>
  );
}
