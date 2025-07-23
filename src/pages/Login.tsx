import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao BarberPro Ultimate",
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mb-4 shadow-glow animate-glow-pulse">
            <Scissors className="w-8 h-8 text-background" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            BarberPro Ultimate
          </h1>
          <p className="text-muted-foreground mt-2">
            Sistema completo de gestão para barbearias
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-elevated border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Fazer Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input border-border focus:border-primary focus:ring-primary/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
              <p className="text-sm font-medium text-foreground mb-2">Credenciais de Demonstração:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Admin:</strong> admin@barberpro.com / 123456</p>
                <p><strong>Manager:</strong> manager@barberpro.com / 123456</p>
                <p><strong>Barbeiro:</strong> barber@barberpro.com / 123456</p>
                <p><strong>Caixa:</strong> cashier@barberpro.com / 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 BarberPro Ultimate. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;