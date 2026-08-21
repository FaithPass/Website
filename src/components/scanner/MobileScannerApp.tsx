import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScannerMode, ParticipantRegistration } from '../../types';
import { QrCode, Search, CheckCircle2, XCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export const MobileScannerApp: React.FC = () => {
  const { scannerMode, setScannerMode, selectedGate, setSelectedGate, events, registrations, performScanAction, setActiveView } = useApp();
  const [manualIdInput, setManualIdInput] = useState('');
  const [scannedResult, setScannedResult] = useState<any>(null);

  const handleManualSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIdInput.trim()) return;
    const result = performScanAction(manualIdInput.trim());
    setScannedResult(result);
  };

  const handleSimulatedQrScan = (regId: string) => {
    const result = performScanAction(regId);
    setScannedResult(result);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-950 sm:border-x sm:border-slate-800 shadow-2xl flex flex-col justify-between text-slate-100 pb-10">
      <div className="bg-slate-900 border-b border-slate-800 p-4 space-y-3 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveView('home')} className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-sm font-bold text-white">FaithPass Mobile Scanner</span>
              <p className="text-[10px] text-emerald-400">Android Volunteer App • Connected</p>
            </div>
          </div>
        </div>

        {/* Modes Selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button onClick={() => setScannerMode('checkin')} className={`py-2 rounded-xl text-[11px] font-bold ${scannerMode === 'checkin' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
            🟢 Check-in
          </button>
          <button onClick={() => setScannerMode('checkout')} className={`py-2 rounded-xl text-[11px] font-bold ${scannerMode === 'checkout' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
            🔵 Check-out
          </button>
          <button onClick={() => setScannerMode('payment')} className={`py-2 rounded-xl text-[11px] font-bold ${scannerMode === 'payment' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>
            🟣 Payment
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5 flex-1">
        <div className="relative rounded-3xl bg-slate-900 border-2 border-slate-800 p-6 text-center space-y-3">
          <QrCode className="w-10 h-10 mx-auto text-brand-400" />
          <h4 className="text-xs font-bold text-white uppercase">Camera Scanner Active ({scannerMode.toUpperCase()})</h4>
          <div className="flex justify-center gap-1.5 pt-2">
            {registrations.slice(0, 3).map(r => (
              <button key={r.id} onClick={() => handleSimulatedQrScan(r.id)} className="px-2 py-1 rounded bg-slate-800 text-brand-300 font-mono text-[10px]">
                Scan {r.id}
              </button>
            ))}
          </div>
        </div>

        {/* Manual ID Search */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Non-Smartphone Manual ID Search</span>
          </h4>
          <form onSubmit={handleManualSearchSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. FP-2027-004582"
              value={manualIdInput}
              onChange={e => setManualIdInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white"
            />
            <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">Search</button>
          </form>
        </div>

        {scannedResult && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500 space-y-2 text-xs">
            <p className="font-bold text-emerald-400">{scannedResult.message}</p>
            {scannedResult.registration && (
              <div>
                <p className="text-white font-bold">👤 {scannedResult.registration.fullName}</p>
                <p className="text-slate-400">🏛 {scannedResult.registration.churchName}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
