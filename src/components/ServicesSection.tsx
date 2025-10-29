import { Briefcase, FileText, Building2, User, FileCheck, Search, GraduationCap, Wrench, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 space-y-16">
        
        {/* Seção: Buscando emprego e qualificação? */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: 'hsl(180, 65%, 45%)' }}>
            Buscando emprego e qualificação?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2" style={{ borderColor: 'hsl(180, 65%, 45%)' }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: 'hsl(180, 65%, 90%)' }}>
                  <User className="w-8 h-8" style={{ color: 'hsl(180, 65%, 45%)' }} />
                </div>
                <h3 className="text-lg font-semibold">Perfil profissional</h3>
                <Button className="w-full" style={{ backgroundColor: 'hsl(180, 65%, 45%)', color: 'white' }}>
                  CADASTRE SEU CURRÍCULO
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: 'hsl(180, 65%, 45%)' }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: 'hsl(180, 65%, 90%)' }}>
                  <Briefcase className="w-8 h-8" style={{ color: 'hsl(180, 65%, 45%)' }} />
                </div>
                <h3 className="text-lg font-semibold">Vagas de emprego</h3>
                <Button className="w-full" style={{ backgroundColor: 'hsl(180, 65%, 45%)', color: 'white' }}>
                  ENCONTRE VAGAS
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: 'hsl(180, 65%, 45%)' }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: 'hsl(180, 65%, 90%)' }}>
                  <GraduationCap className="w-8 h-8" style={{ color: 'hsl(180, 65%, 45%)' }} />
                </div>
                <h3 className="text-lg font-semibold">Qualificação profissional gratuita</h3>
                <Button className="w-full" style={{ backgroundColor: 'hsl(180, 65%, 45%)', color: 'white' }}>
                  CONHEÇA OS CURSOS
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção: É uma empresa? */}
        <div className="border-2 rounded-lg p-8 space-y-6" style={{ borderColor: 'hsl(25, 100%, 50%)' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: 'hsl(25, 100%, 50%)' }}>
            É uma empresa?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: 'hsl(25, 100%, 85%)' }}>
                <Building2 className="w-8 h-8 p-1.5" style={{ color: 'hsl(25, 100%, 50%)' }} />
              </div>
              <p className="text-sm">Possibilidade de anexo projeto na vit Agência de Emprego</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: 'hsl(25, 100%, 85%)' }}>
                <FileCheck className="w-8 h-8 p-1.5" style={{ color: 'hsl(25, 100%, 50%)' }} />
              </div>
              <p className="text-sm">Solução assertiva para as suas necessidades</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: 'hsl(25, 100%, 85%)' }}>
                <FileText className="w-8 h-8 p-1.5" style={{ color: 'hsl(25, 100%, 50%)' }} />
              </div>
              <p className="text-sm">Divulgação das vagas de emprego</p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" style={{ backgroundColor: 'hsl(25, 100%, 50%)', color: 'white' }}>
              ACESSE O PORTAL DAS EMPRESAS
            </Button>
          </div>
        </div>

        {/* Seção: É autônomo? */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: 'hsl(280, 60%, 45%)' }}>
            É autônomo?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2" style={{ borderColor: 'hsl(280, 60%, 45%)' }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: 'hsl(280, 60%, 90%)' }}>
                  <Wrench className="w-8 h-8" style={{ color: 'hsl(280, 60%, 45%)' }} />
                </div>
                <h3 className="text-lg font-semibold">Vincule para seus serviços</h3>
                <Button className="w-full" style={{ backgroundColor: 'hsl(280, 60%, 45%)', color: 'white' }}>
                  OFEREÇA SEUS SERVIÇOS
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: 'hsl(280, 60%, 45%)' }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: 'hsl(280, 60%, 90%)' }}>
                  <Search className="w-8 h-8" style={{ color: 'hsl(280, 60%, 45%)' }} />
                </div>
                <h3 className="text-lg font-semibold">Oportunidades de Serviços</h3>
                <Button className="w-full" style={{ backgroundColor: 'hsl(280, 60%, 45%)', color: 'white' }}>
                  BUSQUE OPORTUNIDADES
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: 'hsl(280, 60%, 45%)' }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: 'hsl(280, 60%, 90%)' }}>
                  <GraduationCap className="w-8 h-8" style={{ color: 'hsl(280, 60%, 45%)' }} />
                </div>
                <h3 className="text-lg font-semibold">Título de Capacitação Profissional</h3>
                <Button className="w-full" style={{ backgroundColor: 'hsl(280, 60%, 45%)', color: 'white' }}>
                  CONHEÇA OS CURSOS
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção: Precisa de serviço? */}
        <div className="border-2 rounded-lg p-8 space-y-6" style={{ borderColor: 'hsl(330, 80%, 50%)' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: 'hsl(330, 80%, 50%)' }}>
            Precisa de serviço?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ backgroundColor: 'hsl(330, 80%, 90%)' }}>
                <UserPlus className="w-12 h-12 p-2.5" style={{ color: 'hsl(330, 80%, 50%)' }} />
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium">Conheça os profissionais da GO e contrate seus serviços</p>
                <Button className="w-full" style={{ backgroundColor: 'hsl(330, 80%, 50%)', color: 'white' }}>
                  BUSQUE PROFISSIONAIS
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ backgroundColor: 'hsl(330, 80%, 90%)' }}>
                <FileText className="w-12 h-12 p-2.5" style={{ color: 'hsl(330, 80%, 50%)' }} />
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm font-medium">Receba propostas de serviços</p>
                <Button className="w-full" style={{ backgroundColor: 'hsl(330, 80%, 50%)', color: 'white' }}>
                  RECEBA PROPOSTAS
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
