import { FormEvent, useEffect, useMemo, useState } from 'react'

type Section = {
  id: number
  title: string
  description: string
  type: string
  active: boolean
}

type Lead = {
  email: string
  createdAt: string
  approved: boolean
}

const defaultSections: Section[] = [
  {
    id: 1,
    title: 'A mentalidade que cria impérios',
    description: 'O primeiro movimento para transformar atenção em autoridade digital.',
    type: 'Aula exclusiva',
    active: true,
  },
  {
    id: 2,
    title: 'O código da viralização',
    description: 'Descubra como criar ideias que as pessoas sentem vontade de compartilhar.',
    type: 'Playbook',
    active: true,
  },
  {
    id: 3,
    title: 'Construa sua máquina de influência',
    description: 'Uma visão prática para organizar conteúdo, comunidade e conversão.',
    type: 'Em breve',
    active: false,
  },
]

const initialLeads: Lead[] = [
  { email: 'criador@exemplo.com', createdAt: 'Hoje, 09:41', approved: true },
  { email: 'imperio@exemplo.com', createdAt: 'Ontem, 18:20', approved: false },
]

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [view, setView] = useState<'site' | 'admin'>('site')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sections, setSections] = useState<Section[]>(() => readStorage('viral-meet-sections', defaultSections))
  const [leads, setLeads] = useState<Lead[]>(() => readStorage('viral-meet-leads', initialLeads))
  const [newSection, setNewSection] = useState('')

  useEffect(() => {
    localStorage.setItem('viral-meet-sections', JSON.stringify(sections))
  }, [sections])

  useEffect(() => {
    localStorage.setItem('viral-meet-leads', JSON.stringify(leads))
  }, [leads])

  const activeSections = useMemo(() => sections.filter((section) => section.active), [sections])

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !normalizedEmail.includes('@')) return
    if (!leads.some((lead) => lead.email === normalizedEmail)) {
      setLeads((current) => [
        { email: normalizedEmail, createdAt: 'Agora', approved: false },
        ...current,
      ])
    }
    setSubmitted(true)
    setEmail('')
  }

  function copyLink() {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  function addSection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newSection.trim()
    if (!title) return
    setSections((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        description: 'Novo conteúdo preparado para o seu próximo movimento.',
        type: 'Conteúdo novo',
        active: true,
      },
    ])
    setNewSection('')
  }

  function toggleSection(id: number) {
    setSections((current) => current.map((section) => section.id === id ? { ...section, active: !section.active } : section))
  }

  function toggleLead(emailToUpdate: string) {
    setLeads((current) => current.map((lead) => lead.email === emailToUpdate ? { ...lead, approved: !lead.approved } : lead))
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#080706] text-[#f8f1df]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(201,158,67,0.2),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(131,87,19,0.13),transparent_32%)]" />
      <header className="relative z-10 border-b border-[#c7a14a]/15 bg-[#080706]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <button onClick={() => setView('site')} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8b45e] bg-[#c99b35] text-lg font-black text-[#171006] shadow-[0_0_24px_rgba(201,155,53,0.3)]">V</span>
            <span><strong className="block text-sm tracking-[0.28em] text-[#efd083]">VIRAL MEET</strong><small className="text-[10px] uppercase tracking-[0.25em] text-[#9b8c6c]">by fortuning</small></span>
          </button>
          <nav className="flex items-center gap-3 text-sm">
            <button onClick={copyLink} className="hidden rounded-full border border-[#c7a14a]/25 px-4 py-2 text-[#cdbd9a] transition hover:border-[#e1bd61] hover:text-white sm:block">{copied ? 'Link copiado' : 'Copiar meu link'}</button>
            <button onClick={() => setView(view === 'site' ? 'admin' : 'site')} className="rounded-full bg-[#d3a946] px-4 py-2 font-bold text-[#1b1205] transition hover:bg-[#f0c968]">{view === 'site' ? 'Painel' : 'Ver página'}</button>
          </nav>
        </div>
      </header>

      {view === 'site' ? (
        <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <section className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
            <div className="max-w-2xl">
              <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d9b65c]"><span className="h-px w-10 bg-[#d9b65c]" />O próximo império começa aqui</div>
              <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.05em] text-[#fff8e9] sm:text-7xl">Pare de assistir.<br /><span className="bg-gradient-to-r from-[#fff0b0] via-[#d3a542] to-[#8e641b] bg-clip-text text-transparent">Comece a viralizar.</span></h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#afa187]">Um encontro reservado para quem quer transformar ideias em movimento, audiência em comunidade e presença digital em um império.</p>
              <form onSubmit={handleLeadSubmit} className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Digite seu melhor e-mail" className="min-h-14 flex-1 rounded-xl border border-[#c7a14a]/25 bg-[#17130c]/80 px-5 text-[#fff8e9] outline-none placeholder:text-[#756b56] focus:border-[#e3ba54]" required />
                <button className="min-h-14 rounded-xl bg-[#d3a946] px-7 font-black text-[#1c1305] shadow-[0_10px_35px_rgba(200,156,51,0.2)] transition hover:-translate-y-0.5 hover:bg-[#f0c968]">Quero entrar</button>
              </form>
              {submitted && <p className="mt-3 text-sm text-[#d9b65c]">Seu interesse foi registrado. Aguarde a liberação do próximo movimento.</p>}
              <div className="mt-10 flex items-center gap-8 text-xs uppercase tracking-[0.16em] text-[#756b56]"><span><b className="text-xl text-[#d9b65c]">01</b><br />Visão</span><span><b className="text-xl text-[#d9b65c]">02</b><br />Estratégia</span><span><b className="text-xl text-[#d9b65c]">03</b><br />Influência</span></div>
            </div>
            <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center">
              <div className="absolute inset-[9%] rounded-full border border-[#c89d42]/30" /><div className="absolute inset-[17%] rounded-full border border-dashed border-[#c89d42]/25" /><div className="absolute h-72 w-72 rounded-full bg-[#b17a20]/15 blur-3xl" />
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#e2b957]/50 bg-gradient-to-br from-[#d5a83e]/35 to-[#241706]/80 shadow-[0_0_100px_rgba(201,155,53,0.22)] sm:h-80 sm:w-80"><div className="text-center"><div className="text-8xl font-black tracking-[-0.15em] text-[#e8bd5a]">V</div><p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#e7d5a5]">build the empire</p></div></div>
              <span className="absolute left-0 top-1/4 rounded-full border border-[#c7a14a]/20 bg-[#151108]/80 px-4 py-2 text-xs text-[#cbb77e] backdrop-blur">ATENÇÃO → ATIVOS</span><span className="absolute bottom-1/4 right-0 rounded-full border border-[#c7a14a]/20 bg-[#151108]/80 px-4 py-2 text-xs text-[#cbb77e] backdrop-blur">IDEIAS QUE MOVEM</span>
            </div>
          </section>

          <section className="border-t border-[#c7a14a]/15 py-16"><div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9b65c]">Acesso ao movimento</p><h2 className="mt-3 text-3xl font-bold text-[#fff8e9]">Conteúdos para sair do comum.</h2></div><span className="hidden text-sm text-[#756b56] sm:block">{activeSections.length.toString().padStart(2, '0')} experiências disponíveis</span></div><div className="grid gap-4 md:grid-cols-3">{activeSections.map((section, index) => <article key={section.id} className="group rounded-2xl border border-[#c7a14a]/15 bg-[#11100c]/80 p-6 transition hover:-translate-y-1 hover:border-[#c7a14a]/50"><div className="mb-12 flex items-center justify-between"><span className="text-4xl font-black text-[#40331b]">0{index + 1}</span><span className="rounded-full border border-[#c7a14a]/20 px-3 py-1 text-[10px] uppercase tracking-wider text-[#c9aa61]">{section.type}</span></div><h3 className="text-xl font-bold text-[#f5e7c1]">{section.title}</h3><p className="mt-3 text-sm leading-6 text-[#988b70]">{section.description}</p><div className="mt-6 text-sm font-bold text-[#d9b65c] opacity-70 transition group-hover:opacity-100">Acessar conteúdo →</div></article>)}</div></section>
        </main>
      ) : (
        <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-10"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9b65c]">Central de comando</p><h1 className="mt-3 text-4xl font-black text-[#fff8e9]">Seu império, em movimento.</h1><p className="mt-2 text-[#988b70]">Gerencie acessos, conteúdos e o ritmo da sua comunidade.</p></div><button onClick={copyLink} className="rounded-xl border border-[#c7a14a]/30 px-5 py-3 text-sm font-bold text-[#e4c36e] hover:bg-[#c7a14a]/10">{copied ? 'Link copiado!' : 'Copiar link público'}</button></div><div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-[#c7a14a]/15 bg-[#11100c] p-5"><p className="text-sm text-[#988b70]">Pessoas interessadas</p><p className="mt-3 text-4xl font-black text-[#e4c36e]">{leads.length}</p></div><div className="rounded-2xl border border-[#c7a14a]/15 bg-[#11100c] p-5"><p className="text-sm text-[#988b70]">Acessos liberados</p><p className="mt-3 text-4xl font-black text-[#e4c36e]">{leads.filter((lead) => lead.approved).length}</p></div><div className="rounded-2xl border border-[#c7a14a]/15 bg-[#11100c] p-5"><p className="text-sm text-[#988b70]">Conteúdos ativos</p><p className="mt-3 text-4xl font-black text-[#e4c36e]">{activeSections.length}</p></div></div><div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><section className="rounded-2xl border border-[#c7a14a]/15 bg-[#11100c] p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-bold text-[#f5e7c1]">Lista de interessados</h2><p className="mt-1 text-sm text-[#756b56]">Aprove ou aguarde cada novo acesso.</p></div><span className="rounded-full bg-[#c7a14a]/10 px-3 py-1 text-xs text-[#d9b65c]">{leads.length} leads</span></div><div className="space-y-3">{leads.map((lead) => <div key={lead.email} className="flex flex-col gap-3 rounded-xl border border-[#c7a14a]/10 bg-[#17130c] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium text-[#eadcbb]">{lead.email}</p><p className="mt-1 text-xs text-[#756b56]">Entrou {lead.createdAt}</p></div><button onClick={() => toggleLead(lead.email)} className={`rounded-lg px-3 py-2 text-xs font-bold ${lead.approved ? 'bg-[#c7a14a]/15 text-[#d9b65c]' : 'bg-[#d3a946] text-[#1c1305]'}`}>{lead.approved ? 'Acesso liberado' : 'Liberar acesso'}</button></div>)}</div></section><section className="rounded-2xl border border-[#c7a14a]/15 bg-[#11100c] p-6"><h2 className="text-xl font-bold text-[#f5e7c1]">Sessões da plataforma</h2><p className="mt-1 text-sm text-[#756b56]">Configure o que aparece no seu link.</p><form onSubmit={addSection} className="mt-5 flex gap-2"><input value={newSection} onChange={(event) => setNewSection(event.target.value)} placeholder="Nome da nova sessão" className="min-w-0 flex-1 rounded-lg border border-[#c7a14a]/20 bg-[#17130c] px-3 py-3 text-sm outline-none placeholder:text-[#756b56] focus:border-[#d9b65c]" /><button className="rounded-lg bg-[#d3a946] px-4 font-bold text-[#1c1305]">Adicionar</button></form><div className="mt-5 space-y-3">{sections.map((section) => <div key={section.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#c7a14a]/10 p-4"><div><p className="text-sm font-bold text-[#eadcbb]">{section.title}</p><p className="mt-1 text-xs text-[#756b56]">{section.type}</p></div><button onClick={() => toggleSection(section.id)} className={`relative h-6 w-11 rounded-full transition ${section.active ? 'bg-[#cfa541]' : 'bg-[#403a2d]'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-[#fff7df] transition ${section.active ? 'left-6' : 'left-1'}`} /></button></div>)}</div></section></div></main>
      )}
      <footer className="relative z-10 border-t border-[#c7a14a]/10 px-6 py-8 text-center text-xs uppercase tracking-[0.2em] text-[#625943]">Viral Meet · transforme presença em legado</footer>
    </div>
  )
}
