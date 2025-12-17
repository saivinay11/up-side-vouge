import React, { useState } from 'react';
import api from '../api/axios';

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
    sizes: '',
  });
  const [status, setStatus] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim(),
        sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await api.post('/products', payload);
      setStatus('Product added successfully.');
      setForm({ name: '', price: '', category: '', description: '', imageUrl: '', sizes: '' });
    } catch (err) {
      setStatus('Failed to add product.');
    }
  };

  return (
    <div className="container" style={{ padding: '30px 0' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Add Product</h1>
      {status && <p style={{ marginTop: 8 }}>{status}</p>}
      <form className="form" onSubmit={onSubmit} style={{ marginTop: 16 }}>
        <input className="input" name="name" value={form.name} onChange={onChange} placeholder="Name" required />
        <input className="input" name="price" value={form.price} onChange={onChange} placeholder="Price" type="number" min="0" step="0.01" required />
        <input className="input" name="category" value={form.category} onChange={onChange} placeholder="Category" required />
        <textarea className="input" name="description" value={form.description} onChange={onChange} placeholder="Description" rows={4} />
        <input className="input" name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="Image URL" />
        <input className="input" name="sizes" value={form.sizes} onChange={onChange} placeholder="Sizes (comma-separated)" />
        <button className="btn gold" type="submit" style={{ marginTop: 12 }}>Create</button>
      </form>
    </div>
  );
}