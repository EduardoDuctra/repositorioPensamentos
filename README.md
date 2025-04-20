# Pensamentos - CRUD de Pensamentos

Este projeto foi desenvolvido como parte de um curso da Alura, com o objetivo de aprender e aplicar conceitos fundamentais de desenvolvimento web, como manipulação de dados via API, validação de formulários e gerenciamento de estado na interface de usuário.

## Descrição

O projeto consiste em um aplicativo simples de CRUD (Criar, Ler, Atualizar, Deletar) de pensamentos. O usuário pode adicionar novos pensamentos, editar, excluir e marcar como favorito. Os pensamentos são armazenados em um servidor backend e consumidos via requisições API.

A aplicação front-end interage com o backend usando o `axios` para fazer as requisições HTTP e exibe os dados em tempo real na interface.

## Tecnologias Utilizadas

- **Frontend**: JavaScript (ES6+), HTML5, CSS3
- **API**: Node.js com Express (backend simples, não incluso no repositório)
- **Gerenciamento de Estado**: Utilização de um conjunto (Set) para garantir que não haja pensamentos duplicados
- **Validação de Dados**: Regex para validação de conteúdo e autoria dos pensamentos
- **Biblioteca para requisições HTTP**: `axios`

## Funcionalidades

- **Cadastro de Pensamentos**: O usuário pode inserir um novo pensamento, contendo conteúdo, autoria e data.
- **Edição de Pensamentos**: Pensamentos previamente cadastrados podem ser editados.
- **Exclusão de Pensamentos**: Pensamentos podem ser removidos da lista.
- **Marcar como Favorito**: O usuário pode marcar um pensamento como favorito.
- **Busca de Pensamentos**: A aplicação permite a busca de pensamentos por conteúdo ou autoria.
- **Validação de Formulários**: Validação de entrada de dados, como conteúdo (mínimo 10 caracteres) e autoria (mínimo 1 caractere).
- **Data de Pensamentos**: A data é validada para garantir que não seja uma data futura.
