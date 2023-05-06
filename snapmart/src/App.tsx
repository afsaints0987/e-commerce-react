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
  const [cartItems, setCartItems] = useState<Items[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  
  const handleAddToCart = (item: Items) => {
    setCartItems(prevItem => [item, ...prevItem])
  }
  const handleCategoryList = (item?: string) => {
    const ProductsByCategory = items.filter(product => product.category === item) 
    setProductList(ProductsByCategory)
  }
  
  const handleModal = () => {
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      console.log('clear cart')
    },3000)
  }
  
  return (
    <div>
      <Navigation />
      <Row >
        <Col lg={2}>
          <Category categories={items} handleCategory={handleCategoryList}/>
        </Col>
        <Col lg={6}>
          <ProductItems products={productList} handleAddItem={handleAddToCart}/>
        </Col>
        <Col lg={4}>
          <Cart cartItems={cartItems} 
          checkout={handleModal} itemDecrement={() => setCount(count - 1)} itemIncrement={() => setCount(count + 1)} clearCart={() => console.log('clear cart')} value={count}
          quantity={cartItems.length}
          />
        </Col>
      </Row>
      <CheckoutModal show={showModal}/>
    </div>
  );
};

export default App;
