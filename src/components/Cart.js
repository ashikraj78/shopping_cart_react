import React from "react";
import Quantity from "./Quantity";

export default function Cart({
  showCartPage,
  setShowCartPage,
  cart,
  setCart,
  quantity,
  setQuantity,
}) {
  return (
    <div className="cartPage">
      <span
        onClick={() => {
          setShowCartPage(false);
        }}
      >
        X
      </span>
      <div className="cartHero">
        <img src="/static/bag-icon.png" alt="cart" />
        <p>
          {cart.reduce(function (accum, cv) {
            return accum + cv.quantity;
          }, 0)}
        </p>
        <h3>Cart</h3>
      </div>
      {cart &&
        cart.map((product) => {
          let index = cart.findIndex((x) => {
            return x.id === product.id;
          });
          return (
            <div className="cartCard">
              <img src={`/static/products/${product.sku}_2.jpg`} alt="" />
              <div>
                <div className="closeCartCard">
                  <button
                    onClick={() => {
                      setCart([
                        ...cart.slice(0, index),
                        ...cart.slice(index + 1),
                      ]);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="cartCardDescription">
                  <p>{product.title}</p>
                  <p className="cartProductPrice">${product.price}</p>
                </div>
                <Quantity product={product} setCart={setCart} />
              </div>
            </div>
          );
        })}
      <div className="cartAmount">
        <div className="cartTotal">
          <p>SUBTOTAL</p>
          <h2 className="totalAmount">
            $
            {cart &&
              cart
                .reduce(function (accumulator, currentValue) {
                  return (
                    accumulator + currentValue.price * currentValue.quantity
                  );
                }, 0)
                .toFixed(2)}
          </h2>
        </div>
        <button className="checkout">CHECKOUT</button>
      </div>
    </div>
  );
}
