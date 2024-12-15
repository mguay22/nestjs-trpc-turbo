"use client";

import { trpc } from "../lib/trpc";

export default function Products() {
  const {
    data: products,
    isLoading,
    error,
  } = trpc.products.getAllProducts.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="card shadow-lg compact bg-base-100">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>Price: {product.price}</p>
              {product.details.description && (
                <p>Description: {product.details.description}</p>
              )}
              {product.details.rating && (
                <p>Rating: {product.details.rating}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
