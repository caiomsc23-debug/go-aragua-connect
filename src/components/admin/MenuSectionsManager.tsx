import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuSection {
  id: string;
  section_key: string;
  title: string;
  is_visible: boolean;
  display_order: number;
  color_hue: number;
  color_saturation: number;
  color_lightness: number;
}

const MenuSectionsManager = () => {
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_sections")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error("Error loading sections:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as seções",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  const updateSection = async (id: string, updates: Partial<MenuSection>) => {
    try {
      const { error } = await supabase
        .from("menu_sections")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Seção atualizada com sucesso",
      });

      loadSections();
    } catch (error) {
      console.error("Error updating section:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a seção",
        variant: "destructive",
      });
    }
  };

  const moveSection = async (index: number, direction: "up" | "down") => {
    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap display orders
    const temp = newSections[index].display_order;
    newSections[index].display_order = newSections[targetIndex].display_order;
    newSections[targetIndex].display_order = temp;

    // Update in database
    try {
      await Promise.all([
        supabase
          .from("menu_sections")
          .update({ display_order: newSections[index].display_order })
          .eq("id", newSections[index].id),
        supabase
          .from("menu_sections")
          .update({ display_order: newSections[targetIndex].display_order })
          .eq("id", newSections[targetIndex].id),
      ]);

      toast({
        title: "Sucesso",
        description: "Ordem atualizada com sucesso",
      });

      loadSections();
    } catch (error) {
      console.error("Error reordering sections:", error);
      toast({
        title: "Erro",
        description: "Não foi possível reordenar as seções",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Seções do Menu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section, index) => (
          <Card key={section.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor={`title-${section.id}`}>Título</Label>
                  <Input
                    id={`title-${section.id}`}
                    value={section.title}
                    onChange={(e) =>
                      updateSection(section.id, { title: e.target.value })
                    }
                    onBlur={() => loadSections()}
                  />
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveSection(index, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => moveSection(index, "down")}
                    disabled={index === sections.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`visible-${section.id}`}
                  checked={section.is_visible}
                  onCheckedChange={(checked) =>
                    updateSection(section.id, { is_visible: checked })
                  }
                />
                <Label htmlFor={`visible-${section.id}`}>
                  {section.is_visible ? "Visível" : "Oculto"}
                </Label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor={`hue-${section.id}`}>Cor (Matiz)</Label>
                  <Input
                    id={`hue-${section.id}`}
                    type="number"
                    min="0"
                    max="360"
                    value={section.color_hue}
                    onChange={(e) =>
                      updateSection(section.id, {
                        color_hue: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`sat-${section.id}`}>Saturação</Label>
                  <Input
                    id={`sat-${section.id}`}
                    type="number"
                    min="0"
                    max="100"
                    value={section.color_saturation}
                    onChange={(e) =>
                      updateSection(section.id, {
                        color_saturation: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`light-${section.id}`}>Luminosidade</Label>
                  <Input
                    id={`light-${section.id}`}
                    type="number"
                    min="0"
                    max="100"
                    value={section.color_lightness}
                    onChange={(e) =>
                      updateSection(section.id, {
                        color_lightness: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div
                className="h-8 rounded"
                style={{
                  backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)`,
                }}
              />
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MenuSectionsManager;