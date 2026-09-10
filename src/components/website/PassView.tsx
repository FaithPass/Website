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
  const groupMembers = reg.groupId 
    ? registrations.filter(r => r.groupId === reg.groupId)
    : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 text-white font-sans">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => setActiveView('home')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Pass (A4 Grid)</span>
        </button>
      </div>

      {/* Pass Content */}
      <div className="glass-panel border-2 border-brand-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0">
        <div className="bg-gradient-to-r from-brand-700 via-blue-700 to-indigo-800 p-6 text-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified Event Pass
            </span>
            {reg.groupId && (
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Church Delegation ({groupMembers.length} Members)
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-white">{evt.title}</h2>
          <p className="text-xs text-blue-100">{evt.date} • {evt.venue}, {evt.city}</p>
        </div>

        <div className="p-6 space-y-6 bg-slate-900">
          {/* Main Primary Pass Header */}
          <div className="text-center p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Primary Registration ID</p>
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

          {/* Group Members Grid Section if Church Delegation */}
          {groupMembers.length > 1 && (
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-400" />
                    Church Delegation Members Pass List ({groupMembers.length})
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Delivery Mode: <strong className="text-emerald-400">{reg.deliveryMode === 'pastor_only' ? 'Pastor Only (1 Master SMS)' : 'Pastor + All Members SMS'}</strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {groupMembers.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                    <div className="p-2 bg-white rounded-xl">
                      <QRCodeSVG value={m.id} size={70} level="M" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono text-[9px] font-bold">
                        {m.id}
                      </span>
                      <p className="font-bold text-white">{m.fullName}</p>
                      <p className="text-[10px] text-slate-400">{m.phone}</p>
                      <p className="text-[9px] text-emerald-400 font-semibold">{m.paymentStatus.toUpperCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


