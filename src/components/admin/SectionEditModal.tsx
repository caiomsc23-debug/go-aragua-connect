import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  box1Text: string;
  box2Text: string;
  box3Text: string;
  color: string;
  isVisible: boolean;
}

export const SectionEditModal = ({ isOpen, onClose, sectionKey, sectionTitle }: SectionEditModalProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SectionContent>({
    title: "",
    box1Text: "",
    box2Text: "",
    box3Text: "",
    color: "#FF6B00",
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
        `${sectionKey}_box1_text`,
        `${sectionKey}_box2_text`,
        `${sectionKey}_box3_text`,
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
        contentMap[shortKey.replace(/_/g, "")] = value.text || "";
      });

      // Obter cor da seção
      const sectionColor = sectionData?.color_hue 
        ? `hsl(${sectionData.color_hue}, ${sectionData.color_saturation}%, ${sectionData.color_lightness}%)`
        : "#FF6B00";

      setContent({
        title: contentMap.title || sectionData?.title || "",
        box1Text: contentMap.box1text || "",
        box2Text: contentMap.box2text || "",
        box3Text: contentMap.box3text || "",
        color: sectionColor,
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
      // Converter cor para HSL
      const hexToHSL = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return { h: 20, s: 100, l: 52 };
        
        let r = parseInt(result[1], 16) / 255;
        let g = parseInt(result[2], 16) / 255;
        let b = parseInt(result[3], 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
          }
        }

        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      };

      const hsl = hexToHSL(content.color);

      // Atualizar menu_sections
      const { error: sectionError } = await supabase
        .from("menu_sections")
        .update({
          title: content.title,
          is_visible: content.isVisible,
          color_hue: hsl.h,
          color_saturation: hsl.s,
          color_lightness: hsl.l,
        })
        .eq("section_key", sectionKey);

      if (sectionError) throw sectionError;

      // Atualizar site_content
      const updates = [
        { key: `${sectionKey}_title`, value: { text: content.title } },
        { key: `${sectionKey}_box1_text`, value: { text: content.box1Text } },
        { key: `${sectionKey}_box2_text`, value: { text: content.box2Text } },
        { key: `${sectionKey}_box3_text`, value: { text: content.box3Text } },
      ];

      for (const update of updates) {
        // Verificar se já existe
        const { data: existing } = await supabase
          .from("site_content")
          .select("id")
          .eq("key", update.key)
          .maybeSingle();

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
              <Label htmlFor="section-title" className="text-sm font-semibold text-blue-600 uppercase">
                Título da Seção
              </Label>
              <Input
                id="section-title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Ex: É uma empresa?"
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="box1-text" className="text-sm font-semibold text-blue-600 uppercase">
                Caixa de texto 1
              </Label>
              <Textarea
                id="box1-text"
                value={content.box1Text}
                onChange={(e) => setContent({ ...content, box1Text: e.target.value })}
                placeholder="Digite informações"
                rows={3}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="box2-text" className="text-sm font-semibold text-blue-600 uppercase">
                Caixa de texto 2
              </Label>
              <Textarea
                id="box2-text"
                value={content.box2Text}
                onChange={(e) => setContent({ ...content, box2Text: e.target.value })}
                placeholder="Digite informações"
                rows={3}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="box3-text" className="text-sm font-semibold text-blue-600 uppercase">
                Caixa de texto 3
              </Label>
              <Textarea
                id="box3-text"
                value={content.box3Text}
                onChange={(e) => setContent({ ...content, box3Text: e.target.value })}
                placeholder="Digite informações"
                rows={3}
                className="border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <Label htmlFor="section-visible" className="text-sm font-semibold text-blue-600 uppercase cursor-pointer">
                Visibilidade
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {content.isVisible ? "Visível" : "Oculto"}
                </span>
                <Switch
                  id="section-visible"
                  checked={content.isVisible}
                  onCheckedChange={(checked) => setContent({ ...content, isVisible: checked })}
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-sm font-semibold text-blue-600 uppercase">
                Preview da Cor
              </Label>
              <div className="flex items-center gap-4">
                <div 
                  className="w-24 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: content.color }}
                />
                <div className="flex-1">
                  <Label htmlFor="color-picker" className="sr-only">Selecionar cor</Label>
                  <input
                    id="color-picker"
                    type="color"
                    value={content.color}
                    onChange={(e) => setContent({ ...content, color: e.target.value })}
                    className="w-full h-12 cursor-pointer rounded-lg border-2 border-gray-300"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Clique na barra de cor para abrir a paleta e escolher uma nova cor
              </p>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-base font-semibold mt-6"
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
