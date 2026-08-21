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
  Smartphone
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
    
    // If not on main homepage view, switch to home first
    if (activeView === 'pass' || activeView === 'dashboard' || activeView === 'scanner') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      setActiveView(sectionId as ActiveView);
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-blue-700 text-white shadow-lg shadow-brand-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white">FaithPass</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  Beta v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Register. Verify. Gather.</p>
            </div>
          </div>

          {/* Desktop Navigation Links with Smooth Scroll */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('hero')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'home' || activeView === 'hero' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'features' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('events')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'events' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Events
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'about' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'contact' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* App Switchers & Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => {
                setActiveView('scanner');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeView === 'scanner'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30'
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-700/50 hover:bg-emerald-900/40'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Scanner</span>
            </button>

            <button
              onClick={() => {
                setActiveView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeView === 'dashboard'
                  ? 'bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-600/30'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Software</span>
            </button>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-blue-600 text-white shadow-md shadow-brand-600/20"
            >
              <Ticket className="w-4 h-4" />
              <span>Register Now</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="text-right">
                  <p className="text-xs font-semibold text-white leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-brand-400 uppercase font-medium">{currentUser.role.replace('_', ' ')}</p>
                </div>
                <button
                  onClick={logout}
                  title="Log out"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => scrollToSection('hero')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('events')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Events
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            About
          </button>
          <button
            onClick={() => {
              setActiveView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-brand-400 bg-brand-950/40 border border-brand-800/40"
          >
            Admin Software
          </button>
          <button
            onClick={() => {
              setActiveView('scanner');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40"
          >
            Mobile Scanner App
          </button>
        </div>
      )}
    </header>
  );
};
