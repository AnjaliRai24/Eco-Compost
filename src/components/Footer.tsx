import { Leaf, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "What We Accept", href: "#what-we-accept" },
    { name: "Vermicompost", href: "#vermicompost" },
    { name: "Sell Waste", href: "#wet-waste-selling" },
    { name: "Leaderboard", href: "#leaderboard" },
    { name: "Partners", href: "#partners" }
  ];

  const services = [
    { name: "Waste Pickup", href: "/book-pickup" },
    { name: "Compost Purchase", href: "/shop" },
    { name: "Admin Login", href: "/admin/login" },
    { name: "Admin Register", href: "/admin/register" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/ecocompost" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/ecocompost" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/ecocompost" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/ecocompost" }
  ];

  return (
    <footer className="bg-gradient-to-b from-green-600 via-green-500 to-green-700 border-t border-green-400/40 shadow-lg shadow-green-500/20">
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="group flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white via-green-100 to-green-200 shadow-lg group-hover:scale-110 transition-transform">
                <Leaf className="h-7 w-7 text-green-700" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">
                EcoCompost
              </span>
            </Link>
            <p className="text-black mb-6 leading-relaxed font-sans">
              Transforming organic waste into valuable compost while building a sustainable future. 
              Join our mission to create a cleaner, greener world.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
                >
                  <social.icon className="h-5 w-5 text-white group-hover:text-green-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-6 font-serif">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-6 font-serif">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-green-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black text-sm font-sans">Email</p>
                  <a 
                    href="mailto:info@ecocompost.in"
                    className="text-black hover:text-gray-800 transition-colors duration-300 font-sans"
                  >
                    info@ecocompost.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black text-sm font-sans">Phone</p>
                  <a 
                    href="tel:+919876543210"
                    className="text-black hover:text-gray-800 transition-colors duration-300 font-sans"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black text-sm font-sans">Address</p>
                  <p className="text-black text-sm font-sans">
                    EcoCompost Hub<br />
                    Green Valley, Mumbai<br />
                    Maharashtra 400001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-200 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-black text-sm font-sans">Working Hours</p>
                  <p className="text-black text-sm font-sans">
                    Mon - Sat: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-400/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-black">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-sans">
                © {currentYear} EcoCompost. All rights reserved.
              </span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-black hover:text-gray-800 transition-colors duration-300 font-sans"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-black hover:text-gray-800 transition-colors duration-300 font-sans"
              >
                Terms of Service
              </Link>
              <Link 
                to="/contact" 
                className="text-black hover:text-gray-800 transition-colors duration-300 font-sans"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-black font-sans">
              Made with ❤️ for a sustainable future. Join us in making the world a better place!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
