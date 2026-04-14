import CreditQuiz from "@/components/CreditQuiz";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      
      {/* Background Decorativo - Glassmorphism base */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-blue-light/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-green-light/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        
        {/* Cabecalho Institucional */}
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-slate-800 tracking-tight leading-tight mb-6">
            Libere até <span className="text-brand-blue relative whitespace-nowrap">R$ 55.000<svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue-light/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg></span> de Subsídio Governamental
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Faça a análise antecipada e veja se o seu CPF se enquadra na faixa Ouro do novo MCMV em menos de 45 segundos.
          </p>
        </div>

        {/* Foco Central - O Quiz */}
        <div className="w-full">
          <CreditQuiz />
        </div>

      </div>
    </main>
  );
}
