-- ==============================================================================
-- JMD CONTAINER SERVICES — PRODUCTION SUPABASE DATABASE SCHEMA & SECURITY POLICIES
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- to initialize tables, row-level security, single-owner authorization, and storage.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. AUTHORIZED OWNERS TABLE & SECURITY FUNCTION
-- ------------------------------------------------------------------------------
-- This table defines which email addresses are authorized as the business owner/admin.
-- Simply inserting your owner email into this table is SUFFICIENT to grant full owner permissions.
CREATE TABLE IF NOT EXISTS public.authorized_owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on authorized_owners
ALTER TABLE public.authorized_owners ENABLE ROW LEVEL SECURITY;

-- Helper security function to verify whether the calling user is an authorized owner
CREATE OR REPLACE FUNCTION public.is_authorized_owner()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT (
        -- 1. User must have an active authenticated Supabase session
        auth.role() = 'authenticated' AND (
            -- 2. Authenticated email must exist in public.authorized_owners (case-insensitive)
            EXISTS (
                SELECT 1 FROM public.authorized_owners
                WHERE lower(email) = lower(auth.jwt() ->> 'email')
            )
        )
    );
$$;

-- Policy on authorized_owners: only authorized owners can view the admin list
CREATE POLICY "Authorized owners can read admin list" ON public.authorized_owners
    FOR SELECT TO authenticated
    USING (public.is_authorized_owner());

-- ------------------------------------------------------------------------------
-- 2. CONTAINERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.containers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    size TEXT NOT NULL, -- '10ft' | '20ft' | '40ft' | '40ft HC' | 'Custom'
    type TEXT NOT NULL, -- 'Standard Dry Van' | 'High Cube' | 'Open Top' | 'Refrigerated (Reefer)' | 'Modified Unit' | 'Custom Fabricated'
    condition TEXT NOT NULL, -- 'New / One-Trip' | 'Cargo Worthy (CW)' | 'Wind & Water Tight (WWT)' | 'As-Is / Used' | 'Custom Built'
    status TEXT NOT NULL DEFAULT 'Available', -- 'Available' | 'Reserved' | 'Sold'
    featured BOOLEAN DEFAULT false,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    primary_image TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    specs JSONB DEFAULT '{}'::JSONB,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    suitable_for TEXT[] DEFAULT ARRAY[]::TEXT[],
    location_yard TEXT DEFAULT 'Main Yard',
    inspection_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. PROJECTS TABLE (Our Work / Portfolio)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Site Offices' | 'Security & Guard Cabins' | 'Commercial & Kiosks' | 'Storage & Workshops' | 'Custom Modular'
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    primary_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    base_container_type TEXT NOT NULL,
    modifications_made TEXT[] DEFAULT ARRAY[]::TEXT[],
    key_features TEXT[] DEFAULT ARRAY[]::TEXT[],
    intended_use TEXT NOT NULL,
    before_after JSONB, -- { beforeImage, afterImage, beforeLabel, afterLabel, transformationSummary }
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. BUSINESS INFO TABLE (Singleton configuration)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_info (
    id TEXT PRIMARY KEY DEFAULT 'primary_config',
    name TEXT NOT NULL DEFAULT 'JMD Container Services',
    short_name TEXT NOT NULL DEFAULT 'JMD Containers',
    tagline TEXT NOT NULL DEFAULT 'Custom Container Solutions. Built Around Your Requirements.',
    core_value_prop TEXT NOT NULL DEFAULT 'Tell us what you need. We build the container solution around your requirements.',
    phone JSONB NOT NULL DEFAULT '{"display": "+91 87081 40861", "raw": "+918708140861", "isPlaceholder": false}'::JSONB,
    whatsapp JSONB NOT NULL DEFAULT '{"display": "+91 87081 40861", "number": "918708140861", "isPlaceholder": false}'::JSONB,
    email JSONB NOT NULL DEFAULT '{"display": "jmdcontainer@gmail.com", "address": "jmdcontainer@gmail.com", "isPlaceholder": false}'::JSONB,
    address JSONB NOT NULL DEFAULT '{"line1": "Container Yard & Fabrication Facility", "line2": "Industrial Area Phase II", "city": "Rewari", "state": "Haryana", "postalCode": "123401", "country": "India", "fullDisplay": "Container Yard & Fabrication Facility, Bawal Road, Rewari, Haryana - 123401", "isPlaceholder": false}'::JSONB,
    operating_hours JSONB NOT NULL DEFAULT '{"weekdays": "Monday – Friday: 9:00 AM – 7:00 PM", "saturday": "Saturday: 9:00 AM – 5:00 PM", "sunday": "Sunday: Closed / By Appointment"}'::JSONB,
    capabilities TEXT[] DEFAULT ARRAY[
        'Raw Shipping Container Sales (20ft, 40ft, High Cube)',
        'Container Modifications (Doors, Windows, Insulation, Electricals)',
        'Custom Fabricated Container Solutions from Scratch',
        'Tailored Modular Units for Commercial, Industrial & Site Uses'
    ]::TEXT[],
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default primary business info row
INSERT INTO public.business_info (id, name, short_name, tagline, core_value_prop, phone, whatsapp, email, address, operating_hours)
VALUES (
    'primary_config',
    'JMD Container Services',
    'JMD Containers',
    'Custom Container Solutions. Built Around Your Requirements.',
    'Tell us what you need. We build the container solution around your requirements.',
    '{"display": "+91 87081 40861", "raw": "+918708140861", "isPlaceholder": false}'::JSONB,
    '{"display": "+91 87081 40861", "number": "918708140861", "isPlaceholder": false}'::JSONB,
    '{"display": "jmdcontainer@gmail.com", "address": "jmdcontainer@gmail.com", "isPlaceholder": false}'::JSONB,
    '{"line1": "Container Yard & Fabrication Facility", "line2": "Industrial Area Phase II", "city": "Rewari", "state": "Haryana", "postalCode": "123401", "country": "India", "fullDisplay": "Container Yard & Fabrication Facility, Bawal Road, Rewari, Haryana - 123401", "isPlaceholder": false}'::JSONB,
    '{"weekdays": "Monday – Friday: 9:00 AM – 7:00 PM", "saturday": "Saturday: 9:00 AM – 5:00 PM", "sunday": "Sunday: Closed / By Appointment"}'::JSONB
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 5. SITE MEDIA TABLE (Logo, hero, yard images)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_media (
    id TEXT PRIMARY KEY DEFAULT 'primary_media',
    logo_url TEXT,
    hero_image_url TEXT,
    yard_image_url TEXT,
    workshop_image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default primary media row
INSERT INTO public.site_media (id, hero_image_url, yard_image_url, workshop_image_url)
VALUES (
    'primary_media',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 6. CUSTOMER ENQUIRIES TABLE (Private leads)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL, -- 'container' | 'custom_solution' | 'general'
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    company TEXT,
    container_id TEXT,
    container_title TEXT,
    looking_for TEXT,
    container_size TEXT,
    intended_use TEXT,
    quantity TEXT,
    modifications TEXT[] DEFAULT ARRAY[]::TEXT[],
    subject TEXT,
    message TEXT,
    delivery_location TEXT,
    status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'contacted' | 'quoted' | 'closed'
    notes TEXT, -- Private internal owner notes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. PUBLIC ACCESS POLICIES (Read-only for public catalog content; insert-only for enquiries)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public users can view containers" ON public.containers
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public users can view projects" ON public.projects
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public users can view business info" ON public.business_info
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public users can view site media" ON public.site_media
    FOR SELECT TO anon, authenticated USING (true);

-- Public visitors can ONLY insert (submit) an enquiry. They CANNOT read or list any enquiries.
CREATE POLICY "Public users can submit enquiries" ON public.enquiries
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- B. AUTHORIZED OWNER ACCESS POLICIES (Strictly checked against is_authorized_owner())
-- ------------------------------------------------------------------------------
-- Containers: Owner can insert, update, and delete
CREATE POLICY "Authorized owner container manage" ON public.containers
    FOR ALL TO authenticated
    USING (public.is_authorized_owner())
    WITH CHECK (public.is_authorized_owner());

-- Projects: Owner can insert, update, and delete
CREATE POLICY "Authorized owner project manage" ON public.projects
    FOR ALL TO authenticated
    USING (public.is_authorized_owner())
    WITH CHECK (public.is_authorized_owner());

-- Business info: Owner can update settings
CREATE POLICY "Authorized owner business info manage" ON public.business_info
    FOR ALL TO authenticated
    USING (public.is_authorized_owner())
    WITH CHECK (public.is_authorized_owner());

-- Site media: Owner can update media URLs
CREATE POLICY "Authorized owner site media manage" ON public.site_media
    FOR ALL TO authenticated
    USING (public.is_authorized_owner())
    WITH CHECK (public.is_authorized_owner());

-- Enquiries: Only authorized owner can view, update status, and manage internal notes
CREATE POLICY "Authorized owner enquiry view and manage" ON public.enquiries
    FOR ALL TO authenticated
    USING (public.is_authorized_owner())
    WITH CHECK (public.is_authorized_owner());

-- ==============================================================================
-- STORAGE BUCKETS & STORAGE POLICIES
-- ==============================================================================

-- Create public storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('container-images', 'container-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read images from these 3 public buckets
CREATE POLICY "Public read container images" ON storage.objects
    FOR SELECT USING (bucket_id = 'container-images');

CREATE POLICY "Public read project images" ON storage.objects
    FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Public read site media" ON storage.objects
    FOR SELECT USING (bucket_id = 'site-media');

-- ONLY authorized owners can upload images
CREATE POLICY "Authorized owner upload container images" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'container-images' AND public.is_authorized_owner());

CREATE POLICY "Authorized owner upload project images" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'project-images' AND public.is_authorized_owner());

CREATE POLICY "Authorized owner upload site media" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'site-media' AND public.is_authorized_owner());

-- ONLY authorized owners can update or delete images
CREATE POLICY "Authorized owner update delete images" ON storage.objects
    FOR ALL TO authenticated
    USING (
        bucket_id IN ('container-images', 'project-images', 'site-media') 
        AND public.is_authorized_owner()
    )
    WITH CHECK (
        bucket_id IN ('container-images', 'project-images', 'site-media') 
        AND public.is_authorized_owner()
    );
