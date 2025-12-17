import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import AdminAddProduct from './pages/AdminAddProduct';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/admin/add-product" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}