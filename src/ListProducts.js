import React, { useState, useEffect } from "react";
import "./App.css";
import Cart from "./Cart.js";

export default function ListProducts({ filterProducts, setFilterProducts }) {
  let fp = [...filterProducts];
  const [showCartPage, setShowCartPage] = useState(false);
  const [value, setValue] = useState("selected");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartItems"))
  );
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);
  function handleChange(event) {
    setValue(event.target.value);
    if (event.target.value === "ascending") {
      fp.sort(function (a, b) {
        return a.price - b.price;
      });
      setFilterProducts(fp);
    }
    if (event.target.value === "decending") {
      fp.sort(function (a, b) {
        return b.price - a.price;
      });
      setFilterProducts(fp);
    }
  }
  return (
    <div>
      {!showCartPage ? (
        <button
          onClick={() => {
            setShowCartPage(true);
          }}
          className="cart"
        >
          <img src="/static/bag-icon.png" alt="cart" />
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
            <option value="selected" selected>
              Select
            </option>
          </select>
        </form>
      </div>
      <div className="products">
        {filterProducts &&
          filterProducts.map((product) => {
            return (
              <div className="productcard">
                <img src={`/static/products/${product.sku}_1.jpg`} alt="" />
                <p>{product.title}</p>
                <p>${product.price}</p>
                <button
                  onClick={() => {
                    setShowCartPage(true);
                    setCart((prevState) => {
                      let index = prevState.findIndex(
                        (p) => p.id === product.id
                      );
                      let final = prevState;
                      if (index !== -1) {
                        final = prevState.map((prod, i) => {
                          if (i === index) {
                            return {
                              ...prod,
                              quantity: prod.quantity + 1,
                            };
                          }
                          return prod;
                        });
                      } else {
                        final = prevState.concat({ ...product, quantity: 1 });
                      }
                      return final;
                    });
                  }}
                  className="addcart"
                >
                  add to cart
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
