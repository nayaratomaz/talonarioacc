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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, User, Plus, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NewClientModalProps {
  children: React.ReactNode;
}

const preferences = [
  { id: 1, name: "Corte Masculino", icon: "✂️" },
  { id: 2, name: "Barba", icon: "🧔" },
  { id: 3, name: "Bigode", icon: "👨" },
  { id: 4, name: "Sobrancelha", icon: "👁️" },
  { id: 5, name: "Escova", icon: "💨" },
  { id: 6, name: "Tratamentos", icon: "✨" }
];

export const NewClientModal = ({ children }: NewClientModalProps) => {
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState<Date>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);
  const [observations, setObservations] = useState("");
  const [photo, setPhoto] = useState("");
  const { toast } = useToast();

  const togglePreference = (prefId: number) => {
    setSelectedPreferences(prev => 
      prev.includes(prefId) 
        ? prev.filter(id => id !== prefId)
        : [...prev, prefId]
    );
  };

  const handleSubmit = () => {
    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e WhatsApp são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cliente cadastrado!",
      description: `${name} foi cadastrado com sucesso.`,
    });

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setBirthday(undefined);
    setSelectedPreferences([]);
    setObservations("");
    setPhoto("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Novo Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Foto do Cliente */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 ring-4 ring-primary/20">
              <AvatarImage src={photo} alt="Foto do cliente" />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="w-8 h-8" />}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
              <Upload className="w-4 h-4 mr-2" />
              Adicionar Foto
            </Button>
          </div>

          {/* Dados Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo do cliente"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-input border-border",
                      !birthday && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthday ? format(birthday, "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthday}
                    onSelect={setBirthday}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rua, número, bairro, cidade"
              className="bg-input border-border"
            />
          </div>

          {/* Preferências de Serviços */}
          <div className="space-y-4">
            <Label>Preferências de Serviços</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {preferences.map((preference) => (
                <Button
                  key={preference.id}
                  variant="outline"
                  onClick={() => togglePreference(preference.id)}
                  className={cn(
                    "h-auto py-3 flex flex-col items-center space-y-1",
                    selectedPreferences.includes(preference.id)
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <span className="text-xl">{preference.icon}</span>
                  <span className="text-xs font-medium">{preference.name}</span>
                </Button>
              ))}
            </div>
            {selectedPreferences.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedPreferences.map((prefId) => {
                  const pref = preferences.find(p => p.id === prefId);
                  return pref ? (
                    <Badge key={prefId} className="bg-primary/10 text-primary border-primary/20">
                      {pref.icon} {pref.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observações especiais, alergias, preferências..."
              className="bg-input border-border"
              rows={3}
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Cliente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};