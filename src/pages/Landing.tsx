import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ChevronRight, 
  Bot, 
  Zap, 
  Users, 
  BarChart3, 
  Globe2, 
  ShieldCheck,
  Play,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">S</div>
            <span className="text-xl font-bold tracking-tight">SupportPilot AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-zinc-400 hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</Link>
            <Link to="/onboarding" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/10">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-400 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 is now live: Multilingual Voice Support
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent px-4"
          >
            Smarter Support <br className="hidden md:block" /> for Modern Sales.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            SupportPilot AI transforms your customer service into a high-converting growth engine with intelligent automation and real-time interaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/onboarding" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all group active:scale-95">
              Build your AI Assistant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all">
              <Play className="w-4 h-4 fill-white" /> View Demo Dashboard
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-6xl mx-auto mt-24 p-2 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl relative"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/20 blur-[100px] pointer-events-none"></div>
          <div className="bg-[#0D0D0D] rounded-[1.5rem] overflow-hidden border border-white/5 aspect-[16/10] md:aspect-auto p-4 md:p-8">
             <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-3 space-y-4 hidden md:block">
                   <div className="h-8 bg-white/5 rounded-lg w-3/4"></div>
                   <div className="space-y-2">
                      <div className="h-4 bg-white/5 rounded w-full"></div>
                      <div className="h-4 bg-white/5 rounded w-5/6"></div>
                      <div className="h-4 bg-white/5 rounded w-4/6"></div>
                   </div>
                </div>
                <div className="col-span-12 md:col-span-9 bg-[#111] rounded-xl border border-white/5 p-6 h-full min-h-[400px]">
                   <div className="flex items-center justify-between mb-8">
                      <div className="space-y-1">
                        <div className="h-4 bg-white/10 rounded w-32"></div>
                        <div className="h-2 bg-white/5 rounded w-20"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5"></div>
                        <div className="w-8 h-8 rounded-full bg-white/5"></div>
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                      <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                      <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                   </div>
                   <div className="h-48 bg-indigo-500/5 rounded-xl border border-indigo-500/10 flex items-end p-4 gap-2">
                      {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-600/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-12">Trusted by 500+ innovative companies</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all">
             <div className="text-2xl font-bold">Acme.inc</div>
             <div className="text-2xl font-bold italic underline">GLOBEX</div>
             <div className="text-2xl font-bold tracking-tighter">Initech</div>
             <div className="text-2xl font-bold">UMBRELLA</div>
             <div className="text-2xl font-bold tracking-widest uppercase text-xs self-center">Massive Dynamic</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Everything you need to automate support.</h2>
            <p className="text-zinc-400 text-lg">We've built the most comprehensive toolset for modern customer teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "AI Personalities", 
                desc: "Customizable characters that match your brand's unique voice and tone.",
                icon: Bot,
                color: "text-indigo-400",
                bg: "bg-indigo-400/10"
              },
              { 
                title: "Real-time Analytics", 
                desc: "Deep insights into customer behavior, resolution rates, and team performance.",
                icon: BarChart3,
                color: "text-emerald-400",
                bg: "bg-emerald-400/10"
              },
              { 
                title: "Smart Ticketing", 
                desc: "Automated prioritization and routing system that never sleeps.",
                icon: Zap,
                color: "text-amber-400",
                bg: "bg-amber-400/10"
              },
              { 
                title: "Global Reach", 
                desc: "Native support for 15+ languages including Arabic, Yoruba, and French.",
                icon: Globe2,
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              },
              { 
                title: "Team Workspaces", 
                desc: "Collaborative environment with role-based permissions and activity logs.",
                icon: Users,
                color: "text-violet-400",
                bg: "bg-violet-400/10"
              },
              { 
                title: "Vault Security", 
                desc: "Enterprise-grade encryption and GDPR compliant data storage.",
                icon: ShieldCheck,
                color: "text-rose-400",
                bg: "bg-rose-400/10"
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-[#0F0F0F] border border-[#1F1F1F] rounded-3xl hover:border-zinc-700 transition-colors group">
                <div className={cn(feature.bg, "w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform")}>
                  <feature.icon className={cn(feature.color, "w-6 h-6")} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-6 bg-[#0F0F0F]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Loved by support teams globally.</h2>
            <p className="text-zinc-500">Real stories from real pilots.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                text: "SupportPilot cut our response time by 80%. It's like having a 24/7 team in every language we serve.",
                author: "Sarah Jenkins",
                role: "Director of Ops at Acme",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              },
              { 
                text: "The multilingual support is flawless. Our Arabic-speaking customers feel finally understood.",
                author: "Alex Reed",
                role: "Customer Success at GloBEX",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              },
              { 
                text: "Best investment this year. The leads generated by the chatbot paid for the Pro plan in 3 days.",
                author: "Maria Silva",
                role: "Founder at RetailPlus",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 bg-[#0F0F0F] border border-[#1F1F1F] rounded-[2rem] flex flex-col justify-between"
              >
                <p className="text-zinc-300 italic mb-8 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} className="w-10 h-10 rounded-full border border-white/10" alt={t.author} />
                  <div>
                    <p className="text-sm font-bold text-white">{t.author}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 italic">Simple, transparent pricing.</h2>
             <p className="text-zinc-500 max-w-xl mx-auto">Choose a plan that scales with your growth. Switch or cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 bg-[#0F0F0F] border border-[#1F1F1F] rounded-[2rem] flex flex-col justify-between relative">
                <div>
                   <h3 className="text-xl font-bold mb-2">Free Trial</h3>
                   <p className="text-zinc-500 text-sm mb-6">Test the pilot with your small team.</p>
                   <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-bold">$0</span>
                      <span className="text-zinc-500">/mo</span>
                   </div>
                   <ul className="space-y-4 mb-10 text-sm text-zinc-400">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 1 AI Chatbot</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 500 Messages/mo</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Basic Analytics</li>
                   </ul>
                </div>
                <Link to="/onboarding" className="w-full py-4 rounded-xl font-bold text-center bg-white/5 border border-white/10 hover:bg-white/10 transition-all">Start 14-day flight</Link>
             </div>

             <div className="p-8 bg-indigo-600 border border-indigo-400 rounded-[2rem] flex flex-col justify-between relative overflow-hidden shadow-2xl scale-105 z-10">
                <div className="absolute top-0 right-0 p-4 bg-white/10 text-xs font-bold uppercase tracking-widest rounded-bl-xl text-white">Most Popular</div>
                <div>
                   <h3 className="text-xl font-bold mb-2 text-white">Pro Pilot</h3>
                   <p className="text-indigo-100/70 text-sm mb-6">Scale your operations with advanced AI.</p>
                   <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-bold text-white">$49</span>
                      <span className="text-indigo-100/70">/mo</span>
                   </div>
                   <ul className="space-y-4 mb-10 text-sm text-indigo-50">
                      <li className="flex items-center gap-2 text-white font-medium">✓ Unlimited Chatbots</li>
                      <li className="flex items-center gap-2 text-white font-medium">✓ 10,000 Messages/mo</li>
                      <li className="flex items-center gap-2 text-white font-medium">✓ Advanced Analytics & Lead Gen</li>
                      <li className="flex items-center gap-2 text-white font-medium">✓ Team Collaboration</li>
                   </ul>
                </div>
                <Link to="/onboarding" className="w-full py-4 rounded-xl font-bold text-center bg-white text-indigo-600 hover:bg-zinc-100 transition-all shadow-xl">Get Started Now</Link>
             </div>

             <div className="p-8 bg-[#0F0F0F] border border-[#1F1F1F] rounded-[2rem] flex flex-col justify-between relative">
                <div>
                   <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                   <p className="text-zinc-500 text-sm mb-6">Custom architecture for global brands.</p>
                   <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-bold">Custom</span>
                   </div>
                   <ul className="space-y-4 mb-10 text-sm text-zinc-400">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Dedicated Account Manager</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Unlimited Messages</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Custom AI Training</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> SSO & White-labeling</li>
                   </ul>
                </div>
                <button className="w-full py-4 rounded-xl font-bold text-center bg-white/5 border border-white/10 hover:bg-white/10 transition-all">Contact Sales</button>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Frequently asked questions.</h2>
            <p className="text-zinc-500">Everything you need to know about the flight.</p>
          </div>

          <div className="space-y-6">
            {[
              { q: "How does the 14-day free trial work?", a: "You get full access to the Pro features for 14 days. No credit card is required to start. We'll notify you 2 days before your trial expires." },
              { q: "Which languages does SupportPilot support?", a: "We natively support over 15 languages, including English, French, Arabic, Yoruba, Hausa, Igbo, Spanish, and Chinese with native-level accuracy." },
              { q: "Can I train the AI on my own documents?", a: "Yes! You can upload PDF, DOCX, CSV, and TXT files. Our AI will analyze them and use that knowledge to answer customer queries accurately." },
              { q: "How secure is my data?", a: "We take security seriously. All data is encrypted at rest and in transit using AES-256 and SSL/TLS. We are fully GDPR and SOC2 compliant." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#0F0F0F] border border-[#1F1F1F] rounded-2xl">
                 <h4 className="text-lg font-bold text-white mb-4">{item.q}</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px]"></div>
           <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 tracking-tight">Ready to pilot your growth?</h2>
           <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto opacity-80 relative z-10">
             Join thousands of companies scaling their support with SupportPilot AI. No credit card required.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
             <Link to="/onboarding" className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all active:scale-95">
                Start Free Trial
             </Link>
             <Link to="/login" className="text-white font-bold px-10 py-4 rounded-full hover:bg-white/10 transition-all border border-white/20">
                Log In
             </Link>
           </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">© 2024 SupportPilot AI • Built for the future of SaaS</p>
      </footer>
    </div>
  );
}
