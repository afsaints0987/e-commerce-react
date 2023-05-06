import React from 'react'

const Category: React.FC = () => {
  return (
    <div className="container p-3 bg-light vh-100">
      <h4>Category</h4>
      <ul className="list-group">
        <li className="list-item">Category 1</li>
        <li className="list-item">Category 2</li>
        <li className="list-item">Category 3</li>
        <li className="list-item">Category 4</li>
      </ul>
    </div>
  );
}

export default Category