import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function ConversionModal({ 
  isOpen, 
  onClose,
  title = "Unlock the Full Power of SupportPilotAI",
  description = "You've discovered how AI can transform your support. Sign up now to save your progress and go live."
}: ConversionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header / Banner */}
            <div className="h-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight">
                {title}
              </h2>
              
              <p className="text-zinc-400 mb-8 leading-relaxed">
                {description}
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Save custom chatbot configurations",
                  "Enable real-time multilingual support",
                  "Connect your domain and go live",
                  "Access advanced team analytics"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link 
                  to="/login" 
                  className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95"
                >
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={onClose}
                  className="w-full py-4 text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium"
                >
                  Maybe later, I'm still exploring
                </button>
              </div>

              <p className="mt-8 text-center text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">
                No credit card required • 14-day free trial
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
