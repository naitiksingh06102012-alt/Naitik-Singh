import React, { useState } from 'react';
import { PATIENT_TESTIMONIALS, FAQ_ITEMS } from '../data/clinicData';
import { Star, ChevronDown, ChevronUp, AlertCircle, FileCheck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsAndFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: Patient Testimonials from Patna */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
              <span>Patient Trust & Verified Outpatient Feedback</span>
              <span aria-hidden="true">·</span>
              <span>Patna Residents</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              Real Experiences from Patients Treated at our Patna Clinics.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every review reflects a genuine clinical outcome. Read how our evidence-based, 
              steroid-free approaches have restored skin and hair health across Bihar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATIENT_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-stone-50/70 p-6 rounded-lg border border-stone-200/90 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-tabular">{t.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                {/* Patient Signature & Treated Condition */}
                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{t.patientName}</span>
                    <span className="text-slate-500 text-[11px]">{t.locality}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-teal-900 block">{t.condition}</span>
                    <span className="text-[11px] text-slate-500">Treated by: {t.doctorName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Pre-Consultation Clinical Checklist */}
        <div className="bg-stone-50 rounded-lg p-6 sm:p-8 border border-stone-200 space-y-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              <span>Patient Advisory</span>
              <span aria-hidden="true">·</span>
              <span>Accurate Diagnostics</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              How to Prepare for Your Dermatology Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              To ensure our dermatologists can carry out an unhampered dermoscopic inspection, please follow these four simple recommendations:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-4 rounded border border-stone-200/90 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Stop Steroid Creams</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Halt application of pharmacy creams like Betnovate, Panderm, or Dermikem 5 days prior so that natural skin barrier response can be evaluated.
              </p>
            </div>

            <div className="bg-white p-4 rounded border border-stone-200/90 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Bring Past Records</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Bring any recent blood work reports, biopsy slips, or current daily supplements/medicines you take for hypertension or thyroid.
              </p>
            </div>

            <div className="bg-white p-4 rounded border border-stone-200/90 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Zero Cosmetic Makeup</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Avoid foundation, compact powder, or tinted sunscreen on the face on consultation morning to allow polarized Wood’s lamp scanning.
              </p>
            </div>

            <div className="bg-white p-4 rounded border border-stone-200/90 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Wash Hair (Trichoscopy)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If visiting for hair loss, wash your hair with mild shampoo the night before without applying heavy oils or styling waxes.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions (Accordion) */}
        <div>
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
              <span>Patient Clarity</span>
              <span aria-hidden="true">·</span>
              <span>Common Queries</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions About Our Patna Practice.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-stone-200 rounded-lg overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left bg-white hover:bg-stone-50/80 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="p-1 text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-stone-50/50 border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
