document.addEventListener('DOMContentLoaded', function () {
  const carrossel = document.querySelector('.carrossel');
  if (!carrossel) {
    console.error('Carrossel não encontrado!');
    return;
  }
  const imagens = carrossel.querySelectorAll('img');
  const prevBtn = carrossel.querySelector('.prev');
  const nextBtn = carrossel.querySelector('.next');
  let indice = 0;

  function mostrarImagem(i) {
    imagens.forEach((img, idx) => {
      img.classList.toggle('ativo', idx === i);
    });
    console.log('Imagem ativa:', i);
  }

  function proximaImagem() {
    indice = (indice + 1) % imagens.length;
    mostrarImagem(indice);
  }

  function imagemAnterior() {
    indice = (indice - 1 + imagens.length) % imagens.length;
    mostrarImagem(indice);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', imagemAnterior);
    nextBtn.addEventListener('click', proximaImagem);
  } else {
    console.error('Botões não encontrados!');
  }

  mostrarImagem(indice);
});

// 


document.addEventListener('DOMContentLoaded', () => {

  // cria overlay + painel mobile (apenas 1 instância)
  function criarPainelMobile() {
    const existente = document.querySelector('.mobile-menu-overlay');
    if (existente) return existente;

    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.innerHTML = `
      <aside class="mobile-menu-panel" role="dialog" aria-modal="true">
        <div class="mobile-logo" aria-label="Logo"><a href="./index.html"><img src="./IMG/Logo1.png" alt="Logo do Blog Belenzinho"</></a></div>
        <nav class="mobile-links" aria-label="Menu principal"></nav>
        <div class="mobile-socials" aria-label="Redes sociais"></div>
      </aside>
    `;
    document.body.appendChild(overlay);

    const painel = overlay.querySelector('.mobile-menu-panel');

    // fecha ao clicar fora do painel (no overlay)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fecharPainel(overlay);
    });

    // fecha pelo botão

    // fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.querySelector('.mobile-menu-overlay')) {
        fecharPainel(document.querySelector('.mobile-menu-overlay'));
      }
    });

    return overlay;
  }

  function abrirPainel(overlay) {
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.querySelector('.mobile-menu-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function fecharPainel(overlay) {
    if (!overlay) return;
    overlay.classList.remove('open');
    const painel = overlay.querySelector('.mobile-menu-panel');
    if (painel) painel.classList.remove('open');

    // remove do DOM após animação
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
    }, 300);
  }

  // trigger do menu (toggle)
  const menuTrigger = document.querySelector('.menuMobile');
  if (menuTrigger) {
    menuTrigger.addEventListener('click', () => {
      const existente = document.querySelector('.mobile-menu-overlay');
      if (existente) {
        fecharPainel(existente);
        return;
      }

      const overlay = criarPainelMobile();

      // popula conteúdo só se vazio
      const mobileLinks = overlay.querySelector('.mobile-links');
      const mobileSocials = overlay.querySelector('.mobile-socials');
      if (!mobileLinks.hasChildNodes()) {
        const links = document.querySelectorAll('header nav .links a');
        links.forEach(a => {
          const clone = a.cloneNode(true);
          clone.style.display = 'block';
          clone.addEventListener('click', () => fecharPainel(overlay));
          mobileLinks.appendChild(clone);
        });

        const redes = document.querySelectorAll('header nav .redes-sociais a');
        redes.forEach(a => {
          const c = a.cloneNode(true);
          c.addEventListener('click', () => fecharPainel(overlay));
          mobileSocials.appendChild(c);
        });
      }

      abrirPainel(overlay);
    });
  }

});