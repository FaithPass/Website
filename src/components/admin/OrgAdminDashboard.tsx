import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Plus, 
  Calendar, 
  Users, 
  UserCheck, 
  DollarSign, 
  CreditCard, 
  Building, 
  QrCode, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Settings,
  Smartphone,
  ShieldCheck,
  FileSpreadsheet,
  Zap,
  Clock
} from 'lucide-react';

export const OrgAdminDashboard: React.FC = () => {
  const { events, registrations, attendanceLogs } = useApp();
  
  const [activeTab, setActiveTab] = useState<'events' | 'attendees' | 'payouts' | 'gate'>('events');
  
  // Organization Settings State
  const [orgData, setOrgData] = useState({
    id: 'org-grace',
    name: 'Grace Assembly Colombo',
    slug: 'grace-assembly',
    packageType: 'pro_monthly',
    paymentRoutingMode: 'central_payout', // 'central_payout' OR 'direct_merchant'
    payhereMerchantId: '1214059',
    payhereSecret: 'MOCK_SECRET_KEY_84920',
    bankName: 'HNB Bank',
    bankBranch: 'Kollupitiya',
    accountNumber: '003019284756',
    accountHolderName: 'Grace Assembly Trust',
    pendingPayoutBalance: 42500.00,
    totalPaidOut: 180000.00
  });

  // Event Builder State
  const [showEventModal, setShowEventModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newFee, setNewFee] = useState('500');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newVenue) return;
    alert(`Event "${newTitle}" published successfully! Unique event page live at: https://faithpass.lk/e/${newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    setShowEventModal(false);
    setNewTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white font-sans">
      
      {/* 🚀 Organization SaaS Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 via-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg text-xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-white">{orgData.name}</h1>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase">
                {orgData.packageType === 'single_event' ? 'Basic (300 Cap)' : orgData.packageType === 'pro_monthly' ? 'Standard (750 Cap)' : 'Premium (1,500 Cap)'} SaaS Plan
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Multi-Tenant Dashboard • Access Code: <code className="text-brand-300 font-mono font-bold">ORG-GRACE-GATE1</code>
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowEventModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* 🛡️ Tier Capacity Meter & Feature Access Card */}
      <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>SaaS Package Tier Limitations & Access Guards</span>
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Enforces capacity limit (300 / 750 / 1,500) and feature access per purchased plan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-mono font-bold">
              Capacity: <strong className="text-white">340</strong> / {orgData.packageType === 'single_event' ? 300 : orgData.packageType === 'pro_monthly' ? 750 : 1500} Attendees
            </span>
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
          <div 
            className="bg-gradient-to-r from-brand-500 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(100, (340 / (orgData.packageType === 'single_event' ? 300 : orgData.packageType === 'pro_monthly' ? 750 : 1500)) * 100)}%` }}
          />
        </div>

        {/* Unlocked Tier Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 text-[11px] font-semibold">Unique QR Passes</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 text-[11px] font-semibold">Automated SMS Pass</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 text-[11px] font-semibold">
              {orgData.packageType === 'single_event' ? 'Single Volunteer Scanner' : 'Multi-Volunteer Scanner'}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 text-[11px] font-semibold">
              {orgData.packageType === 'single_event' ? 'Basic Reports' : 'Advanced Excel Reports'}
            </span>
          </div>
        </div>
      </div>

      {/* 📊 Live Metrics Overview Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Registrations</span>
          <strong className="text-2xl sm:text-3xl font-black text-white block">340</strong>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Gate Checked-In</span>
          <strong className="text-2xl sm:text-3xl font-black text-emerald-400 block">285</strong>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs font-semibold text-amber-400 font-bold">Model B Pending Payout</span>
          <strong className="text-2xl sm:text-3xl font-black text-amber-400 block">LKR {orgData.pendingPayoutBalance.toLocaleString()}</strong>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Paid Out</span>
          <strong className="text-2xl sm:text-3xl font-black text-brand-400 block">LKR {orgData.totalPaidOut.toLocaleString()}</strong>
        </div>
      </div>


      {/* 🧭 Organization Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'events' ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events & Ticket Links</span>
        </button>

        <button
          onClick={() => setActiveTab('attendees')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'attendees' ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Attendees & Registrations ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payouts')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'payouts' ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Payment & Payout Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('gate')}
          className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'gate' ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Gate Access Codes</span>
        </button>
      </div>

      {/* TAB 1: EVENTS */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map(evt => (
            <div key={evt.id} className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4">
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

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <p className="text-slate-400"><strong className="text-white">Public Ticket URL:</strong> https://faithpass.lk/e/{evt.slug || 'revival-2027'}</p>
                <p className="text-slate-400"><strong className="text-white">Venue:</strong> {evt.venue}, {evt.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ATTENDEES */}
      {activeTab === 'attendees' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Registered Participants List</h3>
            <button className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export CSV / Excel</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Pass ID</th>
                  <th className="p-3 font-semibold">Full Name</th>
                  <th className="p-3 font-semibold">Phone</th>
                  <th className="p-3 font-semibold">Church / City</th>
                  <th className="p-3 font-semibold">Payment Status</th>
                  <th className="p-3 font-semibold">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {registrations.map(r => (
                  <tr key={r.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-amber-400">{r.id}</td>
                    <td className="p-3 font-bold text-white">{r.fullName}</td>
                    <td className="p-3 text-slate-300">{r.phone}</td>
                    <td className="p-3 text-slate-400">{r.churchName} ({r.city})</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                        {r.paymentStatus.toUpperCase()} (LKR {r.paymentAmount})
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        r.attendanceStatus === 'checked_in' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {r.attendanceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENTS & PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Payment & Ticket Revenue Settings</h3>
            <p className="text-xs text-slate-400">Configure whether ticket sales go to your PayHere Merchant account or Central Master Account with weekly bank payouts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Model A vs Model B Selector */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Active Payment Routing Mode:</span>

              <div className="space-y-3">
                <div
                  onClick={() => setOrgData(prev => ({ ...prev, paymentRoutingMode: 'central_payout' }))}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    orgData.paymentRoutingMode === 'central_payout' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800'
                  }`}
                >
                  <strong className="block text-white text-xs font-bold">Model B: Central Master Account + Weekly Payouts (Active)</strong>
                  <p className="text-[11px] text-slate-400 mt-1">
                    No PayHere account required! 95% net revenue transferred weekly directly to your bank account. (5% platform fee deducted).
                  </p>
                </div>

                <div
                  onClick={() => setOrgData(prev => ({ ...prev, paymentRoutingMode: 'direct_merchant' }))}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    orgData.paymentRoutingMode === 'direct_merchant' ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800'
                  }`}
                >
                  <strong className="block text-white text-xs font-bold">Model A: Custom PayHere Merchant Credentials</strong>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter your PayHere Merchant ID. 100% of ticket sales go straight to your PayHere merchant account.
                  </p>
                </div>
              </div>
            </div>

            {/* Config Box based on Mode */}
            {orgData.paymentRoutingMode === 'central_payout' ? (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Bank Payout Account Details:</span>
                
                <div className="space-y-2 text-xs">
                  <p className="text-slate-400"><strong className="text-white">Bank:</strong> {orgData.bankName} ({orgData.bankBranch})</p>
                  <p className="text-slate-400"><strong className="text-white">Account Number:</strong> {orgData.accountNumber}</p>
                  <p className="text-slate-400"><strong className="text-white">Account Holder:</strong> {orgData.accountHolderName}</p>
                  <p className="text-slate-400"><strong className="text-white">Next Weekly Payout Date:</strong> Next Monday (09:00 AM)</p>
                </div>

                <div className="pt-2">
                  <button onClick={() => alert('Bank payout account details updated successfully!')} className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                    Update Bank Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">PayHere Credentials:</span>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">PayHere Merchant ID</label>
                    <input
                      type="text"
                      value={orgData.payhereMerchantId}
                      onChange={e => setOrgData(prev => ({ ...prev, payhereMerchantId: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">PayHere Secret Key</label>
                    <input
                      type="password"
                      value={orgData.payhereSecret}
                      onChange={e => setOrgData(prev => ({ ...prev, payhereSecret: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <button onClick={() => alert('PayHere Merchant credentials saved!')} className="px-4 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs">
                    Save PayHere Credentials
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 4: GATE ACCESS CODES & APP DOWNLOAD LINKS */}
      {activeTab === 'gate' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-6 max-w-3xl">
          <div>
            <h3 className="text-xl font-bold text-white">Volunteer Mobile Scanner Access & App Download</h3>
            <p className="text-xs text-slate-400">Provide these download links and Access Code to gate volunteers so they can scan attendee QR passes on event day.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-slate-950 border border-brand-500/40 space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Active Event Gate Access Code:</span>
              <code className="text-4xl font-mono font-black text-white block">ORG-GRACE-GATE1</code>
              <p className="text-xs text-slate-400">Works on any Android or iOS phone via FaithPass Scanner App.</p>
            </div>

            {/* App Download Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Download Scanner App for Volunteers:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                <a
                  href="/download/faithpass-scanner.apk"
                  download="faithpass-scanner.apk"
                  className="p-3 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 border border-brand-500/40 text-brand-300 text-center flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-brand-400" />
                  <span>Direct APK Download</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.faithpass.scanner"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-center flex items-center justify-center gap-2 transition-all"
                >
                  <span>🤖 Google Play Store</span>
                </a>
                <a
                  href="https://apps.apple.com/app/faithpass-scanner"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-center flex items-center justify-center gap-2 transition-all"
                >
                  <span>🍎 Apple App Store</span>
                </a>
              </div>
            </div>

            {/* 1-Click WhatsApp Share to Volunteers */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const downloadUrl = `${window.location.origin}/download/faithpass-scanner.apk`;
                  const shareMsg = `Hi Gate Volunteers!\nHere is the FaithPass Gate Scanner App link and Access Code for our upcoming event:\n\n📱 Download App: ${downloadUrl}\n🔑 Gate Access Code: ORG-GRACE-GATE1\n\nPlease download the app and enter the code before event day. Thank you!`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`, '_blank');
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>📲 Share App Link & Access Code to Volunteers via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* CREATE EVENT MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel border border-slate-700 rounded-3xl p-6 space-y-4 bg-slate-900 text-white">
            <h3 className="text-lg font-bold">Create New Ministry Gathering Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <input type="text" placeholder="Event Title (e.g. Revival 2027)" value={newTitle} onChange={e => setNewTitle(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white" />
              <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white" />
              <input type="text" placeholder="Venue (e.g. Sugathadasa Indoor Stadium)" value={newVenue} onChange={e => setNewVenue(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white" />
              <input type="text" placeholder="City (e.g. Colombo)" value={newCity} onChange={e => setNewCity(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white" />
              <input type="number" placeholder="Ticket Fee (LKR)" value={newFee} onChange={e => setNewFee(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowEventModal(false)} className="flex-1 py-3 rounded-xl bg-slate-800 text-xs font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-brand-600 text-white text-xs font-bold">Publish Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
