import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Prestadora de Serviços de Limpeza",
    text: "O GO Araguaína me ajudou a encontrar novos clientes e expandir meu negócio. Hoje tenho uma agenda cheia de trabalho!",
    rating: 5
  },
  {
    name: "João Santos",
    role: "Eletricista MEI",
    text: "Consegui dobrar minha renda depois que me cadastrei na plataforma. As oportunidades aparecem todos os dias!",
    rating: 5
  },
  {
    name: "Ana Paula",
    role: "Empresária Local",
    text: "Encontrei profissionais qualificados para minha empresa através do GO. A plataforma facilitou muito o processo de contratação.",
    rating: 5
  },
  {
    name: "Carlos Mendes",
    role: "Mecânico",
    text: "Depois de fazer o curso através da plataforma, consegui minha primeira vaga como mecânico. Muito grato!",
    rating: 5
  }
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Histórias de Sucesso</h2>
          <p className="text-lg text-muted-foreground">Veja como o GO Araguaína transformou vidas</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="h-full hover:shadow-medium transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
