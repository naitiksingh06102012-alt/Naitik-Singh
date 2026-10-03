import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_CASES, BeforeAfterCase } from '../data/clinicData';
import { Sparkles, Calendar, ChevronRight, Activity, Info } from 'lucide-react';

interface BeforeAfterSliderProps {
  onBookConsultation: (category?: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onBookConsultation }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase: BeforeAfterCase = BEFORE_AFTER_CASES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-16 md:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Documented Clinical Outcomes</span>
            <span aria-hidden="true">·</span>
            <span>Patna Patients</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Real Clinical Transformations with Measurable Dermatology Protocols.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Drag the comparison slider below to inspect clinical responses across acne scar subcision, 
            pigmentary clearance, and autologous follicular regrowth under high-magnification documentation.
          </p>
        </div>

        {/* Case Switcher Tabs (Functional buttons, styled cleanly) */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {BEFORE_AFTER_CASES.map((item, index) => {
            const isActive = index === activeCaseIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(index);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-950 border-stone-300 hover:border-slate-400'
                }`}
              >
                {item.category}: {item.title.split('&')[0]}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Comparison Slider Frame */}
          <div className="lg:col-span-7 space-y-3">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative h-80 sm:h-96 md:h-[420px] rounded-lg overflow-hidden select-none cursor-ew-resize border border-stone-300 shadow-sm bg-stone-900"
            >
              {/* After Layer (Base Layer) */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-slate-900 text-white">
                {/* Visual Representation of Treated Skin with Clinical Markings */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${activeCase.afterVisualColor} opacity-90`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="text-center font-display text-4xl text-white/50 tracking-widest font-light">
                    AFTER TREATMENT
                  </div>
                </div>

                {/* Subtle Grid and Clinical Marker simulation */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

                <div className="relative z-10 space-y-1">
                  <div className="inline-block text-xs font-semibold px-2 py-0.5 bg-emerald-950/80 text-emerald-200 border border-emerald-500/30 rounded">
                    {activeCase.afterLabel}
                  </div>
                  <div className="text-xs text-stone-200">{activeCase.description}</div>
                </div>
              </div>

              {/* Before Layer (Clipped by slider position) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden bg-stone-950 text-white select-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className="absolute inset-0 h-full flex flex-col justify-end p-6"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-tr ${activeCase.beforeVisualColor} opacity-95`} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="text-center font-display text-4xl text-white/50 tracking-widest font-light">
                      BASELINE STATUS
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

                  <div className="relative z-10 space-y-1">
                    <div className="inline-block text-xs font-semibold px-2 py-0.5 bg-rose-950/80 text-rose-200 border border-rose-500/30 rounded">
                      {activeCase.beforeLabel}
                    </div>
                    <div className="text-xs text-stone-300">Baseline before initiating procedural protocol</div>
                  </div>
                </div>
              </div>

              {/* Draggable Divider Line & Handle */}
              <div
                className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-900 shadow-md flex items-center justify-center text-xs font-bold pointer-events-auto">
                  ⇄
                </div>
              </div>

              {/* Top Instruction Pill */}
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] rounded flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-teal-400" />
                <span>Drag slider horizontally to compare</span>
              </div>
            </div>

            {/* Slider Range Input for Accessibility */}
            <div className="flex items-center gap-3 px-1 text-xs text-slate-500">
              <span>Baseline (Before)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
                aria-label="Comparison slider position"
              />
              <span>Treated (After)</span>
            </div>
          </div>

          {/* Clinical Case Dossier (Proof & Technical Breakdown) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-5">
            <div>
              <div className="text-xs text-teal-800 font-semibold tracking-wide uppercase">
                Case Study #{activeCaseIndex + 1}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                {activeCase.title}
              </h3>
            </div>

            {/* Clean Metadata (No Pills) */}
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 pb-3 border-b border-stone-100">
              <span className="font-medium text-slate-800">{activeCase.patientAgeGender}</span>
              <span aria-hidden="true">·</span>
              <span className="font-tabular">{activeCase.sessions}</span>
              <span aria-hidden="true">·</span>
              <span>{activeCase.timeframe} Duration</span>
            </div>

            {/* Procedure Summary */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="text-slate-500 font-medium">Protocol Executed:</div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200/70 font-medium text-slate-800">
                {activeCase.procedureDone}
              </div>
            </div>

            {/* Doctor Note */}
            <div className="space-y-1 text-xs text-slate-600 bg-teal-50/50 p-3 rounded border border-teal-100/60">
              <div className="flex items-center gap-1.5 text-teal-900 font-semibold mb-1">
                <Info className="w-3.5 h-3.5" />
                <span>Doctor's Clinical Observation:</span>
              </div>
              <p className="leading-relaxed">
                "{activeCase.clinicalNote}"
              </p>
              <div className="pt-2 text-[11px] text-teal-950 font-medium">
                Supervised by: {activeCase.doctorInCharge}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onBookConsultation(activeCase.category)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Consultation for {activeCase.category}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
