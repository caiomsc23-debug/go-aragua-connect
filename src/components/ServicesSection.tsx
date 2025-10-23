import { Wrench, Briefcase, Building2, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Wrench,
    title: "Prestadores MEI",
    description: "Encontre profissionais qualificados para os serviços que você precisa",
    color: "text-primary"
  },
  {
    icon: Briefcase,
    title: "Vagas de Emprego",
    description: "Oportunidades de trabalho atualizadas diariamente na sua região",
    color: "text-secondary"
  },
  {
    icon: Building2,
    title: "Empresas",
    description: "Descubra empresas locais e serviços disponíveis em Araguaína",
    color: "text-accent"
  },
  {
    icon: GraduationCap,
    title: "Cursos",
    description: "Capacitações e treinamentos para impulsionar sua carreira",
    color: "text-primary"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviços e Oportunidades</h2>
          <p className="text-lg text-muted-foreground">Encontre o que precisa em poucos cliques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
