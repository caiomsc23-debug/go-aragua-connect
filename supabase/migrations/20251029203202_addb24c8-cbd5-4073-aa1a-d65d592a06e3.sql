-- Create table for section configurations
CREATE TABLE public.menu_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL,
  is_visible boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL,
  color_hue integer NOT NULL,
  color_saturation integer NOT NULL,
  color_lightness integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_sections ENABLE ROW LEVEL SECURITY;

-- Everyone can view visible sections
CREATE POLICY "Everyone can view menu sections"
ON public.menu_sections
FOR SELECT
USING (true);

-- Only admins can manage sections
CREATE POLICY "Admins can insert menu sections"
ON public.menu_sections
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update menu sections"
ON public.menu_sections
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete menu sections"
ON public.menu_sections
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default sections
INSERT INTO public.menu_sections (section_key, title, is_visible, display_order, color_hue, color_saturation, color_lightness) VALUES
  ('job_seekers', 'Buscando emprego e qualificação?', true, 1, 180, 65, 45),
  ('companies', 'É uma empresa?', true, 2, 25, 100, 50),
  ('autonomous', 'É autônomo?', true, 3, 280, 60, 45),
  ('service_seekers', 'Precisa de serviço?', true, 4, 330, 80, 50);

-- Add trigger for updated_at
CREATE TRIGGER update_menu_sections_updated_at
BEFORE UPDATE ON public.menu_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();