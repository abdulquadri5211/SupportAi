import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Briefcase, MessageSquare, Upload, CheckCircle, Loader2 } from "lucide-react";
import { BUSINESS_TYPES } from "@/constants";
import { db, auth } from "@/services/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";
import ConversionModal from "@/components/ConversionModal";
import { useActivityLogger } from "@/hooks/use-activity-logger";
import { toast } from "sonner";

const steps = [
  { id: "business", title: "Business Identity", icon: Briefcase },
  { id: "chatbot", title: "Chatbot setup", icon: MessageSquare },
  { id: "docs", title: "Knowledge Base", icon: Upload },
  { id: "activate", title: "Activation", icon: CheckCircle },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConversion, setShowConversion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logAction } = useActivityLogger();
  const [formData, setFormData] = useState({
    workspaceName: "",
    businessType: "" as typeof BUSINESS_TYPES[number],
    chatbotName: "SupportPilot Assistant",
    personality: "Helpful and concise",
    tone: "professional",
  });
  const navigate = useNavigate();

  // Persist form data to local storage for guests
  useEffect(() => {
    const saved = localStorage.getItem("supportpilot_onboarding_draft");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("supportpilot_onboarding_draft", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    const user = auth.currentUser;
    if (!user) {
      setShowConversion(true);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const workspaceId = `ws_${Math.random().toString(36).substring(2, 10)}`;
      
      await setDoc(doc(db, "workspaces", workspaceId), {
        name: formData.workspaceName,
        businessType: formData.businessType,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        settings: {
          chatbotName: formData.chatbotName,
          personality: formData.personality,
          theme: "indigo",
          language: "en"
        }
      });

      await setDoc(doc(db, "users", user.uid), {
        workspaceId,
        role: "owner",
        onboarded: true,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      await logAction("onboarding_complete", `Created workspace: ${formData.workspaceName}`);
      
      toast.success("Workspace activated successfully!");
      localStorage.removeItem("supportpilot_onboarding_draft");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to activate workspace. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex overflow-hidden">
      <ConversionModal 
        isOpen={showConversion} 
        onClose={() => setShowConversion(false)} 
        title="Save your AI configuration"
        description="To activate your assistant and access the dashboard, please create your account. We'll save all your choices automatically."
      />

      {/* Sidebar Progress */}
      <div className="w-1/3 bg-[#0F0F0F] border-r border-[#1F1F1F] p-12 hidden lg:flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600/20">
          <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
        </div>
        
        <div className="mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">S</div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Onboarding</h2>
          <p className="text-zinc-500 text-sm">Set up your workspace in minutes.</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                idx <= currentStep ? "border-indigo-500 bg-indigo-500/10 text-indigo-400" : "border-[#1F1F1F] text-zinc-600"
              )}>
                {idx < currentStep ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
              </div>
              <span className={cn(
                "text-sm font-medium transition-all duration-500",
                idx <= currentStep ? "text-white" : "text-zinc-600"
              )}>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full mx-auto"
          >
            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
                   Step 1: Workspace
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Tell us about your business</h1>
                  <p className="text-zinc-400 leading-relaxed">This helps us tailor the AI assistant to your brand's unique needs and industry standards.</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Workspace Name</label>
                    <input 
                      type="text" 
                      value={formData.workspaceName}
                      onChange={(e) => setFormData({...formData, workspaceName: e.target.value})}
                      placeholder="e.g. Acme Support"
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Business Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {BUSINESS_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData({...formData, businessType: type})}
                          className={cn(
                            "p-3 rounded-xl border text-xs font-medium transition-all",
                            formData.businessType === type 
                              ? "bg-indigo-600/10 border-indigo-500 text-indigo-400" 
                              : "border-[#1F1F1F] bg-[#141414] text-zinc-400 hover:border-zinc-700 hover:bg-[#1A1A1A]"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
                   Step 2: Configuration
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Configure your AI</h1>
                  <p className="text-zinc-400">Give your chatbot a personality that matches your brand's voice.</p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Assistant Name</label>
                    <input 
                      type="text" 
                      value={formData.chatbotName}
                      onChange={(e) => setFormData({...formData, chatbotName: e.target.value})}
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Personality</label>
                    <textarea 
                      value={formData.personality}
                      onChange={(e) => setFormData({...formData, personality: e.target.value})}
                      placeholder="e.g. Helpful and funny assistant for a modern pet store."
                      className="w-full bg-[#141414] border border-[#1F1F1F] rounded-xl p-4 text-white h-32 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">
                   Step 3: Intelligence
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Knowledge Base</h1>
                  <p className="text-zinc-400 text-lg">Upload documents to train your AI instantly.</p>
                </div>

                <div className="border-2 border-dashed border-[#1F1F1F] rounded-[2rem] p-16 flex flex-col items-center justify-center gap-6 bg-[#0F0F0F] hover:bg-[#141414] transition-all cursor-pointer group hover:border-indigo-500/30">
                  <div className="w-20 h-20 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-indigo-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-white font-bold mb-2">Click to upload or drag files</p>
                    <p className="text-zinc-500 text-sm">Supports PDF, DOCX, TXT up to 25MB</p>
                    <div className="flex gap-2 justify-center mt-4 opacity-50">
                       <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono">PDF</span>
                       <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono">CSV</span>
                       <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono">TXT</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 text-center pt-12">
                <div className="flex justify-center mb-8">
                   <div className="w-32 h-32 bg-indigo-600/10 border border-indigo-500/20 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/5 animate-pulse"></div>
                    <CheckCircle className="w-16 h-16 text-indigo-500 relative z-10" />
                   </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Configuration Complete!</h1>
                  <p className="text-zinc-400 text-lg max-w-md mx-auto leading-relaxed">
                    Your customized AI assistant is ready to take flight. Unlock your dashboard to start the pilot.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-12 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={cn(
                  "flex items-center gap-2 text-sm font-bold transition-colors h-12 px-6 rounded-xl",
                  currentStep === 0 ? "text-zinc-800 pointer-events-none" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-10 h-12 rounded-xl font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-600/20 group disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Activating...
                  </>
                ) : (
                  <>
                    {currentStep === steps.length - 1 ? "Save & Activate" : "Continue"}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
