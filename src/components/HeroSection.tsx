import { Button } from "@/components/ui/button";
import { Search, Briefcase, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-araguaina-new.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-accent/75" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Conectando você às oportunidades da cidade.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in">
            O GO Araguaína é a plataforma que une cidadãos, trabalhadores e empresas locais, 
            promovendo crescimento e novas oportunidades para toda a comunidade.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button size="lg" variant="secondary" className="gap-2 shadow-strong">
              <Search className="w-5 h-5" />
              Encontrar serviços
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Briefcase className="w-5 h-5" />
              Buscar vagas
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Building2 className="w-5 h-5" />
              Cadastrar negócio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
