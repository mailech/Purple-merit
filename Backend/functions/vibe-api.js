require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
let supabase;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

const JWT_SECRET = process.env.JWT_SECRET || 'vibe_secret_2026';

// Helper for JWT Verify
const verifyUser = (event) => {
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/vibe-api/, '');
  const method = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : {};

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // 1. Auth: Signup
    if (path === '/auth/signup' && method === 'POST') {
      const { email, password } = body;
      if (!supabase) {
        return { statusCode: 201, headers, body: JSON.stringify({ token: 'mock-token', user: { id: 'mock-id', email } }) };
      }
      const passHash = await bcrypt.hash(password, 10);
      const { data, error } = await supabase.from('users').insert([{ email, password_hash: passHash }]).select('*').single();
      if (error) return { statusCode: 400, headers, body: JSON.stringify({ error: error.message }) };
      const token = jwt.sign({ id: data.id, email: data.email }, JWT_SECRET, { expiresIn: '7d' });
      return { statusCode: 201, headers, body: JSON.stringify({ token, user: { id: data.id, email: data.email } }) };
    }

    // 2. Auth: Login
    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = body;
      if (!supabase) {
        return { statusCode: 200, headers, body: JSON.stringify({ token: 'mock-token', user: { id: 'mock-id', email } }) };
      }
      const { data, error } = await supabase.from('pages').select('*').eq('email', email).single();
      if (error || !data) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Auth failed' }) };
      const valid = await bcrypt.compare(password, data.password_hash);
      if (!valid) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Auth failed' }) };
      const token = jwt.sign({ id: data.id, email: data.email }, JWT_SECRET, { expiresIn: '7d' });
      return { statusCode: 200, headers, body: JSON.stringify({ token, user: { id: data.id, email: data.email } }) };
    }

    // Authenticated Routes (Pages)
    const user = verifyUser(event);
    if (user) {
      // List Pages
      if (path === '/pages' && method === 'GET') {
        if (!supabase) {
           return { statusCode: 200, headers, body: JSON.stringify([{ id: 'mock-1', title: 'Summer Demo', status: 'published', slug: 'demo', views: 42, theme_id: 'neo-brutal' }]) };
        }
        const { data, error } = await supabase.from('pages').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (error) throw error;
        return { statusCode: 200, headers, body: JSON.stringify(data) };
      }
      
      // Create Page (Mock)
      if (path === '/pages' && method === 'POST') {
        if (!supabase) return { statusCode: 201, headers, body: JSON.stringify({ ...body, id: 'mock-' + Date.now() }) };
        const { title, slug, theme_id, sections } = body;
        const { data, error } = await supabase.from('pages').insert([{ 
            user_id: user.id, title, slug, theme_id, sections 
        }]).select('*').single();
        if (error) throw error;
        return { statusCode: 201, headers, body: JSON.stringify(data) };
      }

      // Update Page
      const pageIdMatch = path.match(/^\/pages\/([a-f0-9-]+)$/);
      if (pageIdMatch && method === 'PUT') {
        const pageId = pageIdMatch[1];
        const updateData = { ...body, updated_at: new Date() };
        const { data, error } = await supabase.from('pages').update(updateData).eq('id', pageId).eq('user_id', user.id).select('*').single();
        if (error) throw error;
        return { statusCode: 200, headers, body: JSON.stringify(data) };
      }

      // Publish/Unpublish
      const publishMatch = path.match(/^\/pages\/([a-f0-9-]+)\/(publish|unpublish)$/);
      if (publishMatch && method === 'POST') {
        const pageId = publishMatch[1];
        const status = publishMatch[2] === 'publish' ? 'published' : 'draft';
        const { data, error } = await supabase.from('pages').update({ status }).eq('id', pageId).eq('user_id', user.id).select('*').single();
        if (error) throw error;
        return { statusCode: 200, headers, body: JSON.stringify(data) };
      }
    }

    // 4. Public Routes
    const publicSlugMatch = path.match(/^\/public\/pages\/([a-z0-9-]+)$/);
    if (publicSlugMatch && method === 'GET') {
      const slug = publicSlugMatch[1];
      const { data, error } = await supabase.from('pages').select('title, slug, theme_id, sections, views').eq('slug', slug).eq('status', 'published').single();
      if (error || !data) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    // Public: Increment view count
    const viewMatch = path.match(/^\/public\/pages\/([a-z0-9-]+)\/view$/);
    if (viewMatch && method === 'POST') {
      const slug = viewMatch[1];
      const { data, error } = await supabase.rpc('increment_view_count', { page_slug: slug });
      // Note: Need a postgres function 'increment_view_count' or just a raw update (RPC is cleaner)
      return { statusCode: 200, headers, body: JSON.stringify({ msg: 'View tracked' }) };
    }

    // Default 404
    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Endpoint not found', path }) };

  } catch (error) {
    console.error('API ERROR:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message || 'Server error' }) };
  }
};
