import React from "react";

export default function Quantity({ product, setCart }) {
  return (
    <div className="quantity">
      <p>Quantity : {product.quantity}</p>
      <div className="quant">
        <button
          onClick={() => {
            setCart((prevState) => {
              let index = prevState.findIndex((p) => p.id === product.id);
              let final = prevState;
              if (index !== -1) {
                final = prevState.map((prod, i) => {
                  if (i === index && prod.quantity >= 2) {
                    return {
                      ...prod,
                      quantity: prod.quantity - 1,
                    };
                  }
                  return prod;
                });
              }
              return final;
            });
          }}
          className="minusQuantity"
        >
          -
        </button>
        <button
          onClick={() => {
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
              }
              return final;
            });
          }}
          className="addQuantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
