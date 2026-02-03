import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import { API_URL } from "@/config/api";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  image: string;
  review: string;
  rating: number;
}

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials`);
      const data = await res.json();
      setTestimonials(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Real experiences from families who found their dream plots with us."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card p-6 rounded-xl shadow-md animate-pulse">
                <div className="h-6 bg-secondary rounded mb-4" />
                <div className="h-20 bg-secondary rounded mb-4" />
                <div className="h-4 bg-secondary rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <SectionHeader
          title="What Our Clients Say"
          subtitle="Hear from families who found their dream plot with us."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/40" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-accent fill-accent"
                        : "text-primary-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-primary-foreground/90 leading-relaxed mb-6">
                "{testimonial.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.image ? (
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-foreground/60">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
