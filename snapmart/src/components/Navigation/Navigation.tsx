import React from 'react'
import './navigation.scss'

const Navigation: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-success text-light">
        <div id="logo">
          <h4>
            Snap<span className="text-warning">Mart</span> Online Shopping
          </h4>
        </div>
      </nav>
    </header>
  );
}

export default Navigation