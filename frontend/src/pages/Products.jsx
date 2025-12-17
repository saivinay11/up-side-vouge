import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import Card from '../components/Card';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';

  useEffect(()=>{
    const q = category ? `?category=${encodeURIComponent(category)}` : '';
    api.get(`/products${q}`).then(res=> setProducts(res.data));
  },[category]);

  return (
    <div className="container" style={{padding:'30px 0'}}>
      <div className="filters">
        <button className="btn" onClick={()=> setParams({})}>All</button>
        <button className="btn" onClick={()=> setParams({ category:'men'})}>Men</button>
        <button className="btn" onClick={()=> setParams({ category:'women'})}>Women</button>
        <button className="btn" onClick={()=> setParams({ category:'new-arrivals'})}>New Arrivals</button>
      </div>
      <div className="grid">
        {products.map(p=> <Card key={p._id} product={p} />)}
      </div>
    </div>
  );
}