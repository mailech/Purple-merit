-- PostgreSQL Schema for VibeKit Studio

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Pages Table
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    theme_id TEXT NOT NULL DEFAULT 'neo-brutal',
    sections JSONB NOT NULL DEFAULT '[]',
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    views INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Submissions Table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for performance
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_user_id ON pages(user_id);

-- Atomic increment for view count (called via Supabase RPC)
CREATE OR REPLACE FUNCTION increment_view_count(page_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE pages
    SET views = views + 1
    WHERE slug = page_slug AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
