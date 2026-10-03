import React from 'react';
import { DOCTORS, Doctor } from '../data/clinicData';
import { Award, GraduationCap, Clock, Calendar, CheckCircle, Stethoscope } from 'lucide-react';

interface DoctorsSectionProps {
  onBookDoctor: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor }) => {
  return (
    <section id="doctors" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Senior Medical Faculty</span>
            <span aria-hidden="true">·</span>
            <span>AIIMS Patna & International Fellowship</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Consult Board-Certified Dermatologists Dedicated to Clinical Excellence.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our doctors hold recognized post-graduate medical degrees (MD/DVD) in dermatology from premier institutions. 
            No technician-led prescriptions; every treatment plan is formulated by your treating physician.
          </p>
        </div>

        {/* Featured Consultation Suite Image Banner */}
        <div className="mb-12 rounded-lg overflow-hidden border border-stone-300 relative shadow-xs bg-stone-900">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-7 h-64 sm:h-80 overflow-hidden relative">
              <img
                src="/src/assets/images/doctor_consultation_dermatologist_1791025484265.jpg"
                alt="Doctor consultation in high-tech examination room at Patna clinic"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950/80 hidden md:block" />
            </div>
            <div className="md:col-span-5 p-6 sm:p-8 bg-slate-900 text-white space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-teal-400 font-medium">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>The Diagnostic Consultation Standard</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                Polarized Dermoscopy & Trichoscopy at Every Visit
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                We do not guess skin conditions by naked eye inspection. Every patient undergoes high-resolution 
                polarized epiluminescence dermoscopy to analyze subcutaneous vascularity, pigment depth, and follicular units.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-stone-300">
                <div>✓ 7-Day Free Follow-up</div>
                <div>✓ Transparent Prescriptions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6"
            >
              <div className="space-y-4">
                
                {/* Doctor Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                      {doc.name}
                    </h3>
                    <div className="text-xs font-semibold text-teal-900 mt-1">
                      {doc.role}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {doc.qualification}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 bg-stone-50 px-3 py-1.5 rounded border border-stone-200 self-start">
                    <span className="font-tabular font-bold text-slate-900">{doc.experienceYears}+ Years</span> Experience
                  </div>
                </div>

                {/* Credentials & Registration */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{doc.alumni}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>{doc.registrations}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                  {doc.bio}
                </p>

                {/* Specializations */}
                <div className="pt-3 border-t border-stone-100">
                  <span className="text-xs font-semibold text-slate-900 block mb-2">
                    Core Clinical Domains:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {doc.specialties.map((spec, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                        <span className="leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OPD Schedule Box */}
                <div className="bg-stone-50 p-3.5 rounded border border-stone-200/80 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>OPD Consultation Schedule:</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-600 gap-1">
                    <span><strong>Boring Road:</strong> {doc.opdSchedule.boringRoad}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-600 gap-1">
                    <span><strong>Kankarbagh:</strong> {doc.opdSchedule.kankarbagh}</span>
                  </div>
                </div>

              </div>

              {/* Action */}
              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => onBookDoctor(doc.id)}
                  className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment with {doc.name.split(' ')[1]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
