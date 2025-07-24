import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search, Phone, Mail, Calendar, Star } from "lucide-react";
import { NewClientModal } from "@/components/NewClientModal";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: 1,
      name: "João Silva",
      phone: "(11) 99999-9999",
      email: "joao@email.com",
      lastVisit: "2024-01-15",
      totalVisits: 12,
      totalSpent: 540,
      favoriteBarber: "Carlos",
      rating: 4.8,
      status: "vip",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Pedro Santos",
      phone: "(11) 88888-8888",
      email: "pedro@email.com",
      lastVisit: "2024-01-10",
      totalVisits: 8,
      totalSpent: 320,
      favoriteBarber: "Lucas",
      rating: 4.5,
      status: "regular",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Maria Oliveira",
      phone: "(11) 77777-7777",
      email: "maria@email.com",
      lastVisit: "2024-01-08",
      totalVisits: 5,
      totalSpent: 175,
      favoriteBarber: "Ana",
      rating: 4.9,
      status: "new",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return <Badge className="bg-primary/10 text-primary border-primary/20">VIP</Badge>;
      case "regular":
        return <Badge className="bg-success/10 text-success border-success/20">Regular</Badge>;
      case "new":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Novo</Badge>;
      default:
        return <Badge variant="outline">Padrão</Badge>;
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie sua base de clientes</p>
        </div>
        <NewClientModal>
          <Button className="bg-primary hover:bg-primary-hover shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </NewClientModal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total de Clientes</p>
                <p className="text-3xl font-bold text-foreground">1.247</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Novos Este Mês</p>
                <p className="text-3xl font-bold text-foreground">47</p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <Plus className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Clientes VIP</p>
                <p className="text-3xl font-bold text-foreground">89</p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <Star className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Ticket Médio</p>
                <p className="text-3xl font-bold text-foreground">R$ 38</p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Lista de Clientes
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                      <AvatarImage src={client.photo} alt={client.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        {client.name}
                        {getStatusBadge(client.status)}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {client.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {client.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm">
                        <span className="text-muted-foreground">
                          Última visita: {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-primary font-medium">
                          Barbeiro favorito: {client.favoriteBarber}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-2">
                      <Star className="w-4 h-4 text-primary fill-primary mr-1" />
                      <span className="text-sm font-medium text-foreground">{client.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{client.totalVisits} visitas</p>
                    <p className="text-lg font-bold text-success">R$ {client.totalSpent}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="border-success/20 hover:bg-success/10">
                        Agendar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;