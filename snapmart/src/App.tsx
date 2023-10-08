/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import ProductItems from "./components/Products/ProductItems";
import items from "./data/items.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Category from "./components/Sidebar/Category";
import Cart from "./components/Cart/Cart";
import Modal from "react-bootstrap/Modal";
import { Items } from "./types/Items";

const CheckoutModal = (props: any) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="px-4 py-2"
    >
      <Modal.Body>
        <h3 className="text-center">Thank you for purchasing!</h3>
      </Modal.Body>
    </Modal>
  );
};

const App: React.FC = () => {
  const [productList, setProductList] = useState<Items[]>(items);
  const [cartItems, setCartItems] = useState<Items[]>(items);
  const [showModal, setShowModal] = useState<boolean>(false);

  
  const handleAddToCart = (item: Items, quantity: number) => {
    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (cartItemIndex === -1) {
      const cartItem = {
        ...item,
        quantity: quantity,
        totalPrice: item?.unitPrice * quantity,
      };
      setCartItems((prevItems) => {
        const updatedCartItems = [cartItem, ...prevItems];
        localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    } else {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: (cartItem?.quantity || 0) + quantity,
            totalPrice:
              ((cartItem?.quantity || 0) + quantity) * cartItem.unitPrice,
          };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
    }
  };

  const handleCategoryList = (item?: string) => {
    const ProductsByCategory = items.filter(
      (product) => product.category === item
    );
    setProductList(ProductsByCategory);
  };
  const handleDelete = (item: Items) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
  };

  const handleModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      clearCart();
    }, 3000);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart-items");
  };

  
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item?.unitPrice || 0) * (item?.quantity || 0);
  }, 0);


  const totalQuantity = cartItems.reduce((total, item) => {
    return total + Number(item.quantity);
  }, 0);


  const handleIncrement = (item: Items, quantity: number) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const updatedQuantity = (cartItem?.quantity || 0) + quantity;
        const updatedTotalPrice = updatedQuantity * cartItem.unitPrice;
        return {
          ...cartItem,
          quantity: updatedQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (item: Items, quantity: number) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const updatedQuantity = (cartItem?.quantity || 0) - quantity;
        if (updatedQuantity <= 0) {
          return null;
        } else {
          const updatedTotalPrice = updatedQuantity * cartItem.unitPrice;
          return {
            ...cartItem,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };
        }
      }
      return cartItem;
    });

    // Filter out null values before updating the state and cast to Items[]
    const filteredCartItems = updatedCartItems.filter(
      (item) => item !== null
    ) as Items[];

    setCartItems(filteredCartItems);
    localStorage.setItem("cart-items", JSON.stringify(filteredCartItems));
  };



  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items") || "[]");
    setCartItems(cartItems);
  }, []);

  return (
    <div>
      <Navigation />
      <Row>
        <Col lg={2}>
          <Category categories={items} handleCategory={handleCategoryList} />
        </Col>
        <Col lg={6}>
          <ProductItems
            products={productList}
            handleAddItem={handleAddToCart}
          />
        </Col>
        <Col lg={4}>
          <Cart
            cartItems={cartItems}
            checkout={handleModal}
            itemDecrement={handleDecrement}
            itemIncrement={handleIncrement}
            deleteItem={(item) => handleDelete(item)}
            clearCart={() => clearCart()}
            quantity={totalQuantity}
            priceItem={totalPrice}
          />
        </Col>
      </Row>
      <CheckoutModal show={showModal} />
    </div>
  );
};

export default App;
