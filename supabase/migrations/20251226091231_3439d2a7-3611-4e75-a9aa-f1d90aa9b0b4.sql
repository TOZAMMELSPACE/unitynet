-- Drop the permissive INSERT policy that allows anyone to create notifications
DROP POLICY IF EXISTS "Anyone can create notifications" ON public.notifications;

-- Create a restrictive policy that only allows users to create notifications where they are the sender
CREATE POLICY "Users can create notifications they send"
ON public.notifications
FOR INSERT
WITH CHECK (auth.uid() = from_user_id);