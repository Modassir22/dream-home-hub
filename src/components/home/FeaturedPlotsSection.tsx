import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlotCard } from "@/components/shared/PlotCard";
import { plots } from "@/data/plots";

export const FeaturedPlotsSection = () => {
  const featuredPlots = plots.filter((plot) => plot.isFeatured).slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Featured Plots"
          subtitle="Explore our handpicked selection of premium plots in the best locations of Phulwari Sharif."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlots.map((plot, index) => (
            <PlotCard key={plot.id} plot={plot} index={index} />
          ))}
        </div>

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
