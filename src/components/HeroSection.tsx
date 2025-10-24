import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import goAraguainaLogo from "@/assets/logo-go-araguaina.png";
import araguainaCity from "@/assets/araguaina-city.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      {/* Faixa diagonal no lado direito */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-[40%] bg-purple-100/70 backdrop-blur-sm"
        style={{
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={araguainaCity} 
            alt="Vista aérea da cidade de Araguaína"
            className="h-full w-full object-cover object-center opacity-90"
          />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <img 
              src={goAraguainaLogo} 
              alt="GO Araguaína - Logotipo"
              className="w-48 md:w-64 h-auto"
            />
          </div>

          {/* Texto */}
          <div className="mb-8 animate-fade-in space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Conectando você às oportunidades da cidade.
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              O GO Araguaína é a plataforma que une cidadãos, trabalhadores e empresas locais, 
              promovendo crescimento e novas oportunidades para toda a comunidade.
            </p>
          </div>

          {/* Botão */}
          <div className="animate-fade-in">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
            >
              Entrar no Portal
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
