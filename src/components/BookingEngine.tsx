import React, { useState, useEffect } from 'react';
import { 
  CLINIC_BRANCHES, 
  DOCTORS, 
  TREATMENTS, 
  AppointmentRecord 
} from '../data/clinicData';
import { 
  X, Calendar, Clock, MapPin, CheckCircle2, 
  User, Phone, Mail, FileText, ArrowRight, Download, MessageSquare, AlertCircle
} from 'lucide-react';

interface BookingEngineProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    treatment?: string;
    doctorId?: string;
    branchId?: string;
    notes?: string;
  };
  onBookingCreated: (record: AppointmentRecord) => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  isOpen,
  onClose,
  prefill,
  onBookingCreated,
}) => {
  // Form State
  const [selectedBranchId, setSelectedBranchId] = useState<string>(prefill?.branchId || 'boring-road');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(prefill?.doctorId || 'dr-saurabh-verma');
  const [selectedTreatment, setSelectedTreatment] = useState<string>(prefill?.treatment || 'acne-scar-revision');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Patient Details
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('26');
  const [patientGender, setPatientGender] = useState<string>('Female');
  const [concernNotes, setConcernNotes] = useState<string>(prefill?.notes || '');
  
  // UI states
  const [formError, setFormError] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);

  // Generate next 14 days
  const [dateOptions, setDateOptions] = useState<Array<{ dateStr: string; dayName: string; formatted: string; isSunday: boolean }>>([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const dateStr = d.toISOString().split('T')[0];
      
      dates.push({
        dateStr,
        dayName,
        formatted: `${dayNum} ${monthName}`,
        isSunday
      });
    }
    setDateOptions(dates);
    if (!selectedDate && dates.length > 0) {
      // Default to tomorrow or today
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  // Update prefill if provided
  useEffect(() => {
    if (prefill?.treatment) {
      // Match treatment title or ID
      const match = TREATMENTS.find(t => t.title.toLowerCase().includes(prefill.treatment!.toLowerCase()) || t.id === prefill.treatment);
      if (match) setSelectedTreatment(match.id);
    }
    if (prefill?.doctorId) {
      setSelectedDoctorId(prefill.doctorId);
    }
    if (prefill?.branchId) {
      setSelectedBranchId(prefill.branchId);
    }
    if (prefill?.notes) {
      setConcernNotes(prefill.notes);
    }
  }, [prefill]);

  if (!isOpen) return null;

  const currentBranch = CLINIC_BRANCHES.find(b => b.id === selectedBranchId) || CLINIC_BRANCHES[0];
  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];

  // Available Time Slots
  const morningSlots = ['10:00 AM', '10:45 AM', '11:30 AM', '12:15 PM', '01:00 PM'];
  const eveningSlots = ['04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM', '07:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!patientName.trim()) {
      setFormError('Please enter the patient’s full name.');
      return;
    }

    const cleanPhone = patientPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (!selectedTimeSlot) {
      setFormError('Please select a preferred consultation time slot.');
      return;
    }

    const treatmentObj = TREATMENTS.find(t => t.id === selectedTreatment);
    const treatmentTitle = treatmentObj ? treatmentObj.title : 'General Dermatology Consultation';

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `PAT-DERM-${randomSuffix}`;

    const newRecord: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      referenceCode,
      patientName: patientName.trim(),
      phone: patientPhone.trim(),
      email: patientEmail.trim(),
      age: Number(patientAge) || 25,
      gender: patientGender,
      branchId: currentBranch.id,
      branchName: currentBranch.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      treatmentCategory: treatmentTitle,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      concernNotes: concernNotes.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('patna_skin_appointments');
      const list: AppointmentRecord[] = existing ? JSON.parse(existing) : [];
      list.unshift(newRecord);
      localStorage.setItem('patna_skin_appointments', JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }

    onBookingCreated(newRecord);
    setConfirmedBooking(newRecord);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Patna Skin & Laser Clinic//Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Consultation with ${confirmedBooking.doctorName}`,
      `DESCRIPTION:Appointment Ref: ${confirmedBooking.referenceCode} at ${confirmedBooking.branchName} for ${confirmedBooking.treatmentCategory}`,
      `LOCATION:${currentBranch.address}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `appointment-${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppConfirm = () => {
    if (!confirmedBooking) return;
    const text = encodeURIComponent(
      `Hello Patna Skin & Laser Clinic! I have booked an appointment.\n` +
      `Reference: ${confirmedBooking.referenceCode}\n` +
      `Patient: ${confirmedBooking.patientName}\n` +
      `Doctor: ${confirmedBooking.doctorName}\n` +
      `Date: ${confirmedBooking.date} at ${confirmedBooking.timeSlot}\n` +
      `Branch: ${confirmedBooking.branchName}\n` +
      `Concern: ${confirmedBooking.treatmentCategory}`
    );
    window.open(`https://wa.me/919431028419?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-2xl w-full border border-stone-300 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Online Appointment Desk
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              {confirmedBooking ? 'Appointment Confirmed' : 'Schedule Dermatologist Consultation'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmed State View */}
        {confirmedBooking ? (
          <div className="space-y-6">
            <div className="p-4 sm:p-5 bg-emerald-50/80 border border-emerald-200/90 rounded-lg text-emerald-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Slot Reserved Successfully</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your consultation request has been logged in our clinic management system. 
                A verification SMS and WhatsApp reminder will be dispatched prior to your visit.
              </p>
              
              {/* Reference Box */}
              <div className="bg-white p-3.5 rounded border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-500 block">Booking Reference Number</span>
                  <span className="font-tabular text-lg font-bold text-slate-900">{confirmedBooking.referenceCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Consultation Fee</span>
                  <span className="font-tabular text-sm font-semibold text-teal-900">₹700 (Pay at Clinic Desk)</span>
                </div>
              </div>
            </div>

            {/* Appointment Details Summary */}
            <div className="space-y-3 text-xs text-slate-700 bg-stone-50 p-4 rounded-lg border border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">Consulting Specialist</span>
                  <strong className="text-slate-900">{confirmedBooking.doctorName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Scheduled Date & Time</span>
                  <strong className="text-slate-900 font-tabular">{confirmedBooking.date} · {confirmedBooking.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Clinic Location</span>
                  <strong className="text-slate-900">{confirmedBooking.branchName}</strong>
                  <span className="text-[11px] text-slate-500 block">{currentBranch.landmark}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Patient Information</span>
                  <span className="text-slate-900 font-medium">{confirmedBooking.patientName} ({confirmedBooking.age} yrs, {confirmedBooking.gender})</span>
                  <span className="text-[11px] text-slate-500 block font-tabular">{confirmedBooking.phone}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-stone-200/80">
                <span className="text-slate-400 block text-[11px]">Primary Concern</span>
                <span className="text-slate-800 font-medium">{confirmedBooking.treatmentCategory}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppConfirm}
                className="py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm via Clinic WhatsApp</span>
              </button>

              <button
                onClick={handleDownloadCalendar}
                className="py-2.5 px-4 text-xs font-semibold text-slate-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Need to make changes? Call 0612-254-8920</span>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  onClose();
                }}
                className="font-semibold text-slate-900 hover:underline cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded flex items-center gap-2 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 1: Branch Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-2">
                1. Select Patna Clinic Branch
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CLINIC_BRANCHES.map((b) => (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`p-3 text-left rounded border transition-all cursor-pointer ${
                      selectedBranchId === b.id
                        ? 'border-slate-900 bg-stone-50 font-semibold shadow-xs'
                        : 'border-stone-200 text-slate-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{b.name}</span>
                      {selectedBranchId === b.id && <CheckCircle2 className="w-4 h-4 text-slate-900" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{b.landmark}</div>
                    <div className="text-[11px] text-teal-800 mt-0.5">{b.area}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Doctor Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-2">
                2. Select Consulting Dermatologist
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOCTORS.map((doc) => (
                  <button
                    type="button"
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3 text-left rounded border transition-all cursor-pointer ${
                      selectedDoctorId === doc.id
                        ? 'border-slate-900 bg-stone-50 font-semibold shadow-xs'
                        : 'border-stone-200 text-slate-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                      {selectedDoctorId === doc.id && <CheckCircle2 className="w-4 h-4 text-slate-900" />}
                    </div>
                    <div className="text-[11px] text-teal-900 font-medium mt-0.5">{doc.role.split('&')[0]}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {selectedBranchId === 'boring-road' ? doc.opdSchedule.boringRoad.split('(')[0] : doc.opdSchedule.kankarbagh.split('(')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Treatment Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-2">
                3. Primary Concern or Treatment
              </label>
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden"
              >
                {TREATMENTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.categoryLabel}: {t.title}
                  </option>
                ))}
                <option value="general-consult">General Skin / Scalp Consultation (₹700)</option>
              </select>
            </div>

            {/* Step 4: Date Selection (Ribbon) */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-2">
                4. Preferred Consultation Date
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {dateOptions.map((opt) => {
                  const isSelected = selectedDate === opt.dateStr;
                  return (
                    <button
                      type="button"
                      key={opt.dateStr}
                      disabled={opt.isSunday && selectedBranchId === 'kankarbagh'}
                      onClick={() => setSelectedDate(opt.dateStr)}
                      className={`flex-shrink-0 w-16 p-2 text-center rounded border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                          : 'border-stone-200 bg-stone-50 hover:bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed'
                      }`}
                    >
                      <div className="text-[10px] uppercase">{opt.dayName}</div>
                      <div className="text-xs font-bold font-tabular mt-0.5">{opt.formatted}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Time Slot Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-2">
                5. Available Time Slots
              </label>
              <div className="space-y-2">
                <div className="text-[11px] font-medium text-slate-500">Morning Shift (10:00 AM – 01:15 PM)</div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {morningSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-1.5 px-2 text-center text-xs rounded border transition-all cursor-pointer font-tabular ${
                        selectedTimeSlot === slot
                          ? 'border-teal-800 bg-teal-800 text-white font-semibold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-medium text-slate-500 pt-1">Evening Shift (04:30 PM – 07:45 PM)</div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {eveningSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-1.5 px-2 text-center text-xs rounded border transition-all cursor-pointer font-tabular ${
                        selectedTimeSlot === slot
                          ? 'border-teal-800 bg-teal-800 text-white font-semibold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 6: Patient Information Form */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <div className="text-xs font-semibold text-slate-900">
                6. Patient Particulars
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Contact Phone Number * (+91)</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden font-tabular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden font-tabular"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="For calendar invite"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">
                  Brief Medical History / Prior Treatments Applied (Optional)
                </label>
                <textarea
                  rows={2}
                  value={concernNotes}
                  onChange={(e) => setConcernNotes(e.target.value)}
                  placeholder="e.g. Using Betnovate-N cream for 3 months, sudden itching and redness on cheeks..."
                  className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-200">
              <div className="text-xs text-slate-500">
                Consultation: <strong className="text-slate-900">₹700</strong> · Pay at clinic desk
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
