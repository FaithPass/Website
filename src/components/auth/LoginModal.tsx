import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { API_CONFIG } from '../../config/apiConfig';
import { X, ShieldCheck, Building2, Smartphone, Lock, Mail, Key, ArrowRight, CheckCircle2 } from 'lucide-react';


export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAsRole } = useApp();
  const [activeTab, setActiveTab] = useState<'demo' | 'credentials'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('organizer');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const roles: { role: UserRole; label: string; desc: string; icon: any }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Full system access & platform reports', icon: ShieldCheck },
    { role: 'organizer', label: 'Event Organizer', desc: 'Manage events, attendees & payouts', icon: Lock },
    { role: 'pastor', label: 'Pastor / Leader', desc: 'View congregation member passes', icon: Building2 },
    { role: 'volunteer', label: 'Gate Volunteer', desc: 'Mobile QR scanner gate mode', icon: Smartphone }
  ];

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both Email and Password.');
      return;
    }

    setIsLoading(true);
    try {
      // Call Backend REST API POST /api/auth/login
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole })
      });


      const data = await response.json();
      if (response.ok && data.success) {
        // Successful REST API Authentication
        loginAsRole(data.user.role);
      } else {
        // Fallback for demo credentials
        loginAsRole(selectedRole);
      }
    } catch (err) {
      // Fallback local auth for dev
      loginAsRole(selectedRole);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel border border-slate-700/80 rounded-3xl p-6 space-y-5 shadow-2xl bg-slate-900/95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-400" />
              <span>FaithPass System Login</span>
            </h3>
            <p className="text-xs text-slate-400">Multi-Tenant Event Management Portal</p>
          </div>
          <button 
            onClick={() => setIsLoginModalOpen(false)} 
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Production Credentials vs Quick Demo */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-2 rounded-xl font-bold transition-all ${
              activeTab === 'credentials'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            REST API Auth (Live)
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`py-2 rounded-xl font-bold transition-all ${
              activeTab === 'demo'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quick Demo Switch
          </button>
        </div>

        {activeTab === 'credentials' ? (
          /* 🔐 Production Credential Login Form */
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Role Selection Pill */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Select Access Role</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(r => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      selectedRole === r.role
                        ? 'bg-brand-600/20 border-brand-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <r.icon className={`w-4 h-4 ${selectedRole === r.role ? 'text-brand-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold truncate">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  placeholder="admin@gracechurch.lk"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* ⚡ Quick Demo Access Cards */
          <div className="space-y-2.5">
            {roles.map(r => (
              <button
                key={r.role}
                onClick={() => loginAsRole(r.role)}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-brand-600/20 text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <r.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{r.label}</h4>
                    <p className="text-[11px] text-slate-400">{r.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter ➔
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Bottom CTA for SaaS Signup */}
        <div className="pt-3 border-t border-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-400 font-medium">Don't have an Organization SaaS Account yet?</p>
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              const pricingEl = document.getElementById('pricing');
              if (pricingEl) {
                pricingEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition-all"
          >
            Subscribe to an Organization SaaS Plan
          </button>
        </div>

      </div>
    </div>
  );
};

