import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const companySchema = z.object({
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos").max(18, "CNPJ inválido"),
  razao_social: z.string().min(1, "Razão Social é obrigatória"),
  nome_fantasia: z.string().min(1, "Nome Fantasia é obrigatório"),
  data_abertura: z.string().min(1, "Data de Abertura é obrigatória"),
  email: z.string().email("E-mail inválido"),
  porte: z.string().min(1, "Porte é obrigatório"),
  cnaes: z.string().min(1, "CNAES é obrigatório"),
  natureza_juridica: z.string().min(1, "Natureza Jurídica é obrigatória"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  nome_responsavel: z.string().min(1, "Nome do Responsável é obrigatório"),
  cpf_responsavel: z.string().min(11, "CPF deve ter 11 dígitos").max(14, "CPF inválido"),
  telefone_responsavel: z.string().min(10, "Telefone inválido"),
  cargo_responsavel: z.string().min(1, "Cargo do Responsável é obrigatório"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  password_confirmation: z.string().min(8, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "As senhas não coincidem",
  path: ["password_confirmation"],
});

type CompanyFormData = z.infer<typeof companySchema>;

const CompanyPortal = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);
    try {
      const { password_confirmation, password, ...companyData } = data;
      
      const { error } = await supabase
        .from("companies")
        .insert({
          cnpj: companyData.cnpj,
          razao_social: companyData.razao_social,
          nome_fantasia: companyData.nome_fantasia,
          data_abertura: companyData.data_abertura,
          email: companyData.email,
          porte: companyData.porte,
          cnaes: companyData.cnaes,
          natureza_juridica: companyData.natureza_juridica,
          endereco: companyData.endereco,
          nome_responsavel: companyData.nome_responsavel,
          cpf_responsavel: companyData.cpf_responsavel,
          telefone_responsavel: companyData.telefone_responsavel,
          cargo_responsavel: companyData.cargo_responsavel,
          password_hash: password,
        });

      if (error) throw error;

      // Store company session after successful registration
      localStorage.setItem("company_session", JSON.stringify({
        id: (await supabase.from("companies").select("id").eq("email", companyData.email).single()).data?.id,
        email: companyData.email,
        nome_fantasia: companyData.nome_fantasia,
      }));

      toast.success("Cadastro realizado com sucesso!");
      navigate("/company-dashboard");
    } catch (error: any) {
      console.error("Error registering company:", error);
      toast.error(error.message || "Erro ao cadastrar empresa");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
          PORTAL DAS EMPRESAS
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                {...register("cnpj")}
                placeholder="00.000.000/0000-00"
                className={errors.cnpj ? "border-red-500" : ""}
              />
              {errors.cnpj && (
                <p className="text-sm text-red-500">{errors.cnpj.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="razao_social">Razão Social *</Label>
              <Input
                id="razao_social"
                {...register("razao_social")}
                className={errors.razao_social ? "border-red-500" : ""}
              />
              {errors.razao_social && (
                <p className="text-sm text-red-500">{errors.razao_social.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome_fantasia">Nome Fantasia *</Label>
              <Input
                id="nome_fantasia"
                {...register("nome_fantasia")}
                className={errors.nome_fantasia ? "border-red-500" : ""}
              />
              {errors.nome_fantasia && (
                <p className="text-sm text-red-500">{errors.nome_fantasia.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_abertura">Data de Abertura *</Label>
              <Input
                id="data_abertura"
                type="date"
                {...register("data_abertura")}
                className={errors.data_abertura ? "border-red-500" : ""}
              />
              {errors.data_abertura && (
                <p className="text-sm text-red-500">{errors.data_abertura.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="porte">Porte *</Label>
              <Input
                id="porte"
                {...register("porte")}
                placeholder="Ex: MEI, Pequeno, Médio, Grande"
                className={errors.porte ? "border-red-500" : ""}
              />
              {errors.porte && (
                <p className="text-sm text-red-500">{errors.porte.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnaes">CNAES *</Label>
              <Input
                id="cnaes"
                {...register("cnaes")}
                className={errors.cnaes ? "border-red-500" : ""}
              />
              {errors.cnaes && (
                <p className="text-sm text-red-500">{errors.cnaes.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="natureza_juridica">Natureza Jurídica *</Label>
              <Input
                id="natureza_juridica"
                {...register("natureza_juridica")}
                className={errors.natureza_juridica ? "border-red-500" : ""}
              />
              {errors.natureza_juridica && (
                <p className="text-sm text-red-500">{errors.natureza_juridica.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="endereco">Endereço *</Label>
              <Input
                id="endereco"
                {...register("endereco")}
                className={errors.endereco ? "border-red-500" : ""}
              />
              {errors.endereco && (
                <p className="text-sm text-red-500">{errors.endereco.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome_responsavel">Nome do Responsável *</Label>
              <Input
                id="nome_responsavel"
                {...register("nome_responsavel")}
                className={errors.nome_responsavel ? "border-red-500" : ""}
              />
              {errors.nome_responsavel && (
                <p className="text-sm text-red-500">{errors.nome_responsavel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf_responsavel">CPF do Responsável *</Label>
              <Input
                id="cpf_responsavel"
                {...register("cpf_responsavel")}
                placeholder="000.000.000-00"
                className={errors.cpf_responsavel ? "border-red-500" : ""}
              />
              {errors.cpf_responsavel && (
                <p className="text-sm text-red-500">{errors.cpf_responsavel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone_responsavel">Telefone do Responsável *</Label>
              <Input
                id="telefone_responsavel"
                {...register("telefone_responsavel")}
                placeholder="(00) 00000-0000"
                className={errors.telefone_responsavel ? "border-red-500" : ""}
              />
              {errors.telefone_responsavel && (
                <p className="text-sm text-red-500">{errors.telefone_responsavel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo_responsavel">Cargo do Responsável *</Label>
              <Input
                id="cargo_responsavel"
                {...register("cargo_responsavel")}
                className={errors.cargo_responsavel ? "border-red-500" : ""}
              />
              {errors.cargo_responsavel && (
                <p className="text-sm text-red-500">{errors.cargo_responsavel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirmação da Senha *</Label>
              <div className="relative">
                <Input
                  id="password_confirmation"
                  type={showPasswordConfirmation ? "text" : "password"}
                  {...register("password_confirmation")}
                  className={errors.password_confirmation ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswordConfirmation ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="bg-[#E63946] hover:bg-[#E63946]/90 text-white px-8"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#8A00B8] hover:bg-[#8A00B8]/90 text-white px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyPortal;
