import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoveRight, Palette, Layers, Rocket, Star, Heart } from 'lucide-react';

const LandingPage = () => {
  const user = localStorage.getItem('user');

  return (
    <div className="landing-page">
      {/* Header */}
      <nav className="container neo-border neo-shadow" style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        marginTop: '1.5rem', padding: '1rem 2rem', background: 'var(--bg)',
        position: 'sticky', top: '1.5rem', zIndex: 100
      }}>
        <Link to="/" style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-1px', color: 'var(--text)', textDecoration: 'none' }}>VIBEKIT STUDIO</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {user ? (
            <Link to="/app" className="btn-neo" style={{ background: 'var(--accent)' }}>DASHBOARD</Link>
          ) : (
            <>
              <Link to="/login" style={{ fontWeight: 700, color: 'var(--text)', textDecoration: 'none' }}>LOGIN</Link>
              <Link to="/signup" className="btn-neo">GET STARTED</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container" style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '6rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
          Build your <span style={{ backgroundColor: 'var(--surface)', padding: '0 0.5rem' }}>VIBE</span> in seconds.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto 3rem auto', fontWeight: 500 }}>
          The fastest way to generate a stunning mini-site. Select a theme, add your content, and publish instantly.
        </motion.p>
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, type: "spring" }}>
          <Link to={user ? "/app" : "/signup"} className="btn-neo" style={{ fontSize: '1.5rem', padding: '1.5rem 3rem' }}>
            {user ? "GO TO STUDIO" : "CREATE YOUR FIRST PAGE"} <MoveRight style={{ marginLeft: '1rem' }} />
          </Link>
        </motion.div>
      </header>

      {/* Showcase Section */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>STUNNING PRESETS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { id: 1, name: 'NEO-BRUTAL', color: '#FFE600', icon: <Palette /> },
            { id: 2, name: 'DARK NEON', color: '#00FF00', icon: <Layers /> },
            { id: 3, name: 'PASTEL SOFT', color: '#FFD1DC', icon: <Heart /> }
          ].map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="card-neo" 
              style={{ backgroundColor: item.color }}>
              <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.name}</h3>
              <p style={{ fontWeight: 600, opacity: 0.8 }}>Perfect for modern creatives who want to stand out from the noise.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Features */}
      <section style={{ backgroundColor: 'var(--text)', color: 'var(--bg)', padding: '6rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', textAlign: 'center' }}>
          {[
            { title: 'LIGHTNING FAST', desc: 'Pages load in < 1s', icon: <Rocket /> },
            { title: 'FULLY RESPONSIVE', desc: 'Mobile, Tablet, Desktop', icon: <Star /> },
            { title: 'FREE FOREVER', desc: 'Simple pricing, big vibe', icon: <Heart /> }
          ].map((feature, idx) => (
            <div key={idx}>
              <div style={{ margin: '0 auto 1.5rem auto', color: 'var(--surface)' }}>{feature.icon}</div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.title}</h4>
              <p style={{ opacity: 0.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="container" style={{ marginTop: '8rem', marginBottom: '4rem', textAlign: 'center' }}>
        <div className="card-neo" style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>READY TO <span style={{ textDecoration: 'underline' }}>SHIP</span>?</h2>
          <Link to={user ? "/app" : "/signup"} className="btn-neo" style={{ background: '#fff' }}>
            {user ? "ACCESS STUDIO" : "JOIN THE STUDIO NOW"}
          </Link>
        </div>
        <p style={{ marginTop: '4rem', fontWeight: 700 }}>© 2026 VIBEKIT STUDIO × PURPLE MERIT</p>
      </footer>
    </div>
  );
};

export default LandingPage;
