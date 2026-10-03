import React, { useState } from 'react';
import { CLINIC_BRANCHES, ClinicBranch } from '../data/clinicData';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar, Car, Shield } from 'lucide-react';

interface LocationsSectionProps {
  onBookBranch: (branchId: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onBookBranch }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('boring-road');
  const activeBranch = CLINIC_BRANCHES.find(b => b.id === selectedBranchId) || CLINIC_BRANCHES[0];

  return (
    <section id="locations" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            <span>Clinic Network & Accessibility</span>
            <span aria-hidden="true">·</span>
            <span>Patna Central & South</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Two Prime Clinics in Patna with Dedicated Parking & Lift Access.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Conveniently situated along major transit corridors in Boring Road and Kankarbagh, 
            both clinics are fully equipped with matching clinical laser suites and on-site pharmacy.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex items-center gap-2 mb-8">
          {CLINIC_BRANCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-colors cursor-pointer border ${
                selectedBranchId === b.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border-stone-300'
              }`}
            >
              {b.name} ({b.area.split(',')[0]})
            </button>
          ))}
        </div>

        {/* Location Spotlight Card */}
        <div className="bg-white rounded-lg border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <div className="text-xs font-semibold text-teal-800 uppercase tracking-wide">
                  {activeBranch.area}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activeBranch.name}
                </h3>
              </div>

              {/* Address */}
              <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-900">{activeBranch.address}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Landmark: {activeBranch.landmark}</div>
                  </div>
                </div>
              </div>

              {/* Timings */}
              <div className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-stone-100">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">OPD Timings</div>
                    <div className="text-slate-600 mt-0.5">Monday to Saturday: {activeBranch.hours.weekdays}</div>
                    <div className="text-slate-500 mt-0.5">Sunday: {activeBranch.hours.sunday}</div>
                  </div>
                </div>
              </div>

              {/* Transit & Parking Notes */}
              <div className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-stone-100">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Parking & Accessibility</div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{activeBranch.directions}</p>
                  </div>
                </div>
              </div>

              {/* Direct Contacts & Actions */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onBookBranch(activeBranch.id)}
                  className="py-2.5 px-5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-950 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book at {activeBranch.name.split(' ')[0]}</span>
                </button>

                <a
                  href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`}
                  className="py-2.5 px-4 text-xs font-medium text-slate-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span className="font-tabular">{activeBranch.phone}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeBranch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 text-xs font-medium text-teal-800 hover:text-teal-950 flex items-center gap-1"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Map/Visual Mockup Column */}
            <div className="lg:col-span-5 bg-stone-100 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Interactive Landmark Map</span>
                  <span className="font-tabular text-[11px] text-teal-800">
                    Lat {activeBranch.mapCoordinates.lat.toFixed(4)}, Lng {activeBranch.mapCoordinates.lng.toFixed(4)}
                  </span>
                </div>

                {/* Stylized Map View */}
                <div className="h-60 rounded bg-stone-200 relative overflow-hidden border border-stone-300 flex items-center justify-center p-4">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Road representations */}
                  <div className="absolute w-full h-3 bg-stone-300/80 rotate-12 -top-2 left-0" />
                  <div className="absolute w-full h-4 bg-stone-300/90 -rotate-6 bottom-8 left-0" />
                  <div className="absolute h-full w-4 bg-stone-300/90 rotate-45 left-1/3 top-0" />

                  {/* Marker Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      <MapPin className="w-5 h-5 text-teal-300" />
                    </div>
                    <div className="mt-1 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded shadow-xs border border-stone-200 text-[11px] font-bold text-slate-900 whitespace-nowrap">
                      {activeBranch.name}
                    </div>
                    <div className="text-[10px] text-slate-600 bg-stone-50/90 px-1.5 py-0.5 rounded mt-0.5 border border-stone-200">
                      {activeBranch.landmark}
                    </div>
                  </div>

                  {/* Patna Neighborhood context labels */}
                  <div className="absolute top-2 left-2 text-[10px] font-semibold text-slate-400 uppercase">
                    Patna Metro Zone
                  </div>
                </div>

                {/* Patient Guidance Notice */}
                <div className="p-3 bg-white rounded border border-stone-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-900">Pre-Visit Reception Assistance</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    First-time patients are encouraged to arrive 10 minutes ahead of scheduled time for initial digital skin history profiling.
                  </p>
                </div>
              </div>

              <div className="pt-4 text-xs text-slate-500 flex items-center justify-between">
                <span>Emergency Dermatology Helpline:</span>
                <a href={`tel:${activeBranch.emergencyPhone}`} className="font-bold text-slate-900 font-tabular hover:underline">
                  +91 94310 28419
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
