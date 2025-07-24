import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NewAppointmentModalProps {
  children: React.ReactNode;
}

const services = [
  { id: 1, name: "Corte Masculino", duration: 30, price: 25 },
  { id: 2, name: "Corte + Barba", duration: 45, price: 45 },
  { id: 3, name: "Barba + Bigode", duration: 30, price: 30 },
  { id: 4, name: "Corte Feminino", duration: 60, price: 35 },
  { id: 5, name: "Escova", duration: 45, price: 40 },
  { id: 6, name: "Sobrancelha", duration: 15, price: 15 },
];

const barbers = [
  { id: 1, name: "Carlos Silva", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: "Lucas Santos", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: "Ana Costa", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00"
];

export const NewAppointmentModal = ({ children }: NewAppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedServices, setSelectedServices] = useState<typeof services>([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [observations, setObservations] = useState("");
  const { toast } = useToast();

  const addService = (serviceId: string) => {
    const service = services.find(s => s.id === parseInt(serviceId));
    if (service && !selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceId: number) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const handleSubmit = () => {
    if (!date || !selectedBarber || !selectedTime || !clientName || !clientPhone || selectedServices.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Agendamento criado!",
      description: `Agendamento de ${clientName} criado com sucesso.`,
    });

    // Reset form
    setDate(undefined);
    setSelectedServices([]);
    setSelectedBarber("");
    setSelectedTime("");
    setClientName("");
    setClientPhone("");
    setObservations("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
            Novo Agendamento
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Dados do Cliente</h3>
            
            <div className="space-y-2">
              <Label htmlFor="clientName">Nome *</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome completo do cliente"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">WhatsApp *</Label>
              <Input
                id="clientPhone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Observações especiais..."
                className="bg-input border-border"
                rows={3}
              />
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Detalhes do Agendamento</h3>

            {/* Data */}
            <div className="space-y-2">
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-input border-border",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Barbeiro */}
            <div className="space-y-2">
              <Label>Barbeiro *</Label>
              <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione o barbeiro" />
                </SelectTrigger>
                <SelectContent>
                  {barbers.map((barber) => (
                    <SelectItem key={barber.id} value={barber.id.toString()}>
                      <div className="flex items-center">
                        <img 
                          src={barber.photo} 
                          alt={barber.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        {barber.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Horário */}
            <div className="space-y-2">
              <Label>Horário *</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Serviços */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Serviços *</h3>
          
          <div className="space-y-2">
            <Label>Adicionar Serviço</Label>
            <Select onValueChange={addService}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem 
                    key={service.id} 
                    value={service.id.toString()}
                    disabled={selectedServices.find(s => s.id === service.id) !== undefined}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{service.name}</span>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-muted-foreground">{service.duration}min</span>
                        <span className="text-success font-medium">R$ {service.price}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Serviços Selecionados */}
          {selectedServices.length > 0 && (
            <div className="space-y-2">
              <Label>Serviços Selecionados</Label>
              <div className="space-y-2">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {service.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{service.duration}min</span>
                      <span className="text-sm font-medium text-success">R$ {service.price}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(service.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Resumo */}
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-foreground">Total:</span>
                  <span className="text-sm text-muted-foreground">{getTotalDuration()} minutos</span>
                </div>
                <span className="text-lg font-bold text-primary">R$ {getTotalPrice()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Criar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};