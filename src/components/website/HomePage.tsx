import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Ticket, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  Building2, 
  QrCode, 
  MessageSquareText, 
  BarChart3, 
  Sparkles,
  Send,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  DollarSign,
  Plus,
  Monitor,
  Check,
  Clock,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    events, 
    setActiveView, 
    setIsRegisterModalOpen, 
    openPassView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'register' | 'qrpass' | 'scanner' | 'reports'>('dashboard');

  return (
    <div className="space-y-24 pb-20">

      {/* 🚀 Hero Section (Refined Corporate SaaS Layout) */}
      <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20">
        
        {/* Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-600/15 via-blue-600/10 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-brand-500/30 text-brand-300 text-xs font-semibold shadow-md">
              <Sparkles className="w-4 h-4 text-brand-400 animate-pulse" />
              <span>FaithPass Beta v1.0 — Enterprise SaaS Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Church Event Management, <span className="bg-gradient-to-r from-brand-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">Simplified.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Register participants, verify attendance, manage church groups, and distribute event benefits—all from one secure platform.
            </p>

            {/* Client Requested Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-brand-600/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create an Event</span>
              </button>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-card hover:bg-slate-800/80 text-white font-bold text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2.5"
              >
                <Ticket className="w-4 h-4 text-brand-400" />
                <span>Register for an Event</span>
              </button>

            </div>

            {/* Test SMS Quick Pill */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Quick Test SMS Pass ID:</span>
              <button 
                onClick={() => openPassView('FP-2027-004582')}
                className="px-2.5 py-1 rounded-lg bg-brand-950/80 text-brand-300 font-mono font-bold border border-brand-800 hover:bg-brand-900 transition-all flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5 text-brand-400" />
                <span>FP-2027-004582</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Multi-Device Graphic Illustration (Client Request) */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative glass-panel rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4">
              
              {/* Laptop Dashboard Visual */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-brand-400" />
                    <span className="text-xs font-bold text-white">Live Admin Dashboard</span>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400">Gate Sync Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="text-[10px] text-slate-400 block">Registrations</span>
                    <strong className="text-white text-base">1,450</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="text-[10px] text-slate-400 block">Live Checked-In</span>
                    <strong className="text-emerald-400 text-base">890</strong>
                  </div>
                </div>
              </div>

              {/* Phone QR Pass & Volunteer Scanner Visual */}
              <div className="grid grid-cols-2 gap-3">
                
                <div className="p-3.5 rounded-2xl bg-brand-950/40 border border-brand-800/40 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-brand-300">Digital Pass</span>
                    <QrCode className="w-3.5 h-3.5 text-brand-400" />
                  </div>
                  <div className="p-2 bg-white rounded-xl text-center">
                    <QrCode className="w-12 h-12 mx-auto text-slate-900" />
                  </div>
                  <p className="text-[10px] font-mono text-center text-slate-300 font-bold">FP-2027-004582</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-300">Volunteer Scan</span>
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[10px] space-y-1">
                    <p className="font-bold text-white truncate">👤 Kamal Silva</p>
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-500/20 text-emerald-400 block text-center">✅ Verified</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 💳 Features Section (6 Corporate SaaS Cards - Client Request) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">
        
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
            Enterprise Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Built for Modern Ministries & Gatherings
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Everything you need for seamless event management, attendance verification, and group reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Church Registration */}
          <div className="glass-card p-7 rounded-3xl hover:border-brand-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Church Registration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register partner churches, ministry delegations, and congregation leaders with consolidated group management.
            </p>
          </div>

          {/* Card 2: Individual Registration */}
          <div className="glass-card p-7 rounded-3xl hover:border-brand-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Individual Registration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Streamlined online registration forms allowing individual attendees to register and receive instant passes.
            </p>
          </div>

          {/* Card 3: QR Event Pass */}
          <div className="glass-card p-7 rounded-3xl hover:border-brand-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">QR Event Pass</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-resolution digital QR passes distributed automatically via SMS and accessible on any smartphone browser.
            </p>
          </div>

          {/* Card 4: Attendance Tracking */}
          <div className="glass-card p-7 rounded-3xl hover:border-brand-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Attendance Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time multi-gate check-in, check-out, and live attendee headcount synchronized instantly across all volunteer devices.
            </p>
          </div>

          {/* Card 5: Payment Distribution */}
          <div className="glass-card p-7 rounded-3xl hover:border-brand-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Payment Distribution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track event registration fees, pending balances, cash collections at gate desks, and online payments seamlessly.
            </p>
          </div>

          {/* Card 6: Reports & Analytics */}
          <div className="glass-card p-7 rounded-3xl hover:border-brand-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Reports & Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exportable attendance reports, church breakdowns, time-series check-in graphs, and SMS audit logs.
            </p>
          </div>

        </div>

      </section>

      {/* 🔄 How It Works Section (6 Step Flow - Client Request) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">
        
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            Simple 6-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            How FaithPass Operates
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From event setup to post-event reports, experience seamless gate verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">1</div>
            <h3 className="text-base font-bold text-white">Create Event</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Organizers set up the event details, venue, registration fees, and gate parameters in the Admin Software.</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">2</div>
            <h3 className="text-base font-bold text-white">Register Participants</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Churches or individual attendees fill out the online registration form on the public platform.</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">3</div>
            <h3 className="text-base font-bold text-white">SMS with QR Pass</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Instant SMS sent via SMSLenz with Registration ID (`FP-2027-004582`) & direct web pass link.</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">4</div>
            <h3 className="text-base font-bold text-white">Gate Check-in</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Volunteers scan QR pass or search Registration ID manually on basic feature phones.</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">5</div>
            <h3 className="text-base font-bold text-white">Gate Check-out</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Switch scanner to Check-out Mode to record attendee exits across multiple gates.</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center">6</div>
            <h3 className="text-base font-bold text-white">Payment & Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Collect pending registration fees and export final attendance analytics reports.</p>
          </div>

        </div>

      </section>

      {/* 📷 Screenshots Showcase Section (Client Request) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Product Interface Preview</h2>
          <p className="text-slate-400 text-sm">Explore FaithPass across Admin, Web, and Mobile interfaces</p>
        </div>

        {/* Preview Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'dashboard' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'register' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Registration Page
          </button>
          <button
            onClick={() => setActiveTab('qrpass')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'qrpass' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Digital QR Pass
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'scanner' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Scanner App
          </button>
        </div>

        {/* Active Mockup Display */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white">Admin Software — Live Metrics</span>
                <span className="text-xs text-emerald-400 font-mono">http://faithpass.lk/dashboard</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Total Registrations</span>
                  <strong className="text-white text-xl">1,450</strong>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Checked-In Attendees</span>
                  <strong className="text-emerald-400 text-xl">890</strong>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Participating Churches</span>
                  <strong className="text-white text-xl">42</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="space-y-3 text-center max-w-md mx-auto">
              <Ticket className="w-10 h-10 mx-auto text-brand-400" />
              <h3 className="text-base font-bold text-white">Event Registration Form</h3>
              <p className="text-xs text-slate-400">Step-by-step registration with automatic SMS verification</p>
              <button onClick={() => setIsRegisterModalOpen(true)} className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold">
                Test Live Registration Modal
              </button>
            </div>
          )}

          {activeTab === 'qrpass' && (
            <div className="text-center space-y-3 max-w-sm mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <QrCode className="w-12 h-12 mx-auto text-brand-400" />
              <p className="text-xs font-bold text-white">Digital Event Pass View</p>
              <code className="text-brand-300 font-mono font-bold text-sm block">FP-2027-004582</code>
              <button onClick={() => openPassView('FP-2027-004582')} className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold">
                Open Pass Viewer
              </button>
            </div>
          )}

          {activeTab === 'scanner' && (
            <div className="text-center space-y-3 max-w-sm mx-auto p-4 rounded-2xl bg-slate-900 border border-emerald-500">
              <Smartphone className="w-10 h-10 mx-auto text-emerald-400" />
              <p className="text-xs font-bold text-white">Android Volunteer Scanner App</p>
              <p className="text-[11px] text-slate-400">3 Modes + Manual Registration ID Lookup for non-smartphones</p>
              <button onClick={() => setActiveView('scanner')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                Launch Mobile Scanner
              </button>
            </div>
          )}
        </div>

      </section>

      {/* 💰 Pricing Section (Client Request: Beta Launch & Coming Soon) */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-black text-white">Beta Phase Access</h2>
          <p className="text-slate-400 text-sm">Free access for early adopter church partners during Beta v1.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
          
          {/* Beta Plan */}
          <div className="glass-panel p-8 rounded-3xl border-2 border-brand-500 space-y-6 relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-extrabold uppercase">
              Current Beta
            </span>
            <h3 className="text-xl font-bold text-white">Beta Partner Access</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">FREE</span>
              <span className="text-xs text-slate-400">/ event</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Registrations</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Android Scanner App Access</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> SMSLenz SMS Gateway Pass Messages</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Non-Smartphone Manual ID Search</li>
            </ul>
            <button onClick={() => setIsRegisterModalOpen(true)} className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold text-xs">
              Get Started Now
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 opacity-80">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-[10px] font-extrabold uppercase">
              Coming Soon
            </span>
            <h3 className="text-xl font-bold text-white">Enterprise Ministry</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">Custom</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-500" /> Dedicated Self-Service Kiosks</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-500" /> Custom Domain Integration</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-500" /> 24/7 Dedicated Support</li>
            </ul>
          </div>

        </div>

      </section>

      {/* 📅 Featured Events Section (#events) */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Active Ministry Gatherings</h2>
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

      {/* 📣 CTA Section (Client Request: "Ready to simplify your next church event?") */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-brand-500/40 text-center space-y-6 bg-gradient-to-b from-brand-950/60 to-slate-950">
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to simplify your next church event?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Eliminate expensive gate hardware and experience fast mobile verification today.
          </p>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-brand-600/30 hover:scale-[1.02] transition-all inline-flex items-center gap-3"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 📞 Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Contact Support</h2>
            <p className="text-xs text-slate-400">Questions about setting up mobile scanners for your upcoming event?</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! FaithPass support team will contact you shortly.'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input type="text" placeholder="Pr. John Fernando" required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
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
