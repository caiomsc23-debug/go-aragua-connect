import { UserPlus, Link2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Cadastre-se",
    description: "Crie sua conta gratuitamente em poucos minutos"
  },
  {
    icon: Link2,
    title: "Conecte-se",
    description: "Encontre as melhores oportunidades para você"
  },
  {
    icon: Rocket,
    title: "Comece a trabalhar",
    description: "Inicie sua jornada de crescimento profissional"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona?</h2>
          <p className="text-lg text-muted-foreground">Comece em 3 passos simples</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow text-white shadow-strong">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold -mt-16 ml-12 md:ml-20">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 text-primary">
                      <ArrowRight className="w-8 h-8 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
