import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Heart, Trash2, MapPin, IndianRupee, SquareIcon, Eye, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { API_URL } from "@/config/api";

interface WishlistItem {
  _id: string;
  plot: {
    _id: string;
    title: string;
    location: string;
    area: string;
    price: string;
    pricePerSqFt: string;
    status: string;
    image: string;
  };
  addedAt: string;
  notes: string;
  status: string;
}

const statusColors = {
  interested: "bg-blue-500",
  contacted: "bg-yellow-500",
  visiting: "bg-purple-500",
  negotiating: "bg-orange-500",
  purchased: "bg-green-500"
};

const statusLabels = {
  interested: "Interested",
  contacted: "Contacted",
  visiting: "Planning Visit",
  negotiating: "Negotiating",
  purchased: "Purchased"
};

const UserDashboard = () => {
  const { token, user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${API_URL}/api/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setWishlist(data);
    } catch (error) {
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!confirm("Remove this plot from your wishlist?")) return;

    try {
      const res = await fetch(`${API_URL}/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success("Removed from wishlist");
        fetchWishlist();
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/wishlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        toast.success("Status updated");
        fetchWishlist();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const updateNotes = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/wishlist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes: tempNotes })
      });

      if (res.ok) {
        toast.success("Notes updated");
        setEditingNotes(null);
        fetchWishlist();
      }
    } catch (error) {
      toast.error("Failed to update notes");
    }
  };

  const getWhatsAppUrl = (plot: any) => {
    return `https://wa.me/919835405160?text=Hello! I'm interested in ${plot.title} at ${plot.location}. Price: ${plot.price}. Please share more details.`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-padding">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              My Dashboard
            </h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Welcome back, <strong>{user?.username}</strong>! Manage your wishlist and track your plot interests.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold mb-2">My Wishlist</h2>
            <p className="text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? 'plot' : 'plots'} saved for later
            </p>
          </div>

          {wishlist.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">No plots in wishlist</h3>
                <p className="text-muted-foreground mb-6">
                  Start adding plots you're interested in to keep track of them
                </p>
                <Link to="/plots">
                  <Button>Browse Plots</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {wishlist.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-[200px_1fr] gap-6">
                        {/* Plot Image */}
                        <div className="relative">
                          <img
                            src={item.plot.image}
                            alt={item.plot.title}
                            className="w-full h-48 md:h-full object-cover rounded-lg"
                          />
                          <Badge className={`absolute top-2 right-2 ${
                            item.plot.status === 'available' ? 'bg-green-500' :
                            item.plot.status === 'booked' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            {item.plot.status}
                          </Badge>
                        </div>

                        {/* Plot Details */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-display text-2xl font-bold mb-2">
                              {item.plot.title}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {item.plot.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <SquareIcon className="w-4 h-4" />
                                {item.plot.area}
                              </span>
                              <span className="flex items-center gap-1">
                                <IndianRupee className="w-4 h-4" />
                                {item.plot.price}
                              </span>
                            </div>
                          </div>

                          {/* Status Selector */}
                          <div className="flex items-center gap-4">
                            <label className="text-sm font-medium">Status:</label>
                            <Select
                              value={item.status}
                              onValueChange={(value) => updateStatus(item._id, value)}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(statusLabels).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${statusColors[key as keyof typeof statusColors]}`} />
                                      {label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="text-sm font-medium mb-2 block">Notes:</label>
                            {editingNotes === item._id ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  placeholder="Add your notes here..."
                                  rows={3}
                                />
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => updateNotes(item._id)}>
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingNotes(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="text-sm text-muted-foreground cursor-pointer hover:bg-secondary p-2 rounded"
                                onClick={() => {
                                  setEditingNotes(item._id);
                                  setTempNotes(item.notes || '');
                                }}
                              >
                                {item.notes || 'Click to add notes...'}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Link to={`/plots/${item.plot._id}`}>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Eye className="w-4 h-4" />
                                View Details
                              </Button>
                            </Link>
                            <a href={getWhatsAppUrl(item.plot)} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="gap-2 bg-[#25D366] hover:bg-[#20BD5A]">
                                <MessageCircle className="w-4 h-4" />
                                Contact on WhatsApp
                              </Button>
                            </a>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-2"
                              onClick={() => removeFromWishlist(item._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </Button>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            Added on {new Date(item.addedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UserDashboard;
