import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Building2, Users, Phone, Trash2, Edit, Plus, Save, Heart, Upload, X, Star } from "lucide-react";
import { API_URL } from "@/config/api";

interface Plot {
  _id?: string;
  title: string;
  location: string;
  area: string;
  price: string;
  pricePerSqFt: string;
  status: string;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  isFeatured: boolean;
}

interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  order: number;
}

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
}

interface WishlistItem {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  plot: {
    _id: string;
    title: string;
    location: string;
    price: string;
  };
  status: string;
  notes: string;
  addedAt: string;
}

interface Testimonial {
  _id?: string;
  name: string;
  location: string;
  image: string;
  review: string;
  rating: number;
  order: number;
}

const AdminDashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("plots");
  const [plots, setPlots] = useState<Plot[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [wishlists, setWishlists] = useState<WishlistItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState({
    yearsExperience: 15,
    happyFamilies: 500,
    activePlots: 50
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    workingHours: ""
  });
  
  // Form visibility states
  const [showPlotForm, setShowPlotForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  
  // Edit states
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plotsRes, teamRes, contactRes, wishlistRes, testimonialsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/plots`),
        fetch(`${API_URL}/api/team`),
        fetch(`${API_URL}/api/contact`),
        fetch(`${API_URL}/api/admin/wishlists`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/testimonials`),
        fetch(`${API_URL}/api/stats`)
      ]);
      
      setPlots(await plotsRes.json());
      setTeamMembers(await teamRes.json());
      setContactInfo(await contactRes.json());
      setWishlists(await wishlistRes.json());
      setTestimonials(await testimonialsRes.json());
      setStats(await statsRes.json());
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const deletePlot = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plot?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/plots/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success("Plot deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to delete plot");
    }
  };

  const deleteTeamMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/team/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success("Team member deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to delete team member");
    }
  };

  const handlePlotSuccess = () => {
    setShowPlotForm(false);
    setEditingPlot(null);
    fetchData();
  };

  const handleTeamSuccess = () => {
    setShowTeamForm(false);
    setEditingTeamMember(null);
    fetchData();
  };

  const startEditPlot = (plot: Plot) => {
    setEditingPlot(plot);
    setShowPlotForm(true);
  };

  const startEditTeamMember = (member: TeamMember) => {
    setEditingTeamMember(member);
    setShowTeamForm(true);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success("Testimonial deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleTestimonialSuccess = () => {
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
    fetchData();
  };

  const startEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowTestimonialForm(true);
  };

  const updateContactInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contactInfo)
      });
      
      if (res.ok) {
        toast.success("Contact info updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update contact info");
    }
  };

  const updateStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(stats)
      });
      
      if (res.ok) {
        toast.success("Stats updated successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to update stats");
    }
  };

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-200px)]">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border p-4 space-y-2">
          <h2 className="font-display text-xl font-bold mb-4 px-3">Dashboard</h2>
          
          <button
            onClick={() => setActiveTab("plots")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "plots" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-medium">Plots</span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "team" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Team</span>
          </button>

          <button
            onClick={() => setActiveTab("wishlists")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "wishlists" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">Wishlists</span>
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "contact" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            }`}
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">Contact Info</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "testimonials" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            }`}
          >
            <Star className="w-5 h-5" />
            <span className="font-medium">Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === "stats" 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary"
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="font-medium">Stats</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "plots" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-2">Manage Plots</h1>
                  <p className="text-muted-foreground">Add, edit, or remove plot listings</p>
                </div>
                <Button onClick={() => { setShowPlotForm(true); setEditingPlot(null); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Plot
                </Button>
              </div>
              
              {showPlotForm && (
                <div className="border rounded-lg p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{editingPlot ? 'Edit Plot' : 'Add New Plot'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => { setShowPlotForm(false); setEditingPlot(null); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <PlotForm token={token} onSuccess={handlePlotSuccess} editData={editingPlot} />
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Existing Plots ({plots.length})</h3>
                {plots.map((plot) => (
                  <div key={plot._id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-4">
                      <img src={plot.image} alt={plot.title} className="w-16 h-16 rounded object-cover" />
                      <div>
                        <h4 className="font-semibold">{plot.title}</h4>
                        <p className="text-sm text-muted-foreground">{plot.location} - {plot.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditPlot(plot)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deletePlot(plot._id!)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-2">Manage Team Members</h1>
                  <p className="text-muted-foreground">Add or remove team members</p>
                </div>
                <Button onClick={() => { setShowTeamForm(true); setEditingTeamMember(null); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </Button>
              </div>
              
              {showTeamForm && (
                <div className="border rounded-lg p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => { setShowTeamForm(false); setEditingTeamMember(null); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <TeamForm token={token} onSuccess={handleTeamSuccess} editData={editingTeamMember} />
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Team Members ({teamMembers.length})</h3>
                {teamMembers.map((member) => (
                  <div key={member._id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-4">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                          <Users className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditTeamMember(member)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteTeamMember(member._id!)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "wishlists" && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">User Wishlists</h1>
                <p className="text-muted-foreground">
                  See which users are interested in which plots ({wishlists.length} total)
                </p>
              </div>
              {wishlists.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No wishlists yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlists.map((item) => (
                    <div key={item._id} className="p-4 border rounded-lg bg-card space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{item.user.username}</h4>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Interested in: <strong>{item.plot.title}</strong>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.plot.location} - {item.plot.price}
                          </p>
                          {item.notes && (
                            <p className="text-sm mt-2 p-2 bg-secondary rounded">
                              <strong>Notes:</strong> {item.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(item.addedAt).toLocaleDateString()}
                        </div>
                      </div>
                      {item.user.email && (
                        <p className="text-xs text-muted-foreground">
                          Contact: {item.user.email}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">Contact Information</h1>
                <p className="text-muted-foreground">Update business contact details</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp</Label>
                    <Input
                      value={contactInfo.whatsapp}
                      onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Working Hours</Label>
                    <Input
                      value={contactInfo.workingHours}
                      onChange={(e) => setContactInfo({...contactInfo, workingHours: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Address</Label>
                    <Textarea
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={updateContactInfo} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-2">Manage Testimonials</h1>
                  <p className="text-muted-foreground">Add or remove customer testimonials</p>
                </div>
                <Button onClick={() => { setShowTestimonialForm(true); setEditingTestimonial(null); }} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Testimonial
                </Button>
              </div>
              
              {showTestimonialForm && (
                <div className="border rounded-lg p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => { setShowTestimonialForm(false); setEditingTestimonial(null); }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <TestimonialForm token={token} onSuccess={handleTestimonialSuccess} editData={editingTestimonial} />
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Testimonials ({testimonials.length})</h3>
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="flex items-start justify-between p-4 border rounded-lg bg-card">
                    <div className="flex items-start gap-4 flex-1">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                          <Users className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{testimonial.location}</p>
                        <p className="text-sm">{testimonial.review}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditTestimonial(testimonial)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteTestimonial(testimonial._id!)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2">Website Stats</h1>
                <p className="text-muted-foreground">Update homepage statistics</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Years Experience</Label>
                    <Input
                      type="number"
                      value={stats.yearsExperience}
                      onChange={(e) => setStats({...stats, yearsExperience: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Happy Families</Label>
                    <Input
                      type="number"
                      value={stats.happyFamilies}
                      onChange={(e) => setStats({...stats, happyFamilies: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Active Plots</Label>
                    <Input
                      type="number"
                      value={stats.activePlots}
                      onChange={(e) => setStats({...stats, activePlots: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <Button onClick={updateStats} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

// Plot Form Component
const PlotForm = ({ token, onSuccess, editData }: { token: string | null; onSuccess: () => void; editData?: Plot | null }) => {
  const [formData, setFormData] = useState<Plot>(editData || {
    title: "",
    location: "",
    area: "",
    price: "",
    pricePerSqFt: "",
    status: "available",
    image: "",
    images: [],
    description: "",
    amenities: [],
    isFeatured: false
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, image: data.url, images: [data.url] }));
        toast.success("Image uploaded successfully");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editData?._id 
        ? `${API_URL}/api/admin/plots/${editData._id}`
        : `${API_URL}/api/admin/plots`;
      
      const method = editData?._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(editData?._id ? "Plot updated successfully" : "Plot added successfully");
        setFormData({
          title: "",
          location: "",
          area: "",
          price: "",
          pricePerSqFt: "",
          status: "available",
          image: "",
          images: [],
          description: "",
          amenities: [],
          isFeatured: false
        });
        onSuccess();
      }
    } catch (error) {
      toast.error(editData?._id ? "Failed to update plot" : "Failed to add plot");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Location *</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Area *</Label>
          <Input
            placeholder="e.g., 1200 sq ft"
            value={formData.area}
            onChange={(e) => setFormData({...formData, area: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Price *</Label>
          <Input
            placeholder="e.g., ₹24,00,000"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Price per Sq Ft *</Label>
          <Input
            placeholder="e.g., ₹2,000/sq ft"
            value={formData.pricePerSqFt}
            onChange={(e) => setFormData({...formData, pricePerSqFt: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Status *</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Image *</Label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/image.jpg or upload below"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="flex-1"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('plot-image-upload')?.click()}
                disabled={uploading}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <input
              id="plot-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {formData.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, image: '', images: []})}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description *</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Amenities (comma separated)</Label>
          <Input
            placeholder="24/7 Water Supply, Wide Roads, Street Lights"
            value={formData.amenities.join(", ")}
            onChange={(e) => setFormData({...formData, amenities: e.target.value.split(",").map(a => a.trim())})}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
            className="w-4 h-4"
          />
          <Label htmlFor="featured">Featured Plot</Label>
        </div>
      </div>
      <Button type="submit" className="gap-2">
        <Save className="w-4 h-4" />
        {editData?._id ? 'Update Plot' : 'Add Plot'}
      </Button>
    </form>
  );
};

// Team Form Component
const TeamForm = ({ token, onSuccess, editData }: { token: string | null; onSuccess: () => void; editData?: TeamMember | null }) => {
  const [formData, setFormData] = useState<TeamMember>(editData || {
    name: "",
    position: "",
    image: "",
    bio: "",
    email: "",
    phone: "",
    order: 0
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, image: data.url }));
        toast.success("Image uploaded successfully");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editData?._id 
        ? `${API_URL}/api/admin/team/${editData._id}`
        : `${API_URL}/api/admin/team`;
      
      const method = editData?._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(editData?._id ? "Team member updated successfully" : "Team member added successfully");
        setFormData({
          name: "",
          position: "",
          image: "",
          bio: "",
          email: "",
          phone: "",
          order: 0
        });
        onSuccess();
      }
    } catch (error) {
      toast.error(editData?._id ? "Failed to update team member" : "Failed to add team member");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Position *</Label>
          <Input
            value={formData.position}
            onChange={(e) => setFormData({...formData, position: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Image</Label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/photo.jpg or upload below"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('team-image-upload')?.click()}
                disabled={uploading}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <input
              id="team-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {formData.image && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border mx-auto">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, image: ''})}
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Bio</Label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>Display Order</Label>
          <Input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
          />
        </div>
      </div>
      <Button type="submit" className="gap-2">
        <Save className="w-4 h-4" />
        {editData?._id ? 'Update Team Member' : 'Add Team Member'}
      </Button>
    </form>
  );
};

// Testimonial Form Component
const TestimonialForm = ({ token, onSuccess, editData }: { token: string | null; onSuccess: () => void; editData?: Testimonial | null }) => {
  const [formData, setFormData] = useState<Testimonial>(editData || {
    name: "",
    location: "",
    image: "",
    review: "",
    rating: 5,
    order: 0
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, image: data.url }));
        toast.success("Image uploaded successfully");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editData?._id 
        ? `${API_URL}/api/admin/testimonials/${editData._id}`
        : `${API_URL}/api/admin/testimonials`;
      
      const method = editData?._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(editData?._id ? "Testimonial updated successfully" : "Testimonial added successfully");
        setFormData({
          name: "",
          location: "",
          image: "",
          review: "",
          rating: 5,
          order: 0
        });
        onSuccess();
      }
    } catch (error) {
      toast.error(editData?._id ? "Failed to update testimonial" : "Failed to add testimonial");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Location *</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Rating *</Label>
          <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Display Order</Label>
          <Input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Image (Optional)</Label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/photo.jpg or upload below"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('testimonial-image-upload')?.click()}
                disabled={uploading}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <input
              id="testimonial-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {formData.image && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border mx-auto">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, image: ''})}
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Review *</Label>
          <Textarea
            value={formData.review}
            onChange={(e) => setFormData({...formData, review: e.target.value})}
            rows={4}
            required
          />
        </div>
      </div>
      <Button type="submit" className="gap-2">
        <Save className="w-4 h-4" />
        {editData?._id ? 'Update Testimonial' : 'Add Testimonial'}
      </Button>
    </form>
  );
};

export default AdminDashboard;
