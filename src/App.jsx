const projects = [
  {
    name: 'Astra Wealth',
    kind: 'Produto digital · Full stack',
    status: 'Em desenvolvimento',
    headline: 'Clareza para decisões financeiras.',
    description: 'Plataforma em desenvolvimento para acompanhar patrimônio, carteiras e mercados. Trabalho na experiência em Next.js e nas APIs em Fastify e Rust, com dados em PostgreSQL. O overview ainda usa dados simulados; os dados de cripto em Markets vêm do CoinGecko.',
    stack: ['Next.js', 'TypeScript', 'Rust', 'PostgreSQL'],
    href: 'https://github.com/s2ddv/astra-wealth',
    visual: 'astra',
  },
  {
    name: 'Monte Carlo GBM',
    kind: 'Pesquisa aplicada · Finanças quantitativas',
    status: 'Pesquisa em desenvolvimento',
    headline: 'Explorar cenários, entender riscos.',
    description: 'Estudo independente em Python que simula trajetórias de preços com movimento browniano geométrico. Estima parâmetros a partir de dados históricos e examina distribuições de resultados, VaR e CVaR.',
    stack: ['Python', 'NumPy', 'GBM', 'VaR / CVaR'],
    href: 'https://github.com/s2ddv/monte-carlo-gbm',
    visual: 'quant',
  },
]

function ProjectVisual({ type }) {
  if (type === 'astra') return <div className="project-visual astra-visual" aria-hidden="true">
    <div className="visual-window">
      <div className="visual-top"><span>ASTRA / VISÃO GERAL</span><span>•••</span></div>
      <div className="visual-title"><small>Patrimônio total</small><strong>Uma visão<br />mais clara.</strong></div>
      <div className="visual-bars">{[38, 61, 47, 72, 58, 86, 73, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
      <div className="visual-bottom"><span>CARTEIRAS</span><span>MERCADOS</span><span>CONTAS</span></div>
    </div>
  </div>
  return <div className="project-visual quant-visual" aria-hidden="true">
    <div className="visual-top"><span>MONTE CARLO / GBM</span><span>μ · σ</span></div>
    <svg viewBox="0 0 600 260" preserveAspectRatio="none">
      <path d="M0 191 C45 190 65 178 95 180 S155 169 190 145 S235 146 280 118 S335 123 365 76 S420 82 458 50 S535 55 600 14" />
      <path d="M0 191 C40 189 62 182 95 186 S155 199 190 174 S243 190 280 164 S330 180 365 145 S420 179 458 157 S530 160 600 125" />
      <path d="M0 191 C47 190 65 194 95 201 S154 189 190 218 S244 200 280 227 S336 202 365 231 S420 211 458 238 S530 214 600 245" />
      <path d="M0 191 C43 190 64 177 95 187 S150 176 190 185 S240 159 280 177 S335 139 365 165 S420 130 458 140 S535 107 600 92" />
    </svg>
    <div className="visual-bottom"><span>TRAJETÓRIAS POSSÍVEIS</span><span>RISCO DE CAUDA ↗</span></div>
  </div>
}

export default function App() {
  return <>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <header className="site-header" id="inicio">
      <a className="brand" href="#inicio" aria-label="Samuel Barbosa, início">Samuel Barbosa<span>.</span></a>
      <nav aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#projetos">Projetos</a><a href="#contato">Contato</a></nav>
    </header>
    <main id="conteudo">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-inner">
        <p className="hero-kicker"><span /> Quantitative Analyst · Modelos e dados</p>
        <h1 id="hero-title">Samuel<br /><span>Barbosa</span><span className="hero-period">.</span></h1>
        <div className="hero-bottom"><p>Transformo dados, modelos e sistemas em análises mais claras para decisões melhores.</p><a className="primary-link" href="#projetos">Conheça meu trabalho <span aria-hidden="true">↗</span></a></div>
      </div></section>
      <section className="about section-wrap" id="sobre" aria-labelledby="about-title">
        <div className="section-meta"><span>01</span><span>Sobre</span></div>
        <div><h2 id="about-title">Da interface ao sistema, <span>com propósito.</span></h2>
          <div className="about-body"><p>Gosto de aproximar engenharia, design e dados. Meu trabalho passa por interfaces que ajudam pessoas a entender informação, APIs que sustentam produtos e pesquisa aplicada em finanças quantitativas.</p><p>Aqui estão dois projetos que mostram como penso: construir, medir e explicar cada escolha com clareza.</p></div>
        </div>
      </section>
      <section className="projects section-wrap" id="projetos" aria-labelledby="projects-title">
        <div className="section-meta"><span>02</span><span>Projetos</span></div>
        <div><div className="section-heading"><h2 id="projects-title">Trabalho selecionado<span>.</span></h2><p>Produto real e pesquisa aberta.</p></div>
          <div className="project-list">{projects.map(project => <article className="project" key={project.name}>
            <ProjectVisual type={project.visual} />
            <div className="project-info"><div className="project-topline"><span>{project.kind}</span><span>{project.status}</span></div>
              <h3>{project.name}</h3><p className="project-headline">{project.headline}</p><p className="project-description">{project.description}</p>
              <ul className="stack" aria-label={`Tecnologias do ${project.name}`}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
              <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">Explorar projeto <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a>
            </div>
          </article>)}</div>
        </div>
      </section>
      <section className="contact section-wrap" id="contato" aria-labelledby="contact-title">
        <div className="section-meta"><span>03</span><span>Contato</span></div>
        <div><p>Vamos conversar?</p><h2 id="contact-title">Boas ideias começam com uma conversa<span>.</span></h2><a className="contact-link" href="mailto:souzasam2008@gmail.com">Enviar um e-mail <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Samuel Barbosa</span><div><a href="https://github.com/s2ddv" target="_blank" rel="noopener noreferrer">GitHub ↗<span className="sr-only"> (abre em nova aba)</span></a><a href="#inicio">Voltar ao topo ↑</a></div></footer>
  </>
}
