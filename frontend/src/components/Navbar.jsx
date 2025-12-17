import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0'}}>
        <div className="brand"><Link to="/">Up-Side-Vogue</Link></div>
        <div className="links">
          <Link to="/products">Shop</Link>
          <Link to="/products?category=men">Men</Link>
          <Link to="/products?category=women">Women</Link>
          <Link to="/products?category=new-arrivals">New Arrivals</Link>
        </div>
        <div className="actions">
          {user ? (
            <>
              <Link to="/orders">My Orders</Link>
              {user.role === 'admin' && <Link to="/admin/add-product">Add Product</Link>}
              <a href="#" onClick={(e)=>{e.preventDefault();logout();}}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}