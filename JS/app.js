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