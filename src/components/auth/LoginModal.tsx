import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, ShieldCheck, Building2, Smartphone, Lock } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAsRole } = useApp();

  if (!isLoginModalOpen) return null;

  const roles: { role: UserRole; label: string; desc: string; icon: any }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Full system access & reports', icon: ShieldCheck },
    { role: 'organizer', label: 'Event Organizer', desc: 'Manage registrations & payments', icon: Lock },
    { role: 'pastor', label: 'Pastor / Leader', desc: 'View congregation member passes', icon: Building2 },
    { role: 'volunteer', label: 'Gate Volunteer', desc: 'Mobile scanner mode', icon: Smartphone }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel border border-slate-700 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white">System Login</h3>
          <button onClick={() => setIsLoginModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => loginAsRole(r.role)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500 text-left flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-brand-600/20 text-brand-400">
                <r.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{r.label}</h4>
                <p className="text-[11px] text-slate-400">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
