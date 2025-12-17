import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ product }){
  return (
    <div className="card">
      <Link to={`/products/${product._id}`}>
        <img src={product.imageUrl || 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop'} alt={product.name} />
      </Link>
      <div className="info">
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <strong>{product.name}</strong>
          <span>${product.price.toFixed(2)}</span>
        </div>
        <small style={{opacity:.7}}>{product.category}</small>
      </div>
    </div>
  );
}