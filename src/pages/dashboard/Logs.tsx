import { useState, useEffect } from "react";
import { 
  Terminal, 
  Search, 
  Download, 
  Shield, 
  Zap, 
  MessageSquare, 
  Users,
  Settings as SettingsIcon,
  ChevronRight,
  Filter,
  History as HistoryIcon,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/use-workspace";
import { db } from "@/services/firebase";
import { collection, query, where, orderBy, limit, onSnapshot, Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

interface LogEntry {
  id: string;
  action: string;
  details: string;
  userEmail: string;
  type: string;
  timestamp: Timestamp;
}

const typeMap: Record<string, any> = {
  onboarding_complete: { icon: Zap, color: "text-amber-400" },
  chatbot_updated: { icon: MessageSquare, color: "text-violet-400" },
  settings_changed: { icon: SettingsIcon, color: "text-zinc-400" },
  auth_event: { icon: Shield, color: "text-indigo-400" },
  default: { icon: Zap, color: "text-indigo-400" }
};

export default function Logs() {
  const { workspace, isDemo } = useWorkspace();
  const [logsList, setLogsList] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo || !workspace) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "activity_logs"),
      where("workspaceId", "==", workspace.id),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LogEntry[];
      setLogsList(logs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [workspace, isDemo]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
             <Terminal className="w-7 h-7 text-indigo-500" />
             Activity Logs
          </h1>
          <p className="text-zinc-500 text-sm">Full audit trail of all workspace actions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] border border-zinc-700 rounded-lg text-xs font-bold text-white hover:bg-zinc-800 transition-all">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 bg-[#0F0F0F] border border-[#1F1F1F] p-4 rounded-2xl">
        <div className="flex items-center gap-2 bg-[#141414] border border-[#1F1F1F] px-4 py-2.5 rounded-xl w-full lg:max-w-md">
          <Search className="w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by action, user or details..." 
            className="bg-transparent text-sm text-white outline-none w-full placeholder:text-zinc-700"
          />
        </div>
        
        <div className="h-4 w-px bg-[#1F1F1F] hidden lg:block mx-1"></div>

        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#1F1F1F] rounded-lg text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white">
              <Filter className="w-3 h-3" />
              Filter by Type
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#1F1F1F] rounded-lg text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white">
              <History className="w-3 h-3" />
              Reset
           </button>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-sm font-mono uppercase tracking-widest">Accessing Audit Trail...</p>
          </div>
        ) : (isDemo ? [
          { id: "DEMO-1", action: "Demo Activity", details: "You are viewing the platform in demo mode. Create an account to log real actions.", userEmail: "guest@supportpilot.ai", timestamp: Timestamp.now(), type: "default" },
          { id: "DEMO-2", action: "Widget Configuration", details: "Simulated UI interaction for demonstration purposes.", userEmail: "guest@supportpilot.ai", timestamp: Timestamp.now(), type: "chatbot_updated" }
        ] : logsList).map((log) => {
          const typeInfo = typeMap[log.type] || typeMap.default;
          return (
            <div key={log.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl hover:border-zinc-700 transition-colors group">
              <div className="lg:col-span-1 flex justify-center">
                 <div className={cn("w-10 h-10 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center justify-center", typeInfo.color)}>
                    <typeInfo.icon className="w-5 h-5" />
                 </div>
              </div>

              <div className="lg:col-span-3">
                 <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    {log.timestamp ? formatDistanceToNow(log.timestamp.toDate(), { addSuffix: true }) : "just now"}
                 </p>
                 <p className="text-sm font-bold text-white tracking-tight">{log.action}</p>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                 <p className="text-xs text-zinc-400 leading-relaxed">{log.details}</p>
              </div>

              <div className="lg:col-span-2 flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-zinc-800 border border-[#1F1F1F] flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-zinc-500" />
                 </div>
                 <span className="text-xs font-medium text-zinc-300 truncate max-w-[120px]">{log.userEmail}</span>
              </div>

              <div className="lg:col-span-1 flex justify-end">
                 <button className="p-2 text-zinc-600 hover:text-white transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center pt-4">
         <button className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 hover:text-indigo-300 transition-colors font-bold">
            Load More Activity
         </button>
      </div>
    </div>
  );
}

function History({ className }: { className?: string }) {
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
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
