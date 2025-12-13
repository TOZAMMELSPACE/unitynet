-- Add cover_url column to profiles table for cover images
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS cover_url TEXT DEFAULT NULL;

-- Add role column for user roles (freelancer, trainer, learner, etc.)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Add username column for custom usernames
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS username TEXT DEFAULT NULL;