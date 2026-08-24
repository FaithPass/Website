import React from 'react';
import { ShieldCheck, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <img 
              src="/images/faithpass_logo.jpg" 
              alt="FaithPass Logo" 
              className="w-9 h-9 rounded-xl shadow-md shadow-blue-500/20 border border-blue-500/30 object-cover" 
            />
            <span className="text-xl font-black text-white tracking-tight">FaithPass</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            The enterprise SaaS platform for event registration, attendance management, and instant mobile verification across Sri Lanka.
          </p>
          <div className="flex items-center gap-3 pt-2 text-slate-400">
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#events" className="hover:text-white transition-colors">Active Events</a></li>
          </ul>
        </div>

        {/* Legal & Company */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Support & Contact</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Direct Contact</h4>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <Mail className="w-4 h-4 text-brand-400 shrink-0" />
            <span>support@faithpass.lk</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <Phone className="w-4 h-4 text-brand-400 shrink-0" />
            <span>+94 77 123 4567</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <Globe className="w-4 h-4 text-brand-400 shrink-0" />
            <span>faithpass.lk</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 FaithPass.lk. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">Terms of Service</a>
          <a href="#" className="hover:text-slate-400">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};
