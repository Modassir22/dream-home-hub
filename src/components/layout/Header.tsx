import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building2, Phone, Info, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Info },
  { label: "Plots", path: "/plots", icon: Building2 },
  { label: "Contact Us", path: "/contact", icon: Phone },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn] = useState(false); // Mock state for now

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-b border-border/50 shadow-elevated">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo with margin-left */}
          <Link to="/" className="flex items-center gap-3 ml-2 md:ml-4 group">
            <div className="relative">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-navy-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Home className="w-5 h-5 md:w-6 md:h-6 text-gold" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gold rounded-full border-2 border-card" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl md:text-2xl font-bold text-primary leading-none tracking-tight">
                DreamHome
              </h1>
              <p className="text-[11px] md:text-xs text-gold font-semibold uppercase tracking-widest mt-0.5">
                Developer
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-card hover:shadow-sm"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3 mr-2 md:mr-4">
            {isLoggedIn ? (
              <Button variant="outline" size="sm" className="gap-2 rounded-full px-5">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full px-5 font-semibold hover:bg-secondary">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gap-2 rounded-full px-5 bg-gradient-to-r from-gold to-gold-dark text-primary-foreground hover:opacity-90 shadow-gold font-semibold">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-secondary transition-all duration-200 mr-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border"
          >
            <div className="container-custom py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border flex gap-2">
                <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
