import React from "react";
import { Items } from "../../types/Items";
import './productItem.scss'

interface Props {
  products: Items[];
  handleAddItem: (item: any) => void;
}


const ProductItems: React.FC<Props> = ({ products, handleAddItem }) => {

  return (
    <div className="container __products">
      <input
        className="form-control mt-3"
        type="text"
        id="searchbar"
        placeholder="Search Item..."
      />
      <div className="form-group d-flex justify-content-end flex-row align-items-center">
        <label htmlFor="sort">Sort:</label>
        <select className="form-select-sm m-2" name="sort">
          <option>high to low</option>
          <option>low to high</option>
        </select>
      </div>
      <div className="scrollable">
        {products.map((product) => (
          <div
            key={product.id}
            className="container bg-light d-flex flex-row align-items-center px-4 my-3"
            id="scrollable"
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              width="75"
              height="75"
              className="img-thumbnail"
            />
            <div className="container mx-auto p-5" id="product-text">
              <h3>{product.productName}</h3>
              <p>
                <span className="text-success ml-2">Category:</span> {product.category}
              </p>
              <p>{product.description}</p>
            </div>
            <div id="product-price">
              <p>&#8369;{product.unitPrice}</p>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleAddItem(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductItems;
