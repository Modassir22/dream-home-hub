import { MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/plots";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=Hello! I'm interested in your plots at Phulwari Sharif, Patna. Please share more details.`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-prominent flex items-center justify-center transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full animate-pulse" />
    </motion.a>
  );
};
