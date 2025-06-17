document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-comentario');
  const nomeInput = document.getElementById('nome');
  const mensagemInput = document.getElementById('mensagem');
  const lista = document.getElementById('lista-comentarios');

  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  comentarios.forEach((c, index) => adicionarComentario(c.nome, c.mensagem, index));

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (nome && mensagem) {
      const novoComentario = { nome, mensagem };
      comentarios.push(novoComentario);
      localStorage.setItem('comentarios', JSON.stringify(comentarios));
      adicionarComentario(nome, mensagem, comentarios.length - 1);
      form.reset();
    }
  });

  function adicionarComentario(nome, mensagem, index) {
    const div = document.createElement('div');
    div.classList.add('comentario');
    div.innerHTML = `
      <strong>${nome}</strong>
      <p>${mensagem}</p>
      <button class="apagar" data-index="${index}">Apagar</button>
    `;
    lista.prepend(div);

    // Botão de apagar
    div.querySelector('.apagar').addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-index'));
      comentarios.splice(idx, 1);
      localStorage.setItem('comentarios', JSON.stringify(comentarios));
      location.reload(); // recarrega a página pra atualizar tudo (é mais simples)
    });
  }
});


