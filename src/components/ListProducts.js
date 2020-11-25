import React, { useState, useEffect, useRef } from "react";
import Cart from "./Cart.js";
import AddCart from "./AddCart";

export default function ListProducts({ filterProducts, setFilterProducts }) {
  const [showCartPage, setShowCartPage] = useState(false);
  const [value, setValue] = useState("selected");
  const [filter, setFilter] = useState("selected");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
  );
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);
  function handleChange(event) {
    setValue(event.target.value);

    setFilter(event.target.value);
    // if (event.target.value === "ascending") {
    //   let ascendingProducts = [...filterProducts].sort(function (a, b) {
    //     return a.price - b.price;
    //   });
    //   setFilterProducts(ascendingProducts);
    // }
    // if (event.target.value === "decending") {
    //   let decendingProducts = [...filterProducts].sort(function (a, b) {
    //     return b.price - a.price;
    //   });
    //   setFilterProducts(decendingProducts);
    // }
  }

  useEffect(() => {
    let sortedProducts;
    if (filter === "decending") {
      sortedProducts = [...filterProducts].sort(function (a, b) {
        return b.price - a.price;
      });
    }
    if (filter === "ascending") {
      sortedProducts = [...filterProducts].sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (filter === "selected") {
      sortedProducts = [...filterProducts];
    }

    setFilterProducts(sortedProducts);
  }, [filter]);
  return (
    <div>
      {!showCartPage ? (
        <button
          onClick={() => {
            setShowCartPage(true);
          }}
          className="cart"
        >
          <img src="static/bag-icon.png" alt="cart" />
          <div className="cartItems">
            {!cart ? (
              <p>0</p>
            ) : (
              <p>
                {cart.reduce(function (accum, cv) {
                  return accum + cv.quantity;
                }, 0)}
              </p>
            )}
          </div>
        </button>
      ) : (
        <Cart
          showCartPage={showCartPage}
          setShowCartPage={setShowCartPage}
          cart={cart}
          setCart={setCart}
        />
      )}

      <div className="priceShorting">
        <h3 className="productLength">
          {filterProducts.length} products has been found
        </h3>
        <form>
          <label>Order By:</label>
          <select value={value} onChange={handleChange}>
            <option value="ascending">Lowest to highest</option>
            <option value="decending">Highest to lowest</option>
            <option value="selected">Select</option>
          </select>
        </form>
      </div>
      <div className="products">
        {filterProducts &&
          filterProducts.map((product) => {
            return (
              <div className="productcard" key={product.sku}>
                <img src={`static/products/${product.sku}_1.jpg`} alt="" />
                <p>{product.title}</p>
                <p>${product.price}</p>
                <AddCart
                  product={product}
                  setShowCartPage={setShowCartPage}
                  cart={cart}
                  setCart={setCart}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
