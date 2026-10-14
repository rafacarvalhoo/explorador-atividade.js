const express = require("express");
const cors = require("cors");
const path = require("path");
const albuns = require("./data/fotos/albuns.json");

const app = express();
const PORT = 3000;

app.use(cors());

app.use("/fotos", express.static(path.join(__dirname, "data/fotos")));

function sortear(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

app.get("/api/albuns/aleatorio", (req, res) => {
    const todasAsFotos = Object.values(albuns).flat();

    if (todasAsFotos.length === 0) {
        return res.status(404).json({
            status: "error",
            message: "Nenhuma foto cadastrada"
        });
    }

    const item = sortear(todasAsFotos);

    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

app.get("/api/albuns/:musica", (req, res) => {
    const musica = req.params.musica.toLowerCase();

    if (!albuns[musica] || albuns[musica].length === 0) {
        return res.status(404).json({
            status: "error",
            message: `Música "${musica}" não encontrada`
        });
    }

    const item = sortear(albuns[musica]);

    res.json({
        status: "sucess", 
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});