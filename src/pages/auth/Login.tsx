import { signInWithGoogle, db, auth } from "@/services/firebase";
import { LogIn, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isFromOnboarding = searchParams.get("redirect") === "onboarding";

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();

      // Check if user has an onboarding draft in local storage
      const draft = localStorage.getItem("supportpilot_onboarding_draft");
      
      if (draft) {
        const formData = JSON.parse(draft);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        // Only sync if the user hasn't completed onboarding yet
        if (!userDoc.exists() || !userDoc.data()?.onboarded) {
          const workspaceId = Math.random().toString(36).substring(7);
          
          await setDoc(doc(db, "workspaces", workspaceId), {
            name: formData.workspaceName || "My Workspace",
            businessType: formData.businessType || "Other",
            ownerId: user.uid,
            createdAt: new Date().toISOString(),
          });

          await setDoc(doc(db, "users", user.uid), {
            workspaceId,
            role: "owner",
            onboarded: true,
          }, { merge: true });

          localStorage.removeItem("supportpilot_onboarding_draft");
        }
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Link to="/" className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors z-10">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0F0F0F] border border-[#1F1F1F] rounded-[2rem] p-8 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            {isFromOnboarding ? "Save your progress" : "Welcome back"}
          </h1>
          <p className="text-zinc-400 text-center text-sm leading-relaxed max-w-[280px]">
            {isFromOnboarding 
              ? "Join SupportPilot AI to activate your assistant." 
              : "Access your workspace and pilot growth."}
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleLogin}
            className="w-full h-12 bg-white text-black font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 group shadow-xl shadow-white/5"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Continue with Google
          </button>
          
          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
             <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest text-zinc-600 bg-[#0F0F0F] px-4">OR</div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-xs text-zinc-500">Advanced login options available for enterprise customers.</p>
            <button className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold underline underline-offset-4">Learn about SSO</button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1F1F1F] space-y-4">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <span>Enterprise Ready</span>
            <span>GDPR Compliant</span>
          </div>
          <p className="text-[10px] text-zinc-600 text-center leading-loose">
            By continuing, you agree to our <a href="#" className="underline hover:text-zinc-400">Terms of Service</a> and <a href="#" className="underline hover:text-zinc-400">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
      
      <div className="mt-12 text-zinc-500 text-sm font-medium opacity-50 flex items-center gap-6">
         <span>© 2024 SupportPilot</span>
         <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
         <span>Security First Architecture</span>
      </div>
    </div>
  );
}
