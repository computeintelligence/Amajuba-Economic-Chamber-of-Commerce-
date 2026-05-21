import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-chamber-navy text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pl-2">
          
          {/* Brand & Mandate */}
          <div className="col-span-1">
            <h3 className="font-display text-2xl font-bold text-white mb-4">Amajuba Economic Chamber</h3>
            <p className="text-sm leading-relaxed mb-6">
              Promoting Growth & Prosperity in KwaZulu-Natal. Empowering communities through capacity-building, 
              governance literacy, and sustainable local economic development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:ml-auto">
            <h4 className="font-sans font-semibold text-white mb-4 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-chamber-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-chamber-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-chamber-gold transition-colors">Contact</Link></li>
              <li><Link to="/registration" className="hover:text-chamber-gold transition-colors">Membership Registration</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-chamber-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-chamber-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1">
            <h4 className="font-sans font-semibold text-white mb-4 tracking-wider uppercase text-sm">Contact Information</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-chamber-gold shrink-0 mt-0.5" />
                <span>Madadeni Sec 6, Red Street<br/>Industrial Side, Unit 9<br/>KwaZulu-Natal, South Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-chamber-gold shrink-0" />
                <span>067 198 4100 / 068 334 1826</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-chamber-gold shrink-0" />
                <a href="mailto:admin@amajubaeconomicchamber.org" className="hover:text-white transition-colors">
                  admin@amajubaeconomicchamber.org
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Amajuba Economic Chamber. All Rights Reserved - Promoting Growth & Prosperity.</p>
        </div>
      </div>
    </footer>
  );
}
