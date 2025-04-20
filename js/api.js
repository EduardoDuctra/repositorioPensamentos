const URL_BASE = "http://localhost:3000";

// Função para converter uma string no formato 'AAAA-MM-DD' em um objeto Date
const converterStringParaData = (dataString) => {
  const [ano, mes, dia] = dataString.split("-"); // Dessestrutura a string de data
  // Exemplo: "2025-03-20" => [2025, 3, 20]
  return new Date(Date.UTC(ano, mes - 1, dia)); // Cria e retorna uma nova data (mes começa do índice 0)
};

const api = {
  // Função para buscar todos os pensamentos
  async buscarPensamentos() {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos`); // Requisição GET para pegar todos os pensamentos
      const pensamentos = await response.data; // Obtém os dados da resposta (pensamentos)

      // Mapeia os pensamentos para garantir que a propriedade 'data' seja um objeto Date
      return pensamentos.map((pensamento) => {
        return {
          ...pensamento, // Copia todas as propriedades do objeto 'pensamento'
          data: new Date(pensamento.data), // Converte a string 'data' em um objeto Date
        };
      });
    } catch {
      alert("Erro ao buscar pensamentos");
      throw error; // Lança o erro caso a requisição falhe
    }
  },

  // Função para salvar um novo pensamento
  async salvarPensamento(pensamento) {
    try {
      const data = converterStringParaData(pensamento.data); // Converte a data de string para Date
      const response = await axios.post(`${URL_BASE}/pensamentos`, {
        ...pensamento,
        data, // Envia a data convertida para a API
      });
      return await response.data; // Retorna os dados da resposta da API
    } catch {
      alert("Erro ao salvar pensamento");
      throw error; // Lança o erro caso a requisição falhe
    }
  },

  // Função para buscar um pensamento específico pelo seu ID
  async buscarPensamentoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos/${id}`); // Requisição GET para buscar o pensamento pelo ID
      const pensamento = await response.data; // Obtém o dado do pensamento

      // Retorna um novo objeto com a propriedade 'data' convertida em Date
      return {
        ...pensamento, // Copia todas as propriedades do objeto 'pensamento'
        data: new Date(pensamento.data), // Converte a string 'data' em um objeto Date
      };
    } catch {
      alert("Erro ao buscar pensamento");
      throw error; // Lança o erro caso a requisição falhe
    }
  },

  // Função para editar um pensamento
  async editarPensamento(pensamento) {
    try {
      const response = await axios.put(
        `${URL_BASE}/pensamentos/${pensamento.id}`, // Requisição PUT para editar o pensamento pelo ID
        pensamento // Envia os dados do pensamento alterado
      );
      return await response.data; // Retorna os dados da resposta (pensamento atualizado)
    } catch {
      alert("Erro ao editar pensamento");
      throw error; // Lança o erro caso a requisição falhe
    }
  },

  // Função para excluir um pensamento pelo ID
  async excluirPensamento(id) {
    try {
      await axios.delete(`${URL_BASE}/pensamentos/${id}`); // Requisição DELETE para excluir o pensamento pelo ID
    } catch {
      alert("Erro ao excluir um pensamento");
      throw error; // Lança o erro caso a requisição falhe
    }
  },

  // Função para buscar pensamentos filtrados por um termo de pesquisa
  async buscarPensamentosPorTermo(termo) {
    try {
      const pensamentos = await this.buscarPensamentos(); // Obtém todos os pensamentos
      const termoEmMinusculas = termo.toLowerCase(); // Converte o termo de busca para minúsculas

      // Filtra os pensamentos que contêm o termo de pesquisa no conteúdo ou na autoria
      const pensamentosFiltrados = pensamentos.filter((pensamento) => {
        return (
          pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) || // Verifica no conteúdo
          pensamento.autoria.toLowerCase().includes(termoEmMinusculas) // Verifica na autoria
        );
      });
      return pensamentosFiltrados; // Retorna os pensamentos filtrados
    } catch (error) {
      alert("Erro ao filtrar pensamentos");
      throw error; // Lança o erro caso a requisição falhe
    }
  },

  // Função para atualizar o status de favorito de um pensamento
  async atualizarFavorito(id, favorito) {
    try {
      const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, {
        favorito,
      }); // Requisição PATCH para atualizar o favorito
      return response.data; // Retorna os dados da resposta (pensamento atualizado)
    } catch (error) {
      alert("Erro ao atualizar favorito");
      console.error(error); // Log do erro para debug
    }
  },
};

export default api;
