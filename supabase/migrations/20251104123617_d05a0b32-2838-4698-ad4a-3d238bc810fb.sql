-- Enable realtime for site_content table
ALTER TABLE public.site_content REPLICA IDENTITY FULL;

-- Add the table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;