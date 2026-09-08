import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, GraduationCap, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center">
                  <img src="/assets/edunomo-logo.png" alt="Edunomo" className="h-7 w-auto object-contain" />
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white tracking-wider block leading-none">EDUNOMO</span>
                  <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">YOUR GLOBAL SERVICE PARTNER</span>
                </div>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Edunomo is the unified student mobility ecosystem guiding international scholars from university discovery and visa applications to air travel, campus arrival, and academic tutoring.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Verified Admissions Desk
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <Globe className="w-4 h-4" />
                Global Mobility Partner
              </span>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Core Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/study-abroad" className="hover:text-white transition-colors flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  Study Abroad (Primary)
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-white transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Visa Services
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition-colors">
                  Hotels & Living
                </Link>
              </li>
              <li>
                <Link to="/cabs" className="hover:text-white transition-colors">
                  Airport Cabs & Transit
                </Link>
              </li>
              <li>
                <Link to="/tuition" className="hover:text-white transition-colors">
                  Tuition & Tutors
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Journey */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Student Journey</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/my-journey" className="hover:text-white transition-colors">
                  My Journey Hub
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition-colors">
                  Track Applications
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Student Profile
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="hover:text-white transition-colors">
                  Notification Center
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Service Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Transparency</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Phase 1 interactive prototype. Study Abroad features full end-to-end local persistence. Secondary mobility modules feature preview capabilities.
            </p>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5 text-xs text-slate-400">
              <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
              <span className="hover:text-white cursor-pointer">Data Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Student Security Guarantee</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Edunomo Technologies Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for Global Student Mobility
          </p>
        </div>
      </div>
    </footer>
  );
};
