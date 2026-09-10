import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 lg:pb-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================== */}
        {/* DEDICATED "BECOME A PARTNER" HERO CTA BLOCK                           */}
        {/* ===================================================================== */}
        <div className="mb-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-r from-slate-800/95 via-blue-950/80 to-slate-800/95 border border-blue-500/25 shadow-xl relative overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Partner Ecosystem</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                Partner with Edunomo
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Join our global network of education consultants, universities, accommodation providers and transport operators.
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <Link to="/partner/login">
                <Button
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* FOOTER NAVIGATION COLUMNS                                             */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
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
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Edunomo is the unified student mobility ecosystem connecting education, international flights, visa assistance, verified stays, campus transit, and tutoring support in one integrated platform.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Verified Admissions Desk
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <Globe className="w-4 h-4" />
                Global Mobility Network
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
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
                  Visa
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/cabs" className="hover:text-white transition-colors">
                  Cabs
                </Link>
              </li>
              <li>
                <Link to="/tuition" className="hover:text-white transition-colors">
                  Tuition
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/partner/login" className="hover:text-white transition-colors text-sky-300 font-semibold flex items-center gap-1">
                  <span>Become a Partner</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="lg:col-span-2">
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
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Help / Contact
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              </li>
              <li className="pt-2">
                <Link to="/admin/login" className="hover:text-white transition-colors text-xs text-indigo-300 flex items-center gap-1">
                  <span>Admin Console</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
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
