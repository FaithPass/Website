import { EventItem, Church, ParticipantRegistration, AttendanceLog, SmsLog, User } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-2027',
    title: 'Revival 2027',
    date: '2027-03-15',
    time: '09:00 AM - 05:00 PM',
    venue: 'Sugathadasa Indoor Stadium',
    city: 'Colombo',
    description: 'The annual national youth & church revival gathering bringing together believers across Sri Lanka.',
    registrationFee: 500,
    totalRegistrations: 1450,
    totalCheckedIn: 890,
    status: 'ongoing',
  },
  {
    id: 'evt-2026-leadership',
    title: 'Faith Leadership Conference 2026',
    date: '2026-11-20',
    time: '08:30 AM - 04:00 PM',
    venue: 'BMICH Main Hall',
    city: 'Colombo',
    description: 'Empowering pastors, ministry leaders, and volunteers with digital tools and spiritual renewal.',
    registrationFee: 1500,
    totalRegistrations: 420,
    totalCheckedIn: 420,
    status: 'completed',
  }
];

export const INITIAL_CHURCHES: Church[] = [
  {
    id: 'ch-01',
    name: 'Grace Assembly',
    city: 'Colombo 03',
    pastorName: 'Pr. Michael Fernando',
    phone: '0771234567',
    registeredCount: 320,
  },
  {
    id: 'ch-02',
    name: 'Calvary Church',
    city: 'Kandy',
    pastorName: 'Pr. David Perera',
    phone: '0719876543',
    registeredCount: 210,
  },
  {
    id: 'ch-03',
    name: 'Hope Fellowship',
    city: 'Galle',
    pastorName: 'Pr. Samuel Silva',
    phone: '0754433221',
    registeredCount: 185,
  },
  {
    id: 'ch-04',
    name: 'Kingdom Life Church',
    city: 'Negombo',
    pastorName: 'Pr. Joseph Jayakody',
    phone: '0781122334',
    registeredCount: 140,
  }
];

export const INITIAL_REGISTRATIONS: ParticipantRegistration[] = [
  {
    id: 'FP-2027-004582',
    eventId: 'evt-2027',
    eventTitle: 'Revival 2027',
    type: 'individual',
    fullName: 'Kamal Silva',
    phone: '0778901234',
    email: 'kamal.silva@example.com',
    churchId: 'ch-01',
    churchName: 'Grace Assembly',
    city: 'Colombo 03',
    paymentStatus: 'paid',
    paymentAmount: 500,
    paidAmount: 500,
    attendanceStatus: 'checked_in',
    lastScannedAt: '2026-08-18 09:14 AM',
    lastScannedBy: 'Volunteer Sarah (Gate 1)',
    gateNumber: 'Gate 1',
    createdAt: '2026-08-10',
    qrCodeUrl: 'FP-2027-004582',
  },
  {
    id: 'FP-000001',
    eventId: 'evt-2027',
    eventTitle: 'Revival 2027',
    type: 'individual',
    fullName: 'John Doe',
    phone: '0712345678',
    email: 'john.doe@example.com',
    churchId: 'ch-02',
    churchName: 'Calvary Church',
    city: 'Kandy',
    paymentStatus: 'paid',
    paymentAmount: 500,
    paidAmount: 500,
    attendanceStatus: 'not_attended',
    createdAt: '2026-08-12',
    qrCodeUrl: 'FP-000001',
  },
  {
    id: 'FP-250001',
    eventId: 'evt-2027',
    eventTitle: 'Revival 2027',
    type: 'church_group',
    fullName: 'Nimali Jayasinghe',
    phone: '0755566778',
    churchId: 'ch-03',
    churchName: 'Hope Fellowship',
    city: 'Galle',
    paymentStatus: 'pending',
    paymentAmount: 500,
    paidAmount: 0,
    attendanceStatus: 'not_attended',
    createdAt: '2026-08-15',
    qrCodeUrl: 'FP-250001',
  }
];

export const INITIAL_LOGS: AttendanceLog[] = [
  {
    id: 'log-1',
    registrationId: 'FP-2027-004582',
    participantName: 'Kamal Silva',
    churchName: 'Grace Assembly',
    action: 'checkin',
    scannedBy: 'Volunteer Sarah',
    gateNumber: 'Gate 1',
    timestamp: '2026-08-18 09:14 AM'
  }
];

export const INITIAL_SMS_LOGS: SmsLog[] = [
  {
    id: 'sms-1',
    registrationId: 'FP-2027-004582',
    recipientPhone: '0778901234',
    message: 'FaithPass\nRevival 2027 සඳහා ඔබගේ ලියාපදිංචිය සාර්ථකයි.\nRegistration ID: FP-2027-004582\nEvent Pass: https://faithpass.lk/p/FP-2027-004582',
    gateway: 'SMSLenz Gateway',
    status: 'delivered',
    sentAt: '2026-08-10 14:22 PM'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Super Administrator',
    email: 'admin@faithpass.lk',
    role: 'super_admin'
  }
];
