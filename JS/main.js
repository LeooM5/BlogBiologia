// ...existing code...
let artigo1 = document.querySelector('.article1');
let artigo2 = document.querySelector('.article2');
let artigo3 = document.querySelector('.article3');
let artigo4 = document.querySelector('.article4');
let artigo5 = document.querySelector('.article5');
let artigo6 = document.querySelector('.article6');
// ...existing code...

// Seleciona todos os artigos (mantém compatibilidade com as variáveis acima)
const artigos = Array.from(document.querySelectorAll('.article1, .article2, .article3, .article4, .article5, .article6'))
    .filter(Boolean);

// Função que abre o artigo em "fullscreen" (overlay)
function abrirFullscreen(artigoEl) {
    if (!artigoEl) return;

    // Cria overlay
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-article-overlay';

    // garante cursor padrão no overlay
    Object.assign(overlay.style, {
        cursor: 'default'
    });

    // Clona o conteúdo do artigo para dentro do overlay
    const conteudo = artigoEl.cloneNode(true);
    conteudo.classList.add('fullscreen-article-content');

    // remove qualquer cursor inline "pointer" trazido pelo clone
    // (zipa todos os elementos filhos para garantir que nada fique pointer)
    if (conteudo.hasAttribute && conteudo.hasAttribute('style')) {
        conteudo.style.cursor = 'default';
    }
    conteudo.querySelectorAll('*').forEach(el => {
        if (el.style && el.style.cursor) el.style.cursor = '';
    });

    // Botão fechar
    const btnFechar = document.createElement('button');
    btnFechar.type = 'button';
    btnFechar.innerHTML = '&#10005;';
    Object.assign(btnFechar.style, {
        position: 'fixed',
        right: '20px',
        top: '20px',
        zIndex: 100000,
        background: 'transparent',
        color: '#fff',
        border: 'none',
        fontSize: '28px',
        cursor: 'pointer',
        padding: '6px',
        lineHeight: '1'
    });

    // Evita que cliques no conteúdo fechem o overlay
    conteudo.addEventListener('click', (e) => e.stopPropagation());

    // Fecha e limpa
    function fechar() {
        document.removeEventListener('keydown', onKeyDown);
        overlay.style.opacity = '0';
        conteudo.style.transform = 'translateY(6px)';
        // animação de saída e remoção
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            document.body.style.overflow = '';
        }, 250);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') fechar();
    }

    // Clique fora fecha
    overlay.addEventListener('click', fechar);
    btnFechar.addEventListener('click', fechar);
    document.addEventListener('keydown', onKeyDown);

    // Monta e mostra
    overlay.appendChild(conteudo);
    document.body.appendChild(overlay);
    document.body.appendChild(btnFechar);
    document.body.style.overflow = 'hidden';

    // Força repaint para animação
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        conteudo.style.transform = 'translateY(0)';
    });

    // Fecha e limpa
    function fechar() {
        document.removeEventListener('keydown', onKeyDown);
        overlay.style.opacity = '0';
        conteudo.style.transform = 'translateY(6px)';
        // esconde imediatamente o botão fechar
        try { btnFechar.style.display = 'none'; } catch (e) { }
        // animação de saída e remoção
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            // remove o botão fechar do DOM também
            if (btnFechar && btnFechar.parentNode) btnFechar.parentNode.removeChild(btnFechar);
            document.body.style.overflow = '';
        }, 250);
    }
}

// Anexa eventos de clique em cada artigo
artigos.forEach((el) => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
        // evita abrir se clicar em um link interno do artigo
        const target = e.target;
        if (target.tagName === 'A' && target.href) return;
        abrirFullscreen(el);
    });
});
