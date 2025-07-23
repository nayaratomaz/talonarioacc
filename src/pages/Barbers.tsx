import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, Plus, Star, Calendar, DollarSign } from "lucide-react";

const Barbers = () => {
  const barbers = [
    {
      id: 1,
      name: "Carlos Silva",
      specialties: ["Corte Masculino", "Barba", "Bigode"],
      rating: 4.9,
      experience: "8 anos",
      phone: "(11) 99999-9999",
      email: "carlos@barberpro.com",
      status: "active",
      monthlyRevenue: 8500,
      monthlyServices: 145,
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Lucas Santos",
      specialties: ["Corte Social", "Degradê", "Desenhos"],
      rating: 4.8,
      experience: "5 anos",
      phone: "(11) 88888-8888",
      email: "lucas@barberpro.com",
      status: "active",
      monthlyRevenue: 7200,
      monthlyServices: 128,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana Costa",
      specialties: ["Corte Feminino", "Escova", "Tratamentos"],
      rating: 4.7,
      experience: "6 anos",
      phone: "(11) 77777-7777",
      email: "ana@barberpro.com",
      status: "vacation",
      monthlyRevenue: 6800,
      monthlyServices: 112,
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Barbeiros</h1>
          <p className="text-muted-foreground mt-1">Gerencie sua equipe de profissionais</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Novo Barbeiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <Card key={barber.id} className="shadow-card bg-card/50 backdrop-blur border-border/50 hover:shadow-elevated transition-all duration-300">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto ring-4 ring-primary/20">
                <AvatarImage src={barber.photo} alt={barber.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {barber.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-foreground">{barber.name}</CardTitle>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm font-medium text-foreground">{barber.rating}</span>
                <span className="text-sm text-muted-foreground">• {barber.experience}</span>
              </div>
              <Badge className={barber.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>
                {barber.status === 'active' ? 'Ativo' : 'Férias'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Especialidades</h4>
                  <div className="flex flex-wrap gap-1">
                    {barber.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-muted/50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/10 mx-auto mb-1">
                      <DollarSign className="w-4 h-4 text-success" />
                    </div>
                    <p className="text-sm text-muted-foreground">Faturamento</p>
                    <p className="font-bold text-success">R$ {barber.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mx-auto mb-1">
                      <Scissors className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Serviços</p>
                    <p className="font-bold text-foreground">{barber.monthlyServices}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:bg-primary/10">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-success/20 hover:bg-success/10">
                    <Calendar className="w-3 h-3 mr-1" />
                    Agenda
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Barbers;