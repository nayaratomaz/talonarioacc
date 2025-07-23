import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, User, Bell, Shield } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">Personalize o sistema conforme suas necessidades</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configure alertas e lembretes</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configurações de senha e acesso</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="w-5 h-5 mr-2 text-primary" />
              Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configurações gerais do sistema</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;