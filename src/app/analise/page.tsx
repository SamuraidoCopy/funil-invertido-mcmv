export default function AnaliseEducativa() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-4">
          Atenção com a Regulamentação da Caixa
        </h1>
        
        <p className="text-slate-600 text-lg mb-8">
          Notamos que você informou possuir restrições no CPF (SPC/Serasa). O programa Minha Casa Minha Vida e a Caixa Econômica Federal possuem **tolerância zero** para aprovação de crédito com restrições ativas. 
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl text-left border border-slate-200 mb-8">
          <h3 className="font-bold text-slate-800 mb-2">Seu Plano de Ação:</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>Acesse o App do Serasa ou Feirão Limpa Nome.</li>
            <li>Renegocie a dívida (muitas vezes com até 90% de desconto).</li>
            <li>Assim que o comprovante de quitação sair, retorne aqui.</li>
          </ol>
        </div>

        <button className="bg-slate-800 text-white font-medium px-8 py-4 rounded-xl hover:bg-slate-900 transition-colors">
          Entendi, vou regularizar
        </button>
      </div>
    </main>
  );
}
