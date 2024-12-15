import CreateProduct from "./products/CreateProduct";
import Products from "./products/Products";

export default function Home() {
  return (
    <div>
      <CreateProduct />
      <Products />
    </div>
  );
}
