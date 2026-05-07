import { useState, useEffect } from "react";
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  MoreVertical,
  MinusCircle,
  Loader2,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { useWorkspace } from "@/hooks/use-workspace";
import { db } from "@/services/firebase";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { toast } from "sonner";
import { useActivityLogger } from "@/hooks/use-activity-logger";

interface Member {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  lastActive: string;
}

export default function Team() {
  const { workspace, isDemo } = useWorkspace();
  const { logAction } = useActivityLogger();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState(UserRole.MEMBER);
  const [isInviting, setIsInviting] = useState(false);
  const [membersList, setMembersList] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo || !workspace) {
      setLoading(false);
      return;
    }

    // Fetch members (logic usually involves a junction table or workspaceId on user)
    // For now, we query users who have this workspaceId
    const q = query(collection(db, "users"), where("workspaceId", "==", workspace.id));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const members = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || doc.data().email?.split('@')[0] || "User",
        email: doc.data().email || "unknown",
        role: doc.data().role || UserRole.MEMBER,
        status: doc.data().onboarded ? "Active" : "Pending Onboarding",
        lastActive: doc.data().updatedAt ? "System Active" : "Never"
      })) as Member[];
      setMembersList(members);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [workspace, isDemo]);

  const handleSendInvite = async () => {
    if (isDemo) return toast.error("Log in to invite members.");
    if (!inviteEmail) return toast.error("Please enter an email.");
    if (!workspace) return;

    setIsInviting(true);
    try {
      await addDoc(collection(db, "invitations"), {
        workspaceId: workspace.id,
        workspaceName: workspace.name,
        email: inviteEmail.toLowerCase(),
        role: inviteRole,
        invitedAt: serverTimestamp(),
        status: "pending"
      });

      await logAction("member_invited", `Invited ${inviteEmail} as ${inviteRole}`);
      toast.success(`Invite sent successfully to ${inviteEmail}`);
      setShowInviteModal(false);
      setInviteEmail("");
    } catch (error) {
       console.error(error);
       toast.error("Failed to send invitation.");
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Team Collaboration</h1>
          <p className="text-zinc-500 text-sm">Manage members, roles and invitations.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-white font-bold mb-1">Owners</h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">Full access to billing, permissions and workspace settings.</p>
          <span className="text-xs font-mono text-zinc-400">1 MEMBER</span>
        </div>

        <div className="p-6 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl">
          <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-white font-bold mb-1">Admins</h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">Can manage tickets, chatbots and team members except billing.</p>
          <span className="text-xs font-mono text-zinc-400">1 MEMBER</span>
        </div>

        <div className="p-6 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl">
          <div className="w-10 h-10 bg-zinc-500/10 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-zinc-400" />
          </div>
          <h3 className="text-white font-bold mb-1">Members</h3>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">Primary focus on ticket resolution and customer interaction.</p>
          <span className="text-xs font-mono text-zinc-400">2 MEMBERS</span>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1F1F1F] flex items-center justify-between">
          <h3 className="text-white font-bold">Workspace Members</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#1F1F1F] rounded-lg">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            <input type="text" placeholder="Filter by email..." className="bg-transparent text-xs outline-none text-white w-48" />
          </div>
        </div>

        <div className="divide-y divide-[#1F1F1F]">
          {loading ? (
             <div className="p-20 text-center text-zinc-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4 text-indigo-500" />
                <p className="text-xs font-mono uppercase tracking-widest leading-relaxed">Synchronizing Workspace Members...</p>
             </div>
          ) : (isDemo ? [
            { id: "DEMO-1", name: "Guest Admin", email: "guest@supportpilot.ai", role: UserRole.OWNER, status: "Demo Active", lastActive: "Just now" },
            { id: "DEMO-2", name: "Support Pilot AI", email: "ai@supportpilot.ai", role: UserRole.ADMIN, status: "Always Online", lastActive: "Just now" }
          ] : membersList).map((member) => (
            <div key={member.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-[#1F1F1F] flex items-center justify-center text-indigo-400 font-bold uppercase">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{member.name}</span>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded uppercase font-bold border",
                      member.role === UserRole.OWNER ? "text-indigo-400 border-indigo-400/20 bg-indigo-400/5" :
                      member.role === UserRole.ADMIN ? "text-amber-400 border-amber-400/20 bg-amber-400/5" :
                      "text-zinc-400 border-zinc-400/20 bg-zinc-400/5"
                    )}>
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-xs text-zinc-300 font-medium">{member.status}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{member.lastActive}</p>
                </div>
                
                <div className="flex items-center gap-2">
                   {/* Actions only for real owners if they aren't the member itself */}
                  <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-zinc-500 hover:text-rose-500 transition-colors">
                    <MinusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal Placeholder */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="w-full max-w-md bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Invite new member</h3>
              <p className="text-sm text-zinc-500 mb-6">Send an email invitation to join your workspace.</p>
              
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Assign Role</label>
                    <select 
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as UserRole)}
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-3 text-sm text-white outline-none"
                    >
                       <option value={UserRole.MEMBER}>Member</option>
                       <option value={UserRole.ADMIN}>Admin</option>
                    </select>
                 </div>
              </div>

              <div className="mt-8 flex gap-3">
                 <button 
                  onClick={() => setShowInviteModal(false)} 
                  disabled={isInviting}
                  className="flex-1 px-4 py-2 border border-[#1F1F1F] rounded-xl text-sm font-semibold text-zinc-400 hover:bg-white/5 disabled:opacity-50"
                 >
                   Cancel
                 </button>
                 <button 
                  onClick={handleSendInvite}
                  disabled={isInviting}
                  className="flex-1 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                   {isInviting && <Loader2 className="w-4 h-4 animate-spin" />}
                   {isInviting ? "Inviting..." : "Send Invite"}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function Settings({ className }: { className?: string }) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
