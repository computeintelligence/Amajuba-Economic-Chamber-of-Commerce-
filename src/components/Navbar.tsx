import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-chamber-navy text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-14 h-14" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-wide leading-tight">
                AMAJUBA <span className="text-chamber-gold">ECONOMIC CHAMBER</span>
              </span>
              <span className="text-xs text-blue-200 tracking-wider">PROMOTING GROWTH & PROSPERITY</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-chamber-gold",
                    isActive ? "text-chamber-gold border-b-2 border-chamber-gold pb-1" : "text-slate-200"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/registration"
              className="px-6 py-2.5 rounded-md bg-chamber-gold text-chamber-navy font-semibold text-sm hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
            >
              Join Chamber <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-white"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-chamber-navy border-t border-slate-700 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-3 rounded-md text-base font-medium",
                      isActive ? "bg-slate-800 text-chamber-gold" : "text-slate-200 hover:bg-slate-800 hover:text-white"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <Link
                to="/registration"
                onClick={() => setIsOpen(false)}
                className="mt-4 block text-center px-4 py-3 rounded-md bg-chamber-gold text-chamber-navy font-bold text-base hover:bg-yellow-400 transition-colors"
              >
                Join Chamber Registration
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
