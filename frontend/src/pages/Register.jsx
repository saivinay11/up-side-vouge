import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try{ await register(name, email, password); navigate('/'); }
    catch(e){ setError('Failed to register'); }
  };

  return (
    <div className="form">
      <h1 style={{fontFamily:'Playfair Display, serif'}}>Register</h1>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input className="input" value={name} onChange={(e)=> setName(e.target.value)} />
        <label>Email</label>
        <input className="input" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <div className="actions"><Button variant="gold" type="submit">Create Account</Button></div>
        {error && <p style={{color:'crimson'}}>{error}</p>}
      </form>
    </div>
  );
}