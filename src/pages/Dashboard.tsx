import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Scissors, TrendingUp, Clock, Star, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "23",
      change: "+12%",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 45.280",
      change: "+23%",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Clientes Ativos",
      value: "1.247",
      change: "+8%",
      icon: Users,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Barbeiros Ativos",
      value: "12",
      change: "0%",
      icon: Scissors,
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const todayAppointments = [
    { id: 1, client: "João Silva", barber: "Carlos", service: "Corte + Barba", time: "09:00", status: "confirmed", value: "R$ 45" },
    { id: 2, client: "Pedro Santos", barber: "Lucas", service: "Corte Masculino", time: "09:30", status: "in_progress", value: "R$ 25" },
    { id: 3, client: "Maria Oliveira", barber: "Ana", service: "Corte Feminino", time: "10:00", status: "waiting", value: "R$ 35" },
    { id: 4, client: "Roberto Lima", barber: "Carlos", service: "Barba + Bigode", time: "10:30", status: "confirmed", value: "R$ 30" },
    { id: 5, client: "Fernando Costa", barber: "Lucas", service: "Corte Social", time: "11:00", status: "confirmed", value: "R$ 20" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Confirmado</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Em Andamento</Badge>;
      case "waiting":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Aguardando</Badge>;
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Olá, {user?.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Aqui está o resumo da sua barbearia hoje
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success font-medium">{stat.change}</span>
                    <span className="text-sm text-muted-foreground ml-1">vs mês anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Agendamentos de Hoje
                </CardTitle>
                <CardDescription>
                  {todayAppointments.length} agendamentos para hoje
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{appointment.client}</h4>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service} • {appointment.barber}
                      </p>
                      <p className="text-sm text-primary font-medium">{appointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-success">{appointment.value}</span>
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Performance */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Horário
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <DollarSign className="w-4 h-4 mr-2" />
                Registrar Venda
              </Button>
            </CardContent>
          </Card>

          {/* Top Barbers */}
          <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                Top Barbeiros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Carlos Silva", rating: 4.9, services: 42, revenue: "R$ 1.680" },
                { name: "Lucas Santos", rating: 4.8, services: 38, revenue: "R$ 1.520" },
                { name: "Ana Costa", rating: 4.7, services: 35, revenue: "R$ 1.400" }
              ].map((barber, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-bold text-background">
                      {barber.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{barber.name}</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-primary fill-primary mr-1" />
                        <span className="text-sm text-muted-foreground">{barber.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">{barber.revenue}</p>
                    <p className="text-xs text-muted-foreground">{barber.services} serviços</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;