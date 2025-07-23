import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground mt-1">Análises e métricas detalhadas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Faturamento</p>
                <p className="text-2xl font-bold text-foreground">R$ 45.280</p>
              </div>
              <BarChart3 className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Crescimento</p>
                <p className="text-2xl font-bold text-foreground">+23%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Clientes</p>
                <p className="text-2xl font-bold text-foreground">1.247</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Agendamentos</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <Calendar className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;