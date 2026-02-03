import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Maximize2, IndianRupee, MessageCircle, Phone, Check, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { contactInfo, Plot } from "@/data/plots";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { API_URL } from "@/config/api";

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
  const [plot, setPlot] = useState<Plot | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated, token } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    fetchPlot();
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && plot?.id) {
      checkWishlist();
    }
  }, [isAuthenticated, plot?.id]);

  const fetchPlot = async () => {
    try {
      const res = await fetch(`${API_URL}/api/plots/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPlot({
          id: data._id,
          title: data.title,
          location: data.location,
          area: data.area,
          price: data.price,
          pricePerSqFt: data.pricePerSqFt,
          status: data.status,
          image: data.image,
          images: data.images,
          description: data.description,
          amenities: data.amenities,
          isFeatured: data.isFeatured
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plot:', error);
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    try {
      const res = await fetch(`${API_URL}/api/wishlist/check/${plot?.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setInWishlist(data.inWishlist);
      setWishlistId(data.wishlistId);
    } catch (error) {
      // Silently fail
    }
  };

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    setWishlistLoading(true);

    try {
      if (inWishlist && wishlistId) {
        // Remove from wishlist
        const res = await fetch(`${API_URL}/api/wishlist/${wishlistId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          setInWishlist(false);
          setWishlistId(null);
          toast.success("Removed from wishlist");
        }
      } else {
        // Add to wishlist
        const res = await fetch(`${API_URL}/api/wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ plotId: plot?.id })
        });

        if (res.ok) {
          const data = await res.json();
          setInWishlist(true);
          setWishlistId(data._id);
          toast.success("Added to wishlist");
        } else {
          const data = await res.json();
          toast.error(data.message || "Failed to add to wishlist");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-padding container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 animate-pulse">
              <div className="aspect-[4/3] bg-secondary rounded-xl" />
              <div className="flex gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-20 h-20 bg-secondary rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6 animate-pulse">
              <div className="h-10 bg-secondary rounded w-3/4" />
              <div className="h-6 bg-secondary rounded w-1/2" />
              <div className="h-32 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
              {/* Title and Wishlist Button */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {plot.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{plot.location}</span>
                  </div>
                </div>
                {/* Wishlist Button */}
                <Button
                  onClick={toggleWishlist}
                  disabled={wishlistLoading}
                  size="lg"
                  variant={inWishlist ? "default" : "outline"}
                  className={`gap-2 ${inWishlist ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  {wishlistLoading ? 'Saving...' : inWishlist ? 'Saved' : 'Save'}
                </Button>
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
