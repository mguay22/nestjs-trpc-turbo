"use client";

import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | undefined>();
  const utils = trpc.useUtils();

  const mutation = trpc.products.createProduct.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(
      {
        id: Math.random().toString(36).substring(7),
        name,
        price: price!,
        details: {
          description,
          rating,
        },
      },
      {
        onSuccess: (data) => {
          utils.products.getAllProducts.setData(undefined, (oldProducts) => {
            if (!oldProducts) return [data];
            return [...oldProducts, data];
          });
          setName("");
          setPrice(undefined);
          setDescription("");
          setRating(undefined);
        },
        onError: (error) => {
          console.error(error);
          alert("Failed to create product");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Create Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Price:
              <input
                type="number"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Rating:
              <input
                type="number"
                value={rating || ""}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 mt-1 border rounded"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
