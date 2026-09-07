import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building2, Ticket, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHostEvent: () => void;
  onSelectRegisterAttendee: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onSelectHostEvent,
  onSelectRegisterAttendee,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl bg-slate-900/95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30 text-[10px] font-extrabold uppercase tracking-wider">
              Get Started Guide
            </span>
            <h3 className="text-xl font-black text-white mt-1">Welcome to FaithPass</h3>
            <p className="text-xs text-slate-400">Please choose how you would like to proceed today:</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Path Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Church / Organization Event Host */}
          <div 
            onClick={onSelectHostEvent}
            className="group relative p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  Host an Event / Organization
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  For churches and ministries looking to host events, manage registrations, and accept online payments with bank payouts.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Subscribe SaaS Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Event Attendee */}
          <div 
            onClick={onSelectRegisterAttendee}
            className="group relative p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30 group-hover:bg-brand-600 group-hover:text-white transition-all">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white group-hover:text-brand-400 transition-colors">
                  Register as Attendee
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  For participants joining an upcoming event. Register now to receive your instant SMS Pass & digital QR code.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-bold text-brand-400">
              <span>Get Event Ticket Pass</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Multi-Tenant SaaS Platform • Live SMS & Mobile Gate Scanning</span>
          </p>
        </div>

      </div>
    </div>
  );
};
