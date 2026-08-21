import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Users, Building2, DollarSign, MessageSquareText, UserCheck, Search, Filter, Plus, CheckCircle2, Clock, Smartphone } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { events, churches, registrations, attendanceLogs, smsLogs, performScanAction, resendSms, openPassView, setIsRegisterModalOpen, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const activeEvt = events[0];
  const filteredRegs = registrations.filter(r => 
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-brand-500/20 text-brand-300">Admin Software</span>
          <h1 className="text-2xl font-extrabold text-white mt-1">{activeEvt?.title} Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('scanner')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
          >
            Open Scanner App
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs"
          >
            New Registration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Registrations</span>
          <p className="text-2xl font-extrabold text-white">{registrations.length}</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Live Checked-In</span>
          <p className="text-2xl font-extrabold text-emerald-400">{registrations.filter(r => r.attendanceStatus === 'checked_in').length}</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Churches</span>
          <p className="text-2xl font-extrabold text-white">{churches.length}</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">SMS Sent (SMSLenz)</span>
          <p className="text-2xl font-extrabold text-white">{smsLogs.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search by ID (FP-2027-004582), Name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
        />

        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase">
              <tr>
                <th className="p-4">Reg ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Church</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRegs.map(reg => (
                <tr key={reg.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-brand-400">{reg.id}</td>
                  <td className="p-4 font-semibold text-white">{reg.fullName}</td>
                  <td className="p-4">{reg.churchName}</td>
                  <td className="p-4 font-mono text-slate-400">{reg.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${reg.attendanceStatus === 'checked_in' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {reg.attendanceStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {reg.attendanceStatus !== 'checked_in' && (
                      <button onClick={() => performScanAction(reg.id, 'checkin')} className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[11px]">Check-In</button>
                    )}
                    <button onClick={() => openPassView(reg.id)} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 text-[11px]">Pass</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
