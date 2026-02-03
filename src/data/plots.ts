import plot1 from "@/assets/plot-1.jpg";
import plot2 from "@/assets/plot-2.jpg";
import plot3 from "@/assets/plot-3.jpg";

export interface Plot {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  pricePerSqFt: string;
  status: "available" | "sold" | "booked";
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  isFeatured: boolean;
}

export const plots: Plot[] = [
  {
    id: "1",
    title: "Green Valley Plot A1",
    location: "Phulwari Sharif, Patna",
    area: "1200 sq ft",
    price: "₹24,00,000",
    pricePerSqFt: "₹2,000/sq ft",
    status: "available",
    image: plot1,
    images: [plot1, plot2, plot3],
    description: "Premium residential plot in the heart of Phulwari Sharif with excellent connectivity. This plot offers a perfect blend of urban convenience and serene living. Located near schools, hospitals, and shopping centers.",
    amenities: ["24/7 Water Supply", "Wide Roads", "Street Lights", "Boundary Wall", "Underground Drainage", "Near Schools"],
    isFeatured: true,
  },
  {
    id: "2",
    title: "Sunrise Corner Plot B3",
    location: "Near Bailey Road, Phulwari Sharif",
    area: "1500 sq ft",
    price: "₹33,00,000",
    pricePerSqFt: "₹2,200/sq ft",
    status: "available",
    image: plot2,
    images: [plot2, plot1, plot3],
    description: "Corner plot with dual road access offering maximum privacy and ventilation. Ideal for building your dream home with ample space for garden and parking. Verified documents and clear title.",
    amenities: ["Corner Plot", "Dual Road Access", "Park Facing", "Gated Community", "Security", "Power Backup"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "Premium Plot C7 - Park View",
    location: "Danapur Road, Phulwari Sharif",
    area: "1800 sq ft",
    price: "₹41,40,000",
    pricePerSqFt: "₹2,300/sq ft",
    status: "available",
    image: plot3,
    images: [plot3, plot1, plot2],
    description: "Luxurious park-facing plot in a premium gated community. Enjoy beautiful green views and fresh air. Close proximity to IT hubs and commercial centers makes this an ideal investment.",
    amenities: ["Park Facing", "Premium Location", "Clubhouse Access", "Swimming Pool", "Gym", "Children's Play Area"],
    isFeatured: true,
  },
  {
    id: "4",
    title: "Budget Friendly Plot D2",
    location: "Sampatchak, Phulwari Sharif",
    area: "900 sq ft",
    price: "₹15,30,000",
    pricePerSqFt: "₹1,700/sq ft",
    status: "available",
    image: plot1,
    images: [plot1, plot2, plot3],
    description: "Affordable residential plot perfect for first-time buyers. All basic amenities included with clear legal documentation. Great investment opportunity in a developing area.",
    amenities: ["Affordable", "Clear Title", "Basic Amenities", "Developing Area", "Road Access", "Water Supply"],
    isFeatured: false,
  },
  {
    id: "5",
    title: "Executive Plot E5",
    location: "Near AIIMS, Phulwari Sharif",
    area: "2000 sq ft",
    price: "₹50,00,000",
    pricePerSqFt: "₹2,500/sq ft",
    status: "booked",
    image: plot2,
    images: [plot2, plot3, plot1],
    description: "Executive plot near the upcoming AIIMS campus. Premium location with excellent appreciation potential. Ideal for building a villa or large family home.",
    amenities: ["Near AIIMS", "Premium Location", "Wide Roads", "Underground Electricity", "Sewage System", "High Appreciation"],
    isFeatured: false,
  },
  {
    id: "6",
    title: "Family Plot F1",
    location: "Khagaul Road, Phulwari Sharif",
    area: "1350 sq ft",
    price: "₹28,35,000",
    pricePerSqFt: "₹2,100/sq ft",
    status: "sold",
    image: plot3,
    images: [plot3, plot2, plot1],
    description: "Family-friendly plot in a peaceful neighborhood. Close to schools and markets. Perfect for those looking for a quiet residential area with good connectivity.",
    amenities: ["Family Friendly", "Near Schools", "Market Nearby", "Temple Nearby", "Bus Stop", "Railway Station"],
    isFeatured: false,
  },
];

export const benefits = [
  {
    icon: "FileCheck",
    title: "Verified Documents",
    description: "All our plots come with complete legal documentation and clear titles verified by legal experts.",
  },
  {
    icon: "MapPin",
    title: "Prime Location",
    description: "Strategically located in Phulwari Sharif with excellent connectivity to Patna city center.",
  },
  {
    icon: "IndianRupee",
    title: "Affordable Pricing",
    description: "Competitive pricing with flexible payment plans to make your dream home affordable.",
  },
  {
    icon: "Users",
    title: "Trusted Developer",
    description: "Over 15 years of experience with 500+ happy families in our developed communities.",
  },
  {
    icon: "ClipboardCheck",
    title: "Easy Registration",
    description: "Hassle-free registration process with complete assistance from our dedicated team.",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Rajesh Kumar",
    location: "Patna",
    image: "",
    review: "Excellent experience with DreamHomeDeveloper! They helped us find the perfect plot for our family home. The documentation process was smooth and transparent.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Phulwari Sharif",
    image: "",
    review: "Very professional team. They understood our requirements perfectly and showed us plots within our budget. Highly recommended for genuine plots!",
    rating: 5,
  },
  {
    id: "3",
    name: "Amit Verma",
    location: "Danapur",
    image: "",
    review: "Best real estate developer in Patna. Transparent dealings, verified documents, and great after-sales support. Our family is very happy with our new plot.",
    rating: 4,
  },
  {
    id: "4",
    name: "Sunita Devi",
    location: "Bailey Road",
    image: "",
    review: "We were looking for a corner plot and DreamHomeDeveloper had exactly what we needed. Fair pricing and excellent location. Thank you team!",
    rating: 5,
  },
];

export const contactInfo = {
  phone: "+91 9835405160",
  whatsapp: "919835405160",
  email: "contact@dreamhomedeveloper.com",
  address: "Dream Home'z Developer, Phulwari Sharif, Patna, Bihar - 801505",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
};
