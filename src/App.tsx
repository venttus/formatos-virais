import { useState } from 'react'

const conversationStorageKeys = [
  'conversation',
  'conversation-data',
  'chat-messages',
  'chat_history',
]

function clearConversationData() {
  conversationStorageKeys.forEach((key) => localStorage.removeItem(key))
}

export default function App() {
  const [cleared, setCleared] = useState(false)

  function handleStartOver() {
    clearConversationData()
    setCleared(true)
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-3xl items-center justify-center">
        <section className="w-full rounded-3xl border border-slate-800 bg-panel p-8 shadow-2xl shadow-slate-950/30 sm:p-12">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-lg font-bold text-slate-950">
              S
            </div>
            <div>
              <p className="text-sm font-medium text-accent">Shark Git</p>
              <p className="text-xs text-muted">Espaço de conversa</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Tudo pronto
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Vamos começar do zero.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Os dados locais desta conversa foram removidos. Comece uma nova
              conversa quando quiser.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleStartOver}
              className="rounded-xl bg-accent px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-panel"
            >
              Excluir dados e iniciar do zero
            </button>
            {cleared && (
              <span className="text-sm text-emerald-400" role="status">
                Dados locais removidos com sucesso.
              </span>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
