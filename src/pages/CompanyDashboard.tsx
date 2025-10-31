import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, LogOut, Briefcase, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface CompanySession {
  id: string;
  email: string;
  nome_fantasia: string;
}

const CompanyDashboard = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem("company_session");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{company.nome_fantasia}</h1>
              <p className="text-sm text-muted-foreground">{company.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Bem-vindo ao Portal das Empresas
            </h2>
            <p className="text-muted-foreground">
              Gerencie seus serviços e vagas de emprego disponíveis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Vagas de Emprego</CardTitle>
                <CardDescription>
                  Cadastre e gerencie suas vagas disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>
                  Em breve
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Serviços</CardTitle>
                <CardDescription>
                  Divulgue os serviços da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>
                  Em breve
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription>
                  Atualize os dados da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>
                  Em breve
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Próximas funcionalidades</h3>
                  <p className="text-sm text-muted-foreground">
                    Estamos trabalhando para trazer novas funcionalidades para o portal das empresas. 
                    Em breve você poderá cadastrar vagas, divulgar serviços e muito mais!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
