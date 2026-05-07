import { useState, useEffect } from "react";
import { 
  Users, 
  MessageSquare, 
  Ticket, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Filter,
  Download,
  Loader2
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { auth, db } from "@/services/firebase";
import ConversionModal from "@/components/ConversionModal";
import { useWorkspace } from "@/hooks/use-workspace";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";

const demoData = [
  { name: "Mon", tickets: 12, resolved: 8 },
  { name: "Tue", tickets: 19, resolved: 14 },
  { name: "Wed", tickets: 15, resolved: 12 },
  { name: "Thu", tickets: 22, resolved: 18 },
  { name: "Fri", tickets: 30, resolved: 25 },
  { name: "Sat", tickets: 10, resolved: 9 },
  { name: "Sun", tickets: 8, resolved: 7 },
];

export default function Overview() {
  const { workspace, isDemo } = useWorkspace();
  const [showConversion, setShowConversion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedToday: 0,
    teamSize: 0,
    activeChatbots: 1,
    resolutionRate: 0
  });

  useEffect(() => {
    if (isDemo) {
      setStatsData({
        totalTickets: 1284,
        openTickets: 124,
        resolvedToday: 256,
        teamSize: 12,
        activeChatbots: 8,
        resolutionRate: 94
      });
      setLoading(false);
      
      const timer = setTimeout(() => setShowConversion(true), 30000);
      return () => clearTimeout(timer);
    }

    if (!workspace) return;

    // Real-time listeners for stats
    const ticketsQuery = query(collection(db, "tickets"), where("workspaceId", "==", workspace.id));
    const usersQuery = query(collection(db, "users"), where("workspaceId", "==", workspace.id));

    const unsubscribeTickets = onSnapshot(ticketsQuery, (snapshot) => {
      const tickets = snapshot.docs;
      const total = tickets.length;
      const open = tickets.filter(d => d.data().status === "open").length;
      const resolved = tickets.filter(d => d.data().status === "resolved").length;
      
      setStatsData(prev => ({
        ...prev,
        totalTickets: total,
        openTickets: open,
        resolvedToday: tickets.filter(d => {
          const ts = d.data().updatedAt;
          if (!ts) return false;
          const date = ts.toDate ? ts.toDate() : new Date(ts);
          return date.toDateString() === new Date().toDateString();
        }).length,
        resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
      }));
    });

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setStatsData(prev => ({
        ...prev,
        teamSize: snapshot.size
      }));
      setLoading(false);
    });

    return () => {
      unsubscribeTickets();
      unsubscribeUsers();
    };
  }, [workspace, isDemo]);

  const stats = [
    { label: "Active Chatbots", value: statsData.activeChatbots.toLocaleString(), icon: MessageSquare, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { label: "Total Tickets", value: statsData.totalTickets.toLocaleString(), icon: Ticket, color: "text-violet-400", bg: "bg-violet-400/10" },
    { label: "Resolution Rate", value: `${statsData.resolutionRate}%`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Team Members", value: statsData.teamSize.toLocaleString(), icon: Users, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  if (loading && !isDemo) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Aggregating Workspace Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <ConversionModal isOpen={showConversion} onClose={() => setShowConversion(false)} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            {isDemo && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">Demo Mode</span>
            )}
          </div>
          <p className="text-zinc-500 text-sm">System performance and ticket summary.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-[#141414] border border-[#1F1F1F] rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#141414] border border-[#1F1F1F] rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          {isDemo && (
            <button 
              onClick={() => setShowConversion(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Sparkles className="w-4 h-4" /> Go Pro
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={stat.bg + " p-2 rounded-lg"}>
                <stat.icon className={"w-5 h-5 " + stat.color} />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">LIVE DATA</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-white text-lg">Ticket Activity</h3>
              <p className="text-zinc-500 text-sm">Real-time resolution volume tracking.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-xs text-zinc-400">Tickets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-zinc-400">Resolved</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={isDemo ? demoData : []}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F1F1F" />
                <XAxis 
                  dataKey="name" 
                  stroke="#525252" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#525252' }}
                />
                <YAxis 
                   stroke="#525252" 
                   fontSize={10} 
                   tickLine={false} 
                   axisLine={false} 
                   tick={{ fill: '#525252' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #1F1F1F', borderRadius: '8px' }} 
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="tickets" stroke="#6366f1" fillOpacity={1} fill="url(#colorTickets)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl p-6">
          <h3 className="font-bold text-white text-lg mb-6">Real-time Status</h3>
          
          <div className="space-y-4">
            {[
              { label: "Open Tickets", count: statsData.openTickets, icon: AlertCircle, color: "text-amber-500" },
              { label: "Resolved Today", count: statsData.resolvedToday, icon: CheckCircle2, color: "text-emerald-500" },
              { label: "Team Productivity", count: statsData.teamSize > 0 ? Math.round(statsData.totalTickets / statsData.teamSize) : 0, icon: Users, color: "text-blue-500" },
              { label: "Active Bots", count: statsData.activeChatbots, icon: Sparkles, color: "text-indigo-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-[#141414] border border-[#1F1F1F] rounded-xl">
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", item.color)} />
                  <span className="text-sm font-medium text-zinc-300">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-white tracking-tight">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#1F1F1F]">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 uppercase font-mono tracking-widest">Global Resolution Rate</span>
                <span className="text-xs text-emerald-500 font-bold">{statsData.resolutionRate}%</span>
             </div>
             <div className="w-full h-1 bg-[#1F1F1F] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${statsData.resolutionRate}%` }}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
