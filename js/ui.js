import api from "./api.js";

const ui = {
  // Preenche o formulário com as informações do pensamento baseado no ID
  async preencherFormulario(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId);
    document.getElementById("pensamento-id").value = pensamento.id;
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
    document.getElementById("pensamento-autoria").value = pensamento.autoria;
    document.getElementById("pensamento-data").value = pensamento.data;
  },

  // Limpa os campos do formulário
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
  },

  // Função que verifica se o termo buscado está vazio e chama a renderização dos pensamentos
  async renderizarPensamentos(pensamentosFiltrados) {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const mensagemVazia = document.getElementById("mensagem-vazia");
    listaPensamentos.innerHTML = "";

    try {
      // Variável que armazenará os pensamentos a serem exibidos
      let pensamentosParaRenderizar;

      if (pensamentosFiltrados) {
        // Se pensamentosFiltrados for um valor válido, usa ele para renderizar
        pensamentosParaRenderizar = pensamentosFiltrados;
      } else {
        // Caso contrário, busca todos os pensamentos
        pensamentosParaRenderizar = await api.buscarPensamentos();
      }

      if (pensamentosParaRenderizar.length === 0) {
        mensagemVazia.style.display = "block";
      } else {
        mensagemVazia.style.display = "none";
        pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista);
      }
    } catch {
      alert("Erro ao renderizar pensamentos");
    }
  },

  // Cria um novo item de lista (card) para cada pensamento
  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const li = document.createElement("li");
    li.setAttribute("data-id", pensamento.id);
    li.classList.add("li-pensamento");

    const iconeAspas = document.createElement("img");
    iconeAspas.src = "assets/imagens/aspas-azuis.png";
    iconeAspas.alt = "Aspas azuis";
    iconeAspas.classList.add("icone-aspas");

    const pensamentoConteudo = document.createElement("div");
    pensamentoConteudo.textContent = pensamento.conteudo;
    pensamentoConteudo.classList.add("pensamento-conteudo");

    const pensamentoAutoria = document.createElement("div");
    pensamentoAutoria.textContent = pensamento.autoria;
    pensamentoAutoria.classList.add("pensamento-autoria");

    const pensamentoData = document.createElement("div");
    const dataFormatada = pensamento.data.toLocaleDateString("pt-BR");
    pensamentoData.textContent = dataFormatada;
    pensamentoData.classList.add("pensamento-data");

    // Botão para editar o pensamento
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Editar";
    botaoEditar.appendChild(iconeEditar);

    // Botão para excluir o pensamento
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id);
        ui.renderizarPensamentos();
      } catch (error) {
        alert("Erro ao excluir pensamento");
      }
    };

    const iconeExcluir = document.createElement("img");
    iconeExcluir.src = "assets/imagens/icone-excluir.png";
    iconeExcluir.alt = "Excluir";
    botaoExcluir.appendChild(iconeExcluir);

    // Botão para marcar o pensamento como favorito
    const botaoFavorito = document.createElement("button");
    botaoFavorito.classList.add("botao-favorito");

    botaoFavorito.onclick = async () => {
      try {
        // Troca o estado do favorito (de true para false ou vice-versa)
        await api.atualizarFavorito(pensamento.id, !pensamento.favorito);
        ui.renderizarPensamentos();
      } catch (error) {
        alert("Erro ao atualizar favorito");
      }
    };

    const iconeFavorito = document.createElement("img");
    iconeFavorito.src = pensamento.favorito
      ? "assets/imagens/icone-favorito.png"
      : "assets/imagens/icone-favorito_outline.png";
    iconeFavorito.alt = "Ícone Favorito";

    botaoFavorito.appendChild(iconeFavorito);

    // Adiciona os ícones de editar, excluir e favorito ao pensamento
    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);
    icones.appendChild(botaoFavorito);

    // Adiciona o conteúdo e os ícones ao item de lista
    li.appendChild(iconeAspas);
    li.appendChild(pensamentoConteudo);
    li.appendChild(pensamentoAutoria);
    li.appendChild(pensamentoData);
    li.appendChild(icones);
    listaPensamentos.appendChild(li);
  },
};

export default ui;
