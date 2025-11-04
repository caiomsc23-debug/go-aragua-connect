import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Save } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import SectionEditor from "@/components/admin/SectionEditor";
import { SectionManagerButtons } from "@/components/admin/SectionManagerButtons";

interface ContentData {
  hero_title: string;
  hero_description: string;
  hero_button_text: string;
  hero_background_image: string;
}

interface SectionCard {
  id: string;
  title: string;
  buttonText: string;
  buttonAction: string;
  icon: string;
  is_visible: boolean;
  description?: string;
}

interface MenuSection {
  id: string;
  section_key: string;
  title: string;
  is_visible: boolean;
  display_order: number;
  color_hue: number;
  color_saturation: number;
  color_lightness: number;
  section_config: SectionCard[];
}

const AdminDashboard = () => {
  const { user, isAdmin, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ContentData>({
    hero_title: "",
    hero_description: "",
    hero_button_text: "",
    hero_background_image: "",
  });
  const [sections, setSections] = useState<MenuSection[]>([]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadContent();
      loadSections();
    }
  }, [user, isAdmin]);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value")
        .in("key", ["hero_title", "hero_description", "hero_button_text", "hero_background_image"]);

      if (error) throw error;

      const contentMap: any = {};
      data?.forEach((item) => {
        const value = item.value as any;
        contentMap[item.key] = value.text || value.url || "";
      });

      setContent(contentMap);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar conteúdo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_sections")
        .select("*")
        .order("display_order");

      if (error) throw error;
      // Cast section_config from Json to SectionCard[]
      if (data) {
        const sectionsWithConfig = data.map(section => ({
          ...section,
          section_config: (section.section_config as any) || []
        }));
        setSections(sectionsWithConfig as MenuSection[]);
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar seções",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const moveSectionUp = async (index: number) => {
    if (index === 0) return;
    
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    
    try {
      for (let i = 0; i < newSections.length; i++) {
        const { error } = await supabase
          .from("menu_sections")
          .update({ display_order: i + 1 })
          .eq("id", newSections[i].id);
        
        if (error) throw error;
      }
      
      setSections(newSections.map((s, i) => ({ ...s, display_order: i + 1 })));
      
      toast({
        title: "Ordem atualizada",
        description: "A seção foi movida para cima.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao reordenar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const moveSectionDown = async (index: number) => {
    if (index === sections.length - 1) return;
    
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    
    try {
      for (let i = 0; i < newSections.length; i++) {
        const { error } = await supabase
          .from("menu_sections")
          .update({ display_order: i + 1 })
          .eq("id", newSections[i].id);
        
        if (error) throw error;
      }
      
      setSections(newSections.map((s, i) => ({ ...s, display_order: i + 1 })));
      
      toast({
        title: "Ordem atualizada",
        description: "A seção foi movida para baixo.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao reordenar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = [
        { key: "hero_title", value: { text: content.hero_title } },
        { key: "hero_description", value: { text: content.hero_description } },
        { key: "hero_button_text", value: { text: content.hero_button_text } },
        { key: "hero_background_image", value: { url: content.hero_background_image } },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from("site_content")
          .update({ value: update.value, updated_by: user?.id })
          .eq("key", update.key);

        if (error) throw error;
      }

      toast({
        title: "Conteúdo salvo!",
        description: "As alterações foram aplicadas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-1">Gerencie o conteúdo do site GO Araguaína</p>
          </div>
          <Button
            variant="outline"
            onClick={signOut}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seção Principal (Hero)</CardTitle>
            <CardDescription>
              Edite o conteúdo da seção principal do site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título Principal</Label>
              <Input
                id="title"
                value={content.hero_title}
                onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                placeholder="Conectando você às oportunidades da cidade."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={content.hero_description}
                onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
                placeholder="O GO Araguaína é a plataforma..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="button">Texto do Botão</Label>
              <Input
                id="button"
                value={content.hero_button_text}
                onChange={(e) => setContent({ ...content, hero_button_text: e.target.value })}
                placeholder="Entrar no Portal"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem de Fundo</Label>
              <ImageUpload
                currentImage={content.hero_background_image}
                onImageUploaded={(url) => setContent({ ...content, hero_background_image: url })}
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Seções e Conteúdo do Site</CardTitle>
            <CardDescription>
              Personalize cores, textos, botões e visibilidade de cada seção
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <SectionManagerButtons />
            
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Gerenciamento Avançado de Seções</h3>
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    onUpdate={loadSections}
                    onMoveUp={() => moveSectionUp(index)}
                    onMoveDown={() => moveSectionDown(index)}
                    canMoveUp={index > 0}
                    canMoveDown={index < sections.length - 1}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
