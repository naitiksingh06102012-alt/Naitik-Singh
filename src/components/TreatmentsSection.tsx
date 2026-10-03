import React, { useState } from 'react';
import { TREATMENTS, Treatment } from '../data/clinicData';
import { Clock, ShieldCheck, ArrowRight, Zap, CheckCircle2, X, HelpCircle, Activity } from 'lucide-react';

interface TreatmentsSectionProps {
  onBookTreatment: (treatmentName: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onBookTreatment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailTreatment, setActiveDetailTreatment] = useState<Treatment | null>(null);

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'clinical', label: 'Clinical Acne & Skin' },
    { id: 'laser', label: 'Laser & Pigmentation' },
    { id: 'hair', label: 'Hair Restoration (GFC)' },
    { id: 'aesthetics', label: 'Medi-Facials & Peels' },
    { id: 'surgery', label: 'Minor Dermatosurgery' },
  ];

  const filteredTreatments = selectedCategory === 'all'
    ? TREATMENTS
    : TREATMENTS.filter(t => t.category === selectedCategory);

  return (
    <section id="treatments" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Clinical Directory & Protocols</span>
            <span aria-hidden="true">·</span>
            <span>US-FDA Cleared Technology</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Targeted Dermatological Procedures & Transparent Pricing.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Every procedure at Patna Skin & Laser Clinic is executed following standard international dermatology 
            guidelines, customized for Indian skin phototypes with transparent cost estimates.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100/90 rounded-md border border-stone-200/80 mb-10 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-stone-50/60 rounded-lg border border-stone-200/90 p-6 flex flex-col justify-between hover:border-teal-700/40 transition-all hover:shadow-xs group"
            >
              <div className="space-y-4">
                
                {/* Category Unboxed Text */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-teal-900">{treatment.categoryLabel}</span>
                  <span className="font-tabular text-slate-400">{treatment.downtime}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-teal-950 transition-colors">
                  {treatment.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {treatment.summary}
                </p>

                {/* Primary Indications */}
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-medium">Recommended for:</span>
                  <p className="text-slate-700 font-medium">{treatment.indication}</p>
                </div>

                {/* Technology Used */}
                <div className="pt-2 border-t border-stone-200/70 text-xs text-slate-600 flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <span className="text-slate-500 line-clamp-1">Tech: <strong className="text-slate-800 font-medium">{treatment.technology}</strong></span>
                </div>

                {/* Sessions and Price */}
                <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Typical Course</span>
                    <span className="font-tabular font-medium text-slate-800">{treatment.sessionsRequired.split(' ')[0]} {treatment.sessionsRequired.split(' ')[1]}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Fee Estimate</span>
                    <span className="font-tabular font-bold text-teal-900">{treatment.approxFee.split('per')[0]}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-stone-200 flex items-center gap-2">
                <button
                  onClick={() => setActiveDetailTreatment(treatment)}
                  className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-stone-100 border border-stone-300 rounded transition-colors text-center cursor-pointer"
                >
                  Clinical Protocol
                </button>
                <button
                  onClick={() => onBookTreatment(treatment.title)}
                  className="py-2 px-3.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Protocol Modal */}
      {activeDetailTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-300 shadow-xl p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                  {activeDetailTreatment.categoryLabel} Protocol Dossier
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activeDetailTreatment.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailTreatment(null)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-stone-50 rounded border border-stone-200 text-xs">
              <div>
                <span className="text-slate-400 block">Downtime</span>
                <span className="font-medium text-slate-800">{activeDetailTreatment.downtime}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Recommended Sessions</span>
                <span className="font-medium text-slate-800">{activeDetailTreatment.sessionsRequired}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-400 block">Approximate Cost</span>
                <span className="font-tabular font-bold text-teal-900">{activeDetailTreatment.approxFee}</span>
              </div>
            </div>

            {/* Candidate Suitability */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Clinical Indication & Candidate Profile:</span>
              <p className="bg-amber-50/60 p-3 rounded border border-amber-200/60 text-slate-800">
                {activeDetailTreatment.suitableFor}
              </p>
            </div>

            {/* Scientific Highlights */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-900">Protocol Highlights:</span>
              <ul className="space-y-2 text-xs text-slate-600">
                {activeDetailTreatment.protocolHighlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Details */}
            <div className="text-xs text-slate-600 bg-stone-50 p-3.5 rounded border border-stone-200/80 space-y-1">
              <span className="font-semibold text-slate-900">Hardware & Medical Formulation:</span>
              <p>{activeDetailTreatment.technology}</p>
            </div>

            {/* Pre-Procedure Advice */}
            <div className="text-xs text-slate-500 border-t border-stone-200 pt-3">
              <em>Note:</em> An initial consultation with our dermatologist is mandatory to evaluate skin barrier integrity and exclude contraindications before procedural scheduling.
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                onClick={() => setActiveDetailTreatment(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeDetailTreatment.title;
                  setActiveDetailTreatment(null);
                  onBookTreatment(title);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors cursor-pointer"
              >
                Book for {activeDetailTreatment.categoryLabel}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
