import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CompanySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <CheckCircle className="w-24 h-24 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Cadastro realizado com sucesso!
        </h1>
        <p className="text-lg text-muted-foreground">
          Sua empresa foi cadastrada em nosso portal. Em breve entraremos em contato.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-[#8A00B8] hover:bg-[#8A00B8]/90 text-white"
        >
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
};

export default CompanySuccess;
