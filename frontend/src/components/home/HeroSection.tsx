import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { contactInfo } from "@/data/plots";
import heroBg from "@/assets/hero-bg.jpg";
import { useState, useEffect } from "react";
import { API_URL } from "@/config/api";

export const HeroSection = () => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=Hello! I'm interested in your plots at Phulwari Sharif, Patna. Please share more details.`;
  
  const [stats, setStats] = useState({
    yearsExperience: 15,
    happyFamilies: 500,
    activePlots: 50
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  return (
    <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center overflow-hidden mt-[45px] md:mt-[55px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Premium residential development"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/70" />
      </div>

      {/* Content */}
      <div className="relative container-custom py-12 md:py-12 px-6 md:px-4">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              ✨ Premium Plots in Phulwari Sharif, Patna
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Build Your{" "}
            <span className="text-accent">Dream Home</span>{" "}
            With Trust & Quality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl"
          >
            Discover premium residential plots in the heart of Phulwari Sharif. 
            Verified documents, prime locations, and affordable pricing — your perfect investment awaits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/plots">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shadow-gold">
                View Available Plots
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white bg-[rgb(37,211,102)] text-black hover:bg-white/10">
                <i className="fa-brands fa-whatsapp text-2xl"></i>
                Contact on WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex gap-8 md:gap-12"
          >
            <div>
              <p className="text-3xl md:text-4xl font-display font-bold text-accent">{stats.yearsExperience}+</p>
              <p className="text-sm text-white/70 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-display font-bold text-accent">{stats.happyFamilies}+</p>
              <p className="text-sm text-white/70 mt-1">Happy Families</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-display font-bold text-accent">{stats.activePlots}+</p>
              <p className="text-sm text-white/70 mt-1">Active Plots</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
