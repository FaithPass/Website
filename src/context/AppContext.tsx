import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EventItem, 
  Church, 
  ParticipantRegistration, 
  AttendanceLog, 
  SmsLog, 
  User, 
  UserRole, 
  ScannerMode,
  PaymentStatus,
  AttendanceStatus
} from '../types';
import { 
  INITIAL_EVENTS, 
  INITIAL_CHURCHES, 
  INITIAL_REGISTRATIONS, 
  INITIAL_LOGS, 
  INITIAL_SMS_LOGS, 
  INITIAL_USERS 
} from '../services/mockData';
import confetti from 'canvas-confetti';

export type ActiveView = 'home' | 'events' | 'features' | 'about' | 'contact' | 'dashboard' | 'pass' | 'scanner';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedPassId: string | null;
  openPassView: (id: string) => void;
  
  events: EventItem[];
  churches: Church[];
  registrations: ParticipantRegistration[];
  attendanceLogs: AttendanceLog[];
  smsLogs: SmsLog[];
  
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  registerParticipant: (data: {
    type: 'individual' | 'church_group';
    fullName: string;
    phone: string;
    email?: string;
    churchId: string;
    paymentStatus: PaymentStatus;
  }) => ParticipantRegistration;
  
  scannerMode: ScannerMode;
  setScannerMode: (mode: ScannerMode) => void;
  selectedGate: string;
  setSelectedGate: (gate: string) => void;
  performScanAction: (registrationId: string, overrideMode?: ScannerMode) => {
    success: boolean;
    message: string;
    registration?: ParticipantRegistration;
  };
  
  latestSmsMessage: SmsLog | null;
  dismissSmsModal: () => void;
  resendSms: (registrationId: string) => void;
  updatePaymentStatus: (registrationId: string, newStatus: PaymentStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedPassId, setSelectedPassId] = useState<string | null>('FP-2027-004582');
  
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('faithpass_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  
  const [churches, setChurches] = useState<Church[]>(() => {
    const saved = localStorage.getItem('faithpass_churches');
    return saved ? JSON.parse(saved) : INITIAL_CHURCHES;
  });
  
  const [registrations, setRegistrations] = useState<ParticipantRegistration[]>(() => {
    const saved = localStorage.getItem('faithpass_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });
  
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>(() => {
    const saved = localStorage.getItem('faithpass_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });
  
  const [smsLogs, setSmsLogs] = useState<SmsLog[]>(() => {
    const saved = localStorage.getItem('faithpass_sms_logs');
    return saved ? JSON.parse(saved) : INITIAL_SMS_LOGS;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  
  const [scannerMode, setScannerMode] = useState<ScannerMode>('checkin');
  const [selectedGate, setSelectedGate] = useState<string>('Gate 1 — Main Entrance');
  const [latestSmsMessage, setLatestSmsMessage] = useState<SmsLog | null>(null);

  useEffect(() => {
    localStorage.setItem('faithpass_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('faithpass_logs', JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  useEffect(() => {
    localStorage.setItem('faithpass_sms_logs', JSON.stringify(smsLogs));
  }, [smsLogs]);

  const openPassView = (id: string) => {
    setSelectedPassId(id);
    setActiveView('pass');
  };

  const loginAsRole = (role: UserRole) => {
    const userMatch = INITIAL_USERS.find(u => u.role === role) || {
      id: `usr-${Date.now()}`,
      name: role.replace('_', ' ').toUpperCase(),
      email: `${role}@faithpass.lk`,
      role: role
    };
    setCurrentUser(userMatch);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerParticipant = (data: {
    type: 'individual' | 'church_group';
    fullName: string;
    phone: string;
    email?: string;
    churchId: string;
    paymentStatus: PaymentStatus;
  }) => {
    const activeEvent = events[0];
    const churchObj = churches.find(c => c.id === data.churchId) || churches[0];
    
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const newRegId = `FP-2027-${randomSeq}`;
    
    const newReg: ParticipantRegistration = {
      id: newRegId,
      eventId: activeEvent.id,
      eventTitle: activeEvent.title,
      type: data.type,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      churchId: churchObj.id,
      churchName: churchObj.name,
      city: churchObj.city,
      paymentStatus: data.paymentStatus,
      paymentAmount: activeEvent.registrationFee,
      paidAmount: data.paymentStatus === 'paid' ? activeEvent.registrationFee : 0,
      attendanceStatus: 'not_attended',
      createdAt: new Date().toISOString().split('T')[0],
      qrCodeUrl: newRegId
    };

    setRegistrations(prev => [newReg, ...prev]);
    setEvents(prev => prev.map(e => e.id === activeEvent.id ? { ...e, totalRegistrations: e.totalRegistrations + 1 } : e));

    const smsContent = `FaithPass\n${activeEvent.title} සඳහා ඔබගේ ලියාපදිංචිය සාර්ථකයි.\nRegistration ID: ${newRegId}\nEvent Pass: https://faithpass.lk/p/${newRegId}`;
    
    const newSms: SmsLog = {
      id: `sms-${Date.now()}`,
      registrationId: newRegId,
      recipientPhone: data.phone,
      message: smsContent,
      gateway: 'SMSLenz Gateway',
      status: 'delivered',
      sentAt: new Date().toLocaleTimeString()
    };

    setSmsLogs(prev => [newSms, ...prev]);
    setLatestSmsMessage(newSms);

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    return newReg;
  };

  const performScanAction = (registrationId: string, overrideMode?: ScannerMode) => {
    const modeToUse = overrideMode || scannerMode;
    const targetReg = registrations.find(r => r.id.toLowerCase() === registrationId.toLowerCase());

    if (!targetReg) {
      return {
        success: false,
        message: `Registration ID "${registrationId}" not found.`
      };
    }

    const nowFormatted = new Date().toLocaleString();
    let newAttendanceStatus: AttendanceStatus = targetReg.attendanceStatus;
    let newPaymentStatus: PaymentStatus = targetReg.paymentStatus;
    let actionLogType: 'checkin' | 'checkout' | 'payment_collected' = 'checkin';
    let successMessage = '';

    if (modeToUse === 'checkin') {
      if (targetReg.attendanceStatus === 'checked_in') {
        return {
          success: false,
          message: `${targetReg.fullName} is ALREADY checked in.`,
          registration: targetReg
        };
      }
      newAttendanceStatus = 'checked_in';
      actionLogType = 'checkin';
      successMessage = `✅ Check-in successful for ${targetReg.fullName}`;
    } else if (modeToUse === 'checkout') {
      newAttendanceStatus = 'checked_out';
      actionLogType = 'checkout';
      successMessage = `🔵 Check-out recorded for ${targetReg.fullName}`;
    } else if (modeToUse === 'payment') {
      newPaymentStatus = 'paid';
      actionLogType = 'payment_collected';
      successMessage = `🟣 Payment of LKR ${targetReg.paymentAmount} recorded for ${targetReg.fullName}`;
    }

    const updatedReg: ParticipantRegistration = {
      ...targetReg,
      attendanceStatus: newAttendanceStatus,
      paymentStatus: newPaymentStatus,
      paidAmount: newPaymentStatus === 'paid' ? targetReg.paymentAmount : targetReg.paidAmount,
      lastScannedAt: nowFormatted,
      lastScannedBy: currentUser ? currentUser.name : 'Volunteer Scanner',
      gateNumber: selectedGate
    };

    setRegistrations(prev => prev.map(r => r.id === targetReg.id ? updatedReg : r));

    const newLog: AttendanceLog = {
      id: `log-${Date.now()}`,
      registrationId: targetReg.id,
      participantName: targetReg.fullName,
      churchName: targetReg.churchName,
      action: actionLogType,
      scannedBy: currentUser ? currentUser.name : 'Volunteer Scanner',
      gateNumber: selectedGate,
      timestamp: nowFormatted,
      amountCollected: modeToUse === 'payment' ? targetReg.paymentAmount : undefined
    };

    setAttendanceLogs(prev => [newLog, ...prev]);

    if (modeToUse === 'checkin') {
      setEvents(prev => prev.map(e => e.id === targetReg.eventId ? { ...e, totalCheckedIn: e.totalCheckedIn + 1 } : e));
    }

    return {
      success: true,
      message: successMessage,
      registration: updatedReg
    };
  };

  const resendSms = (registrationId: string) => {
    const reg = registrations.find(r => r.id === registrationId);
    if (!reg) return;

    const smsContent = `FaithPass\n${reg.eventTitle} සඳහා ඔබගේ ලියාපදිංචිය සාර්ථකයි.\nRegistration ID: ${reg.id}\nEvent Pass: https://faithpass.lk/p/${reg.id}`;
    
    const newSms: SmsLog = {
      id: `sms-${Date.now()}`,
      registrationId: reg.id,
      recipientPhone: reg.phone,
      message: smsContent,
      gateway: 'SMSLenz Gateway (Resent)',
      status: 'delivered',
      sentAt: new Date().toLocaleTimeString()
    };

    setSmsLogs(prev => [newSms, ...prev]);
    setLatestSmsMessage(newSms);
  };

  const updatePaymentStatus = (registrationId: string, newStatus: PaymentStatus) => {
    setRegistrations(prev => prev.map(r => r.id === registrationId ? { ...r, paymentStatus: newStatus, paidAmount: newStatus === 'paid' ? r.paymentAmount : 0 } : r));
  };

  const dismissSmsModal = () => {
    setLatestSmsMessage(null);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedPassId,
        openPassView,
        events,
        churches,
        registrations,
        attendanceLogs,
        smsLogs,
        currentUser,
        setCurrentUser,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginAsRole,
        logout,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        registerParticipant,
        scannerMode,
        setScannerMode,
        selectedGate,
        setSelectedGate,
        performScanAction,
        latestSmsMessage,
        dismissSmsModal,
        resendSms,
        updatePaymentStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
