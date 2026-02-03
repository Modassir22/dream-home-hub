import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { API_URL } from "@/config/api";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
}

const TeamMembersGrid = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/team`)
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching team:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-card p-6 rounded-xl shadow-md animate-pulse">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4" />
            <div className="h-6 bg-secondary rounded mb-2" />
            <div className="h-4 bg-secondary rounded w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No team members added yet</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <motion.div
          key={member._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-center">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-accent/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-accent/10 flex items-center justify-center">
                <User className="w-12 h-12 text-accent" />
              </div>
            )}
            <h3 className="font-display text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-accent font-medium mb-3">{member.position}</p>
            {member.bio && (
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
            )}
            <div className="space-y-2 text-sm">
              {member.email && (
                <a href={`mailto:${member.email}`} className="block text-muted-foreground hover:text-accent">
                  {member.email}
                </a>
              )}
              {member.phone && (
                <a href={`tel:${member.phone}`} className="block text-muted-foreground hover:text-accent">
                  {member.phone}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 98354 05160",
    whatsapp: "919835405160",
    email: "info@dreamhomedeveloper.com",
    address: "Phulwari Sharif, Patna, Bihar 801505",
    workingHours: "Mon - Sat: 9:00 AM - 6:00 PM"
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contact`);
      const data = await res.json();
      setContactInfo(data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message with form data
    const message = `*New Contact Form Submission*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
${formData.email ? `*Email:* ${formData.email}\n` : ''}
*Message:*
${formData.message}`;
    
    // Use WhatsApp API link - opens WhatsApp with pre-filled message
    const whatsappMessageUrl = `https://api.whatsapp.com/send?phone=${contactInfo.whatsapp}&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappMessageUrl, '_blank');
    
    // Show success message
    toast.success("Opening WhatsApp... Please click Send in WhatsApp to complete.");
    
    // Clear form after short delay
    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 500);
  };

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=Hello! I'm interested in your plots at Phulwari Sharif, Patna. Please share more details.`;

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
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-xl mx-auto"
          >
            Have questions about our plots? We're here to help! Reach out to us and 
            our team will get back to you as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Our Office</h3>
                      <p className="text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href={`tel:${contactInfo.phone}`} className="text-muted-foreground hover:text-accent">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-accent">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Working Hours</h3>
                      <p className="text-muted-foreground">{contactInfo.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[#25D366]/10 p-6 rounded-xl">
                <h3 className="font-display text-lg font-semibold mb-2">Prefer WhatsApp?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Chat with us directly on WhatsApp for quick responses.
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Google Map - Dream Home'z Developer, Phulwari Sharif with Red Marker */}
              <div className="rounded-xl overflow-hidden shadow-elevated border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900!2d85.069631!3d25.572214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57c7d8e7e8e7%3A0x1234567890abcdef!2s25.572214%2C%2085.069631!5e0!3m2!1sen!2sin!4v1707000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dream Home'z Developer - Phulwari Sharif, Patna"
                  className="w-full"
                />
                <div className="bg-primary/5 p-3 flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Dream Home'z Developer, Phulwari Sharif</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-6 md:p-8 rounded-xl shadow-elevated">
                <h2 className="font-display text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
