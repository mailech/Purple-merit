import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill out all fields.');
      return;
    }
    // Simulate auth
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/app');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--accent)' }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="card-neo" 
        style={{ width: '100%', maxWidth: '450px', background: 'var(--bg)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--text)', opacity: 0.5 }}><ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} /></Link><br/>
          <UserPlus size={48} style={{ marginBottom: '1rem', color: 'var(--surface)' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>JOIN THE STUDIO</h1>
          <p style={{ fontWeight: 600, opacity: 0.7 }}>Define your vibe with a free account.</p>
        </div>

        {error && <div style={{ background: '#ff4444', color: '#fff', padding: '1rem', marginBottom: '1rem', fontWeight: 700, textAlign: 'center' }}>{error}</div>}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 800, fontSize: '0.9rem' }}>FULL NAME</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-neo" 
              placeholder="Jane Vibe" 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 800, fontSize: '0.9rem' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-neo" 
              placeholder="vibe@studio.com" 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 800, fontSize: '0.9rem' }}>PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-neo" 
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="btn-neo" style={{ marginTop: '1rem', width: '100%', padding: '1.2rem' }}>
            CREATE ACCOUNT <ArrowRight style={{ marginLeft: '1rem' }} />
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontWeight: 600 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>LOG IN</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
