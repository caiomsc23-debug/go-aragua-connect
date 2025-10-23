import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-sm font-medium text-muted-foreground">
            Prefeitura de Araguaína
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className="text-primary">GO</span>
            <span className="text-foreground"> Araguaína</span>
          </div>
        </div>

        <Button variant="default" className="gap-2">
          <LogIn className="w-4 h-4" />
          Área do Trabalhador
        </Button>
      </div>
    </header>
  );
};

export default Header;
