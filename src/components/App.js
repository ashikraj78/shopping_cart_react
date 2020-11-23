import React, { useState } from "react";
import ListProducts from "./ListProducts";
import ProductSize from "./ProductSize";
import { products } from "../products.json";

function App() {
  const [filterProducts, setFilterProducts] = useState(products);

  return (
    <div className="home">
      <ProductSize
        filterProducts={filterProducts}
        setFilterProducts={setFilterProducts}
      />
      <ListProducts
        filterProducts={filterProducts}
        setFilterProducts={setFilterProducts}
      />
    </div>
  );
}

export default App;
