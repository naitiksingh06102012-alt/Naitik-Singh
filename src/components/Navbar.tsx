import React, { useState } from 'react';
import { Calendar, Phone, Clock, MapPin, Menu, X, UserCheck } from 'lucide-react';
import { AppointmentRecord } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: (prefill?: { treatment?: string; doctorId?: string; branchId?: string }) => void;
  onOpenAssessment: () => void;
  onOpenMyBookings: () => void;
  activeBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAssessment,
  onOpenMyBookings,
  activeBookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Bar Contract: Exactly 3 Zones: Brand Title, 4-6 Nav Links, 1-2 Primary Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Title */}
        <a 
          href="#" 
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 hover:text-teal-900 transition-colors whitespace-nowrap"
        >
          Patna Skin & Laser Clinic
        </a>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#treatments" className="hover:text-teal-900 hover:underline underline-offset-8 transition-colors">
            Treatments
          </a>
          <a href="#doctors" className="hover:text-teal-900 hover:underline underline-offset-8 transition-colors">
            Doctors
          </a>
          <a href="#before-after" className="hover:text-teal-900 hover:underline underline-offset-8 transition-colors">
            Before & After
          </a>
          <button 
            onClick={onOpenAssessment}
            className="text-left hover:text-teal-900 hover:underline underline-offset-8 transition-colors cursor-pointer"
          >
            Skin Assessment
          </button>
          <a href="#facility" className="hover:text-teal-900 hover:underline underline-offset-8 transition-colors">
            Facility & Lasers
          </a>
          <a href="#locations" className="hover:text-teal-900 hover:underline underline-offset-8 transition-colors">
            Locations
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          {activeBookingsCount > 0 && (
            <button
              onClick={onOpenMyBookings}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50/80 hover:bg-teal-100 rounded-md border border-teal-200/60 transition-colors cursor-pointer whitespace-nowrap"
              title="View my appointments"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>My Bookings ({activeBookingsCount})</span>
            </button>
          )}

          <a
            href="tel:+916122548920"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-700" />
            <span className="font-tabular">0612-254-8920</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-teal-900 rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            Book Consultation
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-stone-50"
            >
              Treatments & Pricing
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-stone-50"
            >
              Consultant Dermatologists
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-stone-50"
            >
              Clinical Results (Before & After)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="py-2 px-3 text-left rounded-md hover:bg-stone-50 text-teal-800 font-semibold cursor-pointer"
            >
              60-Second Skin Assessment
            </button>
            <a
              href="#facility"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-stone-50"
            >
              Laser Technology & Sterilization
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-stone-50"
            >
              Clinic Locations & Timings
            </a>
            {activeBookingsCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="py-2 px-3 text-left rounded-md bg-teal-50 text-teal-900 font-semibold cursor-pointer"
              >
                View My Appointments ({activeBookingsCount})
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              <span>Boring Road & Kankarbagh, Patna</span>
            </div>
            <a href="tel:+916122548920" className="font-semibold text-slate-900">
              Call: 0612-2548920
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
