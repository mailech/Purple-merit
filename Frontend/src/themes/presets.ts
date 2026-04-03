export type ThemePreset = {
  id: string;
  name: string;
  bg: string;
  surface: string;
  text: string;
  accent: string;
  secondary: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
  borderWidth: string;
  glass?: boolean;
  boxShadow?: string;
};

export const themes: ThemePreset[] = [
  {
    id: 'neo-brutal',
    name: 'Neo Brutal',
    bg: '#FFFFFF',
    surface: '#FFE600',
    text: '#000000',
    accent: '#FF00E5',
    secondary: '#00F0FF',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: '0px',
    borderWidth: '4px',
    boxShadow: '10px 10px 0px 0px #000'
  },
  {
    id: 'lucid-glass',
    name: 'Lucid Glass',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'rgba(255, 255, 255, 0.25)',
    text: '#FFFFFF',
    accent: '#00D2FF',
    secondary: 'rgba(255, 255, 255, 0.1)',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: '24px',
    borderWidth: '1px',
    glass: true,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    bg: '#0A0A0A',
    surface: '#121212',
    text: '#F5F5F5',
    accent: '#FFFFFF',
    secondary: '#2C2C2E',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: '12px',
    borderWidth: '1px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  {
    id: 'pastel-day',
    name: 'Pastel Light',
    bg: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    accent: '#FFD1DC',
    secondary: '#E6E6E6',
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: '16px',
    borderWidth: '2px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  {
    id: 'anime-cyber',
    name: 'Anime Cyber',
    bg: '#0B0B2A',
    surface: '#1A1A4A',
    text: '#00FFCC',
    accent: '#FF0055',
    secondary: '#FF00E5',
    fontHeading: "'Bebas Neue', sans-serif",
    fontBody: "'Space Grotesk', sans-serif",
    borderRadius: '4px',
    borderWidth: '3px',
    boxShadow: '6px 6px 0px 0px #FF0055, -6px -6px 0px 0px #00FFCC'
  },
  {
    id: 'cinema-noir',
    name: 'Cinema Noir',
    bg: '#050505',
    surface: '#111111',
    text: '#E5E5E5',
    accent: '#D4AF37',
    secondary: '#8A0303',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: '0px',
    borderWidth: '1px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.8)'
  },
  {
    id: 'terminal-pro',
    name: 'Terminal Pro',
    bg: '#000000',
    surface: '#0A0A0A',
    text: '#00FF41',
    accent: '#008F11',
    secondary: '#003B00',
    fontHeading: "'Fira Code', monospace",
    fontBody: "'Fira Code', monospace",
    borderRadius: '0px',
    borderWidth: '2px',
    boxShadow: 'none'
  }
];
