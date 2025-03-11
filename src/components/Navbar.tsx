
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeIn from './FadeIn';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Registrar', path: '/register' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-boleto-blue to-boleto-indigo rounded-md animate-pulse-soft" />
            <div className="absolute inset-[2px] bg-white rounded-[4px] flex items-center justify-center font-semibold text-boleto-blue">B</div>
          </div>
          <span className="text-xl font-semibold text-foreground">BoletoMagic</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                isActive(link.path) ? "text-primary" : "text-foreground"
              )}
            >
              {link.name}
              <span 
                className={cn(
                  "absolute bottom-[-5px] left-0 w-full h-[2px] transform transition-transform duration-300",
                  isActive(link.path) 
                    ? "bg-primary scale-x-100" 
                    : "bg-primary/70 scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <Button asChild>
            <Link to="/register">Registrar Boleto</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-[72px] z-50 md:hidden transition-all duration-300 ease-in-out',
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="bg-white/90 backdrop-blur-md shadow-lg px-6 pt-6 pb-8 space-y-6">
          {navLinks.map((link, index) => (
            <FadeIn 
              key={link.path} 
              delay={100 * index}
              className="block"
            >
              <Link
                to={link.path}
                className={cn(
                  "text-lg font-medium block py-2 transition-colors",
                  isActive(link.path) ? "text-primary" : "text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            </FadeIn>
          ))}
          <FadeIn delay={300}>
            <Button asChild className="w-full mt-2">
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Registrar Boleto
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
