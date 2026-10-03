import React, { useState } from 'react';
import { X, ArrowRight, Check, AlertCircle, Sparkles, Stethoscope, ChevronLeft, ShieldAlert } from 'lucide-react';

interface SkinAssessmentQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (assessmentData: {
    concern: string;
    doctorRecommendation: string;
    notes: string;
  }) => void;
}

export const SkinAssessmentQuiz: React.FC<SkinAssessmentQuizProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState('');
  const [duration, setDuration] = useState('');
  const [priorTreatments, setPriorTreatments] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [skinType, setSkinType] = useState('');

  if (!isOpen) return null;

  const handleTogglePriorTreatment = (item: string) => {
    if (priorTreatments.includes(item)) {
      setPriorTreatments(priorTreatments.filter(t => t !== item));
    } else {
      setPriorTreatments([...priorTreatments, item]);
    }
  };

  const handleToggleSymptom = (item: string) => {
    if (symptoms.includes(item)) {
      setSymptoms(symptoms.filter(s => s !== item));
    } else {
      setSymptoms([...symptoms, item]);
    }
  };

  // Determine preliminary triage & recommended specialist
  const getTriageResult = () => {
    const isHair = concern.includes('Hair');
    const isPigmentOrLaser = concern.includes('Melasma') || concern.includes('Unwanted');
    const hasSteroidExposure = priorTreatments.some(t => t.toLowerCase().includes('steroid') || t.toLowerCase().includes('triple'));

    const recommendedDoctor = (isHair || isPigmentOrLaser) 
      ? 'Dr. Priya N. Sinha (Laser & Scalp Specialist)'
      : 'Dr. Saurabh Verma, MD (Clinical Dermatology & Scars)';

    let guidance = '';
    if (hasSteroidExposure) {
      guidance = 'High caution: Prior use of over-the-counter triple combination or steroid creams (like Betnovate/Panderm) requires gradual steroid withdrawal under dermatological supervision to avoid intense rebound flare-ups.';
    } else if (isHair) {
      guidance = 'Recommended protocol: High-resolution digital trichoscopy scalp mapping to evaluate follicular miniaturization ratio, followed by targeted Autologous GFC therapy.';
    } else if (concern.includes('Acne')) {
      guidance = 'Recommended protocol: Subcision for fibrotic tethered scars, followed by non-comedogenic medical prescription and Fractional RF / Blue Light therapy.';
    } else {
      guidance = 'Recommended protocol: Comprehensive wood’s lamp / polarized dermoscopy evaluation to map epidermal versus dermal depth before initiating laser toning or medical peels.';
    }

    return {
      recommendedDoctor,
      guidance,
      hasSteroidExposure
    };
  };

  const triage = getTriageResult();

  const handleComplete = () => {
    const notes = `Online Assessment: Concern: ${concern} (${duration}) | Prior treatments: ${priorTreatments.join(', ') || 'None'} | Symptoms: ${symptoms.join(', ') || 'None'} | Skin Type: ${skinType}`;
    onProceedToBooking({
      concern,
      doctorRecommendation: triage.recommendedDoctor,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-xl w-full border border-stone-300 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Clinical Triage Tool
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              60-Second Skin & Scalp Assessment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (Clean typography) */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium pb-2 border-b border-stone-100">
          <span>Question {step} of 4</span>
          <span className="font-tabular text-slate-400">{Math.round((step / 4) * 100)}% Completed</span>
        </div>

        {/* Step 1: Concern Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
              1. What is your primary dermatological or hair concern?
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                'Active Acne & Pitted Scars (Pimples, Ice-pick marks)',
                'Melasma, Dark Patches & Stubborn Pigmentation',
                'Excessive Hair Fall, Thinning Scalp & Receding Hairline',
                'Unwanted Facial Hair / Chin Hirsutism (PCOS related)',
                'Chronic Skin Rash, Eczema, Psoriasis or Intense Itching',
                'Dullness, Open Pores & Fine Texture Irregularities'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setConcern(item)}
                  className={`w-full p-3 text-left text-xs sm:text-sm rounded border transition-all cursor-pointer flex items-center justify-between ${
                    concern === item
                      ? 'border-slate-900 bg-stone-50 font-semibold text-slate-950'
                      : 'border-stone-200 hover:border-stone-300 text-slate-700'
                  }`}
                >
                  <span>{item}</span>
                  {concern === item && <Check className="w-4 h-4 text-slate-900 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                disabled={!concern}
                onClick={() => setStep(2)}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Duration */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
              2. How long have you been experiencing this issue?
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                'Less than 1 month (Acute sudden flare-up)',
                '1 to 6 months (Recent developing problem)',
                '6 months to 2 years (Persistent condition)',
                'More than 2 years (Chronic long-term struggle)'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setDuration(item)}
                  className={`w-full p-3 text-left text-xs sm:text-sm rounded border transition-all cursor-pointer flex items-center justify-between ${
                    duration === item
                      ? 'border-slate-900 bg-stone-50 font-semibold text-slate-950'
                      : 'border-stone-200 hover:border-stone-300 text-slate-700'
                  }`}
                >
                  <span>{item}</span>
                  {duration === item && <Check className="w-4 h-4 text-slate-900 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                disabled={!duration}
                onClick={() => setStep(3)}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Prior Treatments & Steroid Exposure */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                3. Have you applied any of the following recently?
              </h4>
              <p className="text-xs text-slate-500 mt-1">Select all that apply.</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                'Over-the-counter steroid creams (Betnovate, Panderm, Dermikem, Skinlite)',
                'Home remedies (Lemon, baking soda, raw turmeric, garlic paste)',
                'Salon facials, bleach, or unguided cosmetic chemical peels',
                'Past doctor prescriptions (Antibiotics / Isotretinoin / Minoxidil)',
                'None of the above (Only gentle face wash / moisturizer)'
              ].map((item) => {
                const isSelected = priorTreatments.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => handleTogglePriorTreatment(item)}
                    className={`w-full p-2.5 text-left text-xs sm:text-sm rounded border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50/50 font-semibold text-teal-950'
                        : 'border-stone-200 hover:border-stone-300 text-slate-700'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <Check className="w-4 h-4 text-teal-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                disabled={priorTreatments.length === 0}
                onClick={() => setStep(4)}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Symptoms & Skin Type */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                4. What symptoms are you currently experiencing?
              </h4>
              <p className="text-xs text-slate-500 mt-1">Select current physical sensations.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {[
                'Burning or stinging sensation',
                'Severe itching (Pruritus)',
                'Flaking or extreme dry peeling',
                'Pus-filled red bumps',
                'Sun sensitivity / Redness',
                'No pain / Purely cosmetic'
              ].map((sym) => {
                const isSelected = symptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    onClick={() => handleToggleSymptom(sym)}
                    className={`p-2.5 text-left rounded border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-slate-900 bg-stone-50 font-semibold text-slate-950'
                        : 'border-stone-200 hover:border-stone-300 text-slate-700'
                    }`}
                  >
                    <span>{sym}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-900 block mb-1.5">
                Skin Type:
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {['Oily', 'Dry', 'Combination', 'Sensitive'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSkinType(t)}
                    className={`py-2 px-2 text-center rounded border transition-all cursor-pointer ${
                      skinType === t
                        ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                        : 'border-stone-200 text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(3)}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                disabled={symptoms.length === 0 || !skinType}
                onClick={() => setStep(5)}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Clinical Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Triage Summary & Transfer to Booking */}
        {step === 5 && (
          <div className="space-y-5">
            <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-950 uppercase tracking-wide">
                <Stethoscope className="w-4 h-4 text-teal-700" />
                <span>Preliminary Clinical Assessment</span>
              </div>
              <h4 className="font-display text-base font-bold text-slate-900">
                {concern.split('(')[0]}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {triage.guidance}
              </p>
            </div>

            {triage.hasSteroidExposure && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded flex items-start gap-2 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Pre-Consultation Warning:</strong> Stop applying any pharmacy steroid tubes at least 5 days before your clinic visit. Do not apply makeup on the day of dermoscopy.
                </div>
              </div>
            )}

            {/* Recommended Consultant */}
            <div className="p-3.5 bg-stone-50 rounded border border-stone-200 text-xs space-y-1">
              <span className="text-slate-500 font-medium">Recommended Consulting Dermatologist:</span>
              <div className="font-semibold text-slate-900 text-sm">
                {triage.recommendedDoctor}
              </div>
              <div className="text-slate-500 text-[11px]">
                Available at Boring Road (Mon/Wed/Fri) & Kankarbagh (Tue/Thu/Sat)
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleComplete}
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Book Slot with Triage Notes Pre-filled</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800 text-center cursor-pointer"
              >
                Dismiss Assessment
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
