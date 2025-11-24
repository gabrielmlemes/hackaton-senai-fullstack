📘 API de Agendamentos — Barbearia

Esta é a documentação da API desenvolvida em Python utilizando o framework Flask. A API permite gerenciar barbearias, serviços e agendamentos de maneira estruturada. Ela serve como backend para um sistema de reservas, facilitando a integração com frontends como aplicações em Next.js.

🧱 Estrutura do Projeto
- **app.py**: Arquivo principal que inicializa o servidor Flask, define as rotas da API, implementa validações e lida com as solicitações HTTP.
- **data.py**: Módulo que simula um banco de dados em memória, armazenando listas de barbearias, serviços e agendamentos.

📂 Descrição do data.py
Este módulo contém estruturas de dados em memória para armazenar informações persistidas durante a execução da aplicação:
- **barbearias**: Lista de dicionários representando barbearias, cada um com campos 'id' e 'nome'.
- **servicos**: Lista de dicionários para serviços, incluindo 'id', 'barbearia_id', 'nome' e 'preco'.
- **agendamentos**: Lista inicialmente vazia que armazena agendamentos criados, com campos como 'id', 'usuario_id', 'barbearia_id', 'servico_id', 'data' e 'hora'.

Os dados são voláteis, ou seja, perdidos ao reiniciar a aplicação. Isso é adequado para protótipos, mas em produção, recomenda-se um banco de dados persistente.

💻 Descrição do app.py
Este arquivo configura a aplicação Flask:
- Importa bibliotecas necessárias (Flask, jsonify, request, CORS, datetime) e dados do data.py.
- Cria a instância da aplicação Flask e habilita CORS para permitir requisições de origens externas.
- Define rotas (endpoints) para operações CRUD básicas sobre barbearias e agendamentos.
- Implementa validações, como verificação de campos obrigatórios e conflitos de horário.
- Retorna respostas em formato JSON, com códigos de status HTTP apropriados.

🌐 Rotas da API
A seguir, descrição detalhada de cada endpoint, incluindo método HTTP, caminho, corpo da requisição (se aplicável) e comportamento.

🔹 1. Listar Todas as Barbearias
- **Método**: GET
- **Caminho**: /barbearias
- **Descrição**: Retorna a lista completa de barbearias cadastradas.
- **Comportamento**:
  - Acessa a lista 'barbearias' do data.py.
  - Retorna um JSON com a lista de objetos.
- **Exemplo de Resposta**: [{"id": 1, "nome": "Barbearia do João"}, {"id": 2, "nome": "Barbearia do Pedro"}].

🔹 2. Obter Detalhes de uma Barbearia Específica
- **Método**: GET
- **Caminho**: /barbearias/<int:id>
- **Descrição**: Retorna informações de uma barbearia específica e seus serviços associados.
- **Comportamento**:
  - Busca a barbearia pelo 'id' na lista 'barbearias'.
  - Filtra serviços relacionados via 'barbearia_id'.
  - Retorna JSON com barbearia e lista de serviços; erro 404 se não encontrada.
- **Exemplo de Resposta**: {"barbearia": {"id": 1, "nome": "Barbearia do João"}, "servicos": [{"id": 1, "nome": "Corte de cabelo", "preco": 40}]}.

🔹 3. Criar um Agendamento
- **Método**: POST
- **Caminho**: /agendamentos
- **Corpo da Requisição (JSON)**:
  {
    "usuario_id": 1,
    "barbearia_id": 1,
    "servico_id": 1,
    "data": "2025-11-15",
    "hora": "14:00"
  }
- **Descrição**: Cria um novo agendamento após validações.
- **Comportamento**:
  1. Valida presença de todos os campos obrigatórios; retorna erro 400 se faltar algum.
  2. Converte 'data' e 'hora' para objeto datetime.
  3. Filtra agendamentos existentes na mesma barbearia e data.
  4. Para cada agendamento existente, calcula diferença de tempo; impede se < 30 minutos.
  5. Gera novo 'id' incremental.
  6. Adiciona à lista 'agendamentos' e retorna o objeto criado.
- **Exemplo de Resposta**: Mesmo JSON da requisição, com 'id' adicionado.

🔹 4. Listar Agendamentos de um Usuário
- **Método**: GET
- **Caminho**: /meus-agendamentos/<int:usuario_id>
- **Descrição**: Retorna agendamentos filtrados por usuário, enriquecidos com nomes de barbearia e serviço.
- **Comportamento**:
  - Filtra 'agendamentos' por 'usuario_id'.
  - Para cada agendamento, busca nome da barbearia e serviço nas respectivas listas.
  - Retorna lista de agendamentos com campos adicionais 'barbearia_nome' e 'servico_nome'.
- **Exemplo de Resposta**: [{"id": 1, "barbearia_nome": "Barbearia do João", "servico_nome": "Corte de cabelo", ...}].

🔹 5. Cancelar um Agendamento
- **Método**: DELETE
- **Caminho**: /agendamentos/<int:id>
- **Descrição**: Remove um agendamento específico.
- **Comportamento**:
  - Busca agendamento pelo 'id'.
  - Remove da lista 'agendamentos' se encontrado; erro 404 caso contrário.
  - Retorna mensagem de sucesso.
- **Exemplo de Resposta**: {"mensagem": "Agendamento cancelado com sucesso"}.

🔄 Fluxo Geral da API
- O cliente (frontend ou ferramenta como Thunder Client) envia uma requisição HTTP para um endpoint.
- O app.py processa a rota, executa validações e interage com data.py para recuperar/manipular dados.
- Respostas são retornadas em JSON, com códigos de status indicando sucesso ou erro.

🎯 Objetivo do Projeto
Esta API é um exemplo educacional para demonstrar conceitos de desenvolvimento backend com Flask. É modular e extensível, permitindo futuras expansões como:
- Autenticação de usuários.
- Suporte a múltiplos barbeiros por barbearia.
- Interface administrativa.
- Agendamentos recorrentes.
- Integração com banco de dados persistente (ex.: SQLite ou PostgreSQL).
