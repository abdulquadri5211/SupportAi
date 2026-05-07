import { useState } from "react";
import { CreditCard, CheckCircle, Zap, Shield, Crown, ArrowUpRight, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/use-workspace";
import { toast } from "sonner";

export default function BillingDashboard() {
  const { workspace, isDemo } = useWorkspace();
  const [loading, setLoading] = useState(false);

  const plans = [
    { name: "Starter", price: "$0", features: ["1 Chatbot", "500 Messages", "Basic Analytics"], current: !workspace?.subscription || workspace?.subscription === "free" },
    { name: "Pro", price: "$49", features: ["Unlimited Chatbots", "10,000 Messages", "Advanced Analytics", "Team Access"], current: workspace?.subscription === "pro", promoted: true },
    { name: "Enterprise", price: "Custom", features: ["Unlimited Messages", "Custom AI Training", "Dedicated Support", "SSO"], current: workspace?.subscription === "enterprise" },
  ];

  const handleUpgrade = (plan: string) => {
    if (isDemo) {
      toast.error("Please log in to manage subscriptions.");
      return;
    }
    
    setLoading(true);
    // Simulate payment redirect
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: `Redirecting to payment gateway for ${plan} plan...`,
        success: 'Mock payment successful! Your workspace has been upgraded.',
        error: 'Failed to initiate payment.',
      }
    );
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Active Plan */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 rounded-3xl p-8">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Crown className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Active Plan</span>
            {workspace?.subscription === "pro" && <span className="text-indigo-400 font-mono text-[10px] uppercase tracking-widest">Premium Flight Active</span>}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {workspace?.subscription === "pro" ? "Pro Pilot" : 
             workspace?.subscription === "enterprise" ? "Enterprise" : "Starter Flight"}
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mb-8">
            Your workspace is currently enabled for {workspace?.subscription === "pro" ? "unlimited growth" : "exploration"}. 
            {workspace?.subscription !== "pro" && " Upgrade to unlock elite scaling features."}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Monthly Usage</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-white">452 / 500</span>
                  <span className="text-xs text-zinc-500">90%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[90%]"></div>
                </div>
             </div>
             <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Billing Cycle</p>
                <p className="text-lg font-bold text-white">Monthly</p>
                <p className="text-[10px] text-zinc-500">NEXT: JUNE 1, 2024</p>
             </div>
             <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Payment Method</p>
                <div className="flex items-center gap-2 mt-1">
                   <CreditCard className="w-4 h-4 text-indigo-400" />
                   <span className="text-sm font-medium text-white">•••• 4242</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "p-6 rounded-3xl border transition-all flex flex-col justify-between",
              plan.current 
                ? "bg-indigo-600/5 border-indigo-500/30 ring-1 ring-indigo-500/20" 
                : "bg-[#141414] border-[#1F1F1F] hover:border-zinc-700"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                {plan.current && <CheckCircle className="w-5 h-5 text-indigo-400" />}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-zinc-500 text-sm">/mo</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                    <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              disabled={plan.current || loading}
              onClick={() => handleUpgrade(plan.name)}
              className={cn(
                "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                plan.current 
                  ? "bg-indigo-500/10 text-indigo-400 cursor-default" 
                  : plan.promoted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
              )}
            >
              {plan.current ? "Current Flight" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade Plan"}
              {!plan.current && <ArrowUpRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="bg-[#141414] border border-[#1F1F1F] rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-[#1F1F1F] flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                 <History className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Billing History</h3>
           </div>
           <button className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Download All</button>
        </div>
        <div className="divide-y divide-[#1F1F1F]">
           {[
             { id: "INV-001", date: "May 1, 2024", amount: "$49.00", status: "Paid" },
             { id: "INV-002", date: "Apr 1, 2024", amount: "$49.00", status: "Paid" },
             { id: "INV-003", date: "Mar 1, 2024", amount: "$0.00", status: "Starter" },
           ].map((inv) => (
             <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-[#1F1F1F] flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-500 transition-colors" />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white">{inv.id}</p>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase">{inv.date}</p>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <p className="text-sm font-bold text-white">{inv.amount}</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{inv.status}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
