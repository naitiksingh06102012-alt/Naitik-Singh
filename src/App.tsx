import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { TreatmentsSection } from './components/TreatmentsSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ClinicTourSection } from './components/ClinicTourSection';
import { LocationsSection } from './components/LocationsSection';
import { TestimonialsAndFAQ } from './components/TestimonialsAndFAQ';
import { Footer } from './components/Footer';
import { BookingEngine } from './components/BookingEngine';
import { SkinAssessmentQuiz } from './components/SkinAssessmentQuiz';
import { PatientBookingsModal } from './components/PatientBookingsModal';
import { AppointmentRecord } from './data/clinicData';
import { MessageSquare, Phone } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    treatment?: string;
    doctorId?: string;
    branchId?: string;
    notes?: string;
  } | undefined>(undefined);

  const [userBookings, setUserBookings] = useState<AppointmentRecord[]>([]);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('patna_skin_appointments');
      if (stored) {
        setUserBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse stored bookings', e);
    }
  }, []);

  const handleOpenBooking = (prefill?: {
    treatment?: string;
    doctorId?: string;
    branchId?: string;
    notes?: string;
  }) => {
    setBookingPrefill(prefill);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (record: AppointmentRecord) => {
    setUserBookings(prev => [record, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    const updated = userBookings.filter(b => b.id !== id);
    setUserBookings(updated);
    try {
      localStorage.setItem('patna_skin_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleProceedFromAssessment = (data: {
    concern: string;
    doctorRecommendation: string;
    notes: string;
  }) => {
    // Map recommendation to doctor ID if possible
    const docId = data.doctorRecommendation.includes('Priya') ? 'dr-priya-sinha' : 'dr-saurabh-verma';
    handleOpenBooking({
      treatment: data.concern,
      doctorId: docId,
      notes: data.notes
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-slate-800 antialiased">
      {/* 3-Zone Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        activeBookingsCount={userBookings.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenAssessment={() => setIsAssessmentOpen(true)}
        />

        {/* Core Treatments & Transparent Pricing Directory */}
        <TreatmentsSection
          onBookTreatment={(treatmentName) => handleOpenBooking({ treatment: treatmentName })}
        />

        {/* Consultant Dermatologists & Credentials */}
        <DoctorsSection
          onBookDoctor={(doctorId) => handleOpenBooking({ doctorId })}
        />

        {/* Interactive Before & After Results Slider */}
        <BeforeAfterSlider
          onBookConsultation={(category) => handleOpenBooking({ treatment: category })}
        />

        {/* US-FDA Laser Technology & Hospital-Grade Cleanroom Facility */}
        <ClinicTourSection />

        {/* Boring Road & Kankarbagh Locations, Timings & Directions */}
        <LocationsSection
          onBookBranch={(branchId) => handleOpenBooking({ branchId })}
        />

        {/* Local Patna Patient Reviews, Pre-Consultation Guide & FAQs */}
        <TestimonialsAndFAQ />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      {/* Floating Action Affordance for Instant WhatsApp Inquiry */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2">
        <a
          href="https://wa.me/919431028419?text=Hello%20Patna%20Skin%20%26%20Laser%20Clinic,%20I%20would%20like%20to%20inquire%20about%20a%20dermatologist%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg transition-transform hover:scale-105 text-xs font-semibold"
          aria-label="Direct WhatsApp Consultation Inquiry"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp Clinic</span>
        </a>
      </div>

      {/* Interactive Booking Engine Modal */}
      <BookingEngine
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefill={bookingPrefill}
        onBookingCreated={handleBookingCreated}
      />

      {/* Interactive 60-Second Skin Assessment Quiz Modal */}
      <SkinAssessmentQuiz
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onProceedToBooking={handleProceedFromAssessment}
      />

      {/* My Bookings Portal Modal */}
      <PatientBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={userBookings}
        onCancelBooking={handleCancelBooking}
        onBookNew={() => handleOpenBooking()}
      />
    </div>
  );
}
