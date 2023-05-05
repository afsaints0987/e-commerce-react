import React from 'react'
import {Items} from '../types/Items'

interface Props {
    items: Items
}

const ProductItems: React.FC<Props> = ({items}) => {
  return (
    <div>
        {items.map((item) => (
            <div key={item.id}>
                <img src={item.imageUrl} alt={item.productName} width="50px"/>
            </div>
        ))}
    </div>
  )
}

export default ProductItems