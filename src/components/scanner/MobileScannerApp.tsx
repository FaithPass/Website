import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScannerMode, ParticipantRegistration } from '../../types';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  CreditCard, 
  Smartphone, 
  Zap, 
  Activity, 
  Wifi, 
  Battery, 
  Volume2, 
  Sliders, 
  FileText,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const MobileScannerApp: React.FC = () => {
  const { 
    scannerMode, 
    setScannerMode, 
    selectedGate, 
    setSelectedGate, 
    events, 
    registrations, 
    performScanAction, 
    setActiveView,
    attendanceLogs
  } = useApp();

  const [manualIdInput, setManualIdInput] = useState('');
  const [scannedResult, setScannedResult] = useState<any>(null);
  const [isScanningActive, setIsScanningActive] = useState(true);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-8 px-4 sm:px-6 lg:px-8">
      
      {/* 🚀 Top Navigation Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('home')}
            className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">FaithPass Gate Scanner</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Sync Active
              </span>
            </div>
            <p className="text-xs text-slate-400">Android & iOS Volunteer App • Multi-Gate Check-in System</p>
          </div>
        </div>

        {/* Gate Selector */}
        <div className="hidden sm:flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <Sliders className="w-4 h-4 text-brand-400 ml-2" />
          <span className="text-slate-400 font-medium">Gate:</span>
          <select
            value={selectedGate}
            onChange={e => setSelectedGate(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs focus:outline-none"
          >
            <option value="Gate 1 — Main Entrance">Gate 1 — Main Entrance</option>
            <option value="Gate 2 — VIP Entrance">Gate 2 — VIP Entrance</option>
            <option value="Gate 3 — Youth Hall">Gate 3 — Youth Hall</option>
            <option value="Gate 4 — Rear Exit">Gate 4 — Rear Exit</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* 📱 LEFT / CENTER: Ultra-Realistic Smartphone Device Mockup Frame */}
        <div className="lg:col-span-6 flex justify-center">
          
          <div className="relative w-full max-w-[390px] rounded-[48px] bg-slate-900 border-[10px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden space-y-0 text-slate-100 flex flex-col justify-between min-h-[720px]">

            {/* Smartphone Status Bar / Dynamic Island */}
            <div className="bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between text-[11px] text-slate-400 font-bold border-b border-slate-800/60 sticky top-0 z-40">
              <span>9:41 AM</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <Battery className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Mobile App Header */}
            <div className="bg-slate-900/95 p-4 border-b border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <img src="/images/faithpass_logo.jpg" alt="Logo" className="w-8 h-8 rounded-xl border border-brand-500/40 object-cover" />
                <div>
                  <h3 className="text-sm font-black text-white">FaithPass Scanner</h3>
                  <p className="text-[10px] text-brand-300 font-semibold">{selectedGate}</p>
                </div>
              </div>

              {/* 🟢 🔵 🟣 3 Neon-Illuminated Mode Switches */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setScannerMode('checkin')}
                  className={`py-2.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all ${
                    scannerMode === 'checkin'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Check-in</span>
                </button>

                <button
                  onClick={() => setScannerMode('checkout')}
                  className={`py-2.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all ${
                    scannerMode === 'checkout'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Check-out</span>
                </button>

                <button
                  onClick={() => setScannerMode('payment')}
                  className={`py-2.5 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all ${
                    scannerMode === 'payment'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Payment</span>
                </button>
              </div>
            </div>

            {/* Main App Content Body */}
            <div className="p-4 space-y-4 flex-1 bg-slate-950">
              
              {/* Active Mode Banner */}
              <div className={`p-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border ${
                scannerMode === 'checkin'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : scannerMode === 'checkout'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              }`}>
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Active Mode: {scannerMode.toUpperCase()}</span>
              </div>

              {/* 📷 Viewfinder Camera Scanner Box with Animated Target Overlay */}
              <div className="relative h-52 rounded-3xl bg-slate-900 border-2 border-brand-500/50 overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner group">
                
                {/* Laser Scanning Bar Animation */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#4ade80] animate-[bounce_2s_infinite]" />

                {/* Corner Target Markers */}
                <div className="w-36 h-36 border-2 border-dashed border-emerald-400/80 rounded-2xl flex flex-col items-center justify-center space-y-2 bg-slate-950/40 backdrop-blur-sm">
                  <QrCode className="w-10 h-10 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-white text-center px-2">
                    Point camera at QR Pass ({scannerMode.toUpperCase()})
                  </span>
                </div>

                {/* Interactive Demo Triggers */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-1.5">
                  {registrations.slice(0, 2).map(r => (
                    <button
                      key={r.id}
                      onClick={() => handleSimulatedQrScan(r.id)}
                      className="px-2.5 py-1 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-mono text-[10px] font-bold shadow-md flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3 text-amber-300" />
                      <span>{r.id.split('-').pop()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 🔍 Non-Smartphone Manual ID Search Card */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2.5 bg-slate-900/90">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-brand-400" />
                    <span>Non-Smartphone Manual Search</span>
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold">SMS Registration ID</span>
                </div>
                
                <form onSubmit={handleManualSearchSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. FP-2027-004582"
                    value={manualIdInput}
                    onChange={e => setManualIdInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Verification Result Card */}
              {scannedResult && (
                <div className={`p-4 rounded-2xl border space-y-2 text-xs shadow-xl animate-fadeIn ${
                  scannedResult.success !== false
                    ? 'bg-slate-900 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-red-500 text-red-300'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-extrabold flex items-center gap-1.5">
                      {scannedResult.success !== false ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                      <span>{scannedResult.message}</span>
                    </span>
                  </div>

                  {scannedResult.registration && (
                    <div className="space-y-1 pt-1 text-slate-200 text-xs">
                      <p className="font-bold text-white text-sm">👤 {scannedResult.registration.fullName}</p>
                      <p className="text-slate-400">🏛 {scannedResult.registration.churchName} ({scannedResult.registration.city})</p>
                      <p className="text-amber-400 font-mono text-[11px]">🆔 {scannedResult.registration.id}</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Smartphone Bottom Home Bar */}
            <div className="bg-slate-950 py-3 flex items-center justify-center border-t border-slate-800">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>

          </div>

        </div>

        {/* 📊 RIGHT: Live Gate Audit Logs & Real-Time Headcount (Desktop Side Panel) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-400" />
                <h3 className="text-lg font-bold text-white">Live Gate Audit Logs</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold">
                {attendanceLogs.length} Scans
              </span>
            </div>

            <p className="text-xs text-slate-400">Real-time scan logs recorded by volunteer smartphones across all entrance gates.</p>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {attendanceLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-extrabold uppercase px-2 py-0.5 rounded text-[10px] ${
                      log.action === 'checkin'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : log.action === 'checkout'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {log.action.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{log.timestamp}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-bold text-white block">{log.participantName}</strong>
                      <span className="text-xs text-slate-400">{log.churchName}</span>
                    </div>
                    <span className="text-[11px] text-brand-400 font-mono font-semibold">{log.gateNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
