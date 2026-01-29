
import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [isHovered, setIsHovered] = useState(false);

  const isCollapsed = !isHovered;

  const navItems = [
    { path: '/', label: t.nav.home, icon: '🏠' },
    { path: '/analytics', label: 'Analytics', icon: '📊' },
    { path: '/community', label: t.nav.community, icon: '👥' },
    { path: '/mock-test', label: t.nav.mock, icon: '📝' },
    { path: '/listening', label: t.nav.listen, icon: '🎧' },
    { path: '/reading', label: t.nav.read, icon: '📖' },
    { path: '/writing', label: t.nav.write, icon: '✍️' },
    { path: '/speaking', label: t.nav.speak, icon: '🗣️' },
    { path: '/vocab', label: t.nav.vocab, icon: '🔤' },
  ];

  return (
    <div className={`flex h-screen overflow-hidden relative ${theme} transition-colors duration-700`}>
      {/* Dynamic Background Blobs */}
      <div className="blob top-[-100px] left-[-100px] opacity-20 dark:opacity-30 bg-primary/40"></div>
      <div className="blob bottom-[-200px] right-[-100px] bg-blue-600/20 opacity-20"></div>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-[#0a0a14]/90 backdrop-blur-lg border-b dark:border-white/5 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-vivid-blue rounded-xl flex items-center justify-center shadow-lg shadow-vivid-blue/20">
            <svg className="size-5 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-lg font-black tracking-tight dark:text-white text-slate-900 uppercase">LinguaMind</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="size-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center dark:text-amber-400 text-slate-600"
        >
          <span className="material-symbols-outlined text-xl font-bold">
            {theme === 'dark' ? 'sunny' : 'nightlight'}
          </span>
        </button>
      </div>

      {/* Sidebar - Modern Floating Panel */}
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-2rem)] my-4 ml-4 glass-card z-[70] transition-all duration-500 ease-in-out rounded-[2.5rem] shadow-2xl border border-white/10 ${isCollapsed ? 'w-24' : 'w-64'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-full flex flex-col py-6 overflow-hidden">
          {/* Logo Area */}
          <div className="w-full flex items-center px-6 mb-8 shrink-0">
            <div className="w-12 h-12 bg-vivid-blue rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(13,127,242,0.4)] shrink-0 transition-transform hover:scale-110">
              <svg className="size-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            {!isCollapsed && (
              <h1 className="ml-4 text-xl font-black tracking-tighter dark:text-white text-slate-900 uppercase animate-in fade-in slide-in-from-left-4 duration-500 whitespace-nowrap">
                LinguaMind
              </h1>
            )}
          </div>

          {/* Navigation drawer */}
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center rounded-2xl transition-all duration-300 group h-[56px] relative ${isActive
                    ? 'bg-vivid-blue text-white shadow-lg'
                    : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  <div className="w-16 flex items-center justify-center shrink-0">
                    <span className={`text-2xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                  </div>
                  {!isCollapsed && (
                    <p className="text-sm font-black tracking-tight animate-in fade-in duration-500 whitespace-nowrap overflow-hidden uppercase text-[10px] tracking-widest">
                      {item.label}
                    </p>
                  )}
                  {isActive && <div className="absolute left-1 w-1 h-6 bg-white/40 rounded-full"></div>}
                </Link>
              );
            })}
          </nav>

          {/* Utility Dock - Fixed Layout */}
          <div className="mt-auto pt-6 border-t dark:border-white/5 border-black/5 flex flex-col items-center gap-4 px-4">
            {/* Profile */}
            <button
              onClick={() => navigate('/profile')}
              className={`flex items-center rounded-2xl transition-all duration-300 group h-[56px] w-full ${location.pathname === '/profile' ? 'bg-vivid-blue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <div className="w-16 flex items-center justify-center shrink-0">
                <span className="text-2xl">👤</span>
              </div>
              {!isCollapsed && <span className="text-[10px] font-black tracking-widest uppercase animate-in fade-in duration-500">Profile</span>}
            </button>

            {/* Language Dock */}
            <div className="flex flex-col gap-1 w-full dark:bg-black/40 bg-slate-100 rounded-3xl p-1 border dark:border-white/5 border-black/5">
              <button
                onClick={() => setLanguage(Language.EN)}
                className={`w-full h-10 rounded-2xl flex items-center transition-all ${language === Language.EN ? 'bg-vivid-blue text-white shadow-md' : 'text-slate-500 hover:bg-white/5'}`}
              >
                <div className="w-14 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black tracking-widest">EN</span>
                </div>
                {!isCollapsed && <span className="text-[10px] font-black tracking-widest uppercase animate-in fade-in duration-500">English</span>}
              </button>
              <button
                onClick={() => setLanguage(Language.TR)}
                className={`w-full h-10 rounded-2xl flex items-center transition-all ${language === Language.TR ? 'bg-vivid-blue text-white shadow-md' : 'text-slate-500 hover:bg-white/5'}`}
              >
                <div className="w-14 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black tracking-widest">TR</span>
                </div>
                {!isCollapsed && <span className="text-[10px] font-black tracking-widest uppercase animate-in fade-in duration-500">Türkçe</span>}
              </button>
            </div>

            {/* Theme Switcher - Vivid Redesign */}
            <button
              onClick={toggleTheme}
              className={`w-full h-14 rounded-2xl flex items-center transition-all group ${theme === 'dark'
                ? 'text-slate-500 hover:text-amber-400 hover:bg-white/5'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-200'
                }`}
            >
              <div className="w-16 flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined text-2xl font-bold transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${theme === 'dark' ? 'group-hover:text-amber-400' : 'group-hover:text-indigo-600'
                  }`}>
                  {theme === 'dark' ? 'sunny' : 'nightlight'}
                </span>
              </div>
              {!isCollapsed && (
                <span className="text-[10px] font-black tracking-widest uppercase animate-in fade-in duration-500">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Glassmorphism */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-[100] bg-white/80 dark:bg-[#121418]/90 backdrop-blur-xl border-t dark:border-white/5 border-slate-200 safe-area-bottom">
        <div className="flex items-center justify-between px-6 py-4 overflow-x-auto no-scrollbar gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${isActive ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                <span className="text-2xl">{item.icon}</span>
                {isActive && <div className="size-1 rounded-full bg-vivid-blue"></div>}
              </Link>
            )
          })}
          {/* Mobile Profile Icon */}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 min-w-[3rem] transition-all ${location.pathname === '/profile' ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-100'}`}
          >
            <span className="text-2xl">👤</span>
            {location.pathname === '/profile' && <div className="size-1 rounded-full bg-vivid-blue"></div>}
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative md:p-4 p-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto custom-scrollbar h-full md:rounded-[2.5rem] rounded-none md:pb-0 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
