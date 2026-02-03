import { FileCheck, MapPin, IndianRupee, Users, ClipboardCheck, LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { benefits } from "@/data/plots";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  FileCheck,
  MapPin,
  IndianRupee,
  Users,
  ClipboardCheck,
};

export const BenefitsSection = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <SectionHeader
          title="Why Choose DreamHomeDeveloper?"
          subtitle="We are committed to providing you with the best plots and exceptional service throughout your property journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
