import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NewAppointmentModal } from "@/components/NewAppointmentModal";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const appointments = [
    { id: 1, client: "João Silva", barber: "Carlos", service: "Corte + Barba", time: "09:00", duration: 45, status: "confirmed", value: 45 },
    { id: 2, client: "Pedro Santos", barber: "Lucas", service: "Corte Masculino", time: "09:30", duration: 30, status: "in_progress", value: 25 },
    { id: 3, client: "Maria Oliveira", barber: "Ana", service: "Corte Feminino", time: "10:00", duration: 60, status: "waiting", value: 35 },
    { id: 4, client: "Roberto Lima", barber: "Carlos", service: "Barba + Bigode", time: "10:30", duration: 30, status: "confirmed", value: 30 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success/10 text-success border-success/20">Confirmado</Badge>;
      case "in_progress":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Em Andamento</Badge>;
      case "waiting":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Aguardando</Badge>;
      case "completed":
        return <Badge className="bg-muted text-muted-foreground">Concluído</Badge>;
      default:
        return <Badge variant="outline">Indefinido</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os agendamentos da barbearia</p>
        </div>
        <NewAppointmentModal>
          <Button className="bg-primary hover:bg-primary-hover shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </NewAppointmentModal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Data</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Cliente ou barbeiro..." className="pl-10 bg-input border-border" />
              </div>
            </div>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Agendamentos do Dia</span>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {appointments.length} agendamentos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{appointment.client}</h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.service} • {appointment.barber}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm font-medium text-primary">{appointment.time}</span>
                            <span className="text-sm text-muted-foreground">{appointment.duration} min</span>
                            <span className="text-sm font-semibold text-success">R$ {appointment.value}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(appointment.status)}
                        <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Appointments;