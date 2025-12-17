import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Orders(){
  const [orders, setOrders] = useState([]);

  useEffect(()=>{ api.get('/orders').then(res=> setOrders(res.data)); },[]);

  return (
    <div className="container" style={{padding:'30px 0'}}>
      <h1 style={{fontFamily:'Playfair Display, serif'}}>Your Orders</h1>
      {orders.length===0 ? <p>No orders yet.</p> : (
        <div className="grid">
          {orders.map(o=> (
            <div key={o.id} className="card">
              <div className="info">
                <strong>Order #{o.id}</strong>
                <p>Product: {o.product_id}</p>
                <p>Size: {o.size}</p>
                <p>Qty: {o.quantity}</p>
                <p>Total: ${Number(o.total_amount).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}