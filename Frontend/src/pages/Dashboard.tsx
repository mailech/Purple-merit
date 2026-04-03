import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Layout, Copy, Eye, LogOut, MoreVertical, 
  Trash2, Edit3, PieChart, Settings, Grid, Home
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{"email":"User"}');
  const [activeTab, setActiveTab] = useState('pages');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [pages, setPages] = useState([
    { id: '1', title: 'Summer Vibes 2026', status: 'published', slug: 'summer-vibes', views: 423, theme: 'Neo Brutal' },
    { id: '2', title: 'Portfolio Draft', status: 'draft', slug: 'portfolio', views: 0, theme: 'Minimal' }
  ]);

  const handleCreate = () => {
    const id = Date.now().toString();
    navigate(`/app/edit/${id}`);
  };

  const handleDuplicate = (page: any) => {
    const newPage = { ...page, id: Date.now().toString(), title: `${page.title} (Copy)`, status: 'draft', views: 0 };
    setPages([...pages, newPage]);
    setOpenDropdown(null);
  };

  const handleDelete = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const Sidebar = () => (
    <aside className="sidebar">
      <div style={{ 
        padding: '2rem 1rem', 
        borderBottom: 'var(--border-width) solid var(--text)',
        marginBottom: '2rem'
      }}>
        <Link to="/app" style={{ 
          fontWeight: 900, fontSize: '1.5rem', textDecoration: 'none', 
          color: 'var(--text)', display: 'block', lineHeight: 1
        }}>
          VIBEKIT<br/>STUDIO
        </Link>
      </div>
      
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0 1rem' }}>
        <Link 
          to="/"
          className="sidebar-link"
        >
          <Home size={20} /> HOME PAGE
        </Link>
        <button 
          onClick={() => setActiveTab('pages')}
          className={`sidebar-link ${activeTab === 'pages' ? 'active' : ''}`}
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <Grid size={20} /> MY PAGES
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          className={`sidebar-link ${activeTab === 'templates' ? 'active' : ''}`}
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <Layout size={20} /> TEMPLATES
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <PieChart size={20} /> ANALYTICS
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`sidebar-link ${activeTab === 'profile' ? 'active' : ''}`}
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <Edit3 size={20} /> PROFILE
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
          style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <Settings size={20} /> SETTINGS
        </button>
      </nav>

      <div style={{ marginTop: 'auto', borderTop: 'var(--border-width) solid var(--text)', paddingTop: '1.5rem' }}>
        <button 
          onClick={() => setActiveTab('profile')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', 
            marginBottom: '1rem', background: 'none', border: '2px solid transparent', 
            cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.2s'
          }}
          className={`user-badge-hover ${activeTab === 'profile' ? 'active-badge' : ''}`}
        >
          <div style={{ 
            width: '40px', height: '40px', minWidth: '40px', background: 'var(--accent)', border: '2px solid var(--text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900
          }}>
            {user.email[0].toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontWeight: 800, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'inherit' }}>
              {user.email}
            </p>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.6, color: 'inherit' }}>PRO PLAN</p>
          </div>
        </button>
        <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', cursor: 'pointer', color: '#ff4444', textAlign: 'left' }}>
          <LogOut size={20} /> LOGOUT
        </button>
      </div>
    </aside>
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{activeTab.replace('-', ' ')}</h1>
            <p style={{ fontWeight: 600, opacity: 0.6 }}>
              {activeTab === 'pages' && 'Manage your mini-sites and vibes.'}
              {activeTab === 'templates' && 'Start from a high-converting preset.'}
              {activeTab === 'analytics' && 'Global performance and traffic insights.'}
              {activeTab === 'settings' && 'Manage your account and preferences.'}
              {activeTab === 'profile' && 'Your personal identity in the studio.'}
            </p>
          </div>
          {activeTab === 'pages' && (
            <button onClick={handleCreate} className="btn-neo" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              NEW PAGE <Plus style={{ marginLeft: '0.5rem' }} />
            </button>
          )}
        </header>

        {activeTab === 'pages' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {pages.map((page, idx) => (
              <motion.div 
                key={page.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-neo" 
                style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)', position: 'relative' }}>
                
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }} className="dropdown-container">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === page.id ? null : page.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
                    <MoreVertical size={24} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === page.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="dropdown-menu">
                        <button onClick={() => navigate(`/app/edit/${page.id}`)} className="dropdown-item">
                          <Edit3 size={16} /> Edit
                        </button>
                        <button onClick={() => handleDuplicate(page)} className="dropdown-item">
                          <Copy size={16} /> Duplicate
                        </button>
                        <button onClick={() => {}} className="dropdown-item">
                          <Settings size={16} /> Settings
                        </button>
                        <div style={{ borderTop: '2px solid var(--text)', margin: '0.5rem 0' }}></div>
                        <button onClick={() => handleDelete(page.id)} className="dropdown-item" style={{ color: '#ff4444' }}>
                          <Trash2 size={16} /> Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ flex: 1, marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem' }}>
                    <span className={`badge ${page.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                      {page.status}
                    </span>
                    <span className="badge" style={{ background: 'var(--surface)' }}>{page.theme}</span>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{page.title}</h3>
                  <p style={{ fontWeight: 600, opacity: 0.5, fontSize: '0.9rem' }}>/p/{page.slug}</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', borderTop: '4px solid var(--text)', paddingTop: '1.5rem' }}>
                  <Link to={`/app/edit/${page.id}`} className="btn-neo" style={{ flex: 1, fontSize: '0.9rem' }}>
                    <Layout size={18} /> EDIT
                  </Link>
                  {page.status === 'published' && (
                    <Link to={`/p/${page.slug}`} target="_blank" className="btn-neo" style={{ flex: 0.4, background: 'var(--secondary)' }}>
                      <Eye size={18} />
                    </Link>
                  )}
                  <button onClick={() => setActiveTab('analytics')} className="btn-neo" style={{ flex: 0.4, background: 'var(--accent)' }}>
                    <PieChart size={18} />
                  </button>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', border: '1px solid var(--text)' }}></div>
                  <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>{page.views} VIEWS</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                { label: 'TOTAL VIEWS', value: '12,482', change: '+24%', color: 'var(--surface)' },
                { label: 'AVG DURATION', value: '2m 14s', change: '+5%', color: 'var(--secondary)' },
                { label: 'CONVERSION', value: '8.2%', change: '-2%', color: 'var(--accent)' },
                { label: 'ACTIVE USERS', value: '42', change: '+12', color: 'var(--text)', textColor: '#fff' }
              ].map((stat, idx) => (
                <div key={idx} className="card-neo" style={{ background: stat.color, color: stat.textColor || 'var(--text)' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 900, marginBottom: '0.5rem', opacity: 0.8 }}>{stat.label}</p>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.value}</h2>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, padding: '0.2rem 0.5rem', border: '2px solid currentColor' }}>{stat.change}</span>
                </div>
              ))}
            </div>

            {/* Growth Chart */}
            <div className="card-neo">
              <h3 style={{ marginBottom: '2rem' }}>VISITOR GROWTH (7 DAYS)</h3>
              <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '2rem' }}>
                {[45, 78, 52, 91, 63, 120, 85].map((val, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      style={{ 
                        width: '100%', 
                        background: idx === 5 ? 'var(--accent)' : 'var(--surface)', 
                        border: '3px solid var(--text)',
                        boxShadow: '4px 0px 0px 0px var(--text)'
                      }}
                    />
                    <span style={{ fontWeight: 800, fontSize: '0.7rem' }}>DAY {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="card-neo" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', gap: '3rem', marginBottom: '4rem' }}>
              <div style={{ 
                width: '150px', height: '150px', background: 'var(--surface)', 
                border: 'var(--border-width) solid var(--text)', boxShadow: '8px 8px 0 0 var(--text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <h1 style={{ fontSize: '5rem' }}>{user.email[0].toUpperCase()}</h1>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{user.email.split('@')[0]}</h2>
                <div className="badge badge-accent" style={{ marginBottom: '1.5rem' }}>PRO CREATOR</div>
                <p style={{ fontWeight: 600, opacity: 0.6 }}>Bringing vibrant mini-sites to life since 2026. Customizing themes and building the future of vibes.</p>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2.5rem' 
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 800, fontSize: '0.8rem' }}>DISPLAY NAME</label>
                <input className="input-neo" defaultValue={user.email.split('@')[0]} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 800, fontSize: '0.8rem' }}>EMAIL ADDRESS</label>
                <input className="input-neo" defaultValue={user.email} disabled />
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 800, fontSize: '0.8rem' }}>BIO / TAGLINE</label>
                <textarea className="input-neo" style={{ minHeight: '120px', resize: 'vertical' }} defaultValue="Developing the next generation of vibrant web experiences." />
              </div>
            </div>

            <button className="btn-neo" style={{ marginTop: '3rem', background: 'var(--accent)' }}>SAVE PROFILE CHANGES</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '900px' }}>
            {/* Style Customizer */}
            <div className="card-neo">
              <h3 style={{ marginBottom: '2rem' }}>WORKSPACE STYLES</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem' }}>BORDER THICKNESS</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['2px', '4px', '6px'].map(size => (
                      <button 
                        key={size}
                        onClick={() => document.documentElement.style.setProperty('--border-width', size)}
                        className="btn-neo" style={{ flex: 1, padding: '0.5rem' }}>{size}</button>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem' }}>SHADOW INTENSITY</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['4px', '8px', '12px'].map(offset => (
                      <button 
                        key={offset}
                        onClick={() => document.documentElement.style.setProperty('--shadow-offset', offset)}
                        className="btn-neo" style={{ flex: 1, padding: '0.5rem' }}>{offset}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem' }}>ACCENT VIBE</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[
                      { name: 'Pink', color: '#FF00E5' },
                      { name: 'Cyan', color: '#00F0FF' },
                      { name: 'Lime', color: '#00FF00' },
                      { name: 'Orange', color: '#FF9900' }
                    ].map(vibe => (
                      <button 
                        key={vibe.name}
                        onClick={() => document.documentElement.style.setProperty('--accent', vibe.color)}
                        style={{ 
                          width: '40px', height: '40px', backgroundColor: vibe.color, 
                          border: '2px solid var(--text)', cursor: 'pointer' 
                        }}
                        title={vibe.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* General Preferences */}
            <div className="card-neo">
              <h3 style={{ marginBottom: '2rem' }}>APP PREFERENCES</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '2px dashed var(--text)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>EMAIL NOTIFICATIONS</h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 600 }}>Get weekly reports on your page views.</p>
                  </div>
                  <button className="btn-neo" style={{ background: 'var(--secondary)' }}>ENABLED</button>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '2px dashed var(--text)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>COMPACT DASHBOARD</h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 600 }}>Show more pages at once on the home screen.</p>
                  </div>
                  <button className="btn-neo" style={{ background: 'var(--surface)' }}>DISABLED</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: '#ff4444' }}>DELETE ACCOUNT</h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 600 }}>Permanently remove all your data and pages.</p>
                  </div>
                  <button className="btn-neo" style={{ border: '2px solid #ff4444', background: 'none', color: '#ff4444', boxShadow: '4px 4px 0 0 #ff4444' }}>DELETE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="card-neo" style={{ textAlign: 'center', padding: '5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{activeTab.toUpperCase()} COMING SOON</h2>
            <p style={{ fontWeight: 600, opacity: 0.6 }}>This feature is currently under development. Stay tuned!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
