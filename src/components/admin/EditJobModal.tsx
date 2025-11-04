import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Job {
  id: string;
  nome_vaga: string;
  is_active: boolean;
  salario: string | null;
  horario: string | null;
  tempo_experiencia: string | null;
  vagas_disponiveis: number;
  beneficios: string | null;
  escolaridade_exigida: string | null;
  modelo_contratacao: string | null;
  requisitos: string | null;
  descricao: string | null;
}

interface EditJobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onJobUpdated: () => void;
}

export const EditJobModal = ({ job, isOpen, onClose, onJobUpdated }: EditJobModalProps) => {
  const [formData, setFormData] = useState<Partial<Job>>(job || {});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!job?.id) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("jobs")
        .update({
          nome_vaga: formData.nome_vaga,
          salario: formData.salario,
          horario: formData.horario,
          tempo_experiencia: formData.tempo_experiencia,
          vagas_disponiveis: formData.vagas_disponiveis,
          beneficios: formData.beneficios,
          escolaridade_exigida: formData.escolaridade_exigida,
          modelo_contratacao: formData.modelo_contratacao,
          requisitos: formData.requisitos,
          descricao: formData.descricao,
        })
        .eq("id", job.id);

      if (error) throw error;

      toast.success("Vaga atualizada com sucesso!");
      onJobUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error updating job:", error);
      toast.error("Erro ao atualizar vaga");
    } finally {
      setIsSaving(false);
    }
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Editar Vaga</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome_vaga">Nome da Vaga *</Label>
            <Input
              id="nome_vaga"
              value={formData.nome_vaga || ""}
              onChange={(e) => setFormData({ ...formData, nome_vaga: e.target.value })}
              placeholder="Ex: Desenvolvedor Full Stack"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salario">Salário</Label>
              <Input
                id="salario"
                value={formData.salario || ""}
                onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                placeholder="Ex: R$ 3.000,00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vagas_disponiveis">Vagas Disponíveis *</Label>
              <Input
                id="vagas_disponiveis"
                type="number"
                min="1"
                value={formData.vagas_disponiveis || 1}
                onChange={(e) => setFormData({ ...formData, vagas_disponiveis: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horario">Horário</Label>
              <Input
                id="horario"
                value={formData.horario || ""}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                placeholder="Ex: 08:00 às 18:00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tempo_experiencia">Tempo de Experiência</Label>
              <Input
                id="tempo_experiencia"
                value={formData.tempo_experiencia || ""}
                onChange={(e) => setFormData({ ...formData, tempo_experiencia: e.target.value })}
                placeholder="Ex: 2 anos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="escolaridade_exigida">Escolaridade Exigida</Label>
              <Input
                id="escolaridade_exigida"
                value={formData.escolaridade_exigida || ""}
                onChange={(e) => setFormData({ ...formData, escolaridade_exigida: e.target.value })}
                placeholder="Ex: Ensino Superior Completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo_contratacao">Modelo de Contratação</Label>
              <Input
                id="modelo_contratacao"
                value={formData.modelo_contratacao || ""}
                onChange={(e) => setFormData({ ...formData, modelo_contratacao: e.target.value })}
                placeholder="Ex: CLT"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="beneficios">Benefícios</Label>
            <Textarea
              id="beneficios"
              value={formData.beneficios || ""}
              onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
              placeholder="Ex: Vale transporte, vale refeição..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requisitos">Requisitos</Label>
            <Textarea
              id="requisitos"
              value={formData.requisitos || ""}
              onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
              placeholder="Liste os requisitos necessários para a vaga"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição da Vaga</Label>
            <Textarea
              id="descricao"
              value={formData.descricao || ""}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva as responsabilidades e atividades da vaga"
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
