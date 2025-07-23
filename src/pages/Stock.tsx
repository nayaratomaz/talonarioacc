import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Stock = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estoque</h1>
          <p className="text-muted-foreground mt-1">Controle de produtos e suprimentos</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Produtos</p>
                <p className="text-3xl font-bold text-foreground">156</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Estoque Baixo</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Valor Total</p>
                <p className="text-3xl font-bold text-foreground">R$ 8.450</p>
              </div>
              <Package className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stock;