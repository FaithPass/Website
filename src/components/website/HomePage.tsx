import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Ticket, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Building2, 
  QrCode, 
  MessageSquareText, 
  BarChart3, 
  Sparkles,
  Send,
  ShieldCheck,
  SmartphoneNfc
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    events, 
    setActiveView, 
    setIsRegisterModalOpen, 
    openPassView 
  } = useApp();

  return (
    <div className="space-y-24 pb-16">

      {/* 🚀 Hero Section (#hero) */}
      <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-brand-500/30 text-brand-300 text-xs font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>FaithPass Beta v1.0 — Mobile Verification Platform</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Register. Verify. <span className="bg-gradient-to-r from-brand-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">Gather.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              The trusted platform for church event registration, attendance, and participant management. Eliminate expensive gate hardware with instant Android mobile scanning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold text-base shadow-xl flex items-center justify-center gap-3"
            >
              <Ticket className="w-5 h-5" />
              <span>Register Event</span>
            </button>

            <button
              onClick={() => setActiveView('scanner')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 hover:bg-emerald-900/60 text-emerald-300 font-bold text-base shadow-lg flex items-center justify-center gap-3"
            >
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span>Open Scanner App</span>
            </button>

            <button
              onClick={() => openPassView('FP-2027-004582')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-card hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-brand-400" />
              <span>Demo Event Pass</span>
            </button>
          </div>

          <div className="pt-6">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Test SMS Pass ID:</span>
              <code className="px-2 py-0.5 rounded bg-brand-950 text-brand-300 font-mono font-bold border border-brand-800">FP-2027-004582</code>
            </div>
          </div>

        </div>
      </section>

      {/* 📖 About Section (#about) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider">
              About FaithPass
            </span>
            <h2 className="text-3xl font-extrabold text-white">What is FaithPass?</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
              FaithPass is a specialized SaaS event registration, attendance management, and participant verification platform built specifically for churches, conferences, and large Christian gatherings across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-brand-400" />
              <h3 className="font-bold text-white text-sm">Secure & Reliable</h3>
              <p className="text-xs text-slate-400">Unique QR pass IDs prevent unauthorized entries and duplicate check-ins across multiple gate checkpoints.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <SmartphoneNfc className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Zero Extra Hardware</h3>
              <p className="text-xs text-slate-400">Volunteers use their existing mobile devices without requiring laptops, webcams, or monitors at gates.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <MessageSquareText className="w-6 h-6 text-purple-400" />
              <h3 className="font-bold text-white text-sm">SMS & Offline Friendly</h3>
              <p className="text-xs text-slate-400">Automatic SMS distribution via SMSLenz with manual ID lookup support for non-smartphone attendees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 Features Section (#features) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Platform Features</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Why church organizers trust FaithPass for practical gate verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-3">
            <XCircle className="w-8 h-8 text-rose-400" />
            <h3 className="text-base font-bold text-white">No Laptops at Every Gate</h3>
            <p className="text-xs text-slate-400">Save money and power cables. Gate volunteers do not require heavy laptop setups.</p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Volunteers' Android Phones</h3>
            <p className="text-xs text-slate-400">Install the FaithPass Scanner App on 2–5 Android phones and scan instantly.</p>
          </div>

          <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-3">
            <Zap className="w-8 h-8 text-purple-400" />
            <h3 className="text-base font-bold text-white">3 Automatic Scanner Modes</h3>
            <p className="text-xs text-slate-400">🟢 Check-in Mode, 🔵 Check-out Mode, 🟣 Payment Collection Mode.</p>
          </div>
        </div>
      </section>

      {/* 📅 Events Section (#events) */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Church Events</h2>
            <p className="text-xs text-slate-400">Select an event below to register or view attendance software</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="glass-panel p-6 rounded-2xl space-y-4 border border-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {evt.status}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{evt.title}</h3>
                </div>
                <span className="text-sm font-bold text-brand-400">LKR {evt.registrationFee}</span>
              </div>

              <p className="text-xs text-slate-300">{evt.description}</p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Register Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📞 Contact Section (#contact) */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Contact FaithPass Support</h2>
            <p className="text-xs text-slate-400">Questions about setting up mobile scanners for your upcoming church gathering?</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! FaithPass support team will contact you shortly.'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input type="text" placeholder="Pr. John Fernando" required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Church / Organization</label>
                <input type="text" placeholder="Grace Assembly" required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / Mobile</label>
              <input type="tel" placeholder="077 123 4567" required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
              <textarea rows={3} placeholder="Tell us about your event date, expected attendees, and gate requirements..." required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
