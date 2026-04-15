"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, AlertCircle, Phone, User, Loader2, Heart, MessageSquare, Rocket } from "lucide-react";
import { createLeadAction } from "@/app/actions/leads";

const quizSteps = [
  {
    id: 1,
    title: "Qual é o seu MAIOR motivo para querer sair da sua casa atual?",
    options: [
      { text: "O aluguel está me sufocando todo mês.", value: "aluguel" },
      { text: "Moro de favor e quero a minha independência.", value: "favor" },
      { text: "A casa está pequena para a minha família.", value: "espaco" },
    ],
  },
  {
    id: 2,
    title: "Você já tem algum valor guardado para documentação ou entrada?",
    options: [
      { text: "Tenho de R$ 5.000 a R$ 10.000 guardados.", value: "poupanca" },
      { text: "Tenho saldo no meu FGTS (carteira assinada).", value: "fgts" },
      { text: "Não tenho nada guardado, dependo do subsídio.", value: "subsidio" },
    ],
  },
  {
    id: 3,
    title: "Atualmente, você possui pendências (SPC/Serasa) registradas no seu CPF ou do seu cônjuge?",
    alert: "A Caixa Econômica Federal é rigorosa com restrições de crédito.",
    options: [
      { text: "Sim, possuo restrição.", value: "restricao_sim" },
      { text: "Não, meu CPF está totalmente limpo.", value: "restricao_nao" },
    ],
  },
  {
    id: 4,
    title: "Qual o valor da sua Renda Bruta Familiar Comprovada (Seu salário + Cônjuge)?",
    options: [
      { text: "Abaixo de R$ 2.640", value: "faixa_1" },
      { text: "Entre R$ 2.641 e R$ 4.400", value: "faixa_2" },
      { text: "Acima de R$ 4.400", value: "faixa_3" },
    ],
  },
];

export default function CreditQuiz() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  // Perguntas Abertas (Emotion)
  const [motivation, setMotivation] = useState("");
  const [feelings, setFeelings] = useState("");

  // Dados de contato
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSelect = (value: string) => {
    const stepKey = `step_${currentStep + 1}`;
    const newAnswers = { ...answers, [stepKey]: value };
    setAnswers(newAnswers);

    if (currentStep === 2 && value === "restricao_sim") {
       router.push("/analise");
       return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleNextEmotion = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp) return;

    setLoading(true);
    
    // Consolidar respostas
    const finalAnswers = {
      ...answers,
      motivation,
      feelings,
      submit_at: new Date().toISOString()
    };

    const result = await createLeadAction({
      name,
      whatsapp,
      answers: finalAnswers,
      profile: "mcmv_high_end_lead"
    });

    if (result.success) {
      router.push(`/aprovacao?name=${encodeURIComponent(name.split(' ')[0])}`);
    } else {
      alert("Ocorreu um erro ao salvar seus dados. Tente novamente.");
      setLoading(false);
    }
  };

  const isEmotionStep = currentStep === quizSteps.length;
  const isContactStep = currentStep === quizSteps.length + 1;
  const step = quizSteps[currentStep];

  return (
    <div 
      className="w-full max-w-2xl mx-auto glass-premium p-8 sm:p-12 rounded-[2.5rem] border-white/60 relative overflow-hidden"
      role="main"
      aria-label="Quiz de Auditoria de Crédito MCMV"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl -z-10" />
      
      {/* Progress Bar Premium */}
      <div className="mb-10 relative">
        <div className="flex justify-between items-end mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue/60">
            Fase de Qualificação: {Math.round(((currentStep + 1) / (quizSteps.length + 2)) * 100)}%
          </span>
          <span className="text-[10px] font-bold text-slate-400 font-display uppercase tracking-widest">Auditoria MCMV 2026</span>
        </div>
        <div 
          className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50"
          role="progressbar"
          aria-valuenow={Math.round(((currentStep + 1) / (quizSteps.length + 2)) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso da Auditoria"
        >
          <motion.div 
            className="bg-brand-blue h-full relative"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / (quizSteps.length + 2)) * 100}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-blue blur-md rounded-full shadow-[0_0_15px_rgba(0,90,156,0.5)]" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep < quizSteps.length ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step.id === 3 && (
              <div 
                className="flex items-center gap-2 mb-4 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100"
                role="alert"
              >
                <AlertCircle size={18} aria-hidden="true" />
                <p className="text-sm font-medium">{step.alert}</p>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 mb-8 leading-tight">
              {step.title}
            </h2>

            <div className="space-y-4">
              {step.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option.value)}
                  aria-label={`Selecionar opção: ${option.text}`}
                  className="w-full text-left p-6 rounded-[1.5rem] border border-slate-100 bg-white/50 hover:bg-white hover:border-brand-blue/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all group flex items-center justify-between relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-base font-bold text-slate-700 group-hover:text-brand-blue transition-colors relative z-10">
                    {option.text}
                  </span>
                  <ChevronRight 
                    className="text-slate-300 group-hover:text-brand-blue transition-all group-hover:translate-x-1 relative z-10" 
                    size={20} 
                  />
                </button>
              ))}
            </div>
          </motion.div>
        ) : isEmotionStep ? (
          <motion.div
            key="emotion-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
             <div className="bg-brand-blue/5 p-5 rounded-[1.5rem] mb-8 flex gap-4 items-start border border-brand-blue/10 backdrop-blur-sm">
                <MessageSquare className="text-brand-blue shrink-0 mt-1" size={24} aria-hidden="true" />
                <p className="text-sm text-slate-600 leading-relaxed font-bold">
                  <span className="text-brand-blue uppercase tracking-tighter text-[10px] block mb-1">Diagnóstico Emocional</span>
                  Sua motivação é o que acelera o subsídio. Descreva com sinceridade para nossos auditores.
                </p>
             </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label 
                  id="motivation-label"
                  className="text-lg font-display font-bold text-slate-800"
                >
                  Qual sua maior motivação para sair de onde mora hoje?
                </label>
                <textarea
                  required
                  rows={2}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  aria-labelledby="motivation-label"
                  placeholder="Ex: Quarto pros meus filhos, segurança, parar de queimar dinheiro com aluguel..."
                  className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-colors font-medium text-slate-800 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label 
                  id="feelings-label"
                  className="text-lg font-display font-bold text-slate-800"
                >
                  Como você se sente sabendo que pode parar de pagar aluguel este mês?
                </label>
                <textarea
                  required
                  rows={2}
                  value={feelings}
                  onChange={(e) => setFeelings(e.target.value)}
                  aria-labelledby="feelings-label"
                  placeholder="Descreva seu sentimento agora..."
                  className="w-full p-5 rounded-2xl border border-slate-200 bg-white/50 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 focus:outline-none transition-all font-bold text-slate-800 resize-none placeholder:font-medium placeholder:text-slate-300"
                />
              </div>

              <button
                type="button"
                onClick={handleNextEmotion}
                disabled={!motivation || !feelings}
                className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                Próximo Passo
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="contact-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 mb-4 leading-tight flex items-center gap-3">
              Análise em Fase Final <Rocket className="text-brand-blue" size={28} />
            </h2>
            <p className="text-slate-500 mb-8 font-medium">
              Informe seus dados para que nosso time de auditores entre em contato com seu veredito:
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Seu Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
                  <input
                    required
                    type="text"
                    id="name-input"
                    aria-label="Seu Nome Completo"
                    placeholder="Ex: João Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-colors font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp de Contato</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
                  <input
                    required
                    type="tel"
                    id="whatsapp-input"
                    aria-label="WhatsApp de Contato"
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-colors font-medium text-slate-800"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-light hover:shadow-[0_20px_40px_rgba(0,90,156,0.3)] text-white font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    FINALIZAR AUDITORIA 
                    <ShieldCheck size={26} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-center gap-2 text-slate-400">
        <ShieldCheck size={16} />
        <span className="text-xs">Seus dados da Caixa Econômica estão protegidos via criptografia.</span>
      </div>
    </div>
  );
}
