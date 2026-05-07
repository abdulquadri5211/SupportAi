import { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Settings2, 
  Layout, 
  Palette, 
  Eye, 
  Bot,
  Type,
  AlignLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  Save
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useWorkspace } from "@/hooks/use-workspace";
import { db } from "@/services/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { useActivityLogger } from "@/hooks/use-activity-logger";

export default function Chatbots() {
  const { workspace, isDemo } = useWorkspace();
  const { logAction } = useActivityLogger();
  const [activeTab, setActiveTab] = useState("appearance");
  const [isSaving, setIsSaving] = useState(false);
  const [isRetraining, setIsRetraining] = useState(false);
  const [config, setConfig] = useState({
    name: "SupportPilot Assistant",
    personality: "Helpful and concise",
    welcomeMessage: "Hi there! How can I help you today?",
    primaryColor: "#6366f1",
    position: "right",
    tone: "professional",
    fontFamily: "sans",
    borderRadius: "xl"
  });

  useEffect(() => {
    if (workspace?.settings) {
      setConfig((prev) => ({
        ...prev,
        ...workspace.settings,
        name: workspace.settings.chatbotName || prev.name,
      }));
    }
  }, [workspace]);

  const handlePublish = async () => {
    if (isDemo) return toast.error("Log in to save your changes.");
    if (!workspace) return;

    setIsSaving(true);
    try {
      await updateDoc(doc(db, "workspaces", workspace.id), {
        "settings.chatbotName": config.name,
        "settings.personality": config.personality,
        "settings.welcomeMessage": config.welcomeMessage,
        "settings.primaryColor": config.primaryColor,
        "settings.position": config.position,
        "settings.tone": config.tone,
        "updatedAt": serverTimestamp()
      });
      
      await logAction("chatbot_updated", `Updated chatbot: ${config.name}`);
      toast.success("Changes published to production!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetrain = () => {
    setIsRetraining(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        loading: 'AI is analyzing your knowledge base...',
        success: 'AI successfully re-trained for your workspace!',
        error: 'Training failed. Check your data sources.',
      }
    );
    setTimeout(() => setIsRetraining(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Chatbot Management</h1>
          <p className="text-zinc-500 text-sm">Configure and train your AI assistants.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#1F1F1F] text-white rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-all border border-zinc-700">
            Export Config
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSaving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Publishing..." : "Publish Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl overflow-hidden">
            <div className="flex border-b border-[#1F1F1F]">
              {[
                { id: "appearance", label: "Appearance", icon: Palette },
                { id: "personality", label: "Personality", icon: Bot },
                { id: "behavior", label: "Behavior", icon: Layout },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-4 text-xs font-mono uppercase tracking-widest transition-all",
                    activeTab === tab.id ? "text-indigo-400 bg-indigo-400/5 border-b-2 border-indigo-500" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8 space-y-8">
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Assistant Name</label>
                       <input 
                        type="text" 
                        value={config.name}
                        onChange={(e) => setConfig({...config, name: e.target.value})}
                        className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Brand Color</label>
                       <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={config.primaryColor}
                            onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                            className="w-11 h-11 rounded-lg bg-transparent border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={config.primaryColor}
                            onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                            className="flex-1 bg-[#141414] border border-[#1F1F1F] rounded-xl px-3 text-sm text-zinc-400 focus:outline-none"
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Welcome Message</label>
                    <textarea 
                      value={config.welcomeMessage}
                      onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white h-24 focus:outline-none focus:border-indigo-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Widget Position</label>
                      <div className="flex gap-2">
                        {["left", "right"].map((pos) => (
                          <button
                            key={pos}
                            onClick={() => setConfig({...config, position: pos as any})}
                            className={cn(
                              "flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all",
                              config.position === pos ? "bg-indigo-600 text-white" : "bg-[#141414] text-zinc-500 border border-[#1F1F1F]"
                            )}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Border Type</label>
                      <div className="flex gap-2">
                        {["none", "outline", "shadow"].map((t) => (
                           <button key={t} className="flex-1 py-2 rounded-lg text-xs font-bold uppercase bg-[#141414] text-zinc-500 border border-[#1F1F1F]">{t}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "personality" && (
                <div className="space-y-8">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-start gap-4">
                    <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-white">AI Template: Customer Support</p>
                      <p className="text-xs text-indigo-300 leading-relaxed">This template is optimized for speed and resolution accuracy. It uses a helpful, professional tone by default.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Assistant Tone</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Friendly", "Professional", "Aggressive", "Minimal"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setConfig({...config, tone: t.toLowerCase() as any})}
                          className={cn(
                            "p-3 rounded-xl border text-xs font-bold uppercase transition-all text-center",
                            config.tone === t.toLowerCase() 
                              ? "bg-indigo-600 border-indigo-500 text-white" 
                              : "border-[#1F1F1F] bg-[#141414] text-zinc-500"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Base Personality & Instructions</label>
                    <textarea 
                      value={config.personality}
                      onChange={(e) => setConfig({...config, personality: e.target.value})}
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white h-48 focus:outline-none focus:border-indigo-500/50 font-mono text-xs leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <h4 className="text-amber-500 font-bold mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Training Required
            </h4>
            <p className="text-xs text-amber-500/80">You have made changes to the personality. You must re-train the AI before these changes take effect for production users.</p>
            <button 
              onClick={handleRetrain}
              disabled={isRetraining}
              className="mt-4 px-4 py-2 bg-amber-500 text-black rounded-lg text-xs font-bold hover:bg-amber-600 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isRetraining && <Loader2 className="w-3 h-3 animate-spin" />}
              {isRetraining ? "Training AI..." : "Run Re-training (3 mins)"}
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
           <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 px-1">
              <Eye className="w-3.5 h-3.5" />
              Live Preview
           </div>

           <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-3xl h-[600px] shadow-2xl relative overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between" style={{ backgroundColor: config.primaryColor }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{config.name}</p>
                    <p className="text-[10px] text-white/70 font-semibold uppercase tracking-widest">Always online</p>
                  </div>
                </div>
                <div className="w-8 h-px bg-white/30"></div>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-500/20 shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-indigo-400" />
                   </div>
                   <div className="bg-[#141414] border border-[#1F1F1F] rounded-2xl p-4 max-w-[80%]">
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {config.welcomeMessage}
                      </p>
                   </div>
                </div>

                <div className="flex flex-row-reverse gap-3">
                   <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-500" />
                   </div>
                   <div className="bg-indigo-600 rounded-2xl p-4 max-w-[80%]">
                      <p className="text-xs text-white leading-relaxed">
                        I need help with my reservation.
                      </p>
                   </div>
                </div>

                <div className="flex gap-3 animate-pulse">
                   <div className="w-8 h-8 rounded-full bg-indigo-500/20 shrink-0 flex items-center justify-center text-indigo-400 text-xs">...</div>
                </div>
              </div>

              <div className="p-4 border-t border-[#1F1F1F]">
                <div className="flex items-center gap-2 bg-[#141414] border border-[#1F1F1F] p-3 rounded-2xl">
                  <input type="text" placeholder="Type a message..." className="bg-transparent text-xs text-white outline-none w-full" />
                  <button className="p-1.5 bg-indigo-600 rounded-lg">
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <p className="text-[9px] text-zinc-600 text-center mt-3 font-mono tracking-tighter">POWERED BY SUPPORTPILOT AI</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
