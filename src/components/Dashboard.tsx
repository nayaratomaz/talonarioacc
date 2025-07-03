import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Car, Clock, CheckCircle, XCircle } from "lucide-react";

interface Citation {
  id: string;
  plate: string;
  vehicle: string;
  violation: string;
  location: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
  agent: string;
}

interface DashboardProps {
  onNewCitation: () => void;
  onViewCitation: (id: string) => void;
}

const mockCitations: Citation[] = [
  {
    id: "001",
    plate: "ABC-1234",
    vehicle: "Honda Civic 2020",
    violation: "Art. 165 - Dirigir sem cinto",
    location: "Av. Paulista, 1000",
    date: "03/07/2025 14:30",
    status: "pending",
    agent: "José Silva"
  },
  {
    id: "002", 
    plate: "DEF-5678",
    vehicle: "Toyota Corolla 2019",
    violation: "Art. 218 - Velocidade superior permitida",
    location: "Rua Augusta, 500",
    date: "03/07/2025 13:15",
    status: "completed",
    agent: "José Silva"
  },
  {
    id: "003",
    plate: "GHI-9012",
    vehicle: "Volkswagen Gol 2018",
    violation: "Art. 181 - Estacionar em local proibido",
    location: "Praça da Sé, s/n",
    date: "03/07/2025 12:00",
    status: "cancelled",
    agent: "José Silva"
  }
];

const getStatusIcon = (status: Citation["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "cancelled":
      return <XCircle className="w-4 h-4" />;
  }
};

const getStatusVariant = (status: Citation["status"]) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "completed":
      return "default";
    case "cancelled":
      return "destructive";
  }
};

const getStatusLabel = (status: Citation["status"]) => {
  switch (status) {
    case "pending":
      return "Em análise";
    case "completed":
      return "Concluído";
    case "cancelled":
      return "Cancelado";
  }
};

export default function Dashboard({ onNewCitation, onViewCitation }: DashboardProps) {
  const [citations] = useState<Citation[]>(mockCitations);

  const stats = {
    total: citations.length,
    pending: citations.filter(c => c.status === "pending").length,
    completed: citations.filter(c => c.status === "completed").length,
    cancelled: citations.filter(c => c.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Painel de Autuações</h1>
          <p className="text-muted-foreground">Agente: José Silva - CRT: 12345</p>
        </div>
        <Button
          onClick={onNewCitation}
          variant="official"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Autuação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cancelados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Citations List */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Autuações Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {citations.map((citation) => (
            <div
              key={citation.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onViewCitation(citation.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{citation.plate}</span>
                </div>
                <Badge 
                  variant={getStatusVariant(citation.status)}
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(citation.status)}
                  {getStatusLabel(citation.status)}
                </Badge>
              </div>

              <div className="space-y-1 text-sm">
                <p className="font-medium">{citation.vehicle}</p>
                <p className="text-muted-foreground">{citation.violation}</p>
                <p className="text-muted-foreground">{citation.location}</p>
                <p className="text-xs text-muted-foreground">{citation.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}