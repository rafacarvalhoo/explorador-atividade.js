
const express = require("express");
const cors = require("cors");
const path = require("path");

// Carrega os nomes e os caminhos das fotos dos álbuns.
const albuns = require("./data/albuns.json");

const app = express();
const PORT = 3000;

app.use(cors());

// Disponibiliza as pastas dos álbuns para o navegador.
app.use("/fotos", express.static(path.join(__dirname, "data")));

// Escolhe uma foto aleatória de uma lista.
function sortear(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// Monta o endereço público da foto escolhida.
function criarUrlFoto(item) {
    const caminho = item
        .split("/")
        .map(parte => encodeURIComponent(parte))
        .join("/");

    return `http://localhost:${PORT}/fotos/${caminho}`;
}

// ROTA 1: sorteia uma foto de qualquer álbum.
app.get("/api/albuns/aleatorio", (req, res) => {
    const todasAsFotos = Object.values(albuns).flat();

    if (todasAsFotos.length === 0) {
        return res.status(404).json({
            status: "error",
            message: "Nenhuma foto cadastrada."
        });
    }

    const item = sortear(todasAsFotos);

    res.json({
        status: "success",
        message: criarUrlFoto(item)
    });
});

// ROTA 2: sorteia uma foto do álbum escolhido.
app.get("/api/albuns/:musica", (req, res) => {
    const musica = req.params.musica.toLowerCase();

    if (!albuns[musica] || albuns[musica].length === 0) {
        return res.status(404).json({
            status: "error",
            message: `Álbum "${musica}" não encontrado. Confira o nome e tente novamente.`
        });
    }

    const item = sortear(albuns[musica]);

    res.json({
        status: "success",
        message: criarUrlFoto(item)
    });
});

// Inicia o servidor na porta 3000.
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
