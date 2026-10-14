// Aqui a gente importa o framework Express para criar o servidor
const express = require("express");

// Aqui importamos o CORS para permitir outros domínios, como o frontend
const cors = require("cors");

// Aqui importa coisas úteis pata trabalhar com arquivos
const path = require("path");

// Aqui importa o JSON que tem as fotos do que precisamos 
const albuns = require("./data/albuns.json");

// Aqui criamos o Express
const app = express();
// Aqui é onde o servidor irá rodar
const PORT = 3000;

app.use(cors());

app.use("/fotos", express.static(path.join(__dirname, "data/fotos")));

// Recebe um array e retorna um item aleatório dele
function sortear(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// A PARTIR DAQUI, COMEÇAREMOS AS ROTAS DA API

// ROTA 1
app.get("/api/albuns/aleatorio", (req, res) => {
    // Pega todas as fotos de todas as raças em um único array
    const todasAsFotos = Object.values(albuns).flat();

    if (todasAsFotos.length === 0) {
        return res.status(404).json({
            status: "error",
            message: "Nenhuma foto cadastrada"
        });
    }

    // Agora esse comando sorteia uma foto aleatória 
    const item = sortear(todasAsFotos);

    // E aqui o JSON responde
    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

// ROTA 2

app.get("/api/albuns/:musica", (req, res) => {
    // Pega o parâmetro da URL e converte para minúsculas
    const musica = req.params.musica.toLowerCase();

    // Se a música não existir ou não tiver fotos, retorna 404
    if (!albuns[musica] || albuns[musica].length === 0) {
        return res.status(404).json({
            status: "error",
            message: `Música "${musica}" não encontrada`
        });
    }

    // Aí aqui ele sorteia uma foto da música solicitada
    const item = sortear(albuns[musica]);

    // E aqui o JSON responde
    res.json({
        status: "sucess", 
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

// Aqui ele inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});