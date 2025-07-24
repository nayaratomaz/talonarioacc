import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Scissors, Plus, Upload, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NewBarberModalProps {
  children: React.ReactNode;
}

const specialties = [
  { id: 1, name: "Corte Masculino", icon: "✂️" },
  { id: 2, name: "Corte Feminino", icon: "💇‍♀️" },
  { id: 3, name: "Barba", icon: "🧔" },
  { id: 4, name: "Bigode", icon: "👨" },
  { id: 5, name: "Degradê", icon: "🎨" },
  { id: 6, name: "Desenhos", icon: "✨" },
  { id: 7, name: "Escova", icon: "💨" },
  { id: 8, name: "Sobrancelha", icon: "👁️" },
  { id: 9, name: "Tratamentos", icon: "🌿" }
];

const weekDays = [
  { id: 'monday', name: 'Segunda-feira', short: 'SEG' },
  { id: 'tuesday', name: 'Terça-feira', short: 'TER' },
  { id: 'wednesday', name: 'Quarta-feira', short: 'QUA' },
  { id: 'thursday', name: 'Quinta-feira', short: 'QUI' },
  { id: 'friday', name: 'Sexta-feira', short: 'SEX' },
  { id: 'saturday', name: 'Sábado', short: 'SAB' },
  { id: 'sunday', name: 'Domingo', short: 'DOM' }
];

export const NewBarberModal = ({ children }: NewBarberModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [commission, setCommission] = useState("40");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [workDays, setWorkDays] = useState<string[]>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>([]);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { toast } = useToast();

  const toggleSpecialty = (specialtyId: number) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialtyId) 
        ? prev.filter(id => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  const toggleWorkDay = (dayId: string) => {
    setWorkDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSubmit = () => {
    if (!name || !email || !phone || selectedSpecialties.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email, telefone e pelo menos uma especialidade.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Barbeiro cadastrado!",
      description: `${name} foi cadastrado com sucesso.`,
    });

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setExperience("");
    setCommission("40");
    setStartTime("08:00");
    setEndTime("18:00");
    setWorkDays(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
    setSelectedSpecialties([]);
    setBio("");
    setPhoto("");
    setIsActive(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center">
            <Scissors className="w-5 h-5 mr-2 text-primary" />
            Novo Barbeiro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Foto do Barbeiro */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 ring-4 ring-primary/20">
              <AvatarImage src={photo} alt="Foto do barbeiro" />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : <Scissors className="w-8 h-8" />}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
              <Upload className="w-4 h-4 mr-2" />
              Adicionar Foto
            </Button>
          </div>

          {/* Dados Pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo do barbeiro"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="barbeiro@email.com"
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
              <Label htmlFor="experience">Experiência</Label>
              <Input
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Ex: 5 anos"
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* Configurações Profissionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Comissão (%)</Label>
              <Select value={commission} onValueChange={setCommission}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="35">35%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                  <SelectItem value="45">45%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="55">55%</SelectItem>
                  <SelectItem value="60">60%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">Início do Expediente</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="07:00">07:00</SelectItem>
                  <SelectItem value="08:00">08:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">Fim do Expediente</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="17:00">17:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dias de Trabalho */}
          <div className="space-y-4">
            <Label>Dias de Trabalho</Label>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => (
                <Button
                  key={day.id}
                  variant="outline"
                  onClick={() => toggleWorkDay(day.id)}
                  className={cn(
                    "h-auto py-3 flex flex-col items-center space-y-1",
                    workDays.includes(day.id)
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <span className="text-xs font-medium">{day.short}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Especialidades */}
          <div className="space-y-4">
            <Label>Especialidades *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specialties.map((specialty) => (
                <Button
                  key={specialty.id}
                  variant="outline"
                  onClick={() => toggleSpecialty(specialty.id)}
                  className={cn(
                    "h-auto py-3 flex flex-col items-center space-y-1",
                    selectedSpecialties.includes(specialty.id)
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <span className="text-lg">{specialty.icon}</span>
                  <span className="text-xs font-medium text-center">{specialty.name}</span>
                </Button>
              ))}
            </div>
            {selectedSpecialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSpecialties.map((specialtyId) => {
                  const specialty = specialties.find(s => s.id === specialtyId);
                  return specialty ? (
                    <Badge key={specialtyId} className="bg-primary/10 text-primary border-primary/20">
                      {specialty.icon} {specialty.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia / Descrição</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Descreva um pouco sobre o barbeiro, estilo de trabalho, especialidades..."
              className="bg-input border-border"
              rows={3}
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                isActive ? "bg-success" : "bg-muted-foreground"
              )} />
              <div>
                <Label htmlFor="isActive" className="text-foreground">Status do Barbeiro</Label>
                <p className="text-sm text-muted-foreground">
                  {isActive ? "Ativo - Pode receber agendamentos" : "Inativo - Não receberá novos agendamentos"}
                </p>
              </div>
            </div>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Barbeiro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};