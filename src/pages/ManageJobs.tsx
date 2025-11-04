import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useSiteLogo } from "@/hooks/useSiteLogo";

interface CompanySession {
  id: string;
  email: string;
  nome_fantasia: string;
}

const ManageJobs = () => {
  const navigate = useNavigate();
  const { logo } = useSiteLogo();
  const [company, setCompany] = useState<CompanySession | null>(null);

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

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <img src={logo} alt="Conecta Araguaína" className="h-16 mx-auto mb-6" />
        </div>

        {/* Main Card */}
        <Card className="border-4 border-gray-300 rounded-3xl shadow-xl">
          <CardContent className="p-12 space-y-8">
            <div className="space-y-6">
              <Button
                onClick={() => navigate("/company-dashboard/new-job")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-xl font-bold rounded-xl shadow-lg"
                size="lg"
              >
                DISPONIBILIZAR VAGA
              </Button>

              <Button
                onClick={() => navigate("/company-dashboard/jobs-list")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-xl font-bold rounded-xl shadow-lg"
                size="lg"
              >
                DESATIVAR/EXCLUIR VAGA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => navigate("/company-dashboard")}
            className="text-blue-600"
          >
            Voltar ao painel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
