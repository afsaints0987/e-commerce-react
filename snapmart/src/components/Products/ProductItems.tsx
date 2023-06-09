import React, {useState} from "react";
import { Items } from "../../types/Items";
import './productItem.scss'

interface Props {
  products: Items[];
  handleAddItem: (item: Items, quantity: number) => void;
}


const ProductItems: React.FC<Props> = ({ products, handleAddItem }) => {
  const [searchQuery, setSearchQuery ] = useState<string>("")
  const [sortOrder, setSortOrder] = useState("highToLow")
  const [sortedProducts, setSortedProducts] = useState<Items[]>([])

  const filteredProducts = products.filter(
    (product) =>
      product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const sortProducts = (order: string) => {
    setSortOrder(order);

    const sorted = products.sort((a: Items, b: Items) => {
      if (order === "highToLow") {
        return b.unitPrice - a.unitPrice;
      } else {
        return a.unitPrice - b.unitPrice;
      }
    });

    setSortedProducts([...sorted]);
  };

  sortedProducts.length > 0 ? sortedProducts : products;

  return (
    <div className="container __products">
      <input
        className="form-control mt-3"
        type="text"
        id="searchbar"
        placeholder="Search Item..."
        onChange={(e)=> setSearchQuery(e.target.value)}
      />
      <div className="form-group d-flex justify-content-end flex-row align-items-center">
        <label htmlFor="sort">Sort:</label>
        <select className="form-select-sm m-2" name="sort" onChange={(e) => sortProducts(e.target.value)} value={sortOrder}>
          <option value="highToLow">high to low</option>
          <option value="lowToHigh">low to high</option>
        </select>
      </div>
      <div className="scrollable">
        {filteredProducts.map((product) => (
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
                onClick={() => handleAddItem(product, 1)}
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
