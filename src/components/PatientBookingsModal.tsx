import React from 'react';
import { AppointmentRecord } from '../data/clinicData';
import { X, Calendar, Clock, MapPin, User, Trash2, CheckCircle2, Phone } from 'lucide-react';

interface PatientBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: AppointmentRecord[];
  onCancelBooking: (id: string) => void;
  onBookNew: () => void;
}

export const PatientBookingsModal: React.FC<PatientBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-xl w-full border border-stone-300 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[88vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Patient Portal
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              My Scheduled Appointments
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {bookings.length === 0 ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-slate-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-900">No Active Appointments Found</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                You haven't scheduled any consultations on this device yet. Select a doctor and time slot to book now.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="py-2 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors cursor-pointer"
            >
              Book Consultation Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Below are your verified consultation slots stored in your browser session. Please arrive 10 minutes early at your selected Patna clinic branch.
            </p>

            <div className="space-y-3">
              {bookings.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 border border-stone-200/90 rounded-lg p-4 space-y-3"
                >
                  {/* Top Bar with Reference */}
                  <div className="flex items-center justify-between">
                    <span className="font-tabular font-bold text-xs text-teal-950 bg-teal-100/70 px-2 py-0.5 rounded">
                      Ref: {item.referenceCode}
                    </span>
                    <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Confirmed
                    </span>
                  </div>

                  {/* Doctor & Date */}
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.doctorName}</div>
                    <div className="text-xs text-teal-900 font-medium">{item.treatmentCategory}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-stone-200/70">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-tabular">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-tabular">{item.timeSlot}</span>
                    </div>
                    <div className="col-span-2 flex items-start gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item.branchName}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between">
                    <a
                      href="tel:+916122548920"
                      className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-teal-700" />
                      <span>Need Help? Call Desk</span>
                    </a>
                    <button
                      onClick={() => onCancelBooking(item.id)}
                      className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Slot</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-stone-200">
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="py-2 px-3 text-xs font-semibold text-slate-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
              >
                + Book Another Consultation
              </button>
              <button
                onClick={onClose}
                className="py-2 px-4 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
