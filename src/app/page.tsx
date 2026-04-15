import CreditQuiz from "@/components/CreditQuiz";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white/20">
      
      {/* Background Decorativo - Intensified Mesh Feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* Cabecalho Institucional Premium */}
        <div className="text-center mb-12 max-w-4xl px-4">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-widest animate-fade-in">
            Programa Oficial MCMV 2026
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            Libere até <span className="text-gradient-blue relative inline-block">R$ 55.000<svg className="absolute -bottom-2 left-0 w-full h-4 text-brand-blue-light/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="6" fill="none"/></svg></span> de Subsídio Governamental
          </h1>
          <p className="text-lg sm:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Faça a análise antecipada e veja se o seu CPF se enquadra na <span className="text-slate-800 font-bold">faixa Ouro</span> do novo MCMV em menos de 45 segundos.
          </p>
        </div>

        {/* Foco Central - O Quiz com Glassmorphism Avançado */}
        <div className="w-full relative">
          <div className="absolute inset-0 bg-brand-blue/5 blur-[60px] rounded-full -z-10 opacity-30" />
          <CreditQuiz />
        </div>

      </div>
    </main>
  );
}
