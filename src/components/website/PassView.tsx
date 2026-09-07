import React from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Printer, MessageSquareText, CheckCircle2, Clock, ArrowLeft, Building2, Calendar, MapPin, Smartphone, AlertCircle } from 'lucide-react';

export const PassView: React.FC = () => {
  const { selectedPassId, registrations, events, setActiveView, setIsRegisterModalOpen } = useApp();

  const cleanQuery = (selectedPassId || '').trim().toLowerCase().replace(/[\s\-]/g, '');

  const reg = registrations.find(r => 
    r.id.toLowerCase().replace(/[\s\-]/g, '') === cleanQuery ||
    r.phone.replace(/[\s\-]/g, '') === cleanQuery
  );

  if (!reg) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6 text-white font-sans">
        <div className="glass-panel p-8 rounded-3xl border-2 border-red-500/50 bg-slate-900/90 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">Ticket Pass Not Found</h3>
            <p className="text-xs text-slate-300">
              No registered ticket pass found matching: <code className="text-amber-400 font-mono font-bold">{selectedPassId}</code>
            </p>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Please double-check the Registration ID or Phone number, or complete event registration first.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md"
            >
              Register for Event Now
            </button>
            <button
              onClick={() => setActiveView('home')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700"
            >
              Back to Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const evt = events.find(e => e.id === reg.eventId) || events[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 text-white font-sans">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('home')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="glass-panel border-2 border-brand-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0">
        <div className="bg-gradient-to-r from-brand-700 via-blue-700 to-indigo-800 p-6 text-white space-y-3">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Verified Event Pass
          </span>
          <h2 className="text-2xl font-extrabold text-white">{evt.title}</h2>
          <p className="text-xs text-blue-100">{evt.date} • {evt.venue}, {evt.city}</p>
        </div>

        <div className="p-6 space-y-6 bg-slate-900">
          <div className="text-center p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Registration ID</p>
            <p className="text-2xl font-mono font-extrabold text-brand-400">{reg.id}</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-slate-900 shadow-inner">
            <QRCodeSVG value={reg.id} size={180} level="H" includeMargin={true} />
            <span className="text-xs font-mono font-semibold text-slate-600 mt-2">{reg.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px]">Participant Name</span>
              <p className="font-bold text-white text-sm">{reg.fullName}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px]">Church / Ministry</span>
              <p className="font-bold text-white text-sm">{reg.churchName} ({reg.city})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

