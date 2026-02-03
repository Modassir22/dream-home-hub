import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/plots";
import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-navy to-navy-light text-white rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Plot?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Get in touch with our team today and take the first step towards building your dream home in Phulwari Sharif, Patna.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/plots">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shadow-gold">
                Explore Plots
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href={`tel:${contactInfo.phone}`}>
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                <Phone className="w-5 h-5" />
                {contactInfo.phone}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
