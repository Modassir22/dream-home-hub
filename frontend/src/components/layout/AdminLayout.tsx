import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-lg font-bold text-primary leading-tight">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-muted-foreground">DreamHome Developer</p>
                </div>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{user?.username}</span>
                <span className="text-xs text-muted-foreground">({user?.role})</span>
              </div>
              
              <Link to="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">View Website</span>
                </Button>
              </Link>

              <Button onClick={handleLogout} variant="destructive" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 DreamHome Developer. Admin Panel.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Logged in as: <strong>{user?.username}</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
