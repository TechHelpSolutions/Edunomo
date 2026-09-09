import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, MapPin, Bell, User } from 'lucide-react';
import { notificationService } from '../../services/notificationService';

export const BottomNav: React.FC = () => {
  const unreadCount = notificationService.getUnreadCount();

  const navItems = [
    { label: 'Home', path: '/', icon: Home, badge: null },
    { label: 'Explore', path: '/explore', icon: Compass, badge: null },
    { label: 'My Services', path: '/my-journey', icon: MapPin, badge: null },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { label: 'Profile', path: '/profile', icon: User, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 lg:hidden shadow-lg pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center relative py-1 text-center select-none transition-colors ${
                  isActive ? 'text-[#0D2A68]' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <div
                      className={`p-1 rounded-xl transition-transform duration-150 ${
                        isActive ? 'scale-110 bg-blue-50 text-[#0D2A68]' : ''
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
                    </div>

                    {/* Badge */}
                    {item.badge !== null && (
                      <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[10px] tracking-tight mt-0.5 transition-all ${
                      isActive ? 'font-bold text-[#0D2A68]' : 'font-medium text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#0D2A68] mt-0.5 absolute bottom-1" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
