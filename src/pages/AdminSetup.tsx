import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const setupAdmin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('setup-admin', {
        body: {},
      });

      if (error) throw error;

      setCompleted(true);
      toast({
        title: "Sucesso!",
        description: data.message || "Administrador configurado com sucesso!",
      });

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erro na configuração",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Configuração do Administrador
          </CardTitle>
          <CardDescription className="text-center">
            Configure o acesso administrativo do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!completed ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Credenciais do Administrador:
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Email:</span> admin@goaraguaina.com
                  </p>
                  <p>
                    <span className="font-semibold">Senha:</span> go1234*
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Clique no botão abaixo para criar o usuário administrador com as
                credenciais acima.
              </p>
              <Button
                onClick={setupAdmin}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Configurando...
                  </>
                ) : (
                  "Configurar Administrador"
                )}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Administrador Configurado!
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Redirecionando para o login...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
