import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlotCard } from "@/components/shared/PlotCard";
import { Plot } from "@/data/plots";
import { useState, useEffect } from "react";
import { API_URL } from "@/config/api";

export const FeaturedPlotsSection = () => {
  const [featuredPlots, setFeaturedPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPlots();
  }, []);

  const fetchFeaturedPlots = async () => {
    try {
      console.log('Fetching featured plots from:', `${API_URL}/api/plots`);
      const res = await fetch(`${API_URL}/api/plots`);
      console.log('Featured plots response status:', res.status);
      const data = await res.json();
      console.log('All plots data:', data);
      console.log('Number of plots:', data.length);
      
      let featured = data.filter((plot: any) => plot.isFeatured);
      
      // If no featured plots, show first 3 available plots
      if (featured.length === 0) {
        console.log('No featured plots found, showing first 3 available plots');
        featured = data.filter((plot: any) => plot.status === 'available').slice(0, 3);
      } else {
        featured = featured.slice(0, 3);
      }
      
      const mappedPlots = featured.map((plot: any) => ({
        id: plot._id,
        title: plot.title,
        location: plot.location,
        area: plot.area,
        price: plot.price,
        pricePerSqFt: plot.pricePerSqFt,
        status: plot.status,
        image: plot.image,
        images: plot.images,
        description: plot.description,
        amenities: plot.amenities,
        isFeatured: plot.isFeatured
      }));
      
      console.log('Featured plots to display:', mappedPlots);
      console.log('Number of featured plots:', mappedPlots.length);
      setFeaturedPlots(mappedPlots);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured plots:', error);
      setLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Featured Plots"
          subtitle="Explore our handpicked selection of premium plots in the best locations of Phulwari Sharif."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-soft animate-pulse">
                <div className="aspect-[4/3] bg-secondary" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-secondary rounded" />
                  <div className="h-4 bg-secondary rounded w-2/3" />
                  <div className="h-10 bg-secondary rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredPlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlots.map((plot, index) => (
              <PlotCard key={plot.id} plot={plot} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No plots available at the moment.</p>
            <Link to="/plots">
              <Button>Browse All Plots</Button>
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/plots">
            <Button size="lg" variant="outline" className="gap-2">
              View All Plots
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
