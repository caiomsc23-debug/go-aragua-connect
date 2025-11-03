import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoImage from "@/assets/logo-go-araguaina.png";

const jobSchema = z.object({
  nome_vaga: z.string().min(1, "Nome da vaga é obrigatório"),
  salario: z.string().optional(),
  horario: z.string().optional(),
  tempo_experiencia: z.string().optional(),
  vagas_disponiveis: z.string().min(1, "Quantidade de vagas é obrigatória"),
  beneficios: z.string().optional(),
  escolaridade_exigida: z.string().optional(),
  modelo_contratacao: z.string().optional(),
  requisitos: z.string().optional(),
  descricao: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface CompanySession {
  id: string;
  email: string;
  nome_fantasia: string;
}

const NewJob = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanySession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  useEffect(() => {
    const sessionData = localStorage.getItem("company_session");
    if (!sessionData) {
      toast.error("Você precisa fazer login para acessar esta área");
      navigate("/company-login");
      return;
    }

    try {
      const companyData = JSON.parse(sessionData);
      setCompany(companyData);
    } catch (error) {
      localStorage.removeItem("company_session");
      navigate("/company-login");
    }
  }, [navigate]);

  const onSubmit = async (data: JobFormData) => {
    if (!company) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("jobs").insert({
        company_id: company.id,
        nome_vaga: data.nome_vaga,
        salario: data.salario || null,
        horario: data.horario || null,
        tempo_experiencia: data.tempo_experiencia || null,
        vagas_disponiveis: parseInt(data.vagas_disponiveis),
        beneficios: data.beneficios || null,
        escolaridade_exigida: data.escolaridade_exigida || null,
        modelo_contratacao: data.modelo_contratacao || null,
        requisitos: data.requisitos || null,
        descricao: data.descricao || null,
        is_active: true,
      });

      if (error) throw error;

      toast.success("Vaga cadastrada com sucesso!");
      navigate("/company-dashboard/jobs-list");
    } catch (error: any) {
      console.error("Error creating job:", error);
      toast.error("Erro ao cadastrar vaga");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <img src={logoImage} alt="Conecta Araguaína" className="h-16 mx-auto mb-6" />
        </div>

        {/* Main Card */}
        <Card className="border-4 border-gray-300 rounded-3xl shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome_vaga" className="text-blue-900 font-semibold">
                    NOME DA VAGA *
                  </Label>
                  <Input
                    id="nome_vaga"
                    {...register("nome_vaga")}
                    className={`border-2 ${errors.nome_vaga ? "border-red-500" : "border-blue-300"} rounded-xl`}
                  />
                  {errors.nome_vaga && (
                    <p className="text-sm text-red-500">{errors.nome_vaga.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario" className="text-blue-900 font-semibold">
                    HORÁRIO
                  </Label>
                  <Input
                    id="horario"
                    {...register("horario")}
                    placeholder="Ex: 8h às 18h"
                    className="border-2 border-blue-300 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salario" className="text-blue-900 font-semibold">
                    SALÁRIO
                  </Label>
                  <Input
                    id="salario"
                    {...register("salario")}
                    placeholder="Ex: R$ 2.000,00"
                    className="border-2 border-blue-300 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempo_experiencia" className="text-blue-900 font-semibold">
                    TEMPO DE EXPERIÊNCIA
                  </Label>
                  <Input
                    id="tempo_experiencia"
                    {...register("tempo_experiencia")}
                    placeholder="Ex: 2 anos"
                    className="border-2 border-blue-300 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vagas_disponiveis" className="text-blue-900 font-semibold">
                    VAGAS DISPONÍVEIS *
                  </Label>
                  <Input
                    id="vagas_disponiveis"
                    type="number"
                    {...register("vagas_disponiveis")}
                    className={`border-2 ${errors.vagas_disponiveis ? "border-red-500" : "border-blue-300"} rounded-xl`}
                  />
                  {errors.vagas_disponiveis && (
                    <p className="text-sm text-red-500">{errors.vagas_disponiveis.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="escolaridade_exigida" className="text-blue-900 font-semibold">
                    ESCOLARIDADE EXIGIDA
                  </Label>
                  <Input
                    id="escolaridade_exigida"
                    {...register("escolaridade_exigida")}
                    placeholder="Ex: Ensino Médio"
                    className="border-2 border-blue-300 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelo_contratacao" className="text-blue-900 font-semibold">
                    MODELO DE CONTRATAÇÃO
                  </Label>
                  <Input
                    id="modelo_contratacao"
                    {...register("modelo_contratacao")}
                    placeholder="Ex: CLT, PJ"
                    className="border-2 border-blue-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficios" className="text-blue-900 font-semibold">
                  BENEFÍCIOS
                </Label>
                <Textarea
                  id="beneficios"
                  {...register("beneficios")}
                  placeholder="Liste os benefícios oferecidos"
                  className="border-2 border-blue-300 rounded-xl min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requisitos" className="text-blue-900 font-semibold">
                  REQUISITOS
                </Label>
                <Textarea
                  id="requisitos"
                  {...register("requisitos")}
                  placeholder="Descreva aqui o que é necessário para ocupar a vaga"
                  className="border-2 border-blue-300 rounded-xl min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-blue-900 font-semibold">
                  DESCRIÇÃO
                </Label>
                <Textarea
                  id="descricao"
                  {...register("descricao")}
                  placeholder="Descreva a geral da vaga disponível, quais serão as funções, atividades realizadas e etc."
                  className="border-2 border-blue-300 rounded-xl min-h-32"
                />
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button
                  type="button"
                  onClick={() => navigate("/company-dashboard/manage-jobs")}
                  variant="outline"
                  className="px-12 py-6 text-lg border-2"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar Vaga"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewJob;
