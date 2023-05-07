import {useState, useEffect} from 'react'
import Navigation from "./components/Navigation/Navigation";
import ProductItems from "./components/Products/ProductItems";
import items from "./data/items.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Category from "./components/Sidebar/Category";
import Cart from "./components/Cart/Cart";
import Modal from 'react-bootstrap/Modal'
import { Items } from './types/Items';


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
        <h3 className='text-center'>Thank you for purchasing!</h3>
      </Modal.Body>
    </Modal>
  );
}


const App: React.FC = () => {
  const [productList, setProductList] = useState<Items[]>(items)
  const [cartItems, setCartItems] = useState<Items[]>(items)
  const [showModal, setShowModal] = useState<boolean>(false)
  
 const handleAddToCart = (item: Items, quantity: number) => {
   const cartItemIndex = cartItems.findIndex(
     (cartItem) => cartItem.id === item.id
   );

   if (cartItemIndex === -1) {
     const cartItem = {
       ...item,
       quantity: quantity,
       totalPrice: item.unitPrice * quantity,
     };
     setCartItems((prevItems) => {
       const updatedCartItems = [cartItem, ...prevItems];
       localStorage.setItem("cart-items", JSON.stringify(updatedCartItems));
       return updatedCartItems;
     });
   }
 };

  const handleCategoryList = (item?: string) => {
    const ProductsByCategory = items.filter(product => product.category === item) 
    setProductList(ProductsByCategory)
  }
  
  const handleModal = () => {
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      clearCart()
    },3000)
  }

  const handleIncrement = () => {
    console.log('this is increment')
  };

  const handleDecrement = () => {
    console.log('this is decrement')
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart-items')
  }

  const cartItemPrice = cartItems.map(cart => {
    return Number(cart.unitPrice);
  }) 

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]')
    setCartItems(cartItems)
  },[])

  
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
            itemDecrement={handleIncrement}
            itemIncrement={handleDecrement}
            clearCart={() => clearCart()}
            quantity={cartItems.length}
            priceItem={cartItemPrice.reduce(
              (total, price) => total + price,
              0
            )}
          />
        </Col>
      </Row>
      <CheckoutModal show={showModal} />
    </div>
  );
};

export default App;
