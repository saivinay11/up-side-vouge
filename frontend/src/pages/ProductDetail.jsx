import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const fallbackSizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => {
        if (!mounted) return;
        setProduct(res.data);
        const sizes = Array.isArray(res.data?.sizes) && res.data.sizes.length > 0 ? res.data.sizes : fallbackSizes;
        setSize(sizes[0]);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Failed to load product.');
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const placeOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!product) return;
    try {
      const payload = {
        productId: product._id || product.id || id,
        size,
        quantity: Number(quantity),
      };
      await api.post('/orders', payload);
      navigate('/orders');
    } catch (e) {
      setError('Could not place order. Please try again.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '30px 0' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '30px 0' }}>
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '30px 0' }}>
        <p>Product not found.</p>
      </div>
    );
  }

  const sizes = Array.isArray(product?.sizes) && product.sizes.length > 0 ? product.sizes : fallbackSizes;

  return (
    <div className="container" style={{ padding: '30px 0' }}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: 0 }}>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/800x600?text=Product'}
            alt={product.name}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px 8px 0 0' }}
          />
        </div>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h1>
          <p style={{ fontSize: 18, color: 'var(--gold)' }}>${Number(product.price).toFixed(2)}</p>
          <p style={{ marginTop: 12 }}>{product.description || 'No description available.'}</p>

          <div style={{ marginTop: 20 }}>
            <label htmlFor="size"><strong>Size</strong></label>
            <select
              id="size"
              className="input"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{ marginTop: 8 }}
            >
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 16 }}>
            <label htmlFor="qty"><strong>Quantity</strong></label>
            <input
              id="qty"
              type="number"
              min={1}
              className="input"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ marginTop: 8, width: 120 }}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <button className="btn gold" onClick={placeOrder}>Add to Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}