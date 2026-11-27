// links do menu usam href="#" só para serem clicáveis; não deixam o "#" aparecer no endereço
document.addEventListener('click', e => {
  if (e.target.closest('a[href="#"]')) e.preventDefault();
});
if (location.href.includes('#')) history.replaceState(null, '', location.pathname + location.search);

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('escondida');
  } else {
    nav.classList.remove('escondida');
  }
});

// HOME: imagens da pasta Capas_Home empilhadas na tela inteira. Quem abre o site vê a primeira;
// mexer o mouse para a direita e para baixo vai avançando pelas imagens, em ordem,
// até a última no canto de baixo à direita. No celular, arrastar o dedo faz o mesmo.
const HOME_IMAGENS = [1, 2, 3, 4, 5, 6, 7].map(n => `imagens/home/home-${n}.jpg?v=2`);
// cor do S e do menu em cada imagem (a 2 é o amarelo dos + da revista na foto)
const HOME_CORES = ['#111111', '#E6D934', '#FF3600', '#E53030', '#B7D159', '#FF9843', '#E51381'];
const NAV_COR_PADRAO = '#FF568D';

function corDoMenu(cor) {
  document.querySelector('nav').style.setProperty('--nav-cor', cor);
}
let homeEls = [];
let homeAtual = 0;

function iniciarHome() {
  const cena = document.getElementById('home-imagens');
  if (!homeEls.length) {
    HOME_IMAGENS.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.draggable = false;
      if (i === 0) img.classList.add('visivel');
      cena.appendChild(img);
      homeEls.push(img);
    });
    const mover = (x, y) => {
      if (!document.getElementById('home').classList.contains('ativa')) return;
      const progresso = (x / window.innerWidth + y / window.innerHeight) / 2; // 0 = canto de cima à esquerda, 1 = canto de baixo à direita
      mostrarImagemHome(Math.floor(progresso * HOME_IMAGENS.length));
    };
    window.addEventListener('mousemove', e => mover(e.clientX, e.clientY));
    cena.addEventListener('touchmove', e => { const t = e.touches[0]; mover(t.clientX, t.clientY); }, { passive: true });
  }
  mostrarImagemHome(0); // toda vez que a home aparece, começa pela primeira
  corDoMenu(HOME_CORES[homeAtual]);
}

function mostrarImagemHome(i) {
  i = Math.max(0, Math.min(HOME_IMAGENS.length - 1, i));
  if (i === homeAtual) return;
  homeEls[homeAtual].classList.remove('visivel');
  homeEls[i].classList.add('visivel');
  homeAtual = i;
  corDoMenu(HOME_CORES[i]);
}

function mostrarPagina(id) {
  document.querySelectorAll('.pagina').forEach(p => p.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
  document.querySelectorAll('nav ul li a').forEach(a => a.classList.toggle('ativa', a.dataset.pagina === id));
  if (id !== 'projeto-expandido') atualizarEndereco(ROTA_DA_PAGINA[id], TITULO_SITE);
  if (id === 'home') {
    document.body.classList.add('home-ativa');
    iniciarHome();
  } else {
    document.body.classList.remove('home-ativa');
    corDoMenu(NAV_COR_PADRAO);
  }
  // currículo só aparece quando pedem (palavra "Currículo"); trocar de aba guarda
  cvIr('escondido');
  // vídeos das capas só começam a baixar quando a aba Projetos é aberta
  if (id === 'projetos') carregarAdiados(document.getElementById('projetos'));
}

const projetos = [
  {
    id: 'cosmo',
    titulo: 'Cosmo Font',
    ano: '2025',
    subtitulo: 'Tipografia inspirada em taças de coquetel',
    subtitulo_en: 'A typeface inspired by cocktail glasses',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2025' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Leopoldo Leal' },
      { pt: 'Créditos', en: 'Credits', valor: 'Sophia Rezende' }
    ],
    areas: 'Tipografia, editorial, branding',
    areas_en: 'Typography, editorial, branding',
    descricao: 'Cosmo é uma tipografia serifada condensada desenvolvida ao longo de um semestre inteiro, do estudo de princípios até a construção no Glyphs. O processo começou à mão, com muitos testes e explorações até a definição da direção formal, com orientação do designer tipográfico Leopoldo Leal.<br><br>A inspiração parte das taças de coquetel, traduzida em serifas alongadas, detalhes afiados e contraste médio. O resultado é uma fonte que une precisão geométrica e sofisticação.',
    descricao_en: 'Cosmo is a condensed serif typeface developed over an entire semester, from studying principles to building it in Glyphs. The process started by hand, with many tests and explorations until the formal direction was defined, under the guidance of typographic designer Leopoldo Leal.<br><br>The inspiration comes from cocktail glasses, translated into elongated serifs, sharp details, and medium contrast. The result is a typeface that combines geometric precision and sophistication, applied to a fictional brand universe built especially for it.',
    imagens: [
      'imagens/projetos/cosmo/fotos-capa.jpg',
      { comparar: ['imagens/projetos/cosmo/comparar-antes.jpg', 'imagens/projetos/cosmo/comparar-depois.jpg'] },
      { par: ['imagens/projetos/cosmo/fotos-03.jpg', 'imagens/projetos/cosmo/fotos-04.jpg', 'imagens/projetos/cosmo/fotos-negroni.jpg'], largura: 100 },  // as 3 receitas
      { src: 'imagens/projetos/cosmo/fotos-07.jpg', largura: 80 },
      { src: 'imagens/projetos/cosmo/video-drinks-loop.mp4', largura: 50 },
      { src: 'imagens/projetos/cosmo/fotos-cheers.jpg', largura: 70 },
      { src: 'imagens/projetos/cosmo/fotos-02.jpg', largura: 80 },
      { src: 'imagens/projetos/cosmo/video-construindo.mp4', largura: 50 },
      { testador: true }
    ]
  },
  {
    id: 'maismais',
    titulo: 'Revista ++',
    ano: '2025',
    subtitulo: 'Revista impressa sobre consumo digital',
    subtitulo_en: 'A printed magazine about digital consumption',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2025' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Reconhecimento', en: 'Recognition', valor: 'Mostra Estudantil ESPM', valor_en: 'ESPM Student Exhibition' },
      { pt: 'Créditos', en: 'Credits', valor: 'Dara Mielnik<br>Fernanda Casagrande<br>Gabriela Nacif<br>Juliana Nakashima<br>Sophia Rezende' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Marise De Chirico' }
    ],
    areas: 'Editorial, branding, marketing',
    areas_en: 'Editorial, branding, marketing',
    descricao: '++ (mais mais) é uma revista impressa criada a partir do tema consumo, desenvolvida com base em pesquisas extensas de público-alvo, incluindo mapa de empatia, formulários aplicados em pontos frequentados pelo público-alvo, análise PESTEL, pesquisa de concorrência e tabela de conteúdo comparativa. O desafio era questionar tanto o valor quanto o modo como a geração Z consome informação digitalmente, e a resposta foi uma publicação que propõe o oposto do feed: desacelerar, ler com intenção, ficar com o que realmente importa.<br><br>O projeto foi premiado na Mostra Estudantil da ESPM, que reconhece os melhores trabalhos do curso durante o ano. O nome parte da repetição para provocar. O símbolo ++ evoca o excesso da era digital e, ao mesmo tempo, propõe uma ruptura: não mais do mesmo, mas mais consciência, mais qualidade, mais intenção. A revista não é contra o consumo digital, mas contra o consumo acelerado e sem reflexão. Por ser impressa, existe como objeto desejado por si só, um investimento de tempo e atenção em um contexto onde a leitura virou distração.',
    descricao_en: '++ (mais mais) is a printed magazine created around the theme of consumption, developed based on extensive target-audience research, including empathy mapping, questionnaires applied at locations frequented by the target audience, PESTEL analysis, competitive research, and comparative content tables. The challenge was to question both the value and the way Generation Z consumes information digitally, and the answer was a publication that proposes the opposite of the feed: slow down, read with intention, keep what truly matters.<br><br>The project won an award at the ESPM Student Exhibition, which recognizes the best works of the year. The name plays on repetition to provoke. The ++ symbol evokes the excess of the digital era while simultaneously proposing a rupture: not more of the same, but more awareness, more quality, more intention. The magazine is not against digital consumption, but against accelerated and unreflective consumption. As a printed object, it exists as something desirable in itself — an investment of time and attention in a context where reading has become distraction.',
    imagens: [
      'imagens/projetos/maismais/fotos-01.webp',
      'imagens/projetos/maismais/video-02-digitacao.mp4',
      { src: 'imagens/projetos/maismais/fotos-revista-aberta.jpg', menor: true },
      { src: 'imagens/projetos/maismais/fotos-02.jpg', largura: 90 },
      'imagens/projetos/maismais/fotos-paginas.webp',
      { olho: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.”' },
      ['imagens/projetos/maismais/fotos-03.jpg', 'imagens/projetos/maismais/fotos-04.jpg'],
      'imagens/projetos/maismais/video-grid.mp4',
      { src: 'imagens/projetos/maismais/fotos-leitura.jpg', largura: 70 },
      { par: ['imagens/projetos/maismais/fotos-adesivos.jpg?v=2', 'imagens/projetos/maismais/fotos-notebook.jpg'], largura: 100 },
      { src: 'imagens/projetos/maismais/fotos-outdoor.jpg', largura: 87 },
      { src: 'imagens/projetos/maismais/fotos-caminhando.jpg', menor: true },
      'imagens/projetos/maismais/video-01.mp4',
      { revista: 'imagens/projetos/maismais/revista', paginas: 108, tamanho: [500, 625] }
    ]
  },
  {
    id: 'kitkat',
    titulo: 'KitKat Sugar Rush',
    ano: '2025',
    subtitulo: 'Linha de produtos ValueUp para a Nestlé',
    subtitulo_en: 'ValueUp product line for Nestlé',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2025' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Cláudia Weber' },
      { pt: 'Créditos', en: 'Credits', valor: 'Ana Beatriz Gomes<br>Beatriz Sin<br>Fernanda Casagrande<br>Sophia Rezende' }
    ],
    areas: 'Embalagem, branding',
    areas_en: 'Packaging, branding',
    descricao: 'KitKat Sugar Rush é uma linha de produto desenvolvida a partir de um briefing real da Nestlé, apresentado na ESPM. O desafio era criar uma linha ValueUp para o varejo com identidade visual voltada para a geração Z, respeitando as diretrizes e os valores da marca.<br><br>O conceito parte da adrenalina do açúcar como experiência sensorial: halftone, círculos vibrantes e fotografias reais das sobremesas criam um apelo visual imediato que equilibra energia e refinamento. O sistema se expande da embalagem individual ao tablete, ao PDV e à comunicação OOH.',
    descricao_en: 'KitKat Sugar Rush is a product line developed from a real Nestlé brief presented at ESPM. The challenge was to create a ValueUp line for retail with a visual identity aimed at Generation Z, while respecting the brand\'s guidelines and values.<br><br>The concept stems from the adrenaline of sugar as a sensory experience: halftone patterns, vibrant circles, and real photographs of the desserts create immediate visual appeal that balances energy and refinement. The system expands from individual packaging to the tablet, POS, and OOH communication.',
    imagens: [
      'imagens/projetos/kitkat/fotos-01.jpg',
      'imagens/projetos/kitkat/fotos-02.jpg',
      { src: 'imagens/projetos/kitkat/video-sugar-rush-quadrado.mp4', largura: 66.67 },
      'imagens/projetos/kitkat/fotos-06.jpg',
      'imagens/projetos/kitkat/fotos-07.jpg',
      'imagens/projetos/kitkat/fotos-08.jpg',
      'imagens/projetos/kitkat/fotos-03.jpg'
    ]
  },
  {
    id: 'ama',
    titulo: 'AMA',
    ano: '2024',
    subtitulo: 'Nova identidade visual para uma associação de apoio a pessoas autistas',
    subtitulo_en: 'A new visual identity for an association supporting autistic people',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2024' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Leopoldo Leal' },
      { pt: 'Créditos', en: 'Credits', valor: 'Ana Beatriz Gomes<br>Bárbara Luiza Troncoso<br>Beatriz Sin<br>Fernanda Casagrande<br>Sophia Rezende<br>Sue Elizabeth' }
    ],
    areas: 'Branding, identidade visual, design social',
    areas_en: 'Branding, visual identity, social design',
    descricao: 'A AMA (Associação de Amigos do Autista) é uma entidade sem fins lucrativos criada por um grupo de pais para oferecer apoio e acolhimento a famílias de pessoas autistas. O projeto foi uma reformulação da identidade visual existente, com foco em sensibilidade e humanidade.<br><br>A partir do conceito de peças que se conectam, o sistema gráfico representa a diversidade dentro do espectro e a construção coletiva do cuidado: diferentes formas, diferentes ritmos, diferentes necessidades.',
    descricao_en: 'AMA (Friends of the Autistic Association) is a non-profit organization founded by a group of parents to provide support and care to families of autistic individuals. The project was a redesign of the existing visual identity, focused on sensitivity and humanity.<br><br>From the concept of pieces that connect, the graphic system represents diversity within the spectrum and the collective construction of care: different shapes, different rhythms, different needs.',
    imagens: [
      'imagens/projetos/ama/fotos-01.jpg',
      'imagens/projetos/ama/fotos-02.jpg',
      'imagens/projetos/ama/fotos-03.jpg',
      'imagens/projetos/ama/fotos-04.jpg'
    ]
  },
  {
    id: 'sinapse',
    titulo: 'Sinapse',
    ano: '2026',
    subtitulo: 'Site experimental sobre São Paulo através dos cinco sentidos',
    subtitulo_en: 'An experimental website about São Paulo through the five senses',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2026' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Danilo Cid' },
      { pt: 'Créditos', en: 'Credits', valor: 'Ana Beatriz Gomes<br>Beatriz Sin<br>Dara Mielnik<br>Fernanda Casagrande<br>Gabriela Nacif<br>Juliana Nakashima<br>Sophia Rezende' }
    ],
    areas: 'Web design, design de experiência, design de informação',
    areas_en: 'Web design, experience design, information design',
    descricao: 'Sinapse é um site sobre São Paulo através dos cinco sentidos. O projeto parte do excesso de estímulos que a cidade produz e propõe uma navegação que convida à reflexão sobre tudo o que sentimos ao existir nela.<br><br>Mais do que um site sobre SP, é uma experiência que usa a estrutura do próprio meio digital para questionar como percebemos o espaço urbano ao redor.<br><br>Confira o site!<br><a href="https://sinapse-gdwu.vercel.app/" target="_blank" style="color:#0e1ae8;text-decoration:none;">https://sinapse-gdwu.vercel.app/</a>',
    descricao_en: 'Sinapse is a website about São Paulo through the five senses. The project stems from the excess of stimuli the city produces and proposes a navigation that invites reflection on everything we feel while existing within it.<br><br>More than a website about SP, it is an experience that uses the structure of the digital medium itself to question how we perceive the urban space around us.<br><br>Check it out!<br><a href="https://sinapse-gdwu.vercel.app/" target="_blank" style="color:#0e1ae8;text-decoration:none;">https://sinapse-gdwu.vercel.app/</a>',
    imagens: [
      'imagens/projetos/sinapse/foto-01.jpg',
      'imagens/projetos/sinapse/foto-banca.jpg',
      { src: 'imagens/projetos/sinapse/video-mistura.mp4', largura: 66.67 },
      'imagens/projetos/sinapse/foto-cartazes-sombra.jpg',
      'imagens/projetos/sinapse/foto-metro.jpg',
      { src: 'imagens/projetos/sinapse/video-parede.mp4', largura: 35 },
      'imagens/projetos/sinapse/video-site.mp4'
    ]
  },
  {
    id: 'anjos',
    titulo: 'Anjos e Fadas',
    ano: '2026–atualmente',
    subtitulo: 'Social media voluntária para uma organização de proteção animal',
    subtitulo_en: 'Volunteer social media for an animal protection organization',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2026–atualmente', valor_en: '2026–present' },
      { pt: 'Créditos', en: 'Credits', valor: 'Sophia Rezende' },
      { pt: 'Instituição', en: 'Organization', valor: 'Abrigo Anjos e Fadas', valor_en: 'Anjos e Fadas Shelter' }
    ],
    areas: 'Social media, design digital, comunicação',
    areas_en: 'Social media, digital design, communication',
    descricao: 'Anjos & Fadas é uma organização independente de proteção animal localizada no Brooklin, em São Paulo. Como social media voluntária, desenvolvo peças digitais voltadas para divulgação, campanhas de adoção, arrecadação e fortalecimento da presença online da instituição.<br><br>O trabalho parte da identidade visual já existente e busca criar uma comunicação consistente e afetiva, capaz de engajar o público e ampliar o alcance da causa.',
    descricao_en: 'Anjos & Fadas is an independent animal protection organization located in Brooklin, São Paulo. As a volunteer social media designer, I develop digital pieces for outreach, adoption campaigns, fundraising, and strengthening the institution\'s online presence.<br><br>The work builds on the existing visual identity and aims to create consistent and affective communication, capable of engaging the audience and broadening the reach of the cause.',
    imagens: [
      'imagens/projetos/anjosefadas/fotos-01.jpg',
      'imagens/projetos/anjosefadas/fotos-02.jpg',
      'imagens/projetos/anjosefadas/fotos-03.jpg',
      'imagens/projetos/anjosefadas/fotos-04.jpg'
    ]
  },
  {
    id: 'emilie',
    titulo: 'Premiação Emilie Chamie\ne Mostra Estudantil',
    ano: '2025',
    subtitulo: 'Identidade visual para dois eventos do curso de Design da ESPM',
    subtitulo_en: 'Visual identity for two events of the ESPM Design program',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2025' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Leopoldo Leal' },
      { pt: 'Créditos', en: 'Credits', valor: 'Sophia Rezende' }
    ],
    areas: 'Identidade visual, design gráfico',
    areas_en: 'Visual identity, graphic design',
    descricao: 'Proposta de identidade visual para dois eventos do curso de Design da ESPM que acontecem no mesmo dia: a Mostra Estudantil, que premia os melhores trabalhos do ano, e o Prêmio Emilie Chamie, uma premiação dos melhores PGDs em homenagem à pioneira do design paulista.<br><br>O conceito parte de degradês formados por muitas cores, representando alunos, ideias e criatividade coexistindo dentro do curso. Nos dois pôsteres, a organização dos degradês muda: mais estruturada para o Emilie Chamie, mais fragmentada para a Mostra, refletindo os diferentes momentos da trajetória acadêmica.',
    descricao_en: 'Visual identity proposal for two events of the ESPM Design program that take place on the same day: the Student Exhibition, which awards the best works of the year, and the Emilie Chamie Prize, an award for the best PGDs in honor of the pioneer of São Paulo design.<br><br>The concept stems from gradients formed by many colors, representing students, ideas, and creativity coexisting within the program. In the two posters, the organization of the gradients changes: more structured for the Emilie Chamie, more fragmented for the Exhibition, reflecting the different moments of the academic journey.',
    imagens: [
      'imagens/projetos/emilie/video-faixa-fina.mp4',
      'imagens/projetos/emilie/fotos-01.jpg',
      { src: 'imagens/projetos/emilie/video-mockup-ponto-recorte.mp4', largura: 60 },
      'imagens/projetos/emilie/artes-02.jpg',
      'imagens/projetos/emilie/artes-05.jpg'
    ]
  },
  {
    id: 'jagerbomb',
    titulo: 'Jägerbomb',
    ano: '2025',
    subtitulo: 'Identidade visual para uma banda independente',
    subtitulo_en: 'Visual identity for an independent band',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2025' },
      { pt: 'Créditos', en: 'Credits', valor: 'Sophia Rezende' }
    ],
    areas: 'Identidade visual, branding',
    areas_en: 'Visual identity, branding',
    descricao: 'Jägerbomb é uma identidade visual desenvolvida para uma banda independente que carrega a mesma energia do drink que inspira seu nome: Jägermeister com Red Bull. A proposta foi traduzir esse conceito em um sistema gráfico intenso, direto e explosivo.<br><br>O resultado combina atitude e impacto visual em uma identidade que funciona tanto nos materiais digitais quanto nas aplicações físicas da banda.',
    descricao_en: 'Jägerbomb is a visual identity developed for an independent band that carries the same energy as the drink that inspired its name: Jägermeister with Red Bull. The goal was to translate this concept into an intense, direct, and explosive graphic system.<br><br>The result combines attitude and visual impact in an identity that works both in digital materials and in the band\'s physical applications.',
    imagens: [
      'imagens/projetos/jagerbomb/fotos-01.jpg',
      'imagens/projetos/jagerbomb/fotos-02.jpg',
      'imagens/projetos/jagerbomb/fotos-03.jpg',
      'imagens/projetos/jagerbomb/fotos-04.jpg'
    ]
  },
  {
    id: 'seposicione',
    titulo: 'SePosicione',
    ano: '2025',
    subtitulo: 'Intervenção urbana interativa sobre o futuro do Minhocão',
    subtitulo_en: 'An interactive urban intervention about the future of the Minhocão',
    meta: [
      { pt: 'Ano', en: 'Year', valor: '2025' },
      { pt: 'Instituição', en: 'School', valor: 'ESPM São Paulo' },
      { pt: 'Orientação', en: 'Advisor', valor: 'Daniel Trench' },
      { pt: 'Créditos', en: 'Credits', valor: 'Dara Mielnik<br>Fernanda Casagrande<br>Gabriela Nacif<br>Juliana Nakashima<br>Sophia Rezende' }
    ],
    areas: 'Design ambiental, design de experiência',
    areas_en: 'Environmental design, experience design',
    descricao: 'O Minhocão carrega questões complexas sobre seu futuro: demolição, gentrificação, insalubridade. Construído durante a ditadura militar sem diálogo com a população afetada, o espaço evidencia a importância do debate público sobre a cidade.<br><br>A intervenção propõe placas de LED nas empenas de prédios visíveis do Elevado, conectadas a um tapete interativo no chão. À medida que os passantes caminham, seus passos se traduzem em pegadas coloridas sobre as palavras exibidas nas telas, tangibilizando a presença de cada indivíduo e reforçando que todos que ocupam a cidade também participam de sua transformação.',
    descricao_en: 'The Minhocão carries complex questions about its future: demolition, gentrification, unhealthy conditions. Built during the military dictatorship without dialogue with the affected population, the space highlights the importance of public debate about the city.<br><br>The intervention proposes LED panels on the façades of buildings visible from the Elevated, connected to an interactive floor mat. As passersby walk, their steps translate into colorful footprints over the words displayed on the screens, making each individual\'s presence tangible and reinforcing that everyone who occupies the city also participates in its transformation.',
    imagens: [
      'imagens/projetos/seposicione/fotos-01.jpg',
      'imagens/projetos/seposicione/fotos-02.jpg',
      'imagens/projetos/seposicione/fotos-03.jpg',
      'imagens/projetos/seposicione/fotos-04.jpg'
    ]
  }
];

let projetoAtualIndex = 0;

function abrirProjeto(id) {
  const index = projetos.findIndex(p => p.id === id);
  if (index === -1) return;
  projetoAtualIndex = index;
  exibirProjetoAtual();
}

function exibirProjetoAtual() {
  renderizarExpandido();
  mostrarPagina('projeto-expandido');
  const p = projetos[projetoAtualIndex];
  atualizarEndereco('/' + slugDoProjeto(p), p.titulo.replace('\n', ' ') + ' — ' + TITULO_SITE);
  window.scrollTo(0, 0);
}

/* ── ENDEREÇOS (rotas) ──
   Cada aba e cada projeto tem o próprio endereço: /projetos, /sobre, /cosmo, /revista...
   Assim dá para abrir em nova guia (botão direito) e mandar o link de um projeto direto.
   O GitHub Pages não conhece esses caminhos e entrega o 404.html, que volta para cá
   com o caminho em ?p=...; aqui ele é lido e a página certa é aberta. */
const TITULO_SITE = 'Sophia Rezende';
const ROTA_DA_PAGINA = { home: '/', projetos: '/projetos', sobre: '/sobre' };
const SLUG_DO_PROJETO = {};  // nomes diferentes do id no endereço, se precisar
// outros endereços que também abrem um projeto (/++ e /revista abrem a Revista ++)
const APELIDOS = { '++': 'maismais', 'revista': 'maismais' };
let restaurandoHistorico = false;

function slugDoProjeto(p) { return SLUG_DO_PROJETO[p.id] || p.id; }

function atualizarEndereco(caminho, titulo) {
  if (titulo) document.title = titulo;
  if (!caminho || restaurandoHistorico || location.pathname === caminho) return;
  history.pushState(null, '', caminho);
}

function abrirRota(caminho) {
  const nome = decodeURIComponent(caminho).replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!nome) return mostrarPagina('home');
  if (nome === 'projetos' || nome === 'sobre') return mostrarPagina(nome);
  const p = projetos.find(p => slugDoProjeto(p) === nome || p.id === (APELIDOS[nome] || nome));
  if (p) return abrirProjeto(p.id);
  mostrarPagina('home');  // endereço desconhecido: vai para o início
  history.replaceState(null, '', '/');
}

// clique normal num link interno troca de página sem recarregar;
// com botão do meio, Ctrl/Cmd ou "abrir em nova guia", o navegador abre o endereço normalmente
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="/"]');
  if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
  e.preventDefault();
  abrirRota(a.getAttribute('href'));
});

// voltar/avançar do navegador
addEventListener('popstate', () => {
  restaurandoHistorico = true;
  abrirRota(location.pathname);
  restaurandoHistorico = false;
});

// vídeos das galerias: baixam quando chegam perto da tela e pausam quando saem dela.
// Enquanto as fotos acima ainda carregam, a página fica "curta" e tudo parece perto do topo,
// então o vídeo só baixa depois que as fotos antes dele já têm tamanho.
function fotoAcimaPendente(v) {
  return [...document.querySelectorAll('#exp-imagens img')].some(img =>
    !img.complete && (img.compareDocumentPosition(v) & Node.DOCUMENT_POSITION_FOLLOWING));
}

function reavaliarVideos() {
  document.querySelectorAll('#exp-imagens video[data-src]').forEach(v => {
    observadorVideos.unobserve(v);
    observadorVideos.observe(v);
  });
}

const observadorVideos = new IntersectionObserver(entradas => {
  entradas.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) {
      if (v.dataset.src) {
        if (fotoAcimaPendente(v)) return;
        v.src = v.dataset.src; v.removeAttribute('data-src');
      }
      v.play().catch(() => {});
    } else if (!v.paused) {
      v.pause();
    }
  });
}, { rootMargin: '400px 0px' });

/* ── TESTADOR DA FONTE COSMO ──
   A fonte só tem A–Z, vírgula, ponto, espaço e "•". Tudo vira caixa alta, acentos perdem
   o acento (á → A, ç → C) e qualquer outro caractere é descartado. */
const COSMO_TEXTO = 'A COSMOPOLITAN PLEASE';
let cosmoTexto = COSMO_TEXTO;
let cosmoTamanho = 40;

function filtrarCosmo(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z ,.•]/g, '');
}

function criarTestador(en) {
  const box = document.createElement('div');
  box.className = 'testador';
  box.innerHTML = `
    <div class="testador-controles">
      <label class="testador-campo">
        <span>${en ? 'Type here' : 'Escreva aqui'}</span>
        <input type="text" spellcheck="false" autocomplete="off" maxlength="120">
      </label>
      <label class="testador-tamanho">
        <span>${en ? 'Size' : 'Tamanho'} <b></b></span>
        <input type="range" min="16" max="${innerWidth < 600 ? 120 : 220}" step="1">
      </label>
    </div>
    <p class="testador-amostra"></p>`;
  const campo = box.querySelector('input[type=text]');
  const faixa = box.querySelector('input[type=range]');
  const amostra = box.querySelector('.testador-amostra');
  const numero = box.querySelector('b');

  const atualizar = () => {
    amostra.textContent = cosmoTexto || ' ';
    amostra.style.fontSize = cosmoTamanho + 'px';
    numero.textContent = cosmoTamanho;
  };
  campo.value = cosmoTexto;
  faixa.value = cosmoTamanho;
  campo.addEventListener('input', () => {
    const pos = campo.selectionStart;
    const antes = campo.value;
    const limpo = filtrarCosmo(antes);
    if (limpo !== antes) {
      campo.value = limpo;
      // mantém o cursor no lugar, descontando o que foi removido antes dele
      const novaPos = filtrarCosmo(antes.slice(0, pos)).length;
      campo.setSelectionRange(novaPos, novaPos);
    }
    cosmoTexto = campo.value;
    atualizar();
  });
  faixa.addEventListener('input', () => { cosmoTamanho = +faixa.value; atualizar(); });
  atualizar();
  return box;
}

/* ── COMPARADOR ANTES/DEPOIS (como o Juxtapose do Behance) ──
   As duas imagens ficam uma sobre a outra; a de cima ("antes") é recortada até a linha.
   Um <input range> invisível por cima faz o arraste com mouse, toque e teclado. */
function criarComparador([antes, depois], en) {
  const box = document.createElement('div');
  box.className = 'comparar';
  box.innerHTML = `
    <img src="${depois}" alt="" loading="lazy" draggable="false">
    <img class="comparar-antes" src="${antes}" alt="" loading="lazy" draggable="false">
    <span class="comparar-linha"><span class="comparar-alca"></span></span>
    <input type="range" min="0" max="100" step="0.1" value="50" aria-label="${en ? 'Compare sketch and final typeface' : 'Comparar esboço e fonte final'}">`;
  const faixa = box.querySelector('input');
  const mover = () => box.style.setProperty('--pos', faixa.value + '%');
  faixa.addEventListener('input', mover);
  mover();
  return box;
}

function renderizarExpandido() {
  const p = projetos[projetoAtualIndex];
  const en = idioma === 'en';

  document.getElementById('exp-titulo').textContent = p.titulo;
  document.getElementById('exp-subtitulo').textContent = en ? p.subtitulo_en : p.subtitulo;
  document.getElementById('exp-tags').innerHTML = (en ? p.areas_en : p.areas)
    .split(',')
    .map(t => `<li>${t.trim().charAt(0).toUpperCase() + t.trim().slice(1)}</li>`)
    .join('');
  document.getElementById('exp-desc').innerHTML = en ? p.descricao_en : p.descricao;
  // itens alternam entre coluna da esquerda e da direita, cada uma com espaçamento próprio
  const grupo = m => `<div><dt>${en ? m.en : m.pt}</dt><dd>${en && m.valor_en ? m.valor_en : m.valor}</dd></div>`;
  const meta = p.meta || [];
  document.getElementById('exp-meta').innerHTML = [0, 1]
    .map(col => `<dl>${meta.filter((_, i) => i % 2 === col).map(grupo).join('')}</dl>`)
    .join('');

  // imagens: string = largura total, array = par lado a lado,
  // { src, menor: true } = menor e alinhada à esquerda; .mp4 vira vídeo em loop;
  // { src, largura: 30 } = 30% da largura, também alinhada à esquerda;
  // { par: [a, b], largura } = lado a lado com a mesma altura, mesmo com formatos diferentes;
  // { olho: 'texto' } = olho de texto (citação grande, estilo Pentagram);
  // { revista: pasta, paginas } = leitor folheável
  destruirRevista();
  const container = document.getElementById('exp-imagens');
  container.innerHTML = '';
  p.imagens.forEach(item => {
    if (item.revista) {
      container.appendChild(criarRevista(item));
      return;
    }
    if (item.comparar) {  // { comparar: [antes, depois] } = slider antes/depois (arrasta a linha)
      container.appendChild(criarComparador(item.comparar, en));
      return;
    }
    if (item.testador) {  // { testador: true } = campo para escrever com a fonte Cosmo
      container.appendChild(criarTestador(en));
      return;
    }
    if (item.olho) {  // { olho: 'texto', olho_en } = citação grande no meio da galeria
      const olho = document.createElement('blockquote');
      olho.className = 'exp-olho';
      olho.textContent = en && item.olho_en ? item.olho_en : item.olho;
      container.appendChild(olho);
      return;
    }
    const linha = document.createElement('div');
    linha.className = Array.isArray(item) ? 'exp-linha exp-par' : 'exp-linha';
    if (item.par) linha.classList.add('exp-par-alinhado');
    if (item.menor || item.largura) {
      linha.classList.add('exp-menor');
      if (item.largura) {
        linha.classList.add('exp-largura');
        linha.style.setProperty('--largura', item.largura + '%');
      }
    }
    if (item.par || item.src) item = item.par || item.src;
    [].concat(item).forEach(src => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.dataset.src = src;  // só baixa quando chega perto da tela (observadorVideos)
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        observadorVideos.observe(video);
        // controles (pausar, barra de tempo) só aparecem com o mouse em cima; no celular, ao tocar
        video.addEventListener('mouseenter', () => { video.controls = true; });
        video.addEventListener('mouseleave', () => { video.controls = false; });
        video.addEventListener('touchstart', () => { video.controls = true; }, { passive: true });
        // clique amplia (como as fotos); cliques na barra de controles embaixo continuam funcionando
        video.dataset.arquivo = new URL(src, location.href).href;
        video.addEventListener('click', e => {
          const r = video.getBoundingClientRect();
          if (video.controls && e.clientY > r.bottom - 48) return;
          e.preventDefault();
          abrirLightbox(video);
        });
        // na dupla alinhada, cada item cresce na proporção do seu formato → alturas iguais
        video.addEventListener('loadedmetadata', () => {
          video.style.flexGrow = video.videoWidth / video.videoHeight;
        });
        linha.appendChild(video);
        return;
      }
      const img = document.createElement('img');
      img.src = src;
      img.alt = p.titulo;
      img.loading = 'lazy';
      img.addEventListener('click', () => abrirLightbox(img));
      img.addEventListener('load', () => {
        img.style.flexGrow = img.naturalWidth / img.naturalHeight;
        reavaliarVideos();
      });
      linha.appendChild(img);
    });
    container.appendChild(linha);
  });

  const total = projetos.length;
  const anterior = projetos[(projetoAtualIndex - 1 + total) % total];
  const proximo = projetos[(projetoAtualIndex + 1) % total];
  document.getElementById('exp-anterior').textContent = anterior.titulo;
  document.getElementById('exp-proximo').textContent = proximo.titulo;
  document.getElementById('exp-link-anterior').href = '/' + slugDoProjeto(anterior);
  document.getElementById('exp-link-proximo').href = '/' + slugDoProjeto(proximo);

  // a seção só fica visível depois do mostrarPagina, então o leitor mede o espaço no próximo frame
  requestAnimationFrame(iniciarRevista);
}

function alternarAbout() {
  const secao = document.getElementById('projeto-expandido');
  const aberto = secao.classList.toggle('about-aberto');
  secao.querySelector('.exp-about-icone').textContent = aberto ? '×' : '+';
}

// avisa o leitor da revista quando a coluna de imagens muda de largura
document.getElementById('exp-corpo').addEventListener('transitionend', e => {
  if (e.target.id === 'exp-corpo' && revistaFlip) window.dispatchEvent(new Event('resize'));
});

/* ── LEITOR DA REVISTA (StPageFlip) ── */
let revistaFlip = null;
let revistaConfig = null;
let revistaImgs = [];

const ICONE_TELA_CHEIA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"/></svg>';
const ICONE_FECHAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function irParaPaginaRevista(valor) {
  if (!revistaFlip) return;
  revistaFlip.turnToPage(Number(valor));
  atualizarRevista();
}

function criarRevista(item) {
  revistaConfig = item;
  const en = idioma === 'en';
  const el = document.createElement('div');
  el.className = 'exp-revista';
  el.id = 'exp-revista';
  el.innerHTML = `
    <div class="revista-palco">
      <div class="revista-livro" id="revista-livro">
        ${Array.from({ length: item.paginas }, (_, i) =>
          `<div class="revista-pagina"><img data-src="${item.revista}/pagina-${String(i + 1).padStart(3, '0')}.jpg" alt="${en ? 'Page' : 'Página'} ${i + 1}" draggable="false"></div>`
        ).join('')}
      </div>
    </div>
    <div class="revista-controles">
      <button class="revista-btn" onclick="revistaFlip && revistaFlip.flipPrev()" aria-label="${en ? 'Previous page' : 'Página anterior'}">←</button>
      <span class="revista-contador" id="revista-contador"></span>
      <input type="range" class="revista-progresso" id="revista-progresso" min="0" max="${item.paginas - 1}" value="0"
        oninput="irParaPaginaRevista(this.value)" aria-label="${en ? 'Go to page' : 'Ir para a página'}">
      <button class="revista-btn" onclick="revistaFlip && revistaFlip.flipNext()" aria-label="${en ? 'Next page' : 'Próxima página'}">→</button>
      <button class="revista-btn revista-tela-cheia" onclick="alternarTelaCheiaRevista()" aria-label="${en ? 'Fullscreen' : 'Tela cheia'}">${ICONE_TELA_CHEIA}</button>
    </div>
    <p class="revista-dica">${en ? 'Click or drag the corners to flip through' : 'Clique ou arraste os cantos para folhear'}</p>`;
  return el;
}

function iniciarRevista() {
  const livro = document.getElementById('revista-livro');
  if (!livro || revistaFlip || typeof St === 'undefined') return;
  const [w, h] = revistaConfig.tamanho;
  // guarda a ordem original: o leitor reorganiza as páginas no DOM
  revistaImgs = [...livro.querySelectorAll('img')];

  revistaFlip = new St.PageFlip(livro, {
    width: w,
    height: h,
    size: 'stretch',
    // sempre página dupla, inclusive no celular (usePortrait: false)
    minWidth: 100,
    maxWidth: w * 2,
    minHeight: 100 * h / w,
    maxHeight: h * 2,
    showCover: true,
    usePortrait: false,
    mobileScrollSupport: true,
    maxShadowOpacity: 0.4,
    flippingTime: 800
  });
  revistaFlip.loadFromHTML(livro.querySelectorAll('.revista-pagina'));
  revistaFlip.on('flip', atualizarRevista);
  revistaFlip.on('changeOrientation', atualizarRevista);
  atualizarRevista();
}

function destruirRevista() {
  document.body.style.overflow = '';
  if (revistaFlip) {
    revistaFlip.destroy();
    revistaFlip = null;
  }
}

// carrega só as páginas perto da atual e atualiza o contador
function atualizarRevista() {
  if (!revistaFlip) return;
  const i = revistaFlip.getCurrentPageIndex();
  const total = revistaFlip.getPageCount();
  const en = idioma === 'en';

  revistaImgs.forEach((img, n) => {
    if (img.dataset.src && n >= i - 4 && n <= i + 8) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });

  let texto;
  if (i === 0) texto = en ? 'Cover' : 'Capa';
  else if (i === total - 1) texto = en ? 'Back cover' : 'Contracapa';
  else if (revistaFlip.getOrientation() === 'landscape') texto = `${i + 1}–${i + 2}`;
  else texto = `${i + 1}`;
  document.getElementById('revista-contador').textContent = `${texto} / ${total}`;
  document.getElementById('revista-progresso').value = i;
}

// "tela cheia" feita com CSS (cobre a janela toda), funciona em qualquer navegador
function alternarTelaCheiaRevista(forcarFechar) {
  const el = document.getElementById('exp-revista');
  if (!el) return;
  const cheia = forcarFechar ? false : !el.classList.contains('revista-cheia');
  el.classList.toggle('revista-cheia', cheia);
  document.body.style.overflow = cheia ? 'hidden' : '';
  const en = idioma === 'en';
  const btn = el.querySelector('.revista-tela-cheia');
  btn.innerHTML = cheia ? ICONE_FECHAR : ICONE_TELA_CHEIA;
  btn.setAttribute('aria-label', cheia ? (en ? 'Close' : 'Fechar') : (en ? 'Fullscreen' : 'Tela cheia'));
  window.dispatchEvent(new Event('resize'));
}

document.addEventListener('keydown', e => {
  if (!revistaFlip || document.getElementById('lightbox').classList.contains('ativo')) return;
  if (!document.getElementById('projeto-expandido').classList.contains('ativa')) return;
  if (e.key === 'Escape') alternarTelaCheiaRevista(true);
  if (e.key === 'ArrowRight') revistaFlip.flipNext();
  if (e.key === 'ArrowLeft') revistaFlip.flipPrev();
});

/* ── LIGHTBOX ──
   Ao ampliar uma foto ou vídeo do projeto, as setas (ou ← → no teclado, ou arrastar no celular)
   passam pelas outras fotos e vídeos do mesmo projeto, na ordem da página.
   O slider de antes/depois e a revista folheável ficam de fora. */
let lightboxItens = [];
let lightboxIndice = 0;

function arquivoDe(el) {
  return el.tagName === 'VIDEO' ? el.dataset.arquivo : el.src;
}

function abrirLightbox(el) {
  lightboxItens = [...document.querySelectorAll('#exp-imagens .exp-linha > img, #exp-imagens .exp-linha > video')].map(arquivoDe);
  lightboxIndice = Math.max(0, lightboxItens.indexOf(arquivoDe(el)));
  const lb = document.getElementById('lightbox');
  lb.classList.toggle('unica', lightboxItens.length < 2);
  mostrarLightbox();
  lb.classList.add('ativo');
}

function mostrarLightbox() {
  const arquivo = lightboxItens[lightboxIndice];
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  const eVideo = /\.mp4(\?|$)/.test(arquivo);
  img.hidden = eVideo;
  video.hidden = !eVideo;
  if (eVideo) {
    img.removeAttribute('src');
    if (video.src !== arquivo) video.src = arquivo;
    video.play().catch(() => {});
  } else {
    video.pause();
    video.removeAttribute('src'); video.load();
    img.src = arquivo;
  }
  document.getElementById('lightbox-contador').textContent = `${lightboxIndice + 1} / ${lightboxItens.length}`;
  // já baixa a próxima foto para a troca ser instantânea
  const prox = lightboxItens[(lightboxIndice + 1) % lightboxItens.length];
  if (prox && !/\.mp4(\?|$)/.test(prox)) new Image().src = prox;
}

function passarLightbox(direcao) {
  if (lightboxItens.length < 2) return;
  lightboxIndice = (lightboxIndice + direcao + lightboxItens.length) % lightboxItens.length;
  mostrarLightbox();
}

// no celular: arrastar para o lado passa a foto
(function () {
  const lb = document.getElementById('lightbox');
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) { passarLightbox(dx < 0 ? 1 : -1); lb.dataset.arrastou = '1'; }
  });
  // um arraste não deve fechar o lightbox (o toque também gera um clique)
  lb.addEventListener('click', e => {
    if (lb.dataset.arrastou) { delete lb.dataset.arrastou; e.stopImmediatePropagation(); }
  }, true);
})();

function fecharLightbox() {
  document.getElementById('lightbox').classList.remove('ativo');
  const video = document.getElementById('lightbox-video');
  video.pause();
  video.removeAttribute('src'); video.load();
}

/* ── CURRÍCULO ──
   estados: 'escondido' (fora da tela), 'ponta' (só a pontinha embaixo), 'aberto' (no centro).
   A palavra "Currículo" mostra/esconde a ponta. Na ponta: passar o mouse levanta um pouco;
   arrastar para cima (ou clicar) traz para o centro, onde os links ficam clicáveis. */
const PONTA = 56, PONTA_HOVER = 150;
let cvEstado = 'escondido';

function cvPosicao(estado, hover) {
  const cv = document.getElementById('curriculo');
  if (estado === 'aberto') return (innerHeight - cv.offsetHeight) / 2;
  if (estado === 'ponta') return innerHeight - (hover ? PONTA_HOVER : PONTA);
  return innerHeight + 40;
}

// troca data-src por src (arquivos que só devem baixar quando forem usados)
function carregarAdiados(raiz) {
  raiz.querySelectorAll('[data-src]').forEach(el => {
    el.src = el.dataset.src;
    el.removeAttribute('data-src');
  });
}

function cvIr(estado) {
  const cv = document.getElementById('curriculo');
  if (estado !== 'escondido') carregarAdiados(cv);
  cvEstado = estado;
  cv.classList.toggle('aberto', estado === 'aberto');
  cv.style.setProperty('--y', cvPosicao(estado) + 'px');
}

// palavra "Currículo": escondido → ponta → escondido; se estiver aberto, volta para a ponta
function abrirCurriculo() { cvIr(cvEstado === 'escondido' ? 'ponta' : cvEstado === 'ponta' ? 'escondido' : 'ponta'); }

function fecharCurriculo() {
  if (cvEstado === 'aberto') cvIr('ponta');
}

(function () {
  const cv = document.getElementById('curriculo');
  let inicioY = 0, inicioPos = 0, arrastou = false, segurando = false;

  cv.addEventListener('mouseenter', () => { if (cvEstado === 'ponta' && !segurando) cv.style.setProperty('--y', cvPosicao('ponta', true) + 'px'); });
  cv.addEventListener('mouseleave', () => { if (cvEstado === 'ponta' && !segurando) cv.style.setProperty('--y', cvPosicao('ponta') + 'px'); });

  cv.addEventListener('pointerdown', e => {
    if (cvEstado === 'escondido') return;
    if (cvEstado === 'aberto' && e.target.closest('.cv-link, .cv-baixar')) return;  // deixa o link funcionar
    segurando = true; arrastou = false;
    inicioY = e.clientY;
    inicioPos = parseFloat(getComputedStyle(cv).getPropertyValue('--y')) || cvPosicao(cvEstado);
    cv.setPointerCapture(e.pointerId);
    cv.classList.add('arrastando');
  });

  cv.addEventListener('pointermove', e => {
    if (!segurando) return;
    const dy = e.clientY - inicioY;
    if (Math.abs(dy) > 4) arrastou = true;
    const topo = cvPosicao('aberto'), base = cvPosicao('ponta');
    cv.style.setProperty('--y', Math.min(base, Math.max(topo, inicioPos + dy)) + 'px');
  });

  cv.addEventListener('pointerup', e => {
    if (!segurando) return;
    segurando = false;
    cv.classList.remove('arrastando');
    const dy = e.clientY - inicioY;
    if (cvEstado === 'ponta') cvIr(!arrastou || dy < -60 ? 'aberto' : 'ponta');   // clique ou puxou para cima
    else cvIr(arrastou && dy > 80 ? 'ponta' : 'aberto');                          // puxou para baixo = guarda
  });

  // clique fora da folha aberta guarda de volta
  document.addEventListener('pointerdown', e => {
    if (cvEstado === 'aberto' && !cv.contains(e.target) && !e.target.closest('.cv-btn')) fecharCurriculo();
  });

  addEventListener('resize', () => cv.style.setProperty('--y', cvPosicao(cvEstado) + 'px'));
  cv.querySelector('img').addEventListener('load', () => cv.style.setProperty('--y', cvPosicao(cvEstado) + 'px'));
})();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { fecharLightbox(); fecharCurriculo(); }
  if (document.getElementById('lightbox').classList.contains('ativo')) {
    if (e.key === 'ArrowRight') passarLightbox(1);
    if (e.key === 'ArrowLeft') passarLightbox(-1);
  }
});

function navegarProjeto(direcao) {
  projetoAtualIndex = (projetoAtualIndex + direcao + projetos.length) % projetos.length;
  exibirProjetoAtual();
}

let idioma = 'pt';

function alternarIdioma() {
  idioma = idioma === 'pt' ? 'en' : 'pt';
  const btn = event.target;
  btn.textContent = idioma === 'pt' ? 'ENG' : 'PT-BR';

  document.querySelectorAll('[data-pt][data-en]').forEach(el => {
    const texto = idioma === 'pt' ? el.dataset.pt : el.dataset.en;
    el.innerHTML = texto;
  });

  if (document.getElementById('projeto-expandido').classList.contains('ativa')) {
    renderizarExpandido();
  }
}

// abre a página do endereço atual (ou do ?p= que o 404.html mandou)
(function () {
  const pedido = new URLSearchParams(location.search).get('p');
  if (pedido) history.replaceState(null, '', pedido);
  restaurandoHistorico = true;
  abrirRota(location.pathname);
  restaurandoHistorico = false;
})();
