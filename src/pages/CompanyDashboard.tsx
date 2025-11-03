import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, AlertTriangle } from "lucide-react";
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

interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanySession | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
      loadNotifications(companyData.id);
    } catch (error) {
      localStorage.removeItem("company_session");
      navigate("/company-login");
    }
  }, [navigate]);

  const loadNotifications = async (companyId: string) => {
    const { data, error } = await supabase
      .from("company_notifications")
      .select("*")
      .eq("company_id", companyId)
      .eq("is_read", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading notifications:", error);
      return;
    }

    setNotifications(data || []);
  };

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <img src={logoImage} alt="Conecta Araguaína" className="h-16 mx-auto mb-4" />
          <div className="inline-block bg-blue-100 px-8 py-3 rounded-lg">
            <h1 className="text-2xl font-bold text-blue-900">PAINEL ADMINISTRATIVO</h1>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-700">
            Olá, seja bem-vindo <span className="font-bold text-blue-900">({company.nome_fantasia})</span>
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-4 border-gray-300 rounded-3xl shadow-xl">
          <CardContent className="p-8 space-y-6">
            {/* Notifications Box */}
            <div className="bg-blue-100 border-4 border-blue-300 rounded-2xl p-6 relative">
              {notifications.length > 0 ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold">NOTIFICAÇÕES</span>
                </div>
              ) : null}
              <div className="text-center pt-2">
                {notifications.length === 0 ? (
                  <div className="space-y-2">
                    <Bell className="w-12 h-12 mx-auto text-blue-600" />
                    <p className="text-blue-900 font-semibold text-lg">
                      VOCÊ NÃO POSSUI NOTIFICAÇÕES NO MOMENTO
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="bg-white p-4 rounded-lg text-left">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(notification.created_at).toLocaleString("pt-BR")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Manage Jobs Button */}
            <div className="text-center pt-4">
              <Button
                onClick={() => navigate("/company-dashboard/manage-jobs")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg"
                size="lg"
              >
                GERENCIAR VAGAS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-blue-600"
          >
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
