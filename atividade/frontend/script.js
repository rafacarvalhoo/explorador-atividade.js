
const albunsImage = document.getElementById("albunsImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const albunsArea = document.querySelector(".albuns-area");

const API = "http://localhost:3000/api/albuns";

async function buscarMusica(url, categoria = "") {
    albunsArea.classList.add("loading");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.status === "error") {
            breedName.textContent = data.message || "Álbum não encontrado";
            albunsImage.removeAttribute("src");
            return;
        }

        albunsImage.src = data.message;

        // Mostra o nome da categoria escolhida.
        if (categoria) {
            breedName.textContent = categoria;
        } else {
            const caminho = data.message.split("/");
            const arquivo = decodeURIComponent(caminho[caminho.length - 1]);
            breedName.textContent = arquivo
                .replace(".jpg", "")
                .replace(/[-_]/g, " ");
        }

    } catch (erro) {
        console.error("Erro ao buscar álbum:", erro);

        breedName.textContent =
            "📴 Não foi possível conectar ao servidor. Confira se ele está ligado.";

        albunsImage.removeAttribute("src");

    } finally {
        albunsArea.classList.remove("loading");
    }
}

function albunsAleatorio() {
    buscarMusica(`${API}/aleatorio`);
}

function buscarPorMusica() {
    const musica = breedInput.value.trim().toLowerCase();

    if (!musica) {
        alert("Digite o nome de um álbum!");
        return;
    }

    buscarMusica(`${API}/${encodeURIComponent(musica)}`, musica);
}

randomBtn.addEventListener("click", albunsAleatorio);
searchBtn.addEventListener("click", buscarPorMusica);
albunsImage.addEventListener("click", albunsAleatorio);

breedInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        buscarPorMusica();
    }
});

albunsAleatorio();
