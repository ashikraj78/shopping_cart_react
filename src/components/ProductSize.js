import React, { useState } from "react";
import { products } from "../products.json";

export default function ProductSize({ filterProducts, setFilterProducts }) {
  let [sizes, setSizes] = useState(
    [
      ...new Set(products.map((product) => product.availableSizes).flat()),
    ].map((size) => ({ label: size, checked: false }))
  );
  function handleClick(clickedSize) {
    let updatedSizes = sizes.map((updatedSize) => {
      if (updatedSize.label === clickedSize) {
        return { ...updatedSize, checked: !updatedSize.checked };
      }
      return updatedSize;
    });
    let selectedSizes = updatedSizes
      .filter((singleSize) => singleSize.checked)
      .map((singleUpdateSize) => singleUpdateSize.label);

    setSizes(updatedSizes);

    let final = [];
    for (let size of selectedSizes) {
      final = final.concat(
        products.filter((prod) => prod.availableSizes.includes(size))
      );
    }
    // console.log(selectedSizes);

    let uniqueSelected = [];
    for (let productItem of final) {
      if (!uniqueSelected.find((p) => p.id === productItem.id)) {
        uniqueSelected = uniqueSelected.concat(productItem);
      }
    }

    setFilterProducts(uniqueSelected);

    if (selectedSizes.length < 1) {
      setFilterProducts(products);
    }
  }
  return (
    <div className="sizeComponent">
      {sizes.map((s) => (
        <li>
          <button
            onClick={() => handleClick(s.label)}
            className={`size ${s.checked ? "activeClass" : ""}`}
          >
            {s.label}
          </button>
        </li>
      ))}
    </div>
  );
}
