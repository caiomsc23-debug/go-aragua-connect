-- Create storage bucket for hero images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hero-images', 'hero-images', true);

-- Allow admins to upload images
CREATE POLICY "Admins can upload hero images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'hero-images' 
  AND (storage.foldername(name))[1] = 'uploads'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update images
CREATE POLICY "Admins can update hero images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'hero-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete images
CREATE POLICY "Admins can delete hero images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'hero-images'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow public access to view images
CREATE POLICY "Public can view hero images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'hero-images');