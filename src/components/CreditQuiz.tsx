"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, AlertCircle, Phone, User, Loader2, Heart, MessageSquare } from "lucide-react";
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
    <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/70 p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue/80">
            Fase de Qualificação: Passo {currentStep + 1} de {quizSteps.length + 2}
          </span>
          <span className="text-xs font-medium text-slate-400 font-display">Auditoria MCMV 2026</span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-brand-blue h-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / (quizSteps.length + 2)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
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
              <div className="flex items-center gap-2 mb-4 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <AlertCircle size={18} />
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
                  className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-brand-blue hover:bg-slate-50 transition-all group flex items-center justify-between"
                >
                  <span className="text-base font-medium text-slate-700 group-hover:text-brand-blue transition-colors">
                    {option.text}
                  </span>
                  <ChevronRight 
                    className="text-slate-300 group-hover:text-brand-blue transition-transform group-hover:translate-x-1" 
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
             <div className="bg-brand-blue/5 p-4 rounded-2xl mb-8 flex gap-3 items-start border border-brand-blue/10">
                <MessageSquare className="text-brand-blue shrink-0 mt-1" size={20} />
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  <strong>Pergunta Crucial para o Consórcio:</strong> Descreva abaixo com o máximo de detalhes para nossa equipe de análise.
                </p>
             </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-lg font-display font-bold text-slate-800">
                  Qual sua maior motivação para sair de onde mora hoje?
                </label>
                <textarea
                  required
                  rows={2}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Ex: Quarto pros meus filhos, segurança, parar de queimar dinheiro com aluguel..."
                  className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-colors font-medium text-slate-800 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-display font-bold text-slate-800">
                  Como você se sente sabendo que pode parar de pagar aluguel este mês?
                </label>
                <textarea
                  required
                  rows={2}
                  value={feelings}
                  onChange={(e) => setFeelings(e.target.value)}
                  placeholder="Descreva seu sentimento agora..."
                  className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-brand-blue focus:outline-none transition-colors font-medium text-slate-800 resize-none"
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
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 mb-4 leading-tight">
              Análise em Fase Final! 🚀
            </h2>
            <p className="text-slate-500 mb-8 font-medium">
              Informe seus dados para que nosso time de auditores entre em contato com seu veredito:
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Seu Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    required
                    type="text"
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
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    required
                    type="tel"
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
                className="w-full bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-5 rounded-2xl shadow-lg shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Enviar Para Auditoria 
                    <ShieldCheck size={24} />
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
