import React from "react";
import "./cart.scss";
import * as FaIcons from "react-icons/fa";
import { Items } from "../../types/Items";

interface CartProps {
  clearCart: () => void;
  checkout: () => void;
  itemIncrement: () => void;
  itemDecrement: () => void;
}

interface itemProps {
  cartItems: Items[];
  value?: number;
  quantity?: number;
  
}

const Cart: React.FC<CartProps & itemProps> = ({
  cartItems,
  clearCart,
  checkout,
  itemIncrement,
  itemDecrement,
  value,
  quantity,
  
}) => {
  return (
    <div className="container p-0 bg-light vh-100">
      <div className="d-flex justify-content-between cart-header bg-secondary px-4 py-3">
        <h4>
          <FaIcons.FaShoppingCart size={20} color="#f3f3f3" /> My Cart
        </h4>
        <button onClick={clearCart} className="btn btn-sm btn-danger">
          Clear Cart
        </button>
      </div>
      <div className="cart-body">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="d-flex align-items-center cart-item p-3 border-bottom"
          >
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="img-thumbnail mx-2"
              id="product-image"
              width="55px"
              height="55px"
            />
            <div className="d-flex flex-column m-auto px-1">
              <div className="cart-details">
                <h5>{item.productName}</h5>
              </div>
              <div className="cart-price d-flex justify-content-between mt-2">
                <p>&#8369; {item.unitPrice}</p>
                <div className="input-group input-group-sm w-50 mx-1" id="price-quantity">
                  <span
                    onClick={itemDecrement}
                    className="btn btn-light border border-secondary rounded-start p-1"
                  >
                    -
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-sm text-muted text-center"
                    value={value}
                    onChange={(e) => e.target.value}
                  />
                  <span
                    onClick={itemIncrement}
                    className="btn btn-light border border-secondary rounded-end p-1"
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer bg-secondary px-4 py-4">
        <div className="cart-footer-text">
          <p>Total Items: {quantity}</p>
          <p>Total Amount: </p>
        </div>
        <button className="btn btn-success" onClick={checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
