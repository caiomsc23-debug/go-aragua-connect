import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText, Building2, User, FileCheck, Search, GraduationCap, Wrench, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface MenuSection {
  id: string;
  section_key: string;
  title: string;
  is_visible: boolean;
  display_order: number;
  color_hue: number;
  color_saturation: number;
  color_lightness: number;
}

const ServicesSection = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_sections")
        .select("*")
        .eq("is_visible", true)
        .order("display_order");

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error("Error loading sections:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  const getColorStyle = (section: MenuSection) => ({
    color: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)`
  });

  const getBgColorStyle = (section: MenuSection) => ({
    backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)`,
    color: 'white'
  });

  const getLightBgStyle = (section: MenuSection) => ({
    backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, 90%)`
  });

  const getBorderStyle = (section: MenuSection) => ({
    borderColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)`
  });

  const renderJobSeekersSection = (section: MenuSection) => (
    <div key={section.id} className="relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl" 
         style={{ background: `linear-gradient(135deg, hsl(${section.color_hue}, ${section.color_saturation}%, 95%) 0%, hsl(${section.color_hue}, ${section.color_saturation}%, 98%) 100%)` }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center gap-3" style={getColorStyle(section)}>
          <Search className="w-8 h-8" />
          {section.title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold min-h-[3rem] flex items-center">Perfil profissional</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              CADASTRE SEU CURRÍCULO
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold min-h-[3rem] flex items-center">Vagas de emprego</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              ENCONTRE VAGAS
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold min-h-[3rem] flex items-center">Qualificação profissional gratuita</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              CONHEÇA OS CURSOS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCompaniesSection = (section: MenuSection) => (
    <div key={section.id} className="relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl"
         style={{ background: `linear-gradient(135deg, hsl(${section.color_hue}, ${section.color_saturation}%, 95%) 0%, hsl(${section.color_hue}, ${section.color_saturation}%, 98%) 100%)` }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center gap-3" style={getColorStyle(section)}>
          <Building2 className="w-8 h-8" />
          {section.title}
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md" 
                   style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-medium">Possibilidade de anexo projeto na vit Agência de Emprego</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md" 
                   style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
                <FileCheck className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-medium">Solução assertiva para as suas necessidades</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur md:col-span-2">
            <CardContent className="p-6 flex items-center gap-4 justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md" 
                   style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
                <FileText className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-medium">Divulgação das vagas de emprego</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-4">
          <Button 
            size="lg" 
            className="rounded-xl shadow-lg hover:shadow-xl transition-all text-lg px-12 py-6 h-auto"
            style={getBgColorStyle(section)}
            onClick={() => navigate("/company-portal")}
          >
            ACESSE O PORTAL DAS EMPRESAS
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAutonomousSection = (section: MenuSection) => (
    <div key={section.id} className="relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl"
         style={{ background: `linear-gradient(135deg, hsl(${section.color_hue}, ${section.color_saturation}%, 95%) 0%, hsl(${section.color_hue}, ${section.color_saturation}%, 98%) 100%)` }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center gap-3" style={getColorStyle(section)}>
          <Wrench className="w-8 h-8" />
          {section.title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold min-h-[3rem] flex items-center">Vincule para seus serviços</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              OFEREÇA SEUS SERVIÇOS
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold min-h-[3rem] flex items-center">Oportunidades de Serviços</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              BUSQUE OPORTUNIDADES
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold min-h-[3rem] flex items-center">Título de Capacitação Profissional</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              CONHEÇA OS CURSOS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderServiceSeekersSection = (section: MenuSection) => (
    <div key={section.id} className="relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-lg transition-all duration-300 hover:shadow-xl"
         style={{ background: `linear-gradient(135deg, hsl(${section.color_hue}, ${section.color_saturation}%, 95%) 0%, hsl(${section.color_hue}, ${section.color_saturation}%, 98%) 100%)` }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center gap-3" style={getColorStyle(section)}>
          <UserPlus className="w-8 h-8" />
          {section.title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-bold min-h-[3rem] flex items-center">Conheça os profissionais da GO e contrate seus serviços</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              BUSQUE PROFISSIONAIS
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur">
          <CardContent className="p-8 text-center space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-md" 
                 style={{ backgroundColor: `hsl(${section.color_hue}, ${section.color_saturation}%, ${section.color_lightness}%)` }}>
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-bold min-h-[3rem] flex items-center">Receba propostas de serviços</h3>
            <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-all" style={getBgColorStyle(section)}>
              RECEBA PROPOSTAS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 space-y-16">
        {sections.map((section) => {
          switch (section.section_key) {
            case 'job_seekers':
              return renderJobSeekersSection(section);
            case 'companies':
              return renderCompaniesSection(section);
            case 'autonomous':
              return renderAutonomousSection(section);
            case 'service_seekers':
              return renderServiceSeekersSection(section);
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
