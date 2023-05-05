import ProductItems from "./components/ProductItems";
import items from './data/items.json'

const App: React.FC = () => {
  
  return (
    <>
      <ProductItems products={items}/>
    </>
  )
}

export default App
