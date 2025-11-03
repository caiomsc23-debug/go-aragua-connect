import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoImage from "@/assets/logo-go-araguaina.png";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface CompanySession {
  id: string;
  email: string;
  nome_fantasia: string;
}

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

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanySession | null>(null);
  const [job, setJob] = useState<Job | null>(null);

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
      loadJob(companyData.id);
    } catch (error) {
      localStorage.removeItem("company_session");
      navigate("/company-login");
    }
  }, [navigate, id]);

  const loadJob = async (companyId: string) => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .eq("company_id", companyId)
      .single();

    if (error) {
      console.error("Error loading job:", error);
      toast.error("Erro ao carregar vaga");
      navigate("/company-dashboard/jobs-list");
      return;
    }

    setJob(data);
  };

  const toggleJobStatus = async () => {
    if (!job) return;

    const { error } = await supabase
      .from("jobs")
      .update({ is_active: !job.is_active })
      .eq("id", job.id);

    if (error) {
      console.error("Error toggling job status:", error);
      toast.error("Erro ao atualizar status da vaga");
      return;
    }

    setJob({ ...job, is_active: !job.is_active });
    toast.success(`Vaga ${!job.is_active ? "ativada" : "desativada"} com sucesso!`);
  };

  const deleteJob = async () => {
    if (!job) return;

    const { error } = await supabase.from("jobs").delete().eq("id", job.id);

    if (error) {
      console.error("Error deleting job:", error);
      toast.error("Erro ao excluir vaga");
      return;
    }

    toast.success("Vaga excluída com sucesso!");
    navigate("/company-dashboard/jobs-list");
  };

  if (!company || !job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <img src={logoImage} alt="Conecta Araguaína" className="h-16 mx-auto mb-6" />
        </div>

        {/* Main Card */}
        <Card className="border-4 border-gray-300 rounded-3xl shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                {job.nome_vaga.toUpperCase()}
              </h1>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  job.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {job.is_active ? "Vaga Ativa" : "Vaga Inativa"}
              </span>
            </div>

            {/* Job Details */}
            <div className="space-y-4 mb-8">
              {job.salario && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Salário:</p>
                  <p className="text-gray-700">{job.salario}</p>
                </div>
              )}
              {job.horario && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Horário:</p>
                  <p className="text-gray-700">{job.horario}</p>
                </div>
              )}
              {job.vagas_disponiveis && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Vagas Disponíveis:</p>
                  <p className="text-gray-700">{job.vagas_disponiveis}</p>
                </div>
              )}
              {job.tempo_experiencia && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Tempo de Experiência:</p>
                  <p className="text-gray-700">{job.tempo_experiencia}</p>
                </div>
              )}
              {job.escolaridade_exigida && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Escolaridade Exigida:</p>
                  <p className="text-gray-700">{job.escolaridade_exigida}</p>
                </div>
              )}
              {job.modelo_contratacao && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Modelo de Contratação:</p>
                  <p className="text-gray-700">{job.modelo_contratacao}</p>
                </div>
              )}
              {job.beneficios && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Benefícios:</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{job.beneficios}</p>
                </div>
              )}
              {job.requisitos && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Requisitos:</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{job.requisitos}</p>
                </div>
              )}
              {job.descricao && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="font-semibold text-blue-900">Descrição:</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{job.descricao}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={toggleJobStatus}
                className={`px-12 py-6 text-lg font-bold rounded-xl ${
                  job.is_active
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                {job.is_active ? "DESATIVAR" : "ATIVAR"}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="px-12 py-6 text-lg font-bold rounded-xl"
                  >
                    EXCLUIR
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. A vaga será permanentemente excluída.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteJob}>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => navigate("/company-dashboard/jobs-list")}
            className="text-blue-600"
          >
            Voltar para lista de vagas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
