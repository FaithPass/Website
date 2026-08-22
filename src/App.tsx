import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/website/HomePage';
import { PassView } from './components/website/PassView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileScannerApp } from './components/scanner/MobileScannerApp';
import { RegistrationModal } from './components/website/RegistrationModal';
import { LoginModal } from './components/auth/LoginModal';
import { SmsNotificationModal } from './components/common/SmsNotificationModal';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();

  const isMainWebsiteView = ['home', 'features', 'how-it-works', 'pricing', 'events', 'about', 'contact'].includes(activeView);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      {activeView !== 'scanner' && <Navbar />}

      <main className="flex-1">
        {isMainWebsiteView && <HomePage />}
        
        {activeView === 'pass' && <PassView />}
        {activeView === 'dashboard' && <AdminDashboard />}
        {activeView === 'scanner' && <MobileScannerApp />}
      </main>

      {activeView !== 'scanner' && <Footer />}

      <RegistrationModal />
      <LoginModal />
      <SmsNotificationModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
