import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";

const Financial = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
        <p className="text-muted-foreground mt-1">Controle financeiro completo da barbearia</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Receita Hoje</p>
                <p className="text-3xl font-bold text-foreground">R$ 1.480</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Receita Mensal</p>
                <p className="text-3xl font-bold text-foreground">R$ 45.280</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Crescimento</p>
                <p className="text-3xl font-bold text-foreground">+23%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Comissões</p>
                <p className="text-3xl font-bold text-foreground">R$ 12.850</p>
              </div>
              <CreditCard className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Financial;