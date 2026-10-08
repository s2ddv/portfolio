const projects = [
  {
    number: '01', category: 'FINTECH · FULL STACK', name: 'Astra Wealth',
    summary: 'Uma visão mais clara do patrimônio.',
    description: 'Plataforma em desenvolvimento para acompanhar patrimônio, carteiras, mercados e notícias. O projeto combina uma interface em Next.js com APIs em Fastify e Rust, além de PostgreSQL. O overview ainda usa dados simulados; dados de cripto em Markets vêm do CoinGecko.',
    tags: ['Next.js', 'TypeScript', 'Rust / Axum', 'PostgreSQL'],
    link: 'https://github.com/s2ddv/astra-wealth', linkLabel: 'Explorar código do Astra Wealth',
    visual: 'astra', note: 'Produto em desenvolvimento',
  },
  {
    number: '02', category: 'QUANT · PESQUISA APLICADA', name: 'Monte Carlo GBM',
    summary: 'Modelando cenários, não certezas.',
    description: 'Simulador de preços de ativos em Python baseado em movimento browniano geométrico. Estima parâmetros com dados históricos e explora trajetórias futuras, distribuições de resultados e métricas de risco como VaR e CVaR. Parte de um estudo independente de finanças quantitativas.',
    tags: ['Python', 'NumPy', 'GBM', 'VaR / CVaR'],
    link: 'https://github.com/s2ddv/monte-carlo-gbm', linkLabel: 'Explorar código do Monte Carlo GBM',
    visual: 'quant', note: 'Pesquisa em desenvolvimento',
  },
]

function ProjectVisual({ type }) {
  if (type === 'astra') return <div className="visual astra-visual" aria-hidden="true"><div className="visual-top"><span>ASTRA / OVERVIEW</span><span>◌</span></div><div className="visual-symbol">✳</div><div className="visual-line"/><div className="visual-caption">PATRIMÔNIO · MERCADOS · CARTEIRAS</div></div>
  return <div className="visual quant-visual" aria-hidden="true"><div className="visual-top"><span>MONTE CARLO / GBM</span><span>μ · σ</span></div><svg viewBox="0 0 500 230" preserveAspectRatio="none"><path d="M0 180 C65 174 75 130 130 146 S205 100 250 110 S320 58 370 73 S440 32 500 18"/><path d="M0 180 C60 171 87 188 130 154 S203 166 250 122 S320 130 370 106 S440 145 500 120"/><path d="M0 180 C66 178 90 152 130 166 S195 192 250 172 S315 203 370 181 S445 204 500 196"/><path d="M0 180 C60 180 95 195 130 178 S200 132 250 148 S320 104 370 136 S440 93 500 83"/></svg><div className="visual-caption">CENÁRIOS POSSÍVEIS · RISCO DE CAUDA</div></div>
}

export default function App() {
  return <>
    <a className="skip-link" href="#main">Ir para o conteúdo</a>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Samuel Barbosa, voltar ao início">SB<span className="wordmark-dot">.</span></a><nav aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#projetos">Projetos</a><a href="#contato">Contato</a></nav><span className="header-side">ENGENHARIA DE SOFTWARE</span></header>
    <main id="main">
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="signal"/> SAMUEL BARBOSA / SOFTWARE ENGINEER</p><h1>Construo software para <em>entender o que importa.</em></h1><p className="hero-lead">Produto, sistemas e finanças quantitativas. Transformo problemas complexos em experiências claras e engenharia que se pode examinar.</p><div className="hero-actions"><a className="button button-primary" href="#projetos">Ver projetos <span aria-hidden="true">↗</span></a><a className="button button-text" href="#contato">Entrar em contato <span aria-hidden="true">→</span></a></div></div><div className="hero-mark" aria-hidden="true"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="mark-core">S<span>.</span>B</span><span className="mark-label">BUILD · MEASURE · REFINE</span></div><div className="hero-foot"><span>FULL STACK / QUANT</span><span>SCROLL PARA EXPLORAR ↓</span></div></section>
      <section className="intro section-shell" id="sobre"><div className="section-label">01 / SOBRE</div><div><h2>Curiosidade técnica com foco em <em>uso real.</em></h2><p>Trabalho entre interface, backend e dados. No Astra Wealth, exploro como tornar informações financeiras compreensíveis. No Monte Carlo GBM, estudo modelos probabilísticos e risco com código aberto e metodologia explícita.</p></div></section>
      <section className="work section-shell" id="projetos"><div className="section-label">02 / PROJETOS SELECIONADOS</div><div className="work-content"><div className="work-heading"><h2>Trabalho em destaque<span className="accent-dot">.</span></h2><p>Do produto à modelagem quantitativa.</p></div>{projects.map(project => <article className="project" key={project.number}><ProjectVisual type={project.visual}/><div className="project-copy"><div className="project-kicker"><span>{project.number} / {project.category}</span><span>{project.note}</span></div><h3>{project.name}</h3><p className="project-summary">{project.summary}</p><p className="project-description">{project.description}</p><ul className="tag-list" aria-label="Tecnologias">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.linkLabel} (abre em nova aba)`}>Ver repositório <span aria-hidden="true">↗</span></a></div></article>)}</div></section>
      <section className="contact section-shell" id="contato"><div className="section-label">03 / CONTATO</div><div><p className="eyebrow">TEM UMA IDEIA EM MENTE?</p><h2>Vamos construir <em>algo útil.</em></h2><a className="button button-primary" href="mailto:souzasam2008@gmail.com">Enviar e-mail <span aria-hidden="true">↗</span></a></div></section>
    </main><footer><span>© {new Date().getFullYear()} SAMUEL BARBOSA</span><a href="https://github.com/s2ddv" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="#top">VOLTAR AO TOPO ↑</a></footer>
  </>
}
