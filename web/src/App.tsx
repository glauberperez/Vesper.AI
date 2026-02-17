import React, { useState, useEffect } from 'react';
import { Mic, Zap, EyeOff, Shield, CheckCircle, ChevronRight, Lock, Activity, MousePointer2, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] opacity-30" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity size={18} className="text-white" />
            </div>
            VESPER<span className="text-indigo-500">.AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#how" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#features" className="hover:text-white transition-colors">Ghost Mode</a>
          </div>
          <button disabled className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-500 text-sm font-medium cursor-not-allowed flex items-center gap-2">
            <Lock size={12} /> Acesso Restrito
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-44 pb-20 px-6 max-w-7xl mx-auto text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"/>
          VAGAS LIMITADAS PARA O BETA
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
        >
          A Inteligência Invisível<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            para sua próxima entrevista.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          O primeiro copiloto de IA que lê o <strong>teu próprio código</strong> para gerar respostas técnicas em tempo real. Indetectável. Local. Privado.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button disabled className="w-full sm:w-auto px-8 py-4 bg-indigo-600/50 text-white/50 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-transparent">
            <Lock size={16} /> Download (Em Breve)
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-[#1A1F2E] border border-white/10 text-white font-medium rounded-xl hover:bg-[#23293B] hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            Entrar na Lista de Espera <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </motion.div>
        
        <p className="mt-4 text-xs text-slate-600 uppercase tracking-widest">
          Lançamento Oficial: Q2 2026
        </p>

        {/* Demonstração Animada */}
        <div className="mt-24">
          <DemoAnimation />
        </div>

      </main>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-white/5 bg-[#0D111C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MousePointer2 className="text-emerald-400" />}
              title="Ghost Mode (Click-Through)"
              desc="A janela do Vesper é transparente para cliques. Você pode clicar 'através' dela para interagir com o Zoom ou VS Code sem mover a janela."
            />
            <FeatureCard 
              icon={<Zap className="text-indigo-400" />}
              title="Contexto Deep-Code"
              desc="O Vesper lê seus repositórios locais. As respostas não são genéricas, são baseadas na sua experiência real."
            />
            <FeatureCard 
              icon={<EyeOff className="text-purple-400" />}
              title="100% Local"
              desc="Suas chaves de API. Seu processamento de áudio. Nada sai da sua máquina. Privacidade absoluta."
            />
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5">
        <p>&copy; 2026 Vesper AI. Todos os direitos reservados.</p>
      </footer>

      {/* MODAL DE WAITLIST */}
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

// --- COMPONENTE DO MODAL DE WAITLIST ---
const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  // SEU ENDPOINT REAL AQUI:
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkovbaqw"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Janela Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#131825] border border-white/10 p-8 rounded-2xl shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
              <X size={20} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Você está na fila!</h3>
                <p className="text-slate-400">Assim que abrirmos novas vagas para o Beta, você receberá um e-mail secreto.</p>
                <button onClick={onClose} className="mt-6 text-sm text-indigo-400 hover:text-indigo-300">Fechar</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Acesso Antecipado</h3>
                  <p className="text-slate-400 text-sm">O Vesper está sendo liberado em lotes para garantir a estabilidade. Garanta seu lugar.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Entrar na Lista"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center">Erro ao enviar. Tente novamente.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DemoAnimation = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const cycle = () => {
      setTimeout(() => setStage(1), 3000); 
      setTimeout(() => setStage(2), 5000);
      setTimeout(() => setStage(0), 12000);
    };
    
    cycle(); 
    const interval = setInterval(cycle, 12000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-[#0B0F19]/80 backdrop-blur-md shadow-2xl overflow-hidden h-[400px]">
      <div className="h-10 bg-[#151925] border-b border-white/5 flex items-center px-4 gap-2 justify-between">
        <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
        </div>
        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
           Vesper_Client.exe 
           <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${stage === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
             {stage === 0 ? 'LISTENING' : 'PROCESSING'}
           </span>
        </div>
        <div className="w-4"></div>
      </div>

      <div className="p-12 h-full grid md:grid-cols-2 gap-12 text-left relative">
        <div className="space-y-6 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {stage === 0 ? (
               <motion.div 
                 key="listening"
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="flex flex-col items-start gap-4"
               >
                 <div className="flex items-center gap-3 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                    <Mic size={16} className="animate-pulse" /> Escutando Entrevista...
                 </div>
                 <div className="flex gap-1 h-8 items-end">
                    {[1,2,3,4,5].map(i => (
                        <motion.div 
                           key={i}
                           animate={{ height: ["20%", "100%", "20%"] }}
                           transition={{ repeat: Infinity, duration: 0.5 + (i * 0.1) }}
                           className="w-2 bg-indigo-500/50 rounded-full"
                        />
                    ))}
                 </div>
               </motion.div>
            ) : (
               <motion.div 
                 key="question"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 className="space-y-2"
               >
                 <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Entrevistador Perguntou:</span>
                 <h3 className="text-2xl text-white font-medium leading-relaxed">
                    "Explique como você lidaria com Race Conditions em um sistema distribuído."
                 </h3>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center">
          <AnimatePresence>
            {stage === 2 && (
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-[#1A1F2E] rounded-lg p-6 border border-indigo-500/20 shadow-[0_0_30px_-5px_rgba(99,102,241,0.1)] relative"
              >
                <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow-lg font-bold flex items-center gap-1">
                   <Zap size={10} fill="currentColor"/> SUGESTÃO
                </div>
                
                <div className="mb-4 text-xs text-slate-500 font-mono border-b border-white/5 pb-2">
                   Contexto: github.com/user/payment-api
                </div>

                <ul className="space-y-4 text-slate-300 text-sm leading-relaxed">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                      className="flex gap-3"
                    >
                        <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>Cite o uso de <strong>Redis Locks (Redlock)</strong> para garantir atomicidade entre microsserviços.</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                      className="flex gap-3"
                    >
                        <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>Mencione a estratégia de <strong>Optimistic Concurrency Control</strong> (versionamento no DB).</span>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                      className="flex gap-3"
                    >
                        <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>Dê exemplo do arquivo <code>inventory.go</code> do seu projeto.</span>
                    </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-[#131825] border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
    <div className="mb-5 bg-[#0B0F19] w-14 h-14 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default App;