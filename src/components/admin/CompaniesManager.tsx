import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ChevronDown, ChevronUp, Trash2, Power, PowerOff } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Company {
  id: string;
  nome_fantasia: string;
  cnpj: string;
  email: string;
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

export const CompaniesManager = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Record<string, Job[]>>({});
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("id, nome_fantasia, cnpj, email")
        .order("nome_fantasia");

      if (error) throw error;
      setCompanies(data || []);
    } catch (error: any) {
      console.error("Error loading companies:", error);
      toast.error("Erro ao carregar empresas");
    } finally {
      setLoading(false);
    }
  };

  const loadCompanyJobs = async (companyId: string) => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs((prev) => ({ ...prev, [companyId]: data || [] }));
    } catch (error: any) {
      console.error("Error loading jobs:", error);
      toast.error("Erro ao carregar vagas");
    }
  };

  const toggleCompany = async (companyId: string) => {
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(companyId)) {
      newExpanded.delete(companyId);
    } else {
      newExpanded.add(companyId);
      if (!jobs[companyId]) {
        await loadCompanyJobs(companyId);
      }
    }
    setExpandedCompanies(newExpanded);
  };

  const toggleJobStatus = async (job: Job, companyId: string) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ is_active: !job.is_active })
        .eq("id", job.id);

      if (error) throw error;

      toast.success(`Vaga ${!job.is_active ? "ativada" : "desativada"} com sucesso!`);
      await loadCompanyJobs(companyId);
    } catch (error: any) {
      console.error("Error toggling job status:", error);
      toast.error("Erro ao atualizar status da vaga");
    }
  };

  const deleteJob = async (jobId: string, companyId: string) => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) throw error;

      toast.success("Vaga excluída com sucesso!");
      await loadCompanyJobs(companyId);
    } catch (error: any) {
      console.error("Error deleting job:", error);
      toast.error("Erro ao excluir vaga");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {companies.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Nenhuma empresa cadastrada</p>
      ) : (
        companies.map((company) => (
          <Card key={company.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-colors"
                onClick={() => toggleCompany(company.id)}
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{company.nome_fantasia}</h3>
                  <p className="text-sm text-gray-600">
                    CNPJ: {company.cnpj} | {company.email}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  {expandedCompanies.has(company.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>

              {expandedCompanies.has(company.id) && (
                <div className="p-4 space-y-3 bg-white">
                  {!jobs[company.id] ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                    </div>
                  ) : jobs[company.id].length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Nenhuma vaga cadastrada</p>
                  ) : (
                    jobs[company.id].map((job) => (
                      <div
                        key={job.id}
                        className="border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-r from-blue-50 to-orange-50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-lg text-blue-900">{job.nome_vaga}</h4>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                                job.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {job.is_active ? "Ativa" : "Inativa"}
                            </span>
                          </div>
                        </div>

                        {(job.salario || job.horario) && (
                          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                            {job.salario && (
                              <div>
                                <span className="font-semibold">Salário:</span> {job.salario}
                              </div>
                            )}
                            {job.horario && (
                              <div>
                                <span className="font-semibold">Horário:</span> {job.horario}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                          <Button
                            size="sm"
                            onClick={() => toggleJobStatus(job, company.id)}
                            className={`${
                              job.is_active
                                ? "bg-gray-500 hover:bg-gray-600"
                                : "bg-green-500 hover:bg-green-600"
                            } text-white gap-2`}
                          >
                            {job.is_active ? (
                              <>
                                <PowerOff className="w-4 h-4" />
                                Desativar
                              </>
                            ) : (
                              <>
                                <Power className="w-4 h-4" />
                                Ativar
                              </>
                            )}
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Excluir
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
                                <AlertDialogAction onClick={() => deleteJob(job.id, company.id)}>
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
