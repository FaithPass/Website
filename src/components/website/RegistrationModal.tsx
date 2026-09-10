import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Ticket, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  Check, 
  Sparkles,
  Plus,
  Trash2,
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  Users
} from 'lucide-react';
import { PaymentStatus, DeliveryMode, ChurchMemberInput } from '../../types';

export const RegistrationModal: React.FC = () => {
  const { 
    isRegisterModalOpen, 
    setIsRegisterModalOpen, 
    events, 
    registerParticipant,
    registerChurchGroup,
    openPassView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'church_group' | 'individual'>('church_group');
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || 'evt-2027');

  // Option 1: Church Registration Form State
  const [churchName, setChurchName] = useState('');
  const [pastorName, setPastorName] = useState('');
  const [pastorPhone, setPastorPhone] = useState('');
  const [pastorEmail, setPastorEmail] = useState('');
  const [churchAddress, setChurchAddress] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('pastor_only');
  const [members, setMembers] = useState<ChurchMemberInput[]>([
    { id: 'm-1', name: '', phone: '' }
  ]);

  // Option 2: Individual Registration Form State
  const [indFullName, setIndFullName] = useState('');
  const [indPhone, setIndPhone] = useState('');
  const [indEmail, setIndEmail] = useState('');
  const [indAddress, setIndAddress] = useState('');
  const [indDistrict, setIndDistrict] = useState('');
  const [indChurchName, setIndChurchName] = useState('');
  const [indPastorName, setIndPastorName] = useState('');

  if (!isRegisterModalOpen) return null;

  const activeEvt = events.find(e => e.id === selectedEventId) || events[0];

  // Dynamic Member Handlers
  const handleAddMember = () => {
    setMembers(prev => [...prev, { id: `m-${Date.now()}-${prev.length}`, name: '', phone: '' }]);
  };

  const handleRemoveMember = (id: string) => {
    if (members.length === 1) {
      setMembers([{ id: 'm-1', name: '', phone: '' }]);
      return;
    }
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleMemberChange = (id: string, field: 'name' | 'phone', value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // Excel / CSV Import Parser
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r?\n/);
      const parsedMembers: ChurchMemberInput[] = [];

      lines.forEach((line, idx) => {
        if (!line.trim()) return;
        const parts = line.split(/[,;\t]/);
        const name = parts[0]?.trim();
        const phone = parts[1]?.trim() || '';

        // Skip CSV Header row
        if (idx === 0 && (name.toLowerCase().includes('name') || name.toLowerCase().includes('member'))) return;

        if (name) {
          parsedMembers.push({
            id: `m-csv-${Date.now()}-${idx}`,
            name,
            phone
          });
        }
      });

      if (parsedMembers.length > 0) {
        setMembers(parsedMembers);
        alert(`✅ Successfully imported ${parsedMembers.length} members from file!`);
      } else {
        alert('Could not parse members. Please format CSV as: Member Name, Phone Number');
      }
    };
    reader.readAsText(file);
  };

  // Sample Excel CSV Download Template
  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Member Name,Phone Number\nKamal Perera,0771234567\nNimali Fernando,0719876543\nSunil Jayasinghe,0751122334";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "FaithPass_Church_Members_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit Handler Option 1 (Church Registration)
  const handleChurchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!churchName || !pastorName || !pastorPhone) {
      alert('Please fill in Church Name, Pastor Name, and Pastor Phone Number.');
      return;
    }

    const validMembers = members.filter(m => m.name.trim().length > 0);

    const result = registerChurchGroup({
      churchName,
      pastorName,
      pastorPhone,
      pastorEmail: pastorEmail || undefined,
      churchAddress: churchAddress || undefined,
      deliveryMode,
      members: validMembers,
      eventId: activeEvt.id,
      paymentStatus: 'paid'
    });

    setIsRegisterModalOpen(false);
    openPassView(result.pastorRegId);
  };

  // Submit Handler Option 2 (Individual Registration)
  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!indFullName || !indPhone) {
      alert('Please fill in Full Name and Mobile Number.');
      return;
    }

    const newReg = registerParticipant({
      type: 'individual',
      fullName: indFullName,
      phone: indPhone,
      email: indEmail || undefined,
      address: indAddress || undefined,
      district: indDistrict || undefined,
      churchName: indChurchName || 'Independent',
      pastorName: indPastorName || undefined,
      churchId: 'ch-01',
      eventId: activeEvt.id,
      paymentStatus: 'paid'
    });

    setIsRegisterModalOpen(false);
    setIndFullName('');
    setIndPhone('');
    openPassView(newReg.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 bg-slate-900 text-white my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-600/20 text-brand-400 border border-brand-500/30">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Event Registration</h3>
              <p className="text-xs text-slate-400">{activeEvt?.title} • LKR {activeEvt?.registrationFee}</p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gathering Selection */}
        <div>
          <label className="block text-xs font-bold text-amber-400 mb-1.5 uppercase tracking-wider">Select Ministry Gathering Event</label>
          <select
            value={selectedEventId}
            onChange={e => setSelectedEventId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-brand-500"
          >
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.title} — LKR {e.registrationFee} ({e.city})</option>
            ))}
          </select>
        </div>

        {/* Option Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 font-bold text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('church_group')}
            className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'church_group'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Option 1 - Church Registration</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('individual')}
            className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'individual'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Option 2 - Individual Registration</span>
          </button>
        </div>

        {/* TAB 1: CHURCH REGISTRATION */}
        {activeTab === 'church_group' && (
          <form onSubmit={handleChurchSubmit} className="space-y-6">
            
            {/* Church Information */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Church Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Church Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Grace Assembly Colombo"
                    value={churchName}
                    onChange={e => setChurchName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Pastor Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Pr. Michael Fernando"
                    value={pastorName}
                    onChange={e => setPastorName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Pastor Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. 077 123 4567"
                    value={pastorPhone}
                    onChange={e => setPastorPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Pastor Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="pastor@church.lk"
                    value={pastorEmail}
                    onChange={e => setPastorEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Church Address (Optional)</label>
                  <input
                    type="text"
                    placeholder="No. 45, Galle Road, Colombo 03"
                    value={churchAddress}
                    onChange={e => setChurchAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Church Members & Excel Import */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Church Members ({members.filter(m => m.name).length})</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Add church members individually or import 100-200 via Excel/CSV.</p>
                </div>

                {/* Excel Import & Download Template Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-slate-300 flex items-center gap-1 border border-slate-700"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Template</span>
                  </button>

                  <label className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-md">
                    <Upload className="w-3.5 h-3.5" />
                    <span>📥 Import Excel</span>
                    <input type="file" accept=".csv, .txt" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Members Dynamic Table */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {members.map((m, idx) => (
                  <div key={m.id} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 w-5 text-right">{idx + 1}.</span>
                    <input
                      type="text"
                      placeholder="Member Name"
                      value={m.name}
                      onChange={e => handleMemberChange(m.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (Optional)"
                      value={m.phone}
                      onChange={e => handleMemberChange(m.id, 'phone', e.target.value)}
                      className="w-36 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddMember}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-brand-300 font-extrabold text-xs flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>➕ Add Member</span>
              </button>
            </div>

            {/* QR & Registration Pass Delivery Options */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">QR & Registration Pass Delivery</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Who should receive the Registration Pass and QR Code?</p>
              </div>

              <div className="space-y-3">
                {/* Radio Option 1: Pastor Only (DEFAULT) */}
                <div
                  onClick={() => setDeliveryMode('pastor_only')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMode === 'pastor_only' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${deliveryMode === 'pastor_only' ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
                        {deliveryMode === 'pastor_only' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <strong className="text-xs font-bold text-white">🔘 Pastor Only (Recommended Default)</strong>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Save 95% SMS Cost</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 pl-6">
                    All Registration IDs and QR Passes will be sent only to the Pastor's mobile number via 1 SMS. Pastor can view or print all QR passes from Master Pass Page. Members receive ❌ NO SMS.
                  </p>
                </div>

                {/* Radio Option 2: Pastor + All Members */}
                <div
                  onClick={() => setDeliveryMode('pastor_and_members')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMode === 'pastor_and_members' ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${deliveryMode === 'pastor_and_members' ? 'border-brand-400 bg-brand-400' : 'border-slate-600'}`}>
                      {deliveryMode === 'pastor_and_members' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                    <strong className="text-xs font-bold text-white">🔘 Pastor + All Members</strong>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 pl-6">
                    The Pastor will receive all registration details, and each member will receive their own individual Registration ID and QR Pass via SMS.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-brand-600/30 uppercase tracking-wider"
            >
              Submit Church Group Registration
            </button>
          </form>
        )}

        {/* TAB 2: INDIVIDUAL REGISTRATION */}
        {activeTab === 'individual' && (
          <form onSubmit={handleIndividualSubmit} className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-brand-400 uppercase tracking-wider">Personal Information</h4>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Kamal Silva"
                  value={indFullName}
                  onChange={e => setIndFullName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 077 890 1234"
                  value={indPhone}
                  onChange={e => setIndPhone(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="kamal@example.com"
                  value={indEmail}
                  onChange={e => setIndEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Address (Optional)</label>
                  <input
                    type="text"
                    placeholder="No. 12, Main Street"
                    value={indAddress}
                    onChange={e => setIndAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">District (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Colombo / Kandy"
                    value={indDistrict}
                    onChange={e => setIndDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Church Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Grace Assembly"
                    value={indChurchName}
                    onChange={e => setIndChurchName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Pastor Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Pr. Michael"
                    value={indPastorName}
                    onChange={e => setIndPastorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-brand-600/30 uppercase tracking-wider"
            >
              Submit Individual Registration
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
