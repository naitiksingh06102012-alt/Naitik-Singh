import React from 'react';
import { ShieldCheck, Zap, Sparkles, CheckCircle2, Award, Microchip } from 'lucide-react';

export const ClinicTourSection: React.FC = () => {
  return (
    <section id="facility" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Clinical Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>Zero Cross-Contamination Standard</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            State-of-the-Art Laser Suites & Hospital-Grade Sterilization in Patna.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Dermatology laser procedures demand uncompromising energy calibration and medical sterility. 
            We maintain dual US-FDA approved laser workstations and Class B fractional vacuum sterilization.
          </p>
        </div>

        {/* 2-Column Asymmetric Media Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Laser Suite Card (7 cols) */}
          <div className="lg:col-span-7 bg-stone-900 rounded-lg overflow-hidden border border-stone-300 shadow-sm relative group flex flex-col justify-between">
            <div className="relative h-72 sm:h-88 overflow-hidden">
              <img
                src="/src/assets/images/laser_treatment_procedure_1791025496915.jpg"
                alt="Doctor performing advanced laser procedure in sterile suite at Patna clinic"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 bg-slate-950 text-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Dual Wavelength Precision Workstation</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold">
                US-FDA Cleared Triple-Wavelength Laser System
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Combining 755nm Alexandrite, 808nm Gold Standard Diode, and 1064nm Long-Pulsed Nd:YAG. 
                Equipped with contact cooling chilling the epidermis to -5°C for virtually zero discomfort and zero risk of burn on Indian Fitzpatrick IV & V skin.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-300">
                <span>· Continuous Contact Cooling</span>
                <span>· Calibrated Beam Homogeneity</span>
                <span>· Single-Patient Tip Sanitization</span>
              </div>
            </div>
          </div>

          {/* Medi-Facial Rejuvenation Suite (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-lg overflow-hidden border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <img
                src="/src/assets/images/hydrafacial_aesthetic_treatment_1791025508427.jpg"
                alt="Clinical HydraFacial medical skin rejuvenation treatment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Original Medical HydraFacial MD® Suite</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                Vortex-Fusion Clinical Nutrient Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Not a salon facial. Medical-grade exfoliation with concentrated salicylic, glycolic, 
                and peptide boosters designed to decongest urban pollution debris without manual squeezing or trauma.
              </p>

              <div className="pt-2 border-t border-stone-200/80 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Immediate visible skin brightening</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Zero micro-tears or skin barrier disruption</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sterile Protocol Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-5 bg-stone-50 rounded border border-stone-200/90 space-y-2">
            <div className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
              <ShieldCheck className="w-5 h-5 text-teal-800" />
              <span>Class B Autoclave Sterility</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All subcision instruments, comedone extractors, and surgical forceps undergo medical fractional vacuum autoclaving at 134°C with biological spore validation.
            </p>
          </div>

          <div className="p-5 bg-stone-50 rounded border border-stone-200/90 space-y-2">
            <div className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
              <Award className="w-5 h-5 text-teal-800" />
              <span>High-Resolution Dermoscopy</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Polarized cross-polarized epiluminescence microscopy enables 20x optical inspection of vascular patterns, pigment depth, and hair follicle density before writing any prescription.
            </p>
          </div>

          <div className="p-5 bg-stone-50 rounded border border-stone-200/90 space-y-2">
            <div className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
              <Microchip className="w-5 h-5 text-teal-800" />
              <span>US-FDA Machinery Only</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not use unbranded Chinese or assemble-grade IPL machines. All our lasers and radiofrequency units are certified by the US-FDA for safety on Asian skin.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
