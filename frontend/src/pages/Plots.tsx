import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlotCard } from "@/components/shared/PlotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plot } from "@/data/plots";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "@/config/api";

const Plots = () => {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sizeRange, setSizeRange] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      console.log('Fetching plots from:', `${API_URL}/api/plots`);
      const res = await fetch(`${API_URL}/api/plots`);
      console.log('Response status:', res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Fetched plots data:', data);
      console.log('Number of plots:', data.length);
      setPlots(data.map((plot: any) => ({
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
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plots:', error);
      setLoading(false);
    }
  };

  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          plot.title.toLowerCase().includes(query) ||
          plot.location.toLowerCase().includes(query) ||
          plot.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Price filter
      if (priceRange !== "all") {
        const priceStr = plot.price.replace(/[^0-9]/g, "");
        const price = parseInt(priceStr) || 0;
        if (priceRange === "under20" && price >= 2000000) return false;
        if (priceRange === "20to30" && (price < 2000000 || price >= 3000000)) return false;
        if (priceRange === "30to50" && (price < 3000000 || price >= 5000000)) return false;
        if (priceRange === "above50" && price < 5000000) return false;
      }

      // Size filter
      if (sizeRange !== "all") {
        const areaStr = plot.area.replace(/[^0-9]/g, "");
        const size = parseInt(areaStr) || 0;
        if (sizeRange === "under1000" && size >= 1000) return false;
        if (sizeRange === "1000to1500" && (size < 1000 || size >= 1500)) return false;
        if (sizeRange === "above1500" && size < 1500) return false;
      }

      // Status filter
      if (statusFilter !== "all" && plot.status !== statusFilter) return false;

      return true;
    });
  }, [plots, searchQuery, priceRange, sizeRange, statusFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange("all");
    setSizeRange("all");
    setStatusFilter("all");
  };

  const hasActiveFilters = searchQuery || priceRange !== "all" || sizeRange !== "all" || statusFilter !== "all";

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            Explore Our Plots
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-xl mx-auto"
          >
            Find the perfect plot for your dream home in Phulwari Sharif, Patna. 
            Filter by location, price, and size to find exactly what you need.
          </motion.p>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search & Filter Bar */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-2">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under20">Under ₹20 Lakh</SelectItem>
                    <SelectItem value="20to30">₹20-30 Lakh</SelectItem>
                    <SelectItem value="30to50">₹30-50 Lakh</SelectItem>
                    <SelectItem value="above50">Above ₹50 Lakh</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sizeRange} onValueChange={setSizeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Plot Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="under1000">Under 1000 sq ft</SelectItem>
                    <SelectItem value="1000to1500">1000-1500 sq ft</SelectItem>
                    <SelectItem value="above1500">Above 1500 sq ft</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden grid grid-cols-2 gap-2"
                >
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under20">Under ₹20 Lakh</SelectItem>
                      <SelectItem value="20to30">₹20-30 Lakh</SelectItem>
                      <SelectItem value="30to50">₹30-50 Lakh</SelectItem>
                      <SelectItem value="above50">Above ₹50 Lakh</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sizeRange} onValueChange={setSizeRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Plot Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="under1000">Under 1000 sq ft</SelectItem>
                      <SelectItem value="1000to1500">1000-1500 sq ft</SelectItem>
                      <SelectItem value="above1500">Above 1500 sq ft</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="booked">Booked</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredPlots.length} plots found
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1 text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Plots Grid */}
          {loading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
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
          ) : filteredPlots.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredPlots.map((plot, index) => (
                <PlotCard key={plot.id} plot={plot} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No plots found matching your criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Plots;
