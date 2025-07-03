import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Camera, Signature, Car, FileText } from "lucide-react";

interface NewCitationProps {
  onBack: () => void;
  onSave: (citation: any) => void;
}

const violationTypes = [
  { code: "165", description: "Art. 165 - Dirigir sem cinto de segurança", category: "Grave" },
  { code: "218", description: "Art. 218 - Velocidade superior à permitida", category: "Grave" },
  { code: "181", description: "Art. 181 - Estacionar em local proibido", category: "Leve" },
  { code: "169", description: "Art. 169 - Dirigir sem CNH", category: "Gravíssima" },
  { code: "244", description: "Art. 244 - Conduzir motocicleta sem capacete", category: "Gravíssima" },
];

export default function NewCitation({ onBack, onSave }: NewCitationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plate: "",
    chassi: "",
    cpf: "",
    vehicleInfo: {
      brand: "",
      model: "",
      color: "",
      year: "",
      owner: ""
    },
    violation: "",
    location: "",
    observations: "",
    photos: [] as string[],
    signature: ""
  });

  const handlePlateSearch = () => {
    // Simulate API call
    setFormData(prev => ({
      ...prev,
      vehicleInfo: {
        brand: "Honda",
        model: "Civic",
        color: "Branco",
        year: "2020",
        owner: "João Silva Santos"
      }
    }));
    setStep(2);
  };

  const handlePhotoCapture = () => {
    // Simulate photo capture
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, `photo_${Date.now()}.jpg`]
    }));
  };

  const handleSignatureCapture = () => {
    // Simulate signature capture
    setFormData(prev => ({
      ...prev,
      signature: `signature_${Date.now()}.png`
    }));
  };

  const handleSave = () => {
    const citation = {
      id: `${Date.now()}`,
      plate: formData.plate,
      vehicle: `${formData.vehicleInfo.brand} ${formData.vehicleInfo.model} ${formData.vehicleInfo.year}`,
      violation: violationTypes.find(v => v.code === formData.violation)?.description || "",
      location: formData.location,
      date: new Date().toLocaleString('pt-BR'),
      status: "pending" as const,
      agent: "José Silva",
      observations: formData.observations,
      photos: formData.photos,
      signature: formData.signature
    };
    onSave(citation);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Nova Autuação</h1>
            <p className="text-muted-foreground">Preencha os dados da infração</p>
          </div>
        </div>

        {/* Step 1: Vehicle Search */}
        {step === 1 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Buscar Veículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plate">Placa do Veículo *</Label>
                <Input
                  id="plate"
                  value={formData.plate}
                  onChange={(e) => setFormData(prev => ({ ...prev, plate: e.target.value.toUpperCase() }))}
                  placeholder="Ex: ABC-1234"
                  className="font-mono text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chassi">Chassi (Opcional)</Label>
                  <Input
                    id="chassi"
                    value={formData.chassi}
                    onChange={(e) => setFormData(prev => ({ ...prev, chassi: e.target.value }))}
                    placeholder="Últimos 4 dígitos"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF do Proprietário (Opcional)</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>

              <Button
                onClick={handlePlateSearch}
                variant="official"
                size="lg"
                className="w-full"
                disabled={!formData.plate}
              >
                <Search className="w-4 h-4 mr-2" />
                Consultar Veículo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Vehicle Info & Citation Details */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Vehicle Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Dados do Veículo
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Placa</Label>
                  <p className="font-mono text-lg font-bold">{formData.plate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Proprietário</Label>
                  <p className="font-medium">{formData.vehicleInfo.owner}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Marca/Modelo</Label>
                  <p>{formData.vehicleInfo.brand} {formData.vehicleInfo.model}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Ano/Cor</Label>
                  <p>{formData.vehicleInfo.year} - {formData.vehicleInfo.color}</p>
                </div>
              </CardContent>
            </Card>

            {/* Citation Form */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Dados da Autuação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="violation">Tipo de Infração *</Label>
                  <Select value={formData.violation} onValueChange={(value) => setFormData(prev => ({ ...prev, violation: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a infração" />
                    </SelectTrigger>
                    <SelectContent>
                      {violationTypes.map((violation) => (
                        <SelectItem key={violation.code} value={violation.code}>
                          <div className="flex flex-col">
                            <span>{violation.description}</span>
                            <span className="text-xs text-muted-foreground">{violation.category}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Local da Infração *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: Av. Paulista, 1000 - Bela Vista"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                    placeholder="Detalhes adicionais sobre a infração..."
                    rows={3}
                  />
                </div>

                {/* Media Capture */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handlePhotoCapture}
                      className="flex-1"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Capturar Foto ({formData.photos.length})
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSignatureCapture}
                      className="flex-1"
                    >
                      <Signature className="w-4 h-4 mr-2" />
                      {formData.signature ? "Assinatura ✓" : "Capturar Assinatura"}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="official"
                    onClick={handleSave}
                    disabled={!formData.violation || !formData.location}
                    className="flex-1"
                  >
                    Salvar Autuação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}