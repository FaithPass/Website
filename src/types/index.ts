export type UserRole = 'super_admin' | 'organizer' | 'pastor' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  churchId?: string;
  gateNumber?: string;
}

export interface Church {
  id: string;
  name: string;
  city: string;
  pastorName: string;
  phone: string;
  registeredCount: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  description: string;
  registrationFee: number;
  totalRegistrations: number;
  totalCheckedIn: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export type RegistrationType = 'individual' | 'church_group';
export type PaymentStatus = 'paid' | 'pending' | 'free';
export type AttendanceStatus = 'not_attended' | 'checked_in' | 'checked_out';
export type ScannerMode = 'checkin' | 'checkout' | 'payment';

export interface ParticipantRegistration {
  id: string; // e.g. FP-2027-004582
  eventId: string;
  eventTitle: string;
  type: RegistrationType;
  fullName: string;
  phone: string;
  email?: string;
  churchId: string;
  churchName: string;
  city: string;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  paidAmount: number;
  attendanceStatus: AttendanceStatus;
  lastScannedAt?: string;
  lastScannedBy?: string;
  gateNumber?: string;
  createdAt: string;
  qrCodeUrl: string;
}

export interface AttendanceLog {
  id: string;
  registrationId: string;
  participantName: string;
  churchName: string;
  action: 'checkin' | 'checkout' | 'payment_collected';
  scannedBy: string;
  gateNumber: string;
  timestamp: string;
  amountCollected?: number;
}

export interface SmsLog {
  id: string;
  registrationId: string;
  recipientPhone: string;
  message: string;
  gateway: string;
  status: 'delivered' | 'failed' | 'queued';
  sentAt: string;
}
