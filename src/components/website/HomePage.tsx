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
  FileSpreadsheet,
  Quote,
  Star,
  Users,
  Lock,
  CheckCircle
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
    <div className="space-y-28 pb-20">

      {/* 🚀 1. Hero Section (Ultra-High-End Corporate Layout with Photography Integration) */}
      <section id="hero" className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20">

        {/* Subtle Luxury Gradient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-brand-600/15 via-amber-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Headlines & Primary Actions */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">

            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>FaithPass Platform • Enterprise SaaS Edition</span>
            </div> */}

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Church Event Management, <span className="bg-gradient-to-r from-brand-400 via-blue-300 to-amber-400 bg-clip-text text-transparent">Simplified.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Register participants, verify attendance, manage church groups, and distribute event benefits—all from one secure platform.
            </p>

            {/* Action Buttons with High-Contrast Accent Styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-brand-600/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
              >
                <Plus className="w-4.5 h-4.5" />
                <span>Create an Event</span>
              </button>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold text-sm border border-amber-500/40 transition-all flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Ticket className="w-4.5 h-4.5 text-amber-400" />
                <span>Register for an Event</span>
              </button>

            </div>

            {/* Quick Pass Demo Link */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Quick Test Pass ID:</span>
              <button
                onClick={() => openPassView('FP-2027-004582')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono font-bold border border-amber-500/30 hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>FP-2027-004582</span>
              </button>
            </div>

          </div>

          {/* Right Column: Multi-Device Dashboard Photography Showcase */}
          <div className="lg:col-span-5 relative">

            <div className="relative glass-panel rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl space-y-4 bg-slate-900/90 group">

              {/* Event Auditorium Hero Photography Background */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="/images/hero_event_gathering.png"
                  alt="FaithPass Event Auditorium Gathering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating Gold Badge Overlay */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-Time Gate Sync</span>
                </div>
              </div>

              {/* Overlaid Live Admin Dashboard Metrics */}
              <div className="p-6 pt-0 space-y-4 -mt-12 relative z-10">
                <div className="p-4 rounded-2xl bg-slate-950/95 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-brand-400" />
                      <span className="text-xs font-bold text-white">Live Admin Dashboard</span>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Sync Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Registrations</span>
                      <strong className="text-white text-lg">1,450</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Live Checked-In</span>
                      <strong className="text-emerald-400 text-lg">890</strong>
                    </div>
                  </div>
                </div>

                {/* Digital Pass & Scanner Mockup Row */}
                <div className="grid grid-cols-2 gap-3">

                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-amber-400">Digital Pass</span>
                      <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="p-2 bg-white rounded-xl text-center">
                      <QrCode className="w-10 h-10 mx-auto text-slate-900" />
                    </div>
                    <p className="text-[10px] font-mono text-center text-slate-300 font-bold">FP-2027-004582</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-emerald-400">Volunteer Scan</span>
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] space-y-1">
                      <p className="font-bold text-white truncate">👤 Kamal Silva</p>
                      <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-500/20 text-emerald-400 block text-center border border-emerald-500/30">
                        ✅ Verified
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 📊 2. Statistics & Metrics Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 bg-slate-900/60 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">

            <div className="space-y-1">
              <strong className="text-3xl sm:text-4xl font-black text-white">1,450+</strong>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Registrations</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <strong className="text-3xl sm:text-4xl font-black text-emerald-400">99.8%</strong>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verification Accuracy</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <strong className="text-3xl sm:text-4xl font-black text-amber-400">40+</strong>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ministry Partners</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <strong className="text-3xl sm:text-4xl font-black text-brand-400">LKR 0</strong>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Extra Gate Hardware</p>
            </div>

          </div>
        </div>
      </section>

      {/* 📸 3. High-Contrast Photography Feature Section (Referencing uploaded mockups) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

            {/* Left Photo Card with Gold Overlay Badge (Matching Reference Mockups) */}
            <div className="lg:col-span-5 relative h-80 lg:h-full min-h-[380px] overflow-hidden">
              <img
                src="/images/admin_organizer_laptop.png"
                alt="Event Manager Admin Dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950" />

              {/* Gold/Amber Highlighted Offer Box (Directly inspired by reference screenshot) */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl accent-number-box space-y-2 shadow-2xl">
                <span className="px-2 py-0.5 rounded bg-slate-950/30 text-white text-[9px] font-extrabold uppercase">
                  100% Cost Efficiency
                </span>
                <h4 className="text-lg font-black text-white">Save LKR 200,000+</h4>
                <p className="text-xs text-amber-100 font-medium">No expensive laptop rentals or gate webcams required.</p>
              </div>
            </div>

            {/* Right Side Content & Feature Highlights */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                Why Choose FaithPass?
              </span>
              <h2 className="text-3xl font-black text-white">Engineered for Church & Ministry Success</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                FaithPass bridges the gap between digital registration and gate entry. Organizers manage events with complete peace of mind, while gate volunteers use their own smartphones for instant scanning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <ShieldCheck className="w-5 h-5 text-brand-400" />
                  <h3 className="font-bold text-white text-xs">Secure Duplicate Protection</h3>
                  <p className="text-[11px] text-slate-400">Prevents pass sharing across multiple gate entries.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-xs">Volunteer Mobile Scanner</h3>
                  <p className="text-[11px] text-slate-400">Works on any Android or iOS device in 1 click.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 💳 4. Features Section (6 Cards with Gold/Amber Number Markers) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">

        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
            Capabilities Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Built for Modern Ministries & Events
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Everything required for seamless registration, attendance verification, and group reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 01 */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 relative card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">01</span>
            </div>
            <h3 className="text-lg font-bold text-white">Church Registration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register partner churches, ministry delegations, and congregation leaders with consolidated group management.
            </p>
          </div>

          {/* Card 02 */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 relative card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center font-bold">
                <Ticket className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">02</span>
            </div>
            <h3 className="text-lg font-bold text-white">Individual Registration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Streamlined online registration forms allowing individual attendees to register and receive instant passes.
            </p>
          </div>

          {/* Card 03 */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 relative card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center font-bold">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">03</span>
            </div>
            <h3 className="text-lg font-bold text-white">QR Event Pass</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-resolution digital QR passes distributed automatically via SMS and accessible on any smartphone browser.
            </p>
          </div>

          {/* Card 04 */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 relative card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">04</span>
            </div>
            <h3 className="text-lg font-bold text-white">Attendance Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time multi-gate check-in, check-out, and live attendee headcount synchronized instantly across all volunteer devices.
            </p>
          </div>

          {/* Card 05 */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 relative card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center font-bold">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">05</span>
            </div>
            <h3 className="text-lg font-bold text-white">Payment Distribution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track event registration fees, pending balances, cash collections at gate desks, and online payments seamlessly.
            </p>
          </div>

          {/* Card 06 */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-5 relative card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-brand-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">06</span>
            </div>
            <h3 className="text-lg font-bold text-white">Reports & Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exportable attendance reports, church breakdowns, time-series check-in graphs, and SMS audit logs.
            </p>
          </div>

        </div>

      </section>

      {/* 🔄 5. How It Works Section (Structured Numbered Cards) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-20">

        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            Workflow Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            6-Step Operational Flow
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From event creation to post-event reports, experience zero-lag gate verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 relative card-hover-glow">
            <span className="w-9 h-9 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">01</span>
            <h3 className="text-base font-bold text-white">Create Event</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Organizers set up the event details, venue, registration fees, and gate parameters in the Admin Software.</p>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 relative card-hover-glow">
            <span className="w-9 h-9 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">02</span>
            <h3 className="text-base font-bold text-white">Register Participants</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Churches or individual attendees fill out the online registration form on the public platform.</p>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 relative card-hover-glow">
            <span className="w-9 h-9 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">03</span>
            <h3 className="text-base font-bold text-white">SMS with QR Pass</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Instant SMS sent via SMSLenz with Registration ID (`FP-2027-004582`) & direct web pass link.</p>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 relative card-hover-glow">
            <span className="w-9 h-9 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">04</span>
            <h3 className="text-base font-bold text-white">Gate Check-in</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Volunteers scan QR pass or search Registration ID manually on basic feature phones.</p>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 relative card-hover-glow">
            <span className="w-9 h-9 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">05</span>
            <h3 className="text-base font-bold text-white">Gate Check-out</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Switch scanner to Check-out Mode to record attendee exits across multiple gates.</p>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 relative card-hover-glow">
            <span className="w-9 h-9 rounded-xl accent-number-box font-black text-xs flex items-center justify-center">06</span>
            <h3 className="text-base font-bold text-white">Payment & Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Collect pending registration fees and export final attendance analytics reports.</p>
          </div>

        </div>

      </section>

      {/* 📷 6. Screenshots & Live Interactive Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Product Interface Preview</h2>
          <p className="text-slate-400 text-sm">Explore FaithPass across Admin, Web, and Mobile interfaces</p>
        </div>

        {/* Preview Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-5 py-3 rounded-xl transition-all ${activeTab === 'register' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
          >
            Registration Page
          </button>
          <button
            onClick={() => setActiveTab('qrpass')}
            className={`px-5 py-3 rounded-xl transition-all ${activeTab === 'qrpass' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
          >
            Digital QR Pass
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-5 py-3 rounded-xl transition-all ${activeTab === 'scanner' ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
          >
            Scanner App
          </button>
        </div>

        {/* Active Mockup Display */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl bg-slate-900/90">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white">Admin Software — Live Metrics</span>
                <span className="text-xs text-emerald-400 font-mono">http://faithpass.lk/dashboard</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block font-medium">Total Registrations</span>
                  <strong className="text-white text-2xl">1,450</strong>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block font-medium">Checked-In Attendees</span>
                  <strong className="text-emerald-400 text-2xl">890</strong>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block font-medium">Participating Churches</span>
                  <strong className="text-white text-2xl">42</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div className="space-y-4 text-center max-w-md mx-auto">
              <Ticket className="w-12 h-12 mx-auto text-brand-400" />
              <h3 className="text-lg font-bold text-white">Event Registration Form</h3>
              <p className="text-xs text-slate-400">Step-by-step registration with automatic SMS verification</p>
              <button onClick={() => setIsRegisterModalOpen(true)} className="px-6 py-3 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-md">
                Test Live Registration Modal
              </button>
            </div>
          )}

          {activeTab === 'qrpass' && (
            <div className="text-center space-y-4 max-w-sm mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <QrCode className="w-14 h-14 mx-auto text-amber-400" />
              <p className="text-xs font-bold text-white">Digital Event Pass View</p>
              <code className="text-amber-300 font-mono font-bold text-sm block">FP-2027-004582</code>
              <button onClick={() => openPassView('FP-2027-004582')} className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold">
                Open Pass Viewer
              </button>
            </div>
          )}

          {activeTab === 'scanner' && (
            <div className="text-center space-y-4 max-w-sm mx-auto p-5 rounded-2xl bg-slate-950 border border-emerald-500">
              <Smartphone className="w-12 h-12 mx-auto text-emerald-400" />
              <p className="text-xs font-bold text-white">Android Volunteer Scanner App</p>
              <p className="text-[11px] text-slate-400">3 Modes + Manual Registration ID Lookup for non-smartphones</p>
              <button onClick={() => setActiveView('scanner')} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                Launch Mobile Scanner
              </button>
            </div>
          )}
        </div>

      </section>

      {/* 💰 7. Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">

        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            Transparent Access
          </span>
          <h2 className="text-3xl font-black text-white">Beta Phase Access</h2>
          <p className="text-slate-400 text-sm">Free access for early adopter church partners during Beta v1.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">

          {/* Beta Plan */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-brand-500 space-y-6 relative bg-slate-900/90 shadow-2xl">
            <span className="absolute -top-3 right-6 px-3.5 py-1 rounded-full bg-brand-600 text-white text-[10px] font-extrabold uppercase">
              Current Beta
            </span>
            <h3 className="text-xl font-bold text-white">Beta Partner Access</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">FREE</span>
              <span className="text-xs text-slate-400">/ event</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited Registrations</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Android & iOS Scanner App Access</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> SMSLenz SMS Gateway Pass Messages</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Non-Smartphone Manual ID Search</li>
            </ul>
            <button onClick={() => setIsRegisterModalOpen(true)} className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/20">
              Get Started Now
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 opacity-80 bg-slate-900/50">
            <span className="px-3.5 py-1 rounded-full bg-slate-800 text-amber-300 text-[10px] font-extrabold uppercase">
              Coming Soon
            </span>
            <h3 className="text-xl font-bold text-white">Enterprise Ministry</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">Custom</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-slate-500 shrink-0" /> Dedicated Self-Service Kiosks</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-slate-500 shrink-0" /> Custom Domain Integration</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-slate-500 shrink-0" /> 24/7 Dedicated Support</li>
            </ul>
          </div>

        </div>

      </section>

      {/* ⭐ 8. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            Client Feedback
          </span>
          <h2 className="text-3xl font-black text-white">Trusted by Church Leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "FaithPass saved our conference over LKR 200,000 in gate laptop rentals. Our youth volunteers scanned over 1,200 attendees with their Android phones in under 45 minutes!"
            </p>
            <div>
              <strong className="text-xs text-white block">Pr. Michael Fernando</strong>
              <span className="text-[10px] text-slate-400">Grace Assembly, Colombo</span>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The manual registration ID lookup feature was a lifesaver for our elderly members who only have basic keypad phones. Check-in was instant!"
            </p>
            <div>
              <strong className="text-xs text-white block">Pr. David Perera</strong>
              <span className="text-[10px] text-slate-400">Calvary Fellowship, Kandy</span>
            </div>
          </div>

          <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Live headcount tracking in the Admin dashboard gave our security team real-time visibility across all 3 stadium entrance gates."
            </p>
            <div>
              <strong className="text-xs text-white block">Pr. Samuel Silva</strong>
              <span className="text-[10px] text-slate-400">Hope Conference, Galle</span>
            </div>
          </div>

        </div>
      </section>

      {/* 📅 9. Active Events Section (#events) */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Active Ministry Gatherings</h2>
            <p className="text-xs text-slate-400">Select an event below to register or view attendance software</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="glass-panel p-7 rounded-3xl space-y-4 border border-slate-800 bg-slate-900/80">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {evt.status}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{evt.title}</h3>
                </div>
                <span className="text-sm font-bold text-brand-400">LKR {evt.registrationFee}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Register Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📣 10. CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-brand-500/40 text-center space-y-6 bg-gradient-to-b from-brand-950/80 via-slate-950 to-slate-950 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Ready to simplify your next church event?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Eliminate expensive gate hardware and experience fast mobile verification today.
          </p>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-brand-600/30 hover:scale-[1.02] transition-all inline-flex items-center gap-3"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 📞 11. Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6 border border-slate-800 bg-slate-900/90">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Contact Support</h2>
            <p className="text-xs text-slate-400">Questions about setting up mobile scanners for your upcoming event?</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! FaithPass support team will contact you shortly.'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input type="text" placeholder="Pr. John Fernando" required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
                <input type="text" placeholder="Grace Assembly" required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / Mobile</label>
              <input type="tel" placeholder="077 123 4567" required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
              <textarea rows={3} placeholder="Tell us about your event date, expected attendees, and gate requirements..." required className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-brand-500" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
