import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, GraduationCap } from 'lucide-react';

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

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/study-abroad" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Visa Assistance
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition-colors">
                  Hotels & Living
                </Link>
              </li>
              <li>
                <Link to="/cabs" className="hover:text-white transition-colors">
                  Cabs & Transfers
                </Link>
              </li>
              <li>
                <Link to="/tuition" className="hover:text-white transition-colors">
                  Tuition & Tutors
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  About Edunomo
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/partner/login" className="hover:text-white transition-colors text-blue-300 font-medium">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link to="/partner/login" className="hover:text-white transition-colors text-slate-400 text-xs">
                  Partner Portal (Agent / College / Tutor / Hotel)
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Account</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/applications" className="hover:text-white transition-colors">
                  My Applications
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider mt-6 mb-3">Support</h4>
            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <span className="hover:text-white cursor-pointer">Help & FAQ</span>
              <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <Link to="/admin/login" className="hover:text-white transition-colors text-indigo-300 mt-1">
                Admin Console
              </Link>
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
