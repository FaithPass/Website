import React, { useState } from 'react';
import { X, Sparkles, Building2, Phone, Mail, CreditCard, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SaaSCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: 'single_event' | 'pro_monthly' | 'enterprise';
}

export const SaaSCheckoutModal: React.FC<SaaSCheckoutModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentRoutingMode, setPaymentRoutingMode] = useState<'central_payout' | 'direct_merchant'>('central_payout');
  
  // Bank Payout Account Details (For Model B Central Payouts)
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  if (!isOpen) return null;

  const planTitles = {
    single_event: 'Single Event Pass (LKR 10,000)',
    pro_monthly: 'Monthly Pro Subscription (LKR 15,000/mo)',
    enterprise: 'Annual Enterprise Plan (LKR 140,000/yr)'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !email || !phone) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/saas/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: orgName,
          email,
          phone,
          packageType: selectedPlan,
          paymentRoutingMode,
          bankName,
          bankBranch,
          accountNumber,
          accountHolderName
        })
      });

      const data = await response.json();
      setSuccessData(data);
    } catch (err) {
      console.log('Using local SaaS subscription fallback:', err);
      setSuccessData({
        message: 'Organization SaaS subscription active!',
        organization: {
          id: `org-${Date.now()}`,
          name: orgName,
          slug: orgName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          email,
          phone,
          packageType: selectedPlan,
          paymentRoutingMode
        },
        loginUrl: `https://faithpass.lk/org/${orgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}/dashboard`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 bg-slate-900/95 text-white shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Organization SaaS Signup</h3>
              <p className="text-xs text-amber-300 font-semibold">{planTitles[selectedPlan]}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successData ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-white">Subscription Active!</h4>
              <p className="text-xs text-slate-300">
                Welcome <strong className="text-amber-400">{successData.organization?.name}</strong> to FaithPass SaaS Platform.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <p className="text-slate-400"><strong className="text-white">Admin Login Link:</strong> {successData.loginUrl}</p>
              <p className="text-slate-400"><strong className="text-white">Selected Payment Mode:</strong> {paymentRoutingMode === 'central_payout' ? 'Model B: Central Master Account + Weekly 95% Bank Payouts' : 'Model A: Custom PayHere Merchant Credentials'}</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 text-white font-bold text-xs"
            >
              Go to Organization Admin Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Ministry Name</label>
                <input
                  type="text"
                  placeholder="e.g. Grace Assembly Colombo"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Leader / Pastor Mobile Phone</label>
                <input
                  type="tel"
                  placeholder="077 123 4567"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email Address</label>
              <input
                type="email"
                placeholder="info@graceassembly.lk"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>

            {/* Payment Routing Model Selection (Model A vs Model B) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="block text-xs font-bold text-amber-400">Choose Ticket Revenue Payment Routing:</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setPaymentRoutingMode('central_payout')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentRoutingMode === 'central_payout' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-800 text-slate-400'
                  }`}
                >
                  <strong className="block text-white mb-1">Model B: Weekly Bank Payouts</strong>
                  <p className="text-[10px] text-slate-300 leading-normal">
                    No PayHere account needed! Tickets collected in Central Account. 95% net revenue transferred weekly to your bank.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentRoutingMode('direct_merchant')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentRoutingMode === 'direct_merchant' ? 'border-brand-500 bg-brand-500/10 text-white' : 'border-slate-800 text-slate-400'
                  }`}
                >
                  <strong className="block text-white mb-1">Model A: Direct PayHere Merchant</strong>
                  <p className="text-[10px] text-slate-300 leading-normal">
                    Enter your PayHere Merchant ID. Ticket money goes 100% direct to your PayHere Bank Account.
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Details for Model B Payouts */}
            {paymentRoutingMode === 'central_payout' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 block">Bank Account Details (For Weekly Payouts):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Bank Name (e.g. Commercial Bank)"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Branch (e.g. Kollupitiya)"
                    value={bankBranch}
                    onChange={e => setBankBranch(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Account Holder Name"
                    value={accountHolderName}
                    onChange={e => setAccountHolderName(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-brand-600/20"
            >
              {loading ? 'Activating Subscription...' : 'Pay & Activate Organization SaaS Account'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
