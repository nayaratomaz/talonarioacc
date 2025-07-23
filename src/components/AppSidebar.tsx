import { NavLink, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  Scissors, 
  DollarSign, 
  Package, 
  BarChart3, 
  Settings, 
  LayoutDashboard,
  Star,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Agendamentos", url: "/appointments", icon: Calendar },
  { title: "Clientes", url: "/clients", icon: Users },
  { title: "Barbeiros", url: "/barbers", icon: Scissors },
  { title: "Financeiro", url: "/financial", icon: DollarSign },
  { title: "Estoque", url: "/stock", icon: Package },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || (path === "/dashboard" && currentPath === "/");

  const getNavClassName = (isActiveRoute: boolean) =>
    `w-full justify-start transition-all duration-200 ${
      isActiveRoute 
        ? "bg-primary text-primary-foreground shadow-glow" 
        : "text-foreground hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-sidebar border-sidebar-border`}>
      <SidebarContent>
        {/* Logo & Brand */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-background" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-gold bg-clip-text text-transparent">
                  BarberPro
                </h2>
                <p className="text-xs text-muted-foreground">Ultimate</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-background" />
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                <AvatarImage src={user.photo} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < 4 ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(isActive(item.url))}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            variant="outline"
            onClick={logout}
            className={`w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10 ${
              collapsed ? "px-2" : ""
            }`}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Sair</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}