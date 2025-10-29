import { useEffect, useState } from "react";
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
    <div key={section.id} className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center" style={getColorStyle(section)}>
        {section.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2" style={getBorderStyle(section)}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={getLightBgStyle(section)}>
              <User className="w-8 h-8" style={getColorStyle(section)} />
            </div>
            <h3 className="text-lg font-semibold">Perfil profissional</h3>
            <Button className="w-full" style={getBgColorStyle(section)}>
              CADASTRE SEU CURRÍCULO
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2" style={getBorderStyle(section)}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={getLightBgStyle(section)}>
              <Briefcase className="w-8 h-8" style={getColorStyle(section)} />
            </div>
            <h3 className="text-lg font-semibold">Vagas de emprego</h3>
            <Button className="w-full" style={getBgColorStyle(section)}>
              ENCONTRE VAGAS
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2" style={getBorderStyle(section)}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={getLightBgStyle(section)}>
              <GraduationCap className="w-8 h-8" style={getColorStyle(section)} />
            </div>
            <h3 className="text-lg font-semibold">Qualificação profissional gratuita</h3>
            <Button className="w-full" style={getBgColorStyle(section)}>
              CONHEÇA OS CURSOS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCompaniesSection = (section: MenuSection) => (
    <div key={section.id} className="border-2 rounded-lg p-8 space-y-6" style={getBorderStyle(section)}>
      <h2 className="text-3xl md:text-4xl font-bold text-center" style={getColorStyle(section)}>
        {section.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex-shrink-0" style={getLightBgStyle(section)}>
            <Building2 className="w-8 h-8 p-1.5" style={getColorStyle(section)} />
          </div>
          <p className="text-sm">Possibilidade de anexo projeto na vit Agência de Emprego</p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex-shrink-0" style={getLightBgStyle(section)}>
            <FileCheck className="w-8 h-8 p-1.5" style={getColorStyle(section)} />
          </div>
          <p className="text-sm">Solução assertiva para as suas necessidades</p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex-shrink-0" style={getLightBgStyle(section)}>
            <FileText className="w-8 h-8 p-1.5" style={getColorStyle(section)} />
          </div>
          <p className="text-sm">Divulgação das vagas de emprego</p>
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" style={getBgColorStyle(section)}>
          ACESSE O PORTAL DAS EMPRESAS
        </Button>
      </div>
    </div>
  );

  const renderAutonomousSection = (section: MenuSection) => (
    <div key={section.id} className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center" style={getColorStyle(section)}>
        {section.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2" style={getBorderStyle(section)}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={getLightBgStyle(section)}>
              <Wrench className="w-8 h-8" style={getColorStyle(section)} />
            </div>
            <h3 className="text-lg font-semibold">Vincule para seus serviços</h3>
            <Button className="w-full" style={getBgColorStyle(section)}>
              OFEREÇA SEUS SERVIÇOS
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2" style={getBorderStyle(section)}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={getLightBgStyle(section)}>
              <Search className="w-8 h-8" style={getColorStyle(section)} />
            </div>
            <h3 className="text-lg font-semibold">Oportunidades de Serviços</h3>
            <Button className="w-full" style={getBgColorStyle(section)}>
              BUSQUE OPORTUNIDADES
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2" style={getBorderStyle(section)}>
          <CardContent className="p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg" style={getLightBgStyle(section)}>
              <GraduationCap className="w-8 h-8" style={getColorStyle(section)} />
            </div>
            <h3 className="text-lg font-semibold">Título de Capacitação Profissional</h3>
            <Button className="w-full" style={getBgColorStyle(section)}>
              CONHEÇA OS CURSOS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderServiceSeekersSection = (section: MenuSection) => (
    <div key={section.id} className="border-2 rounded-lg p-8 space-y-6" style={getBorderStyle(section)}>
      <h2 className="text-3xl md:text-4xl font-bold text-center" style={getColorStyle(section)}>
        {section.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg flex-shrink-0" style={getLightBgStyle(section)}>
            <UserPlus className="w-12 h-12 p-2.5" style={getColorStyle(section)} />
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium">Conheça os profissionais da GO e contrate seus serviços</p>
            <Button className="w-full" style={getBgColorStyle(section)}>
              BUSQUE PROFISSIONAIS
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg flex-shrink-0" style={getLightBgStyle(section)}>
            <FileText className="w-12 h-12 p-2.5" style={getColorStyle(section)} />
          </div>
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium">Receba propostas de serviços</p>
            <Button className="w-full" style={getBgColorStyle(section)}>
              RECEBA PROPOSTAS
            </Button>
          </div>
        </div>
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
