import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, MapPin, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenAssessment }) => {
  return (
    <section className="relative overflow-hidden bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clinical Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata Trust Bar (No Pills) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 font-medium tracking-wide">
              <span className="text-teal-900 font-semibold">AIIMS Patna & PMCH Alumni</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>US-FDA Approved Lasers</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Boring Road & Kankarbagh</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Same-Day Slots Available</span>
            </div>

            {/* Main Headline (Balanced Typography) */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Evidence-Based Dermatology & Laser Therapeutics in Patna.
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Specialized clinical care for recalcitrant acne, deep cystic scarring, hormonal hair loss, 
              melasma, and medical aesthetics. Consult with certified dermatologists using genuine 
              US-FDA cleared systems with zero compromise on safety.
            </p>

            {/* Primary Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded-md transition-all shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenAssessment}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-teal-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-all cursor-pointer"
              >
                <span>Take 60-Sec Skin Assessment</span>
              </button>
            </div>

            {/* Verified Clinical Guarantees */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  <strong>No Steroid Misuse:</strong> Strict anti-topical-steroid-damage protocols for Indian skin.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Doctor-Administered:</strong> Every laser & procedural sitting supervised directly by MD dermatologists.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor Carrier (16:9 / 4:3 Hospital Grade) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-stone-300 shadow-md bg-stone-100">
              <img
                src="/src/assets/images/clinic_hero_reception_1791025466843.jpg"
                alt="Patna Skin & Laser Clinic pristine reception and consultation suite"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Bottom Scrim Content Card */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-200 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Main Center: Boring Road · Branch: Kankarbagh</span>
                </div>
                <div className="font-display text-base font-semibold">
                  Sterile Clinical Ambience & US-FDA Laser Suites
                </div>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  Compliant with NABH sterility standards, single-use laser tips, and HEPA filtered air filtration.
                </p>
              </div>
            </div>

            {/* Floating Trust Verification Marker */}
            <div className="mt-3 flex items-center justify-between px-3 py-2 bg-white rounded border border-stone-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Registered with Bihar Medical Council</span>
              </div>
              <span className="font-tabular text-slate-400">Reg: BMC-34190</span>
            </div>
          </div>

        </div>

        {/* Adjacency Proof Numbers (Tabular Figures) */}
        <div className="mt-12 pt-8 border-t border-stone-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-800">
          <div>
            <div className="font-tabular text-2xl sm:text-3xl font-bold text-slate-900">28,000+</div>
            <div className="text-xs text-slate-500 mt-1">Dermatology Consultations Delivered in Bihar</div>
          </div>
          <div>
            <div className="font-tabular text-2xl sm:text-3xl font-bold text-slate-900">14+ Years</div>
            <div className="text-xs text-slate-500 mt-1">Combined Senior Clinical Experience</div>
          </div>
          <div>
            <div className="font-tabular text-2xl sm:text-3xl font-bold text-slate-900">98.4%</div>
            <div className="text-xs text-slate-500 mt-1">Patient Treatment Satisfaction Rate</div>
          </div>
          <div>
            <div className="font-tabular text-2xl sm:text-3xl font-bold text-slate-900">2 Centers</div>
            <div className="text-xs text-slate-500 mt-1">Conveniently Located across Patna</div>
          </div>
        </div>

      </div>
    </section>
  );
};
