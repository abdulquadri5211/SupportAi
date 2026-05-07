import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Clock, 
  User, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TicketStatus, TicketPriority } from "@/types";
import { auth } from "@/services/firebase";
import ConversionModal from "@/components/ConversionModal";

const demoTickets = [
  { 
    id: "TIC-8492", 
    customer: "john@example.com", 
    subject: "Unable to reset password", 
    status: TicketStatus.OPEN, 
    priority: TicketPriority.HIGH,
    assignedTo: "Sarah Jenkins",
    createdAt: "2024-03-20T14:30:00Z"
  },
  { 
    id: "TIC-8493", 
    customer: "marta@company.com", 
    subject: "Query about pricing plans", 
    status: TicketStatus.IN_PROGRESS, 
    priority: TicketPriority.MEDIUM,
    assignedTo: "Alex Reed",
    createdAt: "2024-03-20T15:45:00Z"
  },
  { 
    id: "TIC-8494", 
    customer: "dev@platform.io", 
    subject: "API connectivity issues", 
    status: TicketStatus.RESOLVED, 
    priority: TicketPriority.URGENT,
    assignedTo: "System AI",
    createdAt: "2024-03-19T09:20:00Z"
  },
  { 
    id: "TIC-8495", 
    customer: "lisa@retail.com", 
    subject: "Arabic language setup help", 
    status: TicketStatus.OPEN, 
    priority: TicketPriority.MEDIUM,
    assignedTo: "AI Assistant",
    createdAt: "2024-03-21T10:10:00Z"
  }
];

const priorityColors = {
  [TicketPriority.LOW]: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
  [TicketPriority.MEDIUM]: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  [TicketPriority.HIGH]: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  [TicketPriority.URGENT]: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

export default function Tickets() {
  const [filter, setFilter] = useState("all");
  const [showConversion, setShowConversion] = useState(false);
  const isDemo = !auth.currentUser;

  const handleAction = () => {
    if (isDemo) {
      setShowConversion(true);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ConversionModal 
        isOpen={showConversion} 
        onClose={() => setShowConversion(false)} 
        title="Ready to go live with your team?"
        description="Ticket management is fully unlocked for registered workspaces. Start your 14-day free trial now."
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">Customer Tickets</h1>
            {isDemo && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">Demo</span>
            )}
          </div>
          <p className="text-zinc-500 text-sm">Manage and resolve incoming support requests.</p>
        </div>
        <button 
          onClick={handleAction}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Ticket
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-[#0F0F0F] border border-[#1F1F1F] p-4 rounded-2xl">
        <div className="flex items-center gap-2 bg-[#141414] border border-[#1F1F1F] px-3 py-2 rounded-xl w-full lg:max-w-xs">
          <Search className="w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by subject or customer email..." 
            className="bg-transparent text-sm text-white outline-none w-full"
          />
        </div>
        
        <div className="h-4 w-px bg-[#1F1F1F] hidden lg:block mx-2"></div>

        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 lg:pb-0">
          {["All", "Open", "In Progress", "Resolved"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t.toLowerCase())}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                filter === t.toLowerCase() 
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-zinc-500 hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1F1F1F] bg-[#141414]/50">
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Ticket ID</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Customer</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Subject</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Priority</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Status</th>
              <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-500">Assigned To</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F1F]">
            {(isDemo ? demoTickets : []).map((ticket) => (
              <tr key={ticket.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={handleAction}>
                <td className="px-6 py-4 font-mono text-xs text-indigo-400">{ticket.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{ticket.customer}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Verified</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-300 line-clamp-1">{ticket.subject}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase border", priorityColors[ticket.priority])}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {ticket.status === TicketStatus.OPEN && <AlertCircle className="w-3 h-3 text-amber-500" />}
                    {ticket.status === TicketStatus.IN_PROGRESS && <Clock className="w-3 h-3 text-blue-500" />}
                    {ticket.status === TicketStatus.RESOLVED && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                    <span className="text-xs text-zinc-400 capitalize">{ticket.status.replace("_", " ")}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-[#1F1F1F] flex items-center justify-center">
                      <User className="w-3 h-3 text-zinc-500" />
                    </div>
                    <span className="text-xs text-zinc-400">{ticket.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs py-4 px-2">
        <span className="text-zinc-500">Showing {isDemo ? "4" : "0"} of {isDemo ? "1,284" : "0"} tickets</span>
        <div className="flex items-center gap-2">
           <button className="px-3 py-1 border border-[#1F1F1F] rounded-lg text-zinc-500 disabled:opacity-50" disabled>Previous</button>
           <button 
             onClick={handleAction}
             className="px-3 py-1 border border-[#1F1F1F] rounded-lg text-white hover:bg-white/5 transition-colors"
           >
             Next
           </button>
        </div>
      </div>
    </div>
  );
}
