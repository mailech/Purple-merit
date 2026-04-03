import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Heart, ArrowRight, Globe } from 'lucide-react';
import { themes } from '../themes/presets';
import type { ThemePreset } from '../themes/presets';

const PublishedPage = () => {
  const { slug: _slug } = useParams();
  
  // Mock Data
  const [pageData, setPageData] = useState<any>(null);
  const [activeTheme] = useState<ThemePreset>(themes[4]); // E.g., Anime Cyber or Terminal
  const [wallpaper] = useState<string>('');
  const [viewCount, setViewCount] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setPageData({
        title: 'VIBEKIT CREATIVE 2026',
        sections: [
          { id: '1', type: 'hero', content: { title: 'BRINGING VIBES TO LIFE', subtitle: 'A showcase of pure creativity.', btnText: 'EXPLORE', btnUrl: '#', align: 'center', effect: 'typewriter' } },
          { id: '1b', type: 'marquee', content: { text: 'CREATIVE DEVELOPMENT • SYSTEM ONLINE • INITIALIZING • ', speed: '20s', bgColor: 'var(--accent)', textColor: '#000' } },
          { id: '2', type: 'showcase', content: { title: 'WORK', items: [
            { title: 'Cyberpunk Branding', desc: 'Futuristic identity.', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800' },
            { title: 'Abstract NFT', desc: 'Digital art collection.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' }
          ] } },
          { id: '3', type: 'pricing', content: { title: 'PRICING PLANS', plans: [{ name: 'BASIC', price: '$0/mo', features: ['1 Page', 'Basic Themes', 'Community Support'], btnText: 'START FREE' }, { name: 'PRO', price: '$29/mo', features: ['Unlimited Pages', 'Glassmorphism', 'Priority Support'], btnText: 'UPGRADE' }] } },
          { id: '4', type: 'testimonials', content: { title: 'WHAT THEY SAY', quotes: [{ text: "The most incredible site builder.", author: "Jane Doe", role: "Designer" }, { text: "Saved me 100s of hours.", author: "John Smith", role: "Developer" }] } },
          { id: '5', type: 'faq', content: { title: 'FAQ', questions: [{ q: 'Do I need to code?', a: 'Nope, absolutely no code is required.' }, { q: 'Can I export?', a: 'Yes, full code export is coming soon!' }] } },
          { id: '6', type: 'socials', content: { title: 'STAY CONNECTED', links: [
            { platform: 'twitter', url: '#' },
            { platform: 'instagram', url: '#' }
          ] } },
          { id: '7', type: 'contact', content: { title: 'SEND A MESSAGE', placeholderName: 'Name', placeholderEmail: 'Email', placeholderMsg: 'Message' } }
        ]
      });
      setViewCount(1284); 
    }, 800);
  }, [_slug]);

  if (!pageData) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '60px', height: '60px', border: '8px solid #FFE600', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  const previewMode = 'desktop' as string;

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
        
        {(section.type === 'faq' || section.type === 'testimonials' || section.type === 'newsletter' || section.type === 'socials' || section.type === 'contact') && (
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
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
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

        {(section.type !== 'hero' && section.type !== 'showcase' && section.type !== 'marquee') && (
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}><h2 style={{ fontSize: '4rem', color: 'var(--accent)', textShadow: '4px 4px 0px var(--text)' }}>{section.content.title}</h2><p style={{background: 'var(--surface)', padding: '2rem', border: '4px solid var(--text)', transform: 'skew(-5deg)', marginTop: '2rem', display: 'inline-block'}}>Cyber-override active. Block locked.</p></div>
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
          <div><h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>{section.content.title}</h2><p style={{opacity:0.5, fontStyle:'italic', marginTop:'1rem'}}>[ Scene Missing ]</p></div>
        )}
      </div>
    );
  };

  // 4. DEFAULT (NEO-BRUTAL, GLASS, MODERN) RENDERER
  const renderDefaultSection = (section: any, _idx: number) => {
    const glassStyle = activeTheme.glass ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: activeTheme.surface, border: `1px solid rgba(255,255,255,0.2)` } : {};
    
    return (
      <section 
        key={section.id}
        style={{ 
          padding: section.type === 'marquee' ? '1.5rem 0' : '8rem 2rem', 
          borderBottom: `var(--border-width) solid var(--text)`,
          background: section.type === 'marquee' ? section.content.bgColor : 'transparent',
          color: section.type === 'marquee' ? section.content.textColor : 'inherit',
          overflow: 'hidden'
        }}>
        
        <div className={section.type === 'marquee' ? '' : 'container'}>
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
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textDecoration: 'underline' }}>{section.content.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                    {section.content.items.map((item: any, iidx: number) => (
                        <div key={iidx} className="card-neo" style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)', padding: '0', ...glassStyle }}>
                            <img src={item.img} style={{ width: '100%', height: '300px', objectFit: 'cover', borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)' }} />
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                                <p style={{ fontWeight: 600, opacity: 0.8 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {section.type === 'pricing' && (
            <div>
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>{section.content.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                  {section.content.plans.map((plan: any, pidx: number) => (
                    <div key={pidx} className="card-neo" style={{
                        padding: '3rem', background: pidx === 1 ? 'var(--accent)' : 'var(--surface)', color: pidx === 1 ? '#000' : 'var(--text)',
                        borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)', ...glassStyle,
                        ...(pidx === 1 && activeTheme.glass ? { background: 'var(--accent)' } : {})
                    }}>
                      <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{plan.name}</h3>
                      <div style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '2rem' }}>{plan.price}</div>
                      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {plan.features.map((feat: string, fidx: number) => ( <li key={fidx} style={{ fontWeight: 600, fontSize: '1.2rem' }}>✓ {feat}</li> ))}
                      </ul>
                      <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-neo" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)' }}>{plan.btnText}</motion.a>
                    </div>
                  ))}
                </div>
            </div>
          )}

          {section.type === 'testimonials' && (
            <div>
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>{section.content.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: previewMode === 'mobile' ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                  {section.content.quotes.map((quote: any, qidx: number) => (
                    <div key={qidx} className="card-neo" style={{
                       padding: '3rem', background: 'var(--surface)', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)', ...glassStyle
                    }}>
                      <div style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem', lineHeight: 0.5 }}>"</div>
                      <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', fontStyle: 'italic' }}>{quote.text}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'var(--text)', borderRadius: '50%', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900 }}>
                          {quote.author.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{quote.author}</div>
                          <div style={{ fontSize: '1rem', opacity: 0.7, fontWeight: 600 }}>{quote.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          )}

          {section.type === 'faq' && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>{section.content.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {section.content.questions.map((faq: any, fidx: number) => (
                    <div key={fidx} className="card-neo" style={{
                       padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'none', ...glassStyle, cursor: 'pointer'
                    }} onClick={() => setExpandedFaq(expandedFaq === fidx ? null : fidx)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '1.3rem' }}>
                        {faq.q}
                        <span style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>{expandedFaq === fidx ? '-' : '+'}</span>
                      </div>
                      <AnimatePresence>
                        {expandedFaq === fidx && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <p style={{ marginTop: '1.5rem', fontWeight: 600, opacity: 0.8, fontSize: '1.1rem' }}>{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
            </div>
          )}

          {section.type === 'socials' && (
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>{section.content.title}</h2>
                <div style={{ display: 'flex', gap: '4rem', justifyContent: 'center' }}>
                    {section.content.links.map((link: any, lidx: number) => (
                      <motion.a whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }} key={lidx} href={link.url} target="_blank" rel="noreferrer" className="btn-neo" style={{ 
                        display: 'inline-block', background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', borderWidth: 'var(--border-width)', boxShadow: 'var(--box-shadow)', color: 'var(--text)', ...glassStyle
                      }}>
                          <Globe size={48} />
                      </motion.a>
                    ))}
                </div>
            </div>
          )}
          
        </div>
      </section>
    );
  };

  // Master Render switch mapping
  const renderMasterSection = (section: any, _idx: number) => {
    if (activeTheme.id === 'terminal-pro') return renderTerminalSection(section);
    if (activeTheme.id === 'anime-cyber') return renderAnimeSection(section);
    if (activeTheme.id === 'cinema-noir') return renderCinemaSection(section);
    return renderDefaultSection(section, _idx);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: wallpaper ? `url(${wallpaper}) center/cover fixed` : activeTheme.bg,
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
      
      <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
        background: activeTheme.glass ? 'rgba(0,0,0,0.5)' : 'var(--text)', 
        backdropFilter: 'blur(10px)',
        color: activeTheme.glass ? '#fff' : 'var(--bg)', 
        padding: '0.8rem 3rem', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `2px solid ${activeTheme.glass ? 'rgba(255,255,255,0.1)' : 'var(--accent)'}`
      }}>
        <div style={{ fontWeight: 900, fontSize: '0.9rem' }}>VIBEKIT STUDIO</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'inherit', fontWeight: 900, cursor: 'pointer' }}><Share2 size={16} /></button>
          <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 900 }}>BUILD YOUR OWN <ArrowRight size={14} /></Link>
        </div>
      </div>

      <style>
        {`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes blink { 50% { border-color: transparent } }
        `}
      </style>

      <AnimatePresence>
        {pageData.sections.map((section: any, idx: number) => (
           <div key={section.id} id={section.id}>
             {renderMasterSection(section, idx)}
           </div>
        ))}
      </AnimatePresence>

      <footer style={{ padding: '6rem 2rem', textAlign: 'center', background: activeTheme.glass ? 'rgba(0,0,0,0.5)' : 'var(--text)', color: activeTheme.glass ? '#fff' : 'var(--bg)' }}>
        <p style={{ fontWeight: 800 }}>© {new Date().getFullYear()} VIBEKIT STUDIO</p>
        <div style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'var(--bg)', color: 'var(--text)', padding: '0.8rem 2rem', borderRadius: '10px' }}>
          <Heart size={20} fill="#FF00E5" />
          <span style={{ fontWeight: 900 }}>{viewCount} VIEWS</span>
        </div>
      </footer>
    </div>
  );
};

export default PublishedPage;
