import { CheckCircle, Target, Users, Award, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
    <div className="flex flex-wrap justify-center gap-8">
      {members.map((member, index) => (
        <motion.div
          key={member._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full sm:w-[280px]"
        >
          <div className="text-center">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-accent/20"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-accent/10 flex items-center justify-center">
                <User className="w-16 h-16 text-accent" />
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

const About = () => {
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
            About DreamHomeDeveloper
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Building dreams and creating communities in Phulwari Sharif, Patna since 2009. 
            We are committed to providing quality plots with complete transparency.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  DreamHomeDeveloper was founded in 2009 with a simple vision: to help families 
                  in Patna find their perfect plot for building their dream homes. What started 
                  as a small family business has grown into one of the most trusted real estate 
                  developers in Phulwari Sharif.
                </p>
                <p>
                  Over the years, we have helped more than 500 families find their ideal plots. 
                  Our commitment to transparency, verified documentation, and fair pricing has 
                  earned us the trust of our community.
                </p>
                <p>
                  Today, we continue to expand our portfolio while maintaining the personal 
                  touch that has made us a preferred choice for homebuyers in Patna.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-accent/10 p-6 rounded-xl text-center">
                <p className="text-4xl font-display font-bold text-accent">15+</p>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl text-center">
                <p className="text-4xl font-display font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Families</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl text-center">
                <p className="text-4xl font-display font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Active Plots</p>
              </div>
              <div className="bg-accent/10 p-6 rounded-xl text-center">
                <p className="text-4xl font-display font-bold text-accent">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Legal Verification</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <SectionHeader
            title="Our Mission & Values"
            subtitle="We are guided by our commitment to excellence, integrity, and customer satisfaction."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To make quality residential plots accessible to every family in Patna with complete transparency.",
              },
              {
                icon: CheckCircle,
                title: "Integrity",
                description: "We believe in honest dealings and verified documentation for every plot we offer.",
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Your satisfaction is our priority. We guide you through every step of the process.",
              },
              {
                icon: Award,
                title: "Quality",
                description: "We select only prime locations with proper infrastructure and development potential.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-soft text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Meet Our Team"
            subtitle="Dedicated professionals committed to helping you find your perfect plot"
          />
          <TeamMembersGrid />
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's what sets DreamHomeDeveloper apart from other real estate developers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              "All plots come with verified legal documents and clear titles",
              "Transparent pricing with no hidden charges",
              "Prime locations in Phulwari Sharif with excellent connectivity",
              "Flexible payment plans to suit your budget",
              "Dedicated support team for documentation and registration",
              "After-sales assistance for construction guidance",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-soft"
              >
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <p className="text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
