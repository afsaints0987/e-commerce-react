import {useState} from 'react'
import Navigation from "./components/Navigation/Navigation";
import ProductItems from "./components/Products/ProductItems";
import items from "./data/items.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Category from "./components/Sidebar/Category";
import Cart from "./components/Cart/Cart";
import { Items } from './types/Items';


const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Items[]>([])
  const [count, setCount] = useState<number>(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }
  const handleDecrement = () => {
    setCount(count - 1)
    if(count === -1){
      return
    }
  }

  const handleAddToCart = (item: Items) => {
    setCartItems(prevItem => [item, ...prevItem])
    console.log(cartItems)
  }

  return (
    <div>
      <Navigation />
      <Row >
        <Col >
          <Category/>
        </Col>
        <Col lg={7}>
          <ProductItems products={items} handleAddItem={handleAddToCart}/>
        </Col>
        <Col>
          <Cart cartItems={cartItems} checkout={()=> console.log('hello')} itemDecrement={() => handleDecrement} itemIncrement={() => {handleIncrement}} clearCart={() => console.log('clear cart')} value={count}/>
        </Col>
      </Row>
    </div>
  );
};

export default App;
