import React from 'react'
import {Items} from '../types/Items'

interface Props {
    products: Items[]
}

const ProductItems: React.FC<Props> = ({products}) => {
  return (
    <div>
        {products.map((product) => (
            <div key={product.id}>
                <img src={product.imageUrl} alt={product.productName} width="50px"/>
                <h3>{product.productName}</h3>
                <p>{product.category}</p>
                <p>{product.unitPrice}</p>
                <p>{product.description}</p>
            </div>
        ))}
    </div>
  )
}

export default ProductItems