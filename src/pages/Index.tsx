import { useState } from "react";
import AuthLogin from "@/components/AuthLogin";
import Dashboard from "@/components/Dashboard";
import NewCitation from "@/components/NewCitation";
import { useToast } from "@/hooks/use-toast";

type Screen = "login" | "dashboard" | "newCitation";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simulate authentication
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
      setCurrentScreen("dashboard");
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${credentials.username}!`,
      });
    }
  };

  const handleNewCitation = () => {
    setCurrentScreen("newCitation");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleSaveCitation = (citation: any) => {
    // Here you would save to your backend/database
    toast({
      title: "Autuação salva com sucesso",
      description: `Auto de infração ${citation.id} foi registrado.`,
    });
    setCurrentScreen("dashboard");
  };

  const handleViewCitation = (id: string) => {
    toast({
      title: "Visualizar autuação",
      description: `Abrindo detalhes da autuação ${id}`,
    });
  };

  if (!isAuthenticated) {
    return <AuthLogin onLogin={handleLogin} />;
  }

  switch (currentScreen) {
    case "dashboard":
      return (
        <Dashboard
          onNewCitation={handleNewCitation}
          onViewCitation={handleViewCitation}
        />
      );
    case "newCitation":
      return (
        <NewCitation
          onBack={handleBackToDashboard}
          onSave={handleSaveCitation}
        />
      );
    default:
      return null;
  }
};

export default Index;
