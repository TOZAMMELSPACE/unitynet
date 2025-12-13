-- Drop the view and recreate with SECURITY INVOKER (default, safer)
DROP VIEW IF EXISTS public.public_profiles;

-- Recreate view with explicit SECURITY INVOKER
CREATE VIEW public.public_profiles 
WITH (security_invoker = true)
AS
SELECT 
  id,
  user_id,
  full_name,
  username,
  avatar_url,
  cover_url,
  bio,
  location,
  role,
  trust_score,
  unity_notes,
  created_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO anon, authenticated;