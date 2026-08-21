import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquareText, X, ExternalLink } from 'lucide-react';

export const SmsNotificationModal: React.FC = () => {
  const { latestSmsMessage, dismissSmsModal, openPassView } = useApp();

  if (!latestSmsMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
      <div className="glass-panel border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl space-y-3 bg-slate-900/95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-white">SMS Received (SMSLenz)</span>
          <button onClick={dismissSmsModal} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <pre className="font-sans text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
          {latestSmsMessage.message}
        </pre>
        <button
          onClick={() => {
            openPassView(latestSmsMessage.registrationId);
            dismissSmsModal();
          }}
          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Event Pass Page</span>
        </button>
      </div>
    </div>
  );
};
