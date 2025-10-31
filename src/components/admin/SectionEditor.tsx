import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChevronUp, ChevronDown, Plus, Trash2, Save } from "lucide-react";

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

interface SectionEditorProps {
  section: MenuSection;
  onUpdate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const SectionEditor = ({ section, onUpdate, onMoveUp, onMoveDown, canMoveUp, canMoveDown }: SectionEditorProps) => {
  const { toast } = useToast();
  const [localSection, setLocalSection] = useState(section);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("menu_sections")
        .update({
          title: localSection.title,
          is_visible: localSection.is_visible,
          color_hue: localSection.color_hue,
          color_saturation: localSection.color_saturation,
          color_lightness: localSection.color_lightness,
          section_config: localSection.section_config as any, // Cast to Json type
        })
        .eq("id", section.id);

      if (error) throw error;

      toast({
        title: "Salvo com sucesso",
        description: "As alterações da seção foram salvas.",
      });
      onUpdate();
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

  const addCard = () => {
    const newCard: SectionCard = {
      id: `card-${Date.now()}`,
      title: "Novo Item",
      buttonText: "CLIQUE AQUI",
      buttonAction: "#",
      icon: "Circle",
      is_visible: true,
      description: "",
    };
    setLocalSection({
      ...localSection,
      section_config: [...(localSection.section_config || []), newCard],
    });
  };

  const updateCard = (cardId: string, updates: Partial<SectionCard>) => {
    setLocalSection({
      ...localSection,
      section_config: (localSection.section_config || []).map((card) =>
        card.id === cardId ? { ...card, ...updates } : card
      ),
    });
  };

  const deleteCard = (cardId: string) => {
    setLocalSection({
      ...localSection,
      section_config: (localSection.section_config || []).filter((card) => card.id !== cardId),
    });
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    const cards = [...(localSection.section_config || [])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= cards.length) return;

    [cards[index], cards[targetIndex]] = [cards[targetIndex], cards[index]];
    setLocalSection({ ...localSection, section_config: cards });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{section.section_key}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onMoveUp}
              disabled={!canMoveUp}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onMoveDown}
              disabled={!canMoveDown}
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Título da Seção</Label>
            <Input
              value={localSection.title}
              onChange={(e) => setLocalSection({ ...localSection, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Visibilidade</Label>
            <div className="flex items-center gap-2 h-10">
              <Switch
                checked={localSection.is_visible}
                onCheckedChange={(checked) =>
                  setLocalSection({ ...localSection, is_visible: checked })
                }
              />
              <span className="text-sm">
                {localSection.is_visible ? "Visível" : "Oculto"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cor (Matiz: 0-360)</Label>
            <Input
              type="number"
              min="0"
              max="360"
              value={localSection.color_hue}
              onChange={(e) =>
                setLocalSection({ ...localSection, color_hue: parseInt(e.target.value) || 0 })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Saturação (0-100%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={localSection.color_saturation}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  color_saturation: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Luminosidade (0-100%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={localSection.color_lightness}
              onChange={(e) =>
                setLocalSection({
                  ...localSection,
                  color_lightness: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Preview da Cor</Label>
            <div
              className="h-10 rounded-md border"
              style={{
                backgroundColor: `hsl(${localSection.color_hue}, ${localSection.color_saturation}%, ${localSection.color_lightness}%)`,
              }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cards/Itens da Seção</h3>
          <Button onClick={addCard} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Card
          </Button>
        </div>

        {(localSection.section_config || []).map((card, index) => (
          <Card key={card.id} className="p-4 bg-muted/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Card {index + 1}</h4>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveCard(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveCard(index, "down")}
                    disabled={index === (localSection.section_config || []).length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCard(card.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Título do Card</Label>
                  <Input
                    value={card.title}
                    onChange={(e) => updateCard(card.id, { title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Texto do Botão</Label>
                  <Input
                    value={card.buttonText}
                    onChange={(e) => updateCard(card.id, { buttonText: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ação do Botão (URL ou rota)</Label>
                  <Input
                    value={card.buttonAction}
                    onChange={(e) => updateCard(card.id, { buttonAction: e.target.value })}
                    placeholder="/company-portal ou https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ícone (Lucide name)</Label>
                  <Input
                    value={card.icon}
                    onChange={(e) => updateCard(card.id, { icon: e.target.value })}
                    placeholder="User, Briefcase, etc"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Descrição (opcional)</Label>
                  <Textarea
                    value={card.description || ""}
                    onChange={(e) => updateCard(card.id, { description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={card.is_visible}
                    onCheckedChange={(checked) => updateCard(card.id, { is_visible: checked })}
                  />
                  <Label>{card.is_visible ? "Visível" : "Oculto"}</Label>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-primary gap-2"
        >
          {saving ? (
            <>Salvando...</>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Salvar Todas as Alterações
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SectionEditor;
