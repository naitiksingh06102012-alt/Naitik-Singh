import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CLINIC_BRANCHES } from '../data/clinicData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAssessment }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Editorial Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight block">
              Patna Skin & Laser Clinic
            </a>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Advanced clinical dermatology, trichology, and medical laser therapies in Patna. 
              Founded and managed by AIIMS Patna & PMCH alumni dermatologists committed to evidence-based care and strict anti-steroid-misuse protocols.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Bihar Medical Council Reg: BMC-34190 & BMC-41805</span>
              </div>
              <div className="text-[11px] text-stone-500 pl-6">
                NABH Sterility Adherent Facility
              </div>
            </div>
          </div>

          {/* Treatments Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Specialized Procedures
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#treatments" className="hover:text-white transition-colors">Acne Scar Subcision & Cross TCA</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">US-FDA Triple-Wavelength Laser Hair Removal</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Q-Switched Laser Melasma Toning</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Autologous GFC Hair Restoration</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Original HydraFacial MD® Rejuvenation</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Radiofrequency Wart & Mole Ablation</a></li>
            </ul>
          </div>

          {/* Quick Links & Patient Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Patient Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  Book Consultation
                </button>
              </li>
              <li>
                <button onClick={onOpenAssessment} className="hover:text-white transition-colors text-left cursor-pointer">
                  60-Sec Skin Assessment
                </button>
              </li>
              <li><a href="#doctors" className="hover:text-white transition-colors">Doctor OPD Schedules</a></li>
              <li><a href="#before-after" className="hover:text-white transition-colors">Clinical Case Studies</a></li>
              <li><a href="#locations" className="hover:text-white transition-colors">Center Directions</a></li>
            </ul>
          </div>

          {/* Patna Centers Direct Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Patna Centers
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div>
                <strong className="text-stone-200 block">Boring Road Center</strong>
                <p className="text-[11px] text-stone-400">Grand Plaza, Opp. Pantaloons, Patna 800001</p>
                <a href="tel:+916122548920" className="text-teal-400 hover:underline font-tabular text-[11px] block mt-0.5">
                  Ph: 0612-254-8920
                </a>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <strong className="text-stone-200 block">Kankarbagh Center</strong>
                <p className="text-[11px] text-stone-400">Arogya Complex, Near Tiwary Bechar, Patna 800020</p>
                <a href="tel:+916122356114" className="text-teal-400 hover:underline font-tabular text-[11px] block mt-0.5">
                  Ph: 0612-235-6114
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Patna Skin & Laser Clinic. All medical rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Medical Disclaimer: Information on this site is educational and does not substitute in-person consultation with a doctor.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
