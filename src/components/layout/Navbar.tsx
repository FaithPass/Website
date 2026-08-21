import React, { useState } from 'react';
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
  Sparkles,
  ArrowRight
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

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    if (activeView === 'pass' || activeView === 'dashboard' || activeView === 'scanner') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      if (['home', 'events', 'features', 'how-it-works', 'pricing', 'about', 'contact'].includes(sectionId)) {
        setActiveView(sectionId as ActiveView);
      }
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 🛡️ Left: FaithPass Corporate SaaS Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-blue-600 text-white shadow-md shadow-brand-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">FaithPass</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                SaaS Beta
              </span>
            </div>
          </div>

          {/* 🧭 Center: Professional Corporate Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('hero')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'home' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'features' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'how-it-works' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection('events')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'events' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Events
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 inline-flex items-center gap-1.5"
            >
              <span>Pricing</span>
              <span className="px-1.5 py-0.2 text-[8px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Coming Soon
              </span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'contact' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* ⚡ Right: Action Buttons & Get Started */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            
            <button
              onClick={() => {
                setActiveView('scanner');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeView === 'scanner'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-900 text-emerald-400 border-slate-800 hover:bg-emerald-950/40'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Scanner</span>
            </button>

            <button
              onClick={() => {
                setActiveView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeView === 'dashboard'
                  ? 'bg-brand-600 text-white border-brand-500 shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand-400" />
              <span>Admin App</span>
            </button>

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
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              >
                Login
              </button>
            )}

            {/* Primary Get Started Button (Client Request) */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Mobile Drawer Toggle */}
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

      {/* Mobile Drawer */}
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
          </div>

          <button
            onClick={() => {
              setActiveView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-400 bg-brand-950/40 border border-brand-800/40 flex items-center justify-between"
          >
            <span>Admin Dashboard</span>
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
