import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Ticket, 
  MessageSquare, 
  Users, 
  Settings, 
  History, 
  Bell, 
  Search,
  User,
  LogOut,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/constants";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Chatbots", href: "/chatbots", icon: MessageSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Logs", href: "/logs", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ isDemo }: { isDemo?: boolean }) {
  const location = useLocation();
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans">
      {isDemo && (
        <div className="fixed top-0 left-0 w-full h-1 bg-indigo-600 z-[100] animate-pulse"></div>
      )}
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#0F0F0F] border-r border-[#1F1F1F] hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-lg">S</div>
            <span className="font-bold text-xl tracking-tight">SupportPilot</span>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all text-zinc-400 hover:text-white hover:bg-white/5",
                    active && "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {isDemo ? (
          <div className="mt-auto p-4 border-t border-[#1F1F1F] bg-indigo-600/5">
             <p className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest mb-3 text-center">DEMO MODE ACTIVE</p>
             <Link to="/login" className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                Create Real Account
             </Link>
          </div>
        ) : (
          <div className="mt-auto p-4 border-t border-[#1F1F1F]">
            <button 
              onClick={() => signOut(auth)}
              className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={cn("flex flex-col min-h-screen", "md:pl-64")}>
        {/* Header */}
        <header className="h-16 border-b border-[#1F1F1F] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-[#141414] border border-[#1F1F1F] px-3 py-1.5 rounded-lg w-full max-w-md">
            <Search className="w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search tickets, logs..." 
              className="bg-transparent text-sm outline-none w-full placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group relative">
               <button className="p-2 text-zinc-400 hover:text-white flex items-center gap-2">
                 <Globe className="w-4 h-4" />
                 <span className="text-[10px] uppercase font-bold tracking-widest">{i18n.language.split('-')[0]}</span>
               </button>
               <div className="absolute top-full right-0 mt-2 w-40 bg-[#141414] border border-[#1F1F1F] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] overflow-hidden">
                  {LANGUAGES.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "w-full px-4 py-2 text-left text-xs font-medium hover:bg-indigo-600 transition-colors flex items-center justify-between",
                        i18n.language === lang.code ? "text-indigo-400" : "text-zinc-400"
                      )}
                    >
                      {lang.name}
                      <span className="text-[10px] opacity-50 uppercase">{lang.code}</span>
                    </button>
                  ))}
               </div>
            </div>

            <button className="p-2 text-zinc-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0A0A0A]"></span>
            </button>
            <div className="h-8 w-px bg-[#1F1F1F]"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold">User Profile</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Owner</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-[#1F1F1F] flex items-center justify-center overflow-hidden">
                <User className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
