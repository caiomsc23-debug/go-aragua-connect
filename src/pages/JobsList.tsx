import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoImage from "@/assets/logo-go-araguaina.png";

interface CompanySession {
  id: string;
  email: string;
  nome_fantasia: string;
}

interface Job {
  id: string;
  nome_vaga: string;
  is_active: boolean;
}

const JobsList = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanySession | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

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
      loadJobs(companyData.id);
    } catch (error) {
      localStorage.removeItem("company_session");
      navigate("/company-login");
    }
  }, [navigate]);

  const loadJobs = async (companyId: string) => {
    const { data, error } = await supabase
      .from("jobs")
      .select("id, nome_vaga, is_active")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading jobs:", error);
      toast.error("Erro ao carregar vagas");
      return;
    }

    setJobs(data || []);
  };

  if (!company) {
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
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-6">
                  Você ainda não possui vagas cadastradas
                </p>
                <Button
                  onClick={() => navigate("/company-dashboard/new-job")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-xl"
                >
                  Cadastrar primeira vaga
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
                  SUAS VAGAS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.map((job) => (
                    <Button
                      key={job.id}
                      onClick={() => navigate(`/company-dashboard/job/${job.id}`)}
                      className={`h-auto py-6 text-lg font-bold rounded-xl ${
                        job.is_active
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-gray-400 hover:bg-gray-500"
                      } text-white`}
                    >
                      {job.nome_vaga.toUpperCase()}
                      {!job.is_active && (
                        <span className="block text-sm font-normal mt-1">(Inativa)</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => navigate("/company-dashboard/manage-jobs")}
            className="text-blue-600"
          >
            Voltar ao gerenciamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobsList;
