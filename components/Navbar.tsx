
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';

interface Props {
  onLogoClick?: () => void;
}

const Navbar: React.FC<Props> = ({ onLogoClick }) => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Fix #11: Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">WE Learn</span>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-6">
          {/* Auth Button */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-slate-100 p-1 rounded-full transition-colors"
              >
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=F0FDFA&color=0D9488`}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border border-slate-200"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden py-1 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm text-slate-900 font-medium truncate">{user.displayName}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-slate-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
