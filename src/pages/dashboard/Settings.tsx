import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  Bell, 
  Key, 
  Globe, 
  Lock,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/constants";
import BillingDashboard from "@/components/dashboard/BillingDashboard";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const sidebarItems = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Keys", icon: Key },
    { id: "localization", label: "Localization", icon: Globe },
    { id: "security", label: "Security", icon: Lock },
    { id: "voice", label: "Voice AI (Beta)", icon: Smartphone },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Workspace Settings</h1>
        <p className="text-zinc-500 text-sm">Configure your global account and workspace preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                activeSection === item.id 
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", activeSection === item.id ? "rotate-90 opacity-100" : "opacity-0 group-hover:opacity-100")} />
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl p-8 min-h-[600px]">
          {activeSection === "billing" && <BillingDashboard />}
          
          {activeSection === "api" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">API Key Management</h3>
                <p className="text-sm text-zinc-500">Securely store and manage keys for Gemini and OpenAI models.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#141414] border border-[#1F1F1F] rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center">
                        <Key className="w-4 h-4 text-blue-400" />
                       </div>
                       <span className="font-bold text-sm text-white">Gemini API Key</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">ACTIVE</span>
                  </div>
                  <div className="relative group">
                    <input 
                      type="password" 
                      value="********************************" 
                      readOnly 
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg p-3 text-sm text-zinc-500 font-mono"
                    />
                    <button className="absolute right-3 top-2.5 text-xs font-bold text-indigo-400 hover:text-indigo-300">Edit</button>
                  </div>
                  <p className="mt-3 text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest font-mono">ENCRYPTED AT REST • UPDATED 2 DAYS AGO</p>
                </div>

                <div className="p-6 bg-[#141414] border border-[#1F1F1F] rounded-2xl opacity-50">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-zinc-500/10 rounded flex items-center justify-center">
                          <Key className="w-4 h-4 text-zinc-400" />
                         </div>
                         <span className="font-bold text-sm text-white">OpenAI API Key (GPT-4o)</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-500/10 px-2 py-0.5 rounded border border-zinc-500/20 uppercase tracking-widest whitespace-nowrap">NOT CONFIGURED</span>
                   </div>
                   <button className="w-full py-3 bg-[#1F1F1F] border border-zinc-700 rounded-xl text-xs font-bold text-white hover:bg-zinc-800 transition-all">Add OpenAI Key</button>
                </div>
              </div>

              <div className="pt-8 border-t border-[#1F1F1F]">
                 <div className="flex items-start gap-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-white">Rate Limits & Quota</p>
                      <p className="text-xs text-indigo-300 leading-relaxed">Your current plan includes 1,000,000 tokens/mo. You have used 12% of your monthly quota.</p>
                      <button className="mt-2 text-xs font-bold underline underline-offset-4 text-indigo-400">View Usage Dashboard</button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeSection === "localization" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Multilingual Settings</h3>
                <p className="text-sm text-zinc-500">Configure supported languages and translation preferences.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LANGUAGES.map((lang) => (
                  <div key={lang.code} className="p-4 bg-[#141414] border border-[#1F1F1F] rounded-xl flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center text-xs font-bold">
                        {lang.code.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{lang.name}</p>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">{lang.dir}</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#1F1F1F] flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                       <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-[#1F1F1F] space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#1F1F1F] rounded-2xl">
                   <div>
                    <p className="text-sm font-bold text-white">Auto-Translate Messages</p>
                    <p className="text-xs text-zinc-500">Automatically detect and translate incoming customer messages.</p>
                   </div>
                   <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#1F1F1F] rounded-2xl">
                   <div>
                    <p className="text-sm font-bold text-white">RTL Layout Support</p>
                    <p className="text-xs text-zinc-500">Enable right-to-left UI adjustments for Arabic and Hebrew.</p>
                   </div>
                   <div className="w-12 h-6 bg-[#1F1F1F] rounded-full relative cursor-pointer border border-[#1F1F1F]">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-500 rounded-full shadow-md"></div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "general" && (
             <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">General Settings</h3>
                  <p className="text-sm text-zinc-500">Basic information about your SupportPilot workspace.</p>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Workspace Name</label>
                      <input type="text" defaultValue="SupportPilot AI" className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Support Email</label>
                      <input type="email" defaultValue="support@supportpilot.ai" className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Timezone</label>
                      <select className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white outline-none">
                         <option>UTC (Coordinated Universal Time)</option>
                         <option>EST (Eastern Standard Time)</option>
                         <option>PST (Pacific Standard Time)</option>
                      </select>
                   </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                    Save Changes
                  </button>
                </div>
             </div>
          )}

          {activeSection === "voice" && (
            <div className="space-y-8">
               <div className="p-8 bg-indigo-900/20 border border-indigo-500/30 rounded-3xl text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Voice AI is coming soon</h3>
                  <p className="text-sm text-indigo-300 max-w-sm mx-auto mb-8">We are building high-fidelity voice assistants for phone systems and real-time live chat. Stay tuned!</p>
                  
                  <div className="flex flex-col gap-4 max-w-xs mx-auto">
                     <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all">Join Waitlist</button>
                     <a href="#" className="text-xs font-bold text-indigo-400 hover:underline flex items-center justify-center gap-2">
                        View Roadmap <ExternalLink className="w-3 h-3" />
                     </a>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50">
                  <div className="p-6 bg-[#141414] border border-[#1F1F1F] rounded-2xl">
                     <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">STT Pipeline</p>
                     <div className="w-full h-1 bg-[#1F1F1F] rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-indigo-500 w-[40%]"></div>
                     </div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase">Development in progress</p>
                  </div>
                  <div className="p-6 bg-[#141414] border border-[#1F1F1F] rounded-2xl">
                     <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">TTS Synthesis</p>
                     <div className="w-full h-1 bg-[#1F1F1F] rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-indigo-500 w-[25%]"></div>
                     </div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase">Research phase</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
