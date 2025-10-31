-- Add configuration fields to menu_sections for storing card/button data
ALTER TABLE menu_sections
ADD COLUMN IF NOT EXISTS section_config JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN menu_sections.section_config IS 'Stores configuration for cards/buttons in each section including titles, button texts, and visibility';

-- Example structure for section_config:
-- [
--   {
--     "id": "card-1",
--     "title": "Perfil profissional",
--     "buttonText": "CADASTRE SEU CURRÍCULO",
--     "buttonAction": "#",
--     "icon": "User",
--     "is_visible": true
--   }
-- ]