import React from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Printer, MessageSquareText, CheckCircle2, Clock, ArrowLeft, Building2, Calendar, MapPin, Smartphone } from 'lucide-react';

export const PassView: React.FC = () => {
  const { selectedPassId, registrations, events, setActiveView, resendSms } = useApp();

  const reg = registrations.find(r => r.id === selectedPassId) || registrations[0];
  const evt = events.find(e => e.id === reg.eventId) || events[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('home')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="glass-panel border-2 border-brand-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0">
        <div className="bg-gradient-to-r from-brand-700 to-indigo-800 p-6 text-white space-y-3">
          <h2 className="text-2xl font-extrabold text-white">{evt.title}</h2>
          <p className="text-xs text-blue-100">{evt.date} • {evt.venue}</p>
        </div>

        <div className="p-6 space-y-6 bg-slate-900">
          <div className="text-center p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Registration ID</p>
            <p className="text-2xl font-mono font-extrabold text-brand-400">{reg.id}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-900">
            <QRCodeSVG value={reg.id} size={180} level="H" includeMargin={true} />
            <span className="text-xs font-mono font-semibold text-slate-600 mt-2">{reg.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px]">Name</span>
              <p className="font-bold text-white text-sm">{reg.fullName}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px]">Church</span>
              <p className="font-bold text-white text-sm">{reg.churchName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
