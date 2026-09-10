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
  AttendanceStatus,
  DeliveryMode
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

export type ActiveView = 'home' | 'events' | 'features' | 'how-it-works' | 'pricing' | 'about' | 'contact' | 'dashboard' | 'pass' | 'scanner';

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
    address?: string;
    district?: string;
    churchName?: string;
    pastorName?: string;
    churchId?: string;
    eventId?: string;
    paymentStatus: PaymentStatus;
  }) => ParticipantRegistration;
  
  registerChurchGroup: (data: {
    churchName: string;
    pastorName: string;
    pastorPhone: string;
    pastorEmail?: string;
    churchAddress?: string;
    deliveryMode: DeliveryMode;
    members: { name: string; phone: string }[];
    eventId?: string;
    paymentStatus: PaymentStatus;
  }) => { groupId: string; pastorRegId: string; registrations: ParticipantRegistration[] };
  
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
    address?: string;
    district?: string;
    churchName?: string;
    pastorName?: string;
    churchId?: string;
    eventId?: string;
    paymentStatus: PaymentStatus;
  }) => {
    const activeEvent = events.find(e => e.id === data.eventId) || events[0];
    const churchObj = churches.find(c => c.id === data.churchId || c.name === data.churchName) || churches[0];
    
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
      address: data.address,
      district: data.district,
      churchId: churchObj.id,
      churchName: data.churchName || churchObj.name,
      city: data.district || churchObj.city,
      pastorName: data.pastorName || churchObj.pastorName,
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

  const registerChurchGroup = (data: {
    churchName: string;
    pastorName: string;
    pastorPhone: string;
    pastorEmail?: string;
    churchAddress?: string;
    deliveryMode: DeliveryMode;
    members: { name: string; phone: string }[];
    eventId?: string;
    paymentStatus: PaymentStatus;
  }) => {
    const activeEvent = events.find(e => e.id === data.eventId) || events[0];
    const groupId = `GRP-FP-2027-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString().split('T')[0];
    const newRegistrations: ParticipantRegistration[] = [];

    // Pastor Registration Entry
    const pastorSeq = Math.floor(100000 + Math.random() * 900000);
    const pastorRegId = `FP-250${pastorSeq.toString().slice(0, 3)}`;
    const pastorReg: ParticipantRegistration = {
      id: pastorRegId,
      eventId: activeEvent.id,
      eventTitle: activeEvent.title,
      type: 'church_group',
      fullName: `Pr. ${data.pastorName} (${data.churchName})`,
      phone: data.pastorPhone,
      email: data.pastorEmail,
      churchId: 'ch-01',
      churchName: data.churchName,
      city: 'Group Delegation',
      pastorName: data.pastorName,
      pastorPhone: data.pastorPhone,
      pastorEmail: data.pastorEmail,
      churchAddress: data.churchAddress,
      deliveryMode: data.deliveryMode,
      groupId,
      isPastor: true,
      paymentStatus: data.paymentStatus,
      paymentAmount: activeEvent.registrationFee,
      paidAmount: data.paymentStatus === 'paid' ? activeEvent.registrationFee : 0,
      attendanceStatus: 'not_attended',
      createdAt: now,
      qrCodeUrl: pastorRegId
    };
    newRegistrations.push(pastorReg);

    // Members Registration Entries
    data.members.forEach((m, idx) => {
      const seq = Math.floor(100000 + Math.random() * 900000);
      const memberRegId = `FP-250${(100 + idx).toString()}`;
      const memberReg: ParticipantRegistration = {
        id: memberRegId,
        eventId: activeEvent.id,
        eventTitle: activeEvent.title,
        type: 'church_group',
        fullName: m.name,
        phone: m.phone || data.pastorPhone,
        churchId: 'ch-01',
        churchName: data.churchName,
        city: 'Group Member',
        pastorName: data.pastorName,
        pastorPhone: data.pastorPhone,
        deliveryMode: data.deliveryMode,
        groupId,
        isPastor: false,
        paymentStatus: data.paymentStatus,
        paymentAmount: activeEvent.registrationFee,
        paidAmount: data.paymentStatus === 'paid' ? activeEvent.registrationFee : 0,
        attendanceStatus: 'not_attended',
        createdAt: now,
        qrCodeUrl: memberRegId
      };
      newRegistrations.push(memberReg);
    });

    setRegistrations(prev => [...newRegistrations, ...prev]);
    setEvents(prev => prev.map(e => e.id === activeEvent.id ? { ...e, totalRegistrations: e.totalRegistrations + newRegistrations.length } : e));

    // Handle SMS Dispatch based on Delivery Mode
    const masterPassUrl = `https://faithpass.lk/p/${pastorRegId}?group=${groupId}`;

    if (data.deliveryMode === 'pastor_only') {
      // 1 Single SMS to Pastor
      const pastorSmsContent = `FaithPass\n${data.churchName} Registered Successfully.\nTotal Members: ${newRegistrations.length}\nRegistration IDs: ${newRegistrations.map(r => r.id).join(', ')}\nView All QR Passes: ${masterPassUrl}`;
      const pastorSms: SmsLog = {
        id: `sms-${Date.now()}`,
        registrationId: pastorRegId,
        recipientPhone: data.pastorPhone,
        message: pastorSmsContent,
        gateway: 'SMSLenz Gateway (Pastor Only)',
        status: 'delivered',
        sentAt: new Date().toLocaleTimeString()
      };
      setSmsLogs(prev => [pastorSms, ...prev]);
      setLatestSmsMessage(pastorSms);
    } else {
      // Pastor + All Members SMS
      const pastorSmsContent = `FaithPass\n${data.churchName} Registered Successfully.\nTotal Members: ${newRegistrations.length}\nView Master Dashboard: ${masterPassUrl}`;
      const pastorSms: SmsLog = {
        id: `sms-${Date.now()}`,
        registrationId: pastorRegId,
        recipientPhone: data.pastorPhone,
        message: pastorSmsContent,
        gateway: 'SMSLenz Gateway',
        status: 'delivered',
        sentAt: new Date().toLocaleTimeString()
      };

      const memberSmsLogs: SmsLog[] = newRegistrations.map(r => ({
        id: `sms-${Date.now()}-${r.id}`,
        registrationId: r.id,
        recipientPhone: r.phone,
        message: `Welcome to FaithPass!\nRegistration ID: ${r.id}\nQR Pass: https://faithpass.lk/p/${r.id}\nEvent: ${activeEvent.title}`,
        gateway: 'SMSLenz Gateway',
        status: 'delivered',
        sentAt: new Date().toLocaleTimeString()
      }));

      setSmsLogs(prev => [pastorSms, ...memberSmsLogs, ...prev]);
      setLatestSmsMessage(pastorSms);
    }

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch (e) {}

    return { groupId, pastorRegId, registrations: newRegistrations };
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
        registerChurchGroup,
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
