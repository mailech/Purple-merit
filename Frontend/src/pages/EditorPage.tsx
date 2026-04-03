import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, ChevronDown, Trash, Plus, 
  Image, MessageSquare, 
  Monitor, Tablet, Smartphone, 
  Rocket, ArrowLeft, Globe, ExternalLink, X, Star, User, DollarSign, Info, Mail, Video, Code,
  AlignLeft, AlignCenter, AlignRight, Type
} from 'lucide-react';
import { themes } from '../themes/presets';
import type { ThemePreset } from '../themes/presets';

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(themes[0]);
  const [wallpaper, setWallpaper] = useState<string>('');
  const [sections, setSections] = useState<any[]>([
    { id: '1', type: 'hero', content: { title: 'HELLO VIBEKIT', subtitle: 'A new way to build.', btnText: 'GET STARTED', btnUrl: '#', align: 'left', effect: 'typewriter' } },
    { id: '2', type: 'marquee', content: { text: 'CREATIVE DEVELOPMENT • SYSTEM ONLINE • INITIALIZING • ', speed: '20s', bgColor: 'var(--surface)', textColor: 'var(--text)' } },
    { id: '3', type: 'showcase', content: { title: 'PORTFOLIO DIRECTORY', items: [{ title: 'Branding Project', desc: 'Minimal look for tech corp.', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800' }, { title: 'Web App Design', desc: 'SaaS product interface.', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800' }] } },
    { id: '4', type: 'pricing', content: { title: 'MODELS', plans: [{ name: 'BASIC', price: '$0', features: ['1 Core', '512MB RAM'], btnText: 'INIT Basic' }, { name: 'PRO', price: '$29', features: ['8 Cores', '16GB RAM', 'Neural Net'], btnText: 'INIT Pro' }] } }
  ]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSaved, setIsSaved] = useState(true);
  const [slug, setSlug] = useState('my-vibe-studio');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!isSaved) {
      const timer = setTimeout(() => setIsSaved(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [sections, activeTheme, wallpaper, isSaved]);

  const handleUpdateSection = (sectionId: string, content: any) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, content: { ...s.content, ...content } } : s));
    setIsSaved(false);
  };

  const moveSection = (direction: 'up' | 'down', index: number) => {
    const newSections = [...sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index-1]] = [newSections[index-1], newSections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [newSections[index], newSections[index+1]] = [newSections[index+1], newSections[index]];
    }
    setSections(newSections);
    setIsSaved(false);
  };

  const addSection = (type: string) => {
    const newSection = {
      id: Date.now().toString(),
      type,
      content: type === 'hero' ? { title: 'New Hero', subtitle: 'Edit this.', btnText: 'Action', btnUrl: '#', align: 'center', effect: 'none' }
               : type === 'showcase' ? { title: 'Work', items: [] }
               : type === 'socials' ? { title: 'Find Me', links: [] }
               : type === 'pricing' ? { title: 'Pricing', plans: [{ name: 'Basic', price: '$0', features: ['Feature 1'], btnText: 'Buy' }] }
               : type === 'testimonials' ? { title: 'Reviews', quotes: [{ text: 'Awesome!', author: 'User', role: 'Role' }] }
               : type === 'faq' ? { title: 'Questions?', questions: [{ q: 'Question?', a: 'Answer.' }] }
               : type === 'newsletter' ? { title: 'Join our Newsletter', subtitle: 'Stay updated.', placeholder: 'Email', btnText: 'Subscribe' }
               : type === 'video' ? { title: 'Watch Video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
               : type === 'marquee' ? { text: 'VIBEKIT STUDIO • NEXT GEN DESIGN • ', speed: '15s', bgColor: 'var(--surface)', textColor: 'var(--text)' }
               : { title: 'Contact Us', placeholderName: 'Name', placeholderEmail: 'Email', placeholderMsg: 'Message', align: 'center' }
    };
    setSections([...sections, newSection]);
    setIsSaved(false);
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
    setIsSaved(false);
  };
  
  const generateExportCode = () => {
    return `<!-- VIBEKIT HTML EXPORT -->\n<html>\n<head><style>body { background: ${activeTheme.bg} }</style></head>\n<body><h1>Exported!</h1></body>\n</html>`;
  };

  const previewWidth = { desktop: '100%', tablet: '768px', mobile: '375px' }[previewMode];

  // ------------- THEME RENDERERS -------------
  const renderText = (text: string, effect: string) => {
    if (effect === 'typewriter') {
      return (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'linear' }}
          style={{ borderRight: '4px solid var(--accent)', paddingRight: '4px', animation: 'blink 1s step-end infinite' }}
        >
          {text}
        </motion.span>
      );
    }
    return text;
  };

  // 1. TERMINAL THEME RENDERER
  const renderTerminalSection = (section: any) => {
    return (
      <div style={{ fontFamily: 'var(--font-heading)', padding: '2rem', borderBottom: '1px dashed var(--text)', color: 'var(--text)' }}>
        <div style={{ opacity: 0.5, marginBottom: '1.5rem', fontSize: '0.9rem' }}>root@vibekit:~$ ./run_{section.type}.sh</div>
        
        {section.type === 'hero' && (
          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--accent)' }}>
            <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>&gt; {section.content.title}</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>OUTPUT: {section.content.subtitle}</p>
            <motion.a href={section.content.btnUrl || '#'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block', textDecoration: 'none', background: 'transparent', color: 'var(--text)', border: '1px solid var(--text)', padding: '0.8rem 1.5rem', fontFamily: 'var(--font-heading)', cursor: 'pointer' }}>
               [EXECUTE: {section.content.btnText}]
            </motion.a>
          </div>
        )}

        {section.type === 'marquee' && (
          <div style={{ display: 'flex', width: '200%', animation: `marquee ${section.content.speed} linear infinite`, background: 'var(--text)', color: 'var(--bg)', padding: '0.5rem 0' }}>
            <h2 style={{ fontSize: '2rem', whiteSpace: 'nowrap', paddingRight: '2rem', margin: 0 }}>{section.content.text}</h2>
            <h2 style={{ fontSize: '2rem', whiteSpace: 'nowrap', paddingRight: '2rem', margin: 0 }}>{section.content.text}</h2>
          </div>
        )}

        {section.type === 'showcase' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>--- {section.content.title} ---</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {section.content.items.map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '2rem', border: '1px solid var(--text)', padding: '1rem', flexDirection: previewMode === 'mobile' ? 'column' : 'row' }}>
                  <img src={item.img} style={{ width: previewMode === 'mobile' ? '100%' : '200px', height: '120px', objectFit: 'cover', filter: 'grayscale(100%) contrast(150%) brightness(80%) sepia(100%) hue-rotate(80deg)' }} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>FILE: {item.title}.png</h3>
                    <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>SIZE: 1.4MB | DESC: {item.desc}</p>
                    <div style={{ marginTop: '1rem', color: 'var(--accent)' }}>STATUS: [RENDERED]</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.type === 'pricing' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>--- {section.content.title} ---</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--text)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--text)', background: 'var(--surface)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>TIER</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>COST</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>SPECS</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>CMD</th>
                </tr>
              </thead>
              <tbody>
                {section.content.plans.map((p: any, idx: number) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--text)' }}>
                    <td style={{ padding: '1rem', fontWeight: 900, color: idx === 1 ? 'var(--accent)' : 'var(--text)' }}>{p.name}</td>
                    <td style={{ padding: '1rem' }}>{p.price}</td>
                    <td style={{ padding: '1rem', opacity: 0.8 }}>{p.features.join(' | ')}</td>
                    <td style={{ padding: '1rem' }}><motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block', textDecoration: 'none', background: 'var(--text)', color: 'var(--bg)', border: 'none', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-heading)', cursor: 'pointer' }}>{p.btnText}</motion.a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Render standard fallback for other terminal components if needed, or similar raw text */}
        {(section.type === 'faq' || section.type === 'testimonials' || section.type === 'newsletter' || section.type === 'contact') && (
          <div><h2 style={{ fontSize: '2rem' }}>&gt; BLOCK_{section.type.toUpperCase()}_INITIALIZED</h2><p style={{opacity:0.5}}>Awaiting input stream...</p></div>
        )}
      </div>
    );
  };

  // 2. ANIME CYBER THEME RENDERER
  const renderAnimeSection = (section: any) => {
    return (
      <div style={{ padding: '4rem 2rem', borderBottom: '4px solid var(--text)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,85,0.05) 10px, rgba(255,0,85,0.05) 20px)', pointerEvents: 'none', opacity: 0.5 }}></div>
        
        {section.type === 'hero' && (
          <div style={{ textAlign: section.content.align || 'center', position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: 'clamp(4rem, 15vw, 9rem)', color: 'transparent', WebkitTextStroke: '2px var(--text)', margin: '0 0 1rem 0', textShadow: '4px 4px 0px var(--accent)' }}>
              {section.content.title}
            </h1>
            <h1 style={{ fontSize: '2rem', background: 'var(--text)', color: 'var(--bg)', display: 'inline-block', padding: '0 1rem', transform: 'skew(-10deg)' }}>// {section.content.subtitle}</h1>
            <br/><br/>
            <motion.a href={section.content.btnUrl || '#'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-neo" style={{ display: 'inline-block', textDecoration: 'none', borderRadius: '0', borderWidth: '4px', transform: 'skew(-10deg)', background: 'var(--accent)', color: '#fff', fontSize: '1.5rem', marginTop: '2rem', boxShadow: '8px 8px 0px 0px var(--secondary)' }}>{section.content.btnText}</motion.a>
          </div>
        )}

        {section.type === 'showcase' && (
          <div style={{ position: 'relative', zIndex: 1 }}>
             <h2 style={{ fontSize: '3rem', marginBottom: '3rem', background: 'var(--secondary)', color: '#000', display: 'inline-block', padding: '0.5rem 2rem', transform: 'skew(-10deg)' }}>{section.content.title}</h2>
             <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr' : 'repeat(2, 1fr)', gap: '4rem' }}>
                {section.content.items.map((item: any, idx: number) => (
                  <div key={idx} style={{ background: 'var(--surface)', border: '4px solid var(--text)', padding: '1rem', position: 'relative', transform: idx % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)', boxShadow: '10px 10px 0px 0px var(--accent)' }}>
                     <div style={{ position: 'absolute', top: -20, left: -20, background: 'var(--text)', color: 'var(--bg)', padding: '0.5rem 1rem', fontWeight: 900, fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>0{idx+1}</div>
                     <img src={item.img} style={{ width: '100%', height: '250px', objectFit: 'cover', border: '2px solid var(--text)', filter: 'saturate(200%) contrast(120%)' }} />
                     <h3 style={{ fontSize: '2rem', marginTop: '1rem', color: 'var(--secondary)' }}>{item.title}</h3>
                     <p style={{ fontWeight: 700 }}>{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Fallback for anime components */}
        {(section.type !== 'hero' && section.type !== 'showcase' && section.type !== 'marquee') && (
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}><h2 style={{ fontSize: '4rem', color: 'var(--accent)', textShadow: '4px 4px 0px var(--text)' }}>{section.content.title}</h2><p style={{background: 'var(--surface)', padding: '2rem', border: '4px solid var(--text)', transform: 'skew(-5deg)', marginTop: '2rem'}}>Cyber-override active. Modify block content to inject.</p></div>
        )}

        {section.type === 'marquee' && (
           <div style={{ display: 'flex', width: '200%', animation: `marquee ${section.content.speed} linear infinite`, background: 'var(--secondary)', color: '#000', padding: '1rem 0', transform: 'rotate(-2deg) scale(1.1)', position: 'relative', zIndex: 2, borderTop: '4px solid var(--text)', borderBottom: '4px solid var(--text)' }}>
             <h2 style={{ fontSize: '3rem', whiteSpace: 'nowrap', paddingRight: '2rem', margin: 0 }}>{section.content.text}</h2>
             <h2 style={{ fontSize: '3rem', whiteSpace: 'nowrap', paddingRight: '2rem', margin: 0 }}>{section.content.text}</h2>
           </div>
        )}
      </div>
    );
  };

  // 3. CINEMA NOIR THEME RENDERER
  const renderCinemaSection = (section: any) => {
    return (
      <div style={{ padding: '8rem 2rem', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        {section.type === 'hero' && (
          <div>
            <div style={{ position: 'absolute', top: 0, left: '5%', bottom: 0, width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ position: 'absolute', top: 0, right: '5%', bottom: 0, width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <h5 style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.4em', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '2rem', textTransform: 'uppercase' }}>A VibeKit Studio Production</h5>
            <h1 style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', fontFamily: 'var(--font-heading)', margin: '0 0 2rem 0', letterSpacing: '-0.05em', lineHeight: 1 }}>{section.content.title}</h1>
            <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)', opacity: 0.6, maxWidth: '600px', margin: '0 auto 4rem auto', fontStyle: 'italic' }}>{section.content.subtitle}</p>
            <motion.a href={section.content.btnUrl || '#'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block', textDecoration: 'none', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '1rem 3rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>
              {section.content.btnText}
            </motion.a>
          </div>
        )}

        {section.type === 'showcase' && (
          <div>
            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', margin: '0 0 4rem 0', letterSpacing: '0.1em' }}>{section.content.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', maxWidth: '800px', margin: '0 auto' }}>
              {section.content.items.map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', flexDirection: previewMode === 'mobile' ? 'column' : (idx % 2 === 0 ? 'row' : 'row-reverse'), alignItems: 'center', gap: '4rem' }}>
                  <div style={{ flex: 1 }}>
                     <img src={item.img} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', filter: 'grayscale(80%) contrast(120%)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem' }} />
                  </div>
                  <div style={{ flex: 1, textAlign: previewMode === 'mobile' ? 'center' : (idx % 2 === 0 ? 'left' : 'right') }}>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', margin: '0 0 1rem 0', color: 'var(--accent)' }}>{item.title}</h3>
                    <p style={{ opacity: 0.7, lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.type === 'marquee' && (
           <div style={{ display: 'flex', width: '200%', animation: `marquee ${section.content.speed} linear infinite`, borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', opacity: 0.5 }}>
             <h2 style={{ fontSize: '1.5rem', whiteSpace: 'nowrap', paddingRight: '4rem', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{section.content.text}</h2>
             <h2 style={{ fontSize: '1.5rem', whiteSpace: 'nowrap', paddingRight: '4rem', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{section.content.text}</h2>
           </div>
        )}

        {(section.type !== 'hero' && section.type !== 'showcase' && section.type !== 'marquee') && (
          <div><h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>{section.content.title}</h2><p style={{opacity:0.5, fontStyle:'italic', marginTop:'1rem'}}>[ Scene Missing. Editing required. ]</p></div>
        )}
      </div>
    );
  };

  // 4. DEFAULT (NEO-BRUTAL, GLASS, MODERN) RENDERER
  const renderDefaultSection = (section: any, idx: number) => {
    const glassStyle = activeTheme.glass ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: activeTheme.surface, border: `1px solid rgba(255,255,255,0.2)` } : {};
    
    return (
      <section 
        key={section.id}
        style={{ 
          padding: section.type === 'marquee' ? '1.5rem 0' : '6rem 3rem', 
          borderBottom: `var(--border-width) solid var(--text)`,
          background: section.type === 'marquee' ? section.content.bgColor : 'transparent',
          color: section.type === 'marquee' ? section.content.textColor : 'inherit',
          overflow: 'hidden'
        }}>
        
        {section.type === 'hero' && (
          <div style={{ textAlign: section.content.align || 'center' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', lineHeight: 0.9 }}>
              {renderText(section.content.title, section.content.effect)}
            </h1>
            <p style={{ fontSize: '1.4rem', marginBottom: '3rem', fontWeight: 500 }}>{section.content.subtitle}</p>
            <motion.a href={section.content.btnUrl || '#'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-neo" style={{ display: 'inline-block', textDecoration: 'none', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)' }}>{section.content.btnText}</motion.a>
          </div>
        )}

        {section.type === 'marquee' && (
            <div style={{ display: 'flex', width: '200%', animation: `marquee ${section.content.speed} linear infinite` }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', whiteSpace: 'nowrap', paddingRight: '2rem', fontFamily: 'var(--font-heading)', margin: 0 }}>{section.content.text}</h2>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', whiteSpace: 'nowrap', paddingRight: '2rem', fontFamily: 'var(--font-heading)', margin: 0 }}>{section.content.text}</h2>
            </div>
        )}

        {section.type === 'showcase' && (
          <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textDecoration: 'underline' }}>{section.content.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr' : 'repeat(2, 1fr)', gap: '3rem' }}>
                  {section.content.items.map((item: any, iidx: number) => (
                      <div key={iidx} className="card-neo" style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)', padding: '0', ...glassStyle }}>
                          <img src={item.img} style={{ width: '100%', height: '250px', objectFit: 'cover', borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)' }} />
                          <div style={{ padding: '2rem' }}>
                              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                              <p style={{ fontWeight: 600, opacity: 0.8 }}>{item.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        )}

        {section.type === 'pricing' && (
          <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>{section.content.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {section.content.plans.map((plan: any, pidx: number) => (
                  <div key={pidx} className="card-neo" style={{
                      padding: '2.5rem', background: pidx === 1 ? 'var(--accent)' : 'var(--surface)', color: pidx === 1 ? '#000' : 'var(--text)',
                      borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)', ...glassStyle,
                      ...(pidx === 1 && activeTheme.glass ? { background: 'var(--accent)' } : {})
                  }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{plan.name}</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>{plan.price}</div>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {plan.features.map((feat: string, fidx: number) => ( <li key={fidx} style={{ fontWeight: 600 }}>✓ {feat}</li> ))}
                    </ul>
                    <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-neo" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)' }}>{plan.btnText}</motion.a>
                  </div>
                ))}
              </div>
          </div>
        )}
        
        {/* Render other default sections (Video, Newsletter, FAQ, etc) here */}
        {(section.type !== 'hero' && section.type !== 'showcase' && section.type !== 'pricing' && section.type !== 'marquee') && (
           <div style={{ textAlign: 'center' }}><h2>{section.content.title}</h2><p style={{opacity:0.5}}>Standard block rendered.</p></div>
        )}
      </section>
    );
  };

  // Master Render switch mapping
  const renderMasterSection = (section: any, idx: number) => {
    if (activeTheme.id === 'terminal-pro') return renderTerminalSection(section);
    if (activeTheme.id === 'anime-cyber') return renderAnimeSection(section);
    if (activeTheme.id === 'cinema-noir') return renderCinemaSection(section);
    return renderDefaultSection(section, idx);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#EDEDED' }}>
      <aside style={{ 
        width: '520px', background: '#F8F8F8', borderRight: '8px solid #000', 
        display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '2rem',
        boxShadow: 'inset -10px 0 30px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <button onClick={() => navigate('/app')} className="btn-neo" style={{ padding: '0.4rem 0.8rem', background: '#fff', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> BACK
          </button>
          <div style={{ fontWeight: 900, color: isSaved ? '#00A86B' : '#E63946', fontSize: '0.9rem' }}>{isSaved ? 'SAVED ✓' : 'SAVING...'}</div>
        </div>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>CHOOSE YOUR STYLE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {themes.map(t => (
            <button 
              key={t.id} 
              onClick={() => { setActiveTheme(t); setIsSaved(false); }}
              className="neo-border"
              style={{ 
                height: '60px', background: t.bg, cursor: 'pointer', 
                borderWidth: activeTheme.id === t.id ? '4px' : '2px', 
                borderColor: activeTheme.id === t.id ? '#FF00E5' : '#000',
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: t.text, fontFamily: t.fontHeading, fontWeight: 'bold'
              }}>
               {t.name}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>WALLPAPER URL</h2>
        <div className="card-neo" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: '#fff', padding: '0.8rem' }}>
          <Image size={18} style={{ opacity: 0.5 }} />
          <input 
            value={wallpaper}
            onChange={(e) => { setWallpaper(e.target.value); setIsSaved(false); }}
            placeholder="Paste image URL here..."
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none' }}
          />
        </div>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>BUILD YOUR PAGE</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {sections.map((section, idx) => (
            <div key={section.id} className="card-neo" style={{ padding: '1rem', background: '#fff', borderRadius: '8px', zIndex: 100 - idx }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '0.75rem' }}>
                   {section.type === 'hero' && <Star size={14} />}
                   {section.type === 'showcase' && <Image size={14} />}
                   {section.type === 'pricing' && <DollarSign size={14} />}
                   {section.type === 'testimonials' && <User size={14} />}
                   {section.type === 'faq' && <Info size={14} />}
                   {section.type === 'socials' && <Globe size={14} />}
                   {section.type === 'newsletter' && <Mail size={14} />}
                   {section.type === 'video' && <Video size={14} />}
                   {section.type === 'marquee' && <Type size={14} />}
                   {section.type === 'contact' && <MessageSquare size={14} />}
                   {section.type.toUpperCase()}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => moveSection('up', idx)} className="btn-neo" style={{ padding: '0.3rem' }}><ChevronUp size={12} /></button>
                  <button onClick={() => moveSection('down', idx)} className="btn-neo" style={{ padding: '0.3rem' }}><ChevronDown size={12} /></button>
                  <button onClick={() => removeSection(section.id)} className="btn-neo" style={{ padding: '0.3rem', background: '#ff4444' }}><Trash size={12} /></button>
                </div>
              </div>
              
              {/* Common Fields */}
              {section.type !== 'marquee' && (
                <input 
                  value={section.content.title} 
                  onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })} 
                  className="input-neo" 
                  style={{ padding: '0.5rem', fontSize: '0.85rem', width: '100%', marginBottom: '0.5rem' }} 
                  placeholder="Section Title" 
                />
              )}

              {/* Advanced Customization (Align, Effects) for Hero */}
              {section.type === 'hero' && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', background: '#eee', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <button onClick={() => handleUpdateSection(section.id, { align: 'left' })} style={{ padding: '0.3rem 0.5rem', background: section.content.align === 'left' ? '#000' : 'transparent', color: section.content.align === 'left' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}><AlignLeft size={14} /></button>
                    <button onClick={() => handleUpdateSection(section.id, { align: 'center' })} style={{ padding: '0.3rem 0.5rem', background: section.content.align === 'center' ? '#000' : 'transparent', color: section.content.align === 'center' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}><AlignCenter size={14} /></button>
                    <button onClick={() => handleUpdateSection(section.id, { align: 'right' })} style={{ padding: '0.3rem 0.5rem', background: section.content.align === 'right' ? '#000' : 'transparent', color: section.content.align === 'right' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}><AlignRight size={14} /></button>
                  </div>
                  <button onClick={() => handleUpdateSection(section.id, { effect: section.content.effect === 'typewriter' ? 'none' : 'typewriter' })} className="btn-neo" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', flex: 1 }}>
                    {section.content.effect === 'typewriter' ? 'DISABLE TYPING' : 'ENABLE TYPING'}
                  </button>
                </div>
              )}

              {/* Marquee Editing */}
              {section.type === 'marquee' && (
                 <textarea 
                   value={section.content.text} 
                   onChange={(e) => handleUpdateSection(section.id, { text: e.target.value })} 
                   className="input-neo" 
                   style={{ padding: '0.5rem', fontSize: '0.85rem', width: '100%', marginBottom: '0.5rem' }} 
                   placeholder="Scrolling Text Content"
                   rows={2}
                 />
              )}
            </div>
          ))}

          <h3 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>ADD NEW BLOCKS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
            {['hero', 'marquee', 'showcase', 'pricing'].map(type => (
              <button key={type} onClick={() => addSection(type)} className="btn-neo" style={{ fontSize: '0.65rem', padding: '0.6rem', paddingLeft: 0, paddingRight: 0, textAlign: 'center' }}>
                <Plus size={12} style={{ margin: '0 auto 0.2rem auto', display: 'block' }} /> 
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <button 
            onClick={() => setShowCodeModal(true)}
            className="btn-neo" 
            style={{ flex: 1, padding: '1.2rem', background: '#fff', color: '#000', fontSize: '1.1rem' }}>
            <Code size={20} />
          </button>
          <button 
            onClick={() => setShowPublishModal(true)}
            className="btn-neo" 
            style={{ flex: 3, padding: '1.2rem', background: '#000', color: '#fff', fontSize: '1.2rem' }}>
             PUBLISH NOW <Rocket style={{ marginLeft: '1rem' }} />
          </button>
        </div>
      </aside>

      {/* Preview Area */}
      <style>
        {`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes blink { 50% { border-color: transparent } }
        `}
      </style>
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div style={{ background: '#000', color: '#fff', padding: '0.8rem 2.5rem', display: 'flex', justifyContent: 'center', gap: '3rem', margin: '0 auto 2rem auto', borderRadius: '50px' }}>
          <button onClick={() => setPreviewMode('desktop')} style={{ background: 'transparent', color: previewMode === 'desktop' ? 'var(--accent)' : '#fff', border: 'none', cursor: 'pointer' }}><Monitor size={20} /></button>
          <button onClick={() => setPreviewMode('tablet')} style={{ background: 'transparent', color: previewMode === 'tablet' ? 'var(--accent)' : '#fff', border: 'none', cursor: 'pointer' }}><Tablet size={20} /></button>
          <button onClick={() => setPreviewMode('mobile')} style={{ background: 'transparent', color: previewMode === 'mobile' ? 'var(--accent)' : '#fff', border: 'none', cursor: 'pointer' }}><Smartphone size={20} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', paddingBottom: '3rem', position: 'relative' }}>
          <motion.div 
            animate={{ width: previewWidth }}
            style={{ 
              background: wallpaper ? `url(${wallpaper}) center/cover fixed` : activeTheme.bg,
              minHeight: '100%', border: '12px solid #000', 
              boxShadow: '30px 30px 0px 0px rgba(0,0,0,0.1)',
              '--bg': wallpaper ? 'transparent' : activeTheme.bg,
              '--surface': activeTheme.surface,
              '--text': activeTheme.text,
              '--accent': activeTheme.accent,
              '--secondary': activeTheme.secondary,
              '--font-heading': activeTheme.fontHeading,
              '--font-body': activeTheme.fontBody,
              '--radius': activeTheme.borderRadius,
              '--border-width': activeTheme.borderWidth,
              '--box-shadow': activeTheme.boxShadow || 'none',
              backgroundColor: wallpaper ? 'transparent' : activeTheme.bg,
              color: activeTheme.text,
              fontFamily: activeTheme.fontBody,
              overflowX: 'hidden'
            } as any}>
            
            <AnimatePresence>
              {sections.map((section, sectionIdx) => (
                 <div key={section.id} id={section.id}>
                    {renderMasterSection(section, sectionIdx)}
                 </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Modals Code Omitted for Brevity in this patch (same as before) */}
      <AnimatePresence>
        {showPublishModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
            }}>
             <motion.div 
               initial={{ scale: 0.5, y: 100 }}
               animate={{ scale: 1, y: 0 }}
               className="card-neo"
               style={{ background: '#FFE600', maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem', border: '8px solid #000' }}>
               <button onClick={() => setShowPublishModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={32} /></button>
               <Rocket size={80} style={{ marginBottom: '2rem' }} />
               <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>LIVE!</h2>
               <div className="neo-border" style={{ background: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                  <code style={{ fontWeight: 900 }}>vibekit.io/p/{slug}</code>
               </div>
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to={`/p/${slug}`} className="btn-neo" style={{ flex: 1, background: '#000', color: '#fff' }}>VIEW SITE <ExternalLink size={18} /></Link>
                  <button className="btn-neo" style={{ flex: 1, background: '#fff' }} onClick={() => setShowPublishModal(false)}>CLOSE</button>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCodeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
            }}>
             <motion.div 
               initial={{ scale: 0.5, y: 100 }}
               animate={{ scale: 1, y: 0 }}
               className="card-neo"
               style={{ background: '#fff', maxWidth: '800px', width: '100%', margin: '0 auto', padding: '3rem', border: '8px solid #000' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <h2 style={{ fontSize: '2rem' }}>EXPORT CODE</h2>
                 <button onClick={() => setShowCodeModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={32} /></button>
               </div>
               <p style={{ fontWeight: 600, opacity: 0.7, marginBottom: '2rem' }}>You can copy this configuration block for use outside the VibeKit ecosystem.</p>
               <textarea 
                  className="input-neo" 
                  readOnly 
                  value={generateExportCode()}
                  style={{ width: '100%', height: '300px', background: '#111', color: '#00FF00', fontFamily: 'monospace', padding: '1.5rem', fontSize: '14px', borderRadius: 'var(--radius)' }} 
               />
               <button className="btn-neo" style={{ width: '100%', marginTop: '2rem', background: 'var(--accent)' }} onClick={() => navigator.clipboard.writeText(generateExportCode())}>COPY TO CLIPBOARD</button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditorPage;
