import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  Sun,
  Moon,
  Globe,
  Sliders,
  Search,
  Menu,
  X,
  Code2,
  Lock
} from 'lucide-react';
import AccessibilityModal from './AccessibilityModal';
import GlobalSearchModal from './GlobalSearchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { t, language, toggleLanguage, isNepali } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Ctrl+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/skills', label: t('skills') },
    { to: '/portfolio', label: t('portfolio') },
    { to: '/experience', label: t('experience') },
    { to: '/education', label: t('education') },
    { to: '/achievements', label: t('achievements') },
    { to: '/blog', label: t('blog') },
    { to: '/gallery', label: t('gallery') },
    { to: '/contact', label: t('contact') }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'var(--navbar-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px'
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px var(--primary-glow)'
              }}
            >
              <Code2 size={22} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1
                }}
              >
                {isNepali ? 'नवीन शर्मा' : 'Navin Sharma'}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  letterSpacing: '0.04em'
                }}
              >
                {isNepali ? 'सफ्टवेयर आर्किटेक्ट' : 'Software Architect'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--primary)' : 'var(--text-secondary)',
                    background: active ? 'var(--primary-light)' : 'transparent',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="btn-icon"
              title={`${t('search')} (Ctrl+K)`}
              aria-label={t('search')}
            >
              <Search size={18} />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="btn-icon"
              title={language === 'en' ? 'नेपाली भाषा छान्नुहोस्' : 'Switch to English'}
              aria-label="Language switch"
              style={{ fontWeight: 700, fontSize: '0.85rem' }}
            >
              <span style={{ fontSize: '1rem', marginRight: '2px' }}>{language === 'en' ? '🇳🇵' : '🇬🇧'}</span>
              <span>{language === 'en' ? 'ने' : 'EN'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-icon"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Theme toggle"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Accessibility Modal Toggle */}
            <button
              onClick={() => setA11yOpen(true)}
              className="btn-icon"
              title={t('accessibilitySettings')}
              aria-label="Accessibility settings"
            >
              <Sliders size={18} />
            </button>

            {/* Admin Login Shortcut */}
            <Link
              to="/admin/login"
              className="btn-icon"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock size={16} />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon mobile-menu-btn"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="animate-slide-up mobile-drawer"
            style={{
              background: 'var(--bg-surface-elevated)',
              borderBottom: '1px solid var(--border-color)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--primary)' : 'var(--text-primary)',
                    background: active ? 'var(--primary-light)' : 'transparent',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Modals */}
      <AccessibilityModal isOpen={a11yOpen} onClose={() => setA11yOpen(false)} />
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Media query helper styles */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-drawer {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
