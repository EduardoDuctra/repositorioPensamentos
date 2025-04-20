import ui from "./ui.js";
import api from "./api.js";

const pensamentosSet = new Set();

// Função que pega os pensamentos da API, formata e adiciona um identificador único (chave) no Set
// O Set garante que não haverá pensamentos duplicados
async function adicionarChaveAoPensamento() {
  try {
    const pensamentos = await api.buscarPensamentos();
    pensamentos.forEach((pensamento) => {
      // Cria uma chave única baseada no conteúdo e autoria, normalizando para evitar duplicação
      const chavePensamento = `${pensamento.conteudo
        .trim()
        .toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`;
      pensamentosSet.add(chavePensamento);
    });
  } catch (error) {
    alert("Erro ao adicionar chave ao pensamento");
  }
}

// Definição das regras para o conteúdo e autoria dos pensamentos
const regexConteudo = /^[A-Za-z\s]{10,255}$/; // Conteúdo deve ter entre 10 e 255 caracteres, apenas letras e espaços
const regexAutoria = /^[A-Za-z\s]{1,100}$/; // Autoria deve ter entre 1 e 100 caracteres, apenas letras e espaços

// Função para validar o conteúdo do pensamento
function validarConteudo(conteudo) {
  return regexConteudo.test(conteudo); // Retorna verdadeiro se o conteúdo for válido
}

// Função para validar a autoria do pensamento
function validarAutoria(autoria) {
  return regexAutoria.test(autoria); // Retorna verdadeiro se a autoria for válida
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos(); // Renderiza a lista de pensamentos na página
  adicionarChaveAoPensamento(); // Adiciona as chaves de pensamentos no Set

  // Obtemos os elementos do formulário e de busca
  const formularioPensamento = document.getElementById("pensamento-form");
  const botaoCancelar = document.getElementById("botao-cancelar");
  const inputBuscar = document.getElementById("campo-busca");

  // Adiciona os eventos de interação
  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
  botaoCancelar.addEventListener("click", manipularCancelamento);
  inputBuscar.addEventListener("input", manipularBusca);
});

// Função para manipular a submissão do formulário
async function manipularSubmissaoFormulario(event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;
  const data = document.getElementById("pensamento-data").value;

  // Valida o conteúdo do pensamento
  if (!validarConteudo(conteudo)) {
    alert(
      "Conteúdo não válido. Apenas letras e espaços, com no mínimo 10 caracteres"
    );
    return;
  }

  // Valida a autoria do pensamento
  if (!validarAutoria(autoria)) {
    alert(
      "Autoria não válida. Apenas letras e espaços, com no mínimo 1 caractere"
    );
    return;
  }

  // Valida a data (não pode ser uma data futura)
  if (!validarData(data)) {
    alert("Não é permitido o cadastro de datas futuras");
  }

  const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria
    .trim()
    .toLowerCase()}`;

  // Se o pensamento já existir no Set, impede que ele seja salvo novamente
  if (pensamentosSet.has(chaveNovoPensamento)) {
    alert("Esse pensamento já existe");
    return;
  }

  // Se o ID existir, chama a função para editar; caso contrário, chama a função para salvar
  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data });
    } else {
      await api.salvarPensamento({ conteudo, autoria, data });
    }
    ui.renderizarPensamentos(); // Atualiza a lista de pensamentos na UI
  } catch {
    alert("Erro ao salvar pensamento");
  }
}

// Função para manipular o cancelamento do formulário (limpa os campos)
function manipularCancelamento() {
  ui.limparFormulario();
}

// Função para manipular a busca de pensamentos conforme o termo inserido
async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value;
  try {
    const pensamentosFiltrados = await api.buscarPensamentosPorTermo(
      termoBusca
    );
    console.log(pensamentosFiltrados); // Apenas para debugging
    ui.renderizarPensamentos(pensamentosFiltrados); // Exibe os pensamentos filtrados
  } catch (error) {
    alert("Erro ao realizar busca");
  }
}

// Função para validar se a data não é futura
function validarData(data) {
  const dataAtual = new Date(); // Obtém a data atual
  const dataInserida = new Date(data);

  return dataInserida <= dataAtual; // Verifica se a data inserida é anterior ou igual à data atual
}
