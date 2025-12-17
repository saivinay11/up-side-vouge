import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home(){
  const [featured, setFeatured] = useState([]);

  useEffect(()=>{
    api.get('/products').then(res=>{
      setFeatured(res.data.slice(0,8));
    });
  },[]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Elevate Your Wardrobe</h1>
          <p>Minimalistic silhouettes with a touch of gold. Discover the latest high-fashion pieces.</p>
          <div style={{marginTop:24}}>
            <Link to="/products"><Button className="btn gold">Shop Collection</Button></Link>
          </div>
        </div>
      </section>
      <section className="container" style={{padding:'40px 0'}}>
        <h2 style={{fontFamily:'Playfair Display, serif'}}>Featured</h2>
        <div className="grid" style={{marginTop:20}}>
          {featured.map(p=> <Card key={p._id} product={p} />)}
        </div>
      </section>
    </>
  );
}