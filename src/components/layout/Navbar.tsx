import React, { useState, useEffect } from 'react';
import { useApp, ActiveView } from '../../context/AppContext';
import {
  ShieldCheck,
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
  Ticket,
  Smartphone,
  ChevronDown,
  ArrowRight,
  AppWindow
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);

  // 📜 ScrollSpy: Automatically update active nav highlight as user scrolls up/down
  useEffect(() => {
    if (activeView === 'pass' || activeView === 'dashboard' || activeView === 'scanner') {
      return;
    }

    const sectionIds = ['hero', 'features', 'how-it-works', 'pricing', 'events', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 120px offset for sticky header

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            const mappedView = sectionId === 'hero' ? 'home' : (sectionId as ActiveView);
            if (activeView !== mappedView) {
              setActiveView(mappedView);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView, setActiveView]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setAppsDropdownOpen(false);

    const mappedView = sectionId === 'hero' ? 'home' : (sectionId as ActiveView);
    setActiveView(mappedView);

    if (activeView === 'pass' || activeView === 'dashboard' || activeView === 'scanner') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* 🛡️ Left: Minimal Brand Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => scrollToSection('hero')}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-blue-600 text-white shadow-md shadow-brand-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">FaithPass</span>
          </div>

          {/* 🧭 Center: Dynamic Highlight Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scrollToSection('hero')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === 'home'
                  ? 'bg-slate-800 text-brand-400 font-bold border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === 'features'
                  ? 'bg-slate-800 text-brand-400 font-bold border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === 'how-it-works'
                  ? 'bg-slate-800 text-brand-400 font-bold border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${activeView === 'pricing'
                  ? 'bg-slate-800 text-brand-400 font-bold border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
            >
              <span>Pricing</span>
              <span className="px-1.5 py-0.2 text-[8px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Soon
              </span>
            </button>

            <button
              onClick={() => scrollToSection('events')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === 'events'
                  ? 'bg-slate-800 text-brand-400 font-bold border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
            >
              Events
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeView === 'contact'
                  ? 'bg-slate-800 text-brand-400 font-bold border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* ⚡ Right Side: Apps Dropdown & Primary CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">

            {/* Platform Apps Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAppsDropdownOpen(!appsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${activeView === 'scanner' || activeView === 'dashboard'
                    ? 'bg-brand-950/90 text-brand-300 border-brand-600/70 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
              >
                <AppWindow className="w-3.5 h-3.5 text-brand-400" />
                <span>Launch Apps</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${appsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {appsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-slate-700/80 p-2 shadow-2xl space-y-1 animate-fadeIn z-50">
                  <button
                    onClick={() => {
                      setActiveView('scanner');
                      setAppsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-950/50 transition-colors text-left"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-bold text-white">Mobile Scanner App</p>
                      <p className="text-[10px] text-slate-400 font-normal">Volunteer Gate Verification</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setAppsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-400 hover:bg-brand-950/50 transition-colors text-left"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-400" />
                    <div>
                      <p className="font-bold text-white">Admin Software</p>
                      <p className="text-[10px] text-slate-400 font-normal">Live Metrics & Reports</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Login Link */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
                  <p className="text-[9px] text-brand-400 font-semibold uppercase">{currentUser.role.replace('_', ' ')}</p>
                </div>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-xs font-semibold text-slate-300 hover:text-white px-2 py-1.5"
              >
                Login
              </button>
            )}

            {/* Primary Get Started Button */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-600 text-white"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 text-center"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 text-center"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 text-center"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 text-center"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 text-center"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 text-center"
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => {
              setActiveView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-400 bg-brand-950/40 border border-brand-800/40 flex items-center justify-between"
          >
            <span>Admin Software</span>
            <LayoutDashboard className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveView('scanner');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between"
          >
            <span>Mobile Scanner App</span>
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
