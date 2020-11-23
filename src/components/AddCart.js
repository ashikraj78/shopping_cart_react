import React from "react";
export default function AddCart({ product, setShowCartPage, setCart }) {
  return (
    <button
      onClick={() => {
        setShowCartPage(true);
        setCart((prevState) => {
          let index = prevState.findIndex((p) => p.id === product.id);
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
  );
}
