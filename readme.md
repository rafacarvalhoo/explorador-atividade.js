
# 🎵 Justin Bieber Explorer

O Justin Bieber Explorer é um site que permite explorar fotos relacionadas aos álbuns do Justin Bieber.
O projeto utiliza Node.js e Express no back-end e HTML, CSS e JavaScript no front-end.

## 🚀 Como executar o projeto

1. Entre na pasta `backend` pelo terminal:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   node server.js
   ```

4. Abra o arquivo `frontend/index.html` no navegador.

**Importante:** mantenha o servidor rodando enquanto estiver usando o site.

## 🔗 Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/albuns/aleatorio` | Retorna uma foto aleatória de todos os álbuns |
| GET | `/api/albuns/:musica` | Retorna uma foto aleatória da categoria informada |

## 💿 Categorias disponíveis

- `my-world`
- `my-world-2`
- `journals`
- `purpose`

## 📸 Prints do projeto

### 1. Foto aleatória

![Foto aleatória](prints/print1-aleatorio.png)

### 2. Busca por categoria

![Busca por categoria](prints/print2-busca.png)

### 3. Erro de categoria inexistente

![Mensagem de erro](prints/print3-erro.png)

## 👩‍💻 Autoria

**Nome:** Rafaella Carvalho Silva  
**Turma:** Desenvolvimento de Sistemas
