import React from 'react';
import { ShieldCheck, Mail, Phone, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">FaithPass</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            The trusted SaaS platform for church event registration, attendance management, and mobile scanning.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-400">
            <Globe className="w-4 h-4" />
            <span>faithpass.lk</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Features & Benefits</a></li>
            <li><a href="#" className="hover:text-white">Upcoming Events</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Beta Hardware</h4>
          <ul className="space-y-2 text-xs">
            <li className="text-emerald-400">✓ No laptop required at gates</li>
            <li className="text-emerald-400">✓ No monitor or webcam expense</li>
            <li className="text-emerald-400">✓ Android Phones 2–5 for Volunteers</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Contact Support</h4>
          <div className="flex items-center gap-2 text-xs">
            <Mail className="w-4 h-4 text-brand-400" />
            <span>support@faithpass.lk</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone className="w-4 h-4 text-brand-400" />
            <span>+94 77 123 4567</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex justify-between text-xs text-slate-500">
        <p>© 2026 FaithPass.lk. All rights reserved.</p>
      </div>
    </footer>
  );
};
