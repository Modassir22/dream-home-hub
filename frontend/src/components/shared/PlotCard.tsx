import { Link } from "react-router-dom";
import { MapPin, Maximize2, IndianRupee, Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plot } from "@/data/plots";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { API_URL } from "@/config/api";

interface PlotCardProps {
  plot: Plot;
  index?: number;
}

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

export const PlotCard = ({ plot, index = 0 }: PlotCardProps) => {
  const { isAuthenticated, token } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && plot.id) {
      checkWishlist();
    }
  }, [isAuthenticated, plot.id]);

  const checkWishlist = async () => {
    try {
      const res = await fetch(`${API_URL}/api/wishlist/check/${plot.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setInWishlist(data.inWishlist);
      setWishlistId(data.wishlistId);
    } catch (error) {
      // Silently fail
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    setLoading(true);

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
          body: JSON.stringify({ plotId: plot.id })
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
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={plot.image}
          alt={plot.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className={`absolute top-3 right-3 ${statusColors[plot.status]}`}>
          {statusLabels[plot.status]}
        </Badge>
        {plot.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          disabled={loading}
          className={`absolute top-3 ${plot.isFeatured ? 'left-24' : 'left-3'} w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-700 hover:bg-white'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
            {plot.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{plot.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{plot.area}</span>
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4 text-accent" />
            <span className="font-semibold text-accent">{plot.price}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`/plots/${plot.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full gap-2"
              disabled={plot.status === "sold"}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
