import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Ticket, Building2, User, Phone, Mail, Check, Sparkles } from 'lucide-react';
import { PaymentStatus } from '../../types';

export const RegistrationModal: React.FC = () => {
  const { 
    isRegisterModalOpen, 
    setIsRegisterModalOpen, 
    churches, 
    events, 
    registerParticipant, 
    openPassView 
  } = useApp();

  const [type, setType] = useState<'individual' | 'church_group'>('individual');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [churchId, setChurchId] = useState(churches[0]?.id || 'ch-01');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('paid');

  if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newReg = registerParticipant({
      type,
      fullName,
      phone,
      email: email || undefined,
      churchId,
      paymentStatus
    });

    setIsRegisterModalOpen(false);
    setFullName('');
    setPhone('');
    setEmail('');
    openPassView(newReg.id);
  };

  const activeEvt = events[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-600/20 text-brand-400">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Register for Event</h3>
              <p className="text-xs text-slate-400">{activeEvt?.title} — LKR {activeEvt?.registrationFee}</p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Kamal Silva"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone (for SMS Pass)</label>
            <input
              type="tel"
              placeholder="e.g. 077 890 1234"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select Church</label>
            <select
              value={churchId}
              onChange={e => setChurchId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            >
              {churches.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs"
          >
            Complete Registration & Generate SMS Pass
          </button>
        </form>

      </div>
    </div>
  );
};
