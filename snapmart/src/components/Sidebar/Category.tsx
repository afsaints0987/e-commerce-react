import React from 'react'
import { Items } from '../../types/Items';
import './category.scss'

interface CategoryProps {
  categories: Items[];
  handleCategory: (item?: string) => void
}


const Category: React.FC<CategoryProps> = ({categories, handleCategory}) => {
  
  const categoryItems = [...new Set(categories.map(product => product.category ))]
  
  return (
    <div className="container p-3 bg-light vh-100">
      <h4>Category</h4>
      {categoryItems.map((category) => (
        <ul key={category} className="list-group my-1">
          <li className="list-item">
            <button
              className="category-link btn btn-transparent text-capitalize border-0"
              onClick={() => handleCategory(category)}
            >
              {category}
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Category