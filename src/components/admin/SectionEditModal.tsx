import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";

interface SectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: string;
  sectionTitle: string;
}

interface SectionContent {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: string;
  isVisible: boolean;
}

export const SectionEditModal = ({ isOpen, onClose, sectionKey, sectionTitle }: SectionEditModalProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SectionContent>({
    title: "",
    description: "",
    buttonText: "",
    backgroundImage: "",
    isVisible: true,
  });

  useEffect(() => {
    if (isOpen) {
      loadSectionContent();
    }
  }, [isOpen, sectionKey]);

  const loadSectionContent = async () => {
    setLoading(true);
    try {
      // Buscar dados da menu_sections
      const { data: sectionData, error: sectionError } = await supabase
        .from("menu_sections")
        .select("*")
        .eq("section_key", sectionKey)
        .single();

      if (sectionError && sectionError.code !== "PGRST116") throw sectionError;

      // Buscar dados adicionais do site_content
      const contentKeys = [
        `${sectionKey}_title`,
        `${sectionKey}_description`,
        `${sectionKey}_button_text`,
        `${sectionKey}_background_image`,
      ];

      const { data: contentData, error: contentError } = await supabase
        .from("site_content")
        .select("key, value")
        .in("key", contentKeys);

      if (contentError) throw contentError;

      const contentMap: any = {};
      contentData?.forEach((item) => {
        const value = item.value as any;
        const shortKey = item.key.replace(`${sectionKey}_`, "");
        if (shortKey === "background_image") {
          contentMap.backgroundImage = value.url || "";
        } else if (shortKey === "button_text") {
          contentMap.buttonText = value.text || "";
        } else {
          contentMap[shortKey] = value.text || "";
        }
      });

      setContent({
        title: contentMap.title || sectionData?.title || "",
        description: contentMap.description || "",
        buttonText: contentMap.buttonText || "",
        backgroundImage: contentMap.backgroundImage || "",
        isVisible: sectionData?.is_visible ?? true,
      });
    } catch (error: any) {
      console.error("Error loading section content:", error);
      toast({
        title: "Erro ao carregar conteúdo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Atualizar menu_sections
      const { error: sectionError } = await supabase
        .from("menu_sections")
        .update({
          title: content.title,
          is_visible: content.isVisible,
        })
        .eq("section_key", sectionKey);

      if (sectionError) throw sectionError;

      // Atualizar site_content
      const updates = [
        { key: `${sectionKey}_title`, value: { text: content.title } },
        { key: `${sectionKey}_description`, value: { text: content.description } },
        { key: `${sectionKey}_button_text`, value: { text: content.buttonText } },
        { key: `${sectionKey}_background_image`, value: { url: content.backgroundImage } },
      ];

      for (const update of updates) {
        // Verificar se já existe
        const { data: existing } = await supabase
          .from("site_content")
          .select("id")
          .eq("key", update.key)
          .single();

        if (existing) {
          // Atualizar
          const { error } = await supabase
            .from("site_content")
            .update({ value: update.value })
            .eq("key", update.key);

          if (error) throw error;
        } else {
          // Inserir
          const { error } = await supabase
            .from("site_content")
            .insert({ key: update.key, value: update.value });

          if (error) throw error;
        }
      }

      toast({
        title: "Alterações salvas!",
        description: "O conteúdo da seção foi atualizado com sucesso.",
      });

      onClose();
    } catch (error: any) {
      console.error("Error saving section:", error);
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{sectionTitle}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section-title">Título Principal</Label>
              <Input
                id="section-title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Digite o título da seção"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section-description">Descrição</Label>
              <Textarea
                id="section-description"
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                placeholder="Digite a descrição da seção"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section-button">Texto do Botão</Label>
              <Input
                id="section-button"
                value={content.buttonText}
                onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
                placeholder="Digite o texto do botão"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem de Fundo</Label>
              <ImageUpload
                currentImage={content.backgroundImage}
                onImageUploaded={(url) => setContent({ ...content, backgroundImage: url })}
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <Switch
                id="section-visible"
                checked={content.isVisible}
                onCheckedChange={(checked) => setContent({ ...content, isVisible: checked })}
              />
              <Label htmlFor="section-visible" className="cursor-pointer">
                {content.isVisible ? "Seção visível no site" : "Seção oculta no site"}
              </Label>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-base font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
