import ProductItems from "./components/ProductItems";
import {Items} from './types/Items'
import items from './data/items.json'

const App: React.FC = () => {
  

  return (
    <>
      <ProductItems items={items}/>
    </>
  )
}

export default App
