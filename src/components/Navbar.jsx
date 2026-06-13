import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Members', path: '/members' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Clan Wars', path: '/clan-wars' },
    { name: 'Custom Maps', path: '/custom-maps' },
    { name: 'Download', path: '/download' },
    { name: 'Join Clan', path: '/join' },
    { name: 'Leaders Panel', path: '/leaders-panel' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group">
            <Logo size="lg" showText={true} />
          </Link>

          <div className="hidden md:flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: location.pathname === link.path ? 'var(--color-accent-blue)' : 'transparent',
                  color: location.pathname === link.path ? 'white' : 'var(--color-accent-silver)'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden transition-colors"
            style={{ color: isOpen ? 'var(--color-accent-blue)' : 'var(--color-accent-silver)' }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: location.pathname === link.path ? 'var(--color-accent-blue)' : 'transparent',
                    color: location.pathname === link.path ? 'white' : 'var(--color-accent-silver)'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
