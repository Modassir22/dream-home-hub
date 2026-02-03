import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Maximize2, IndianRupee, MessageCircle, Phone, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plots, contactInfo } from "@/data/plots";
import { motion, AnimatePresence } from "framer-motion";

const statusColors = {
  available: "bg-success text-white",
  sold: "bg-destructive text-white",
  booked: "bg-accent text-accent-foreground",
};

const statusLabels = {
  available: "Available",
  sold: "Sold",
  booked: "Booked",
};

const PlotDetail = () => {
  const { id } = useParams();
  const plot = plots.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!plot) {
    return (
      <Layout>
        <div className="section-padding container-custom text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Plot Not Found</h1>
          <p className="text-muted-foreground mb-8">The plot you're looking for doesn't exist.</p>
          <Link to="/plots">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plots
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const whatsappMessage = `Hello! I'm interested in "${plot.title}" at ${plot.location}. Price: ${plot.price}, Area: ${plot.area}. Please share more details.`;
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % plot.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + plot.images.length) % plot.images.length);
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          {/* Back Button */}
          <Link to="/plots" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Plots
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={plot.images[currentImageIndex]}
                    alt={plot.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                {plot.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Status Badge */}
                <Badge className={`absolute top-4 right-4 ${statusColors[plot.status]}`}>
                  {statusLabels[plot.status]}
                </Badge>
              </div>

              {/* Thumbnails */}
              {plot.images.length > 1 && (
                <div className="flex gap-3">
                  {plot.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? "border-accent" : "border-transparent hover:border-border"
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {plot.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{plot.location}</span>
                </div>
              </div>

              {/* Price & Size */}
              <div className="flex flex-wrap gap-6 p-4 bg-secondary rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <div className="flex items-center gap-1 text-2xl font-bold text-accent">
                    <IndianRupee className="w-6 h-6" />
                    {plot.price}
                  </div>
                  <p className="text-sm text-muted-foreground">{plot.pricePerSqFt}</p>
                </div>
                <div className="border-l border-border pl-6">
                  <p className="text-sm text-muted-foreground mb-1">Area</p>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <Maximize2 className="w-6 h-6" />
                    {plot.area}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">About This Plot</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {plot.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">Amenities & Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {plot.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              {plot.status !== "sold" && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="lg" className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white">
                      <MessageCircle className="w-5 h-5" />
                      Contact on WhatsApp
                    </Button>
                  </a>
                  <a href={`tel:${contactInfo.phone}`} className="flex-1">
                    <Button size="lg" variant="outline" className="w-full gap-2">
                      <Phone className="w-5 h-5" />
                      Call Now
                    </Button>
                  </a>
                </div>
              )}

              {plot.status === "sold" && (
                <div className="p-4 bg-destructive/10 rounded-xl text-center">
                  <p className="text-destructive font-medium">This plot has been sold.</p>
                  <Link to="/plots" className="text-sm text-muted-foreground hover:underline">
                    View other available plots
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PlotDetail;
