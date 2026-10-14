const albunsImage = document.getElementById("albunsImage");
const breedName = document.getElementById("breedName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const albunsArea = document.querySelector(".albuns-area");

const API = "http://localhost:3000/api/albuns";

async function buscarMusica(url) {
    albunsArea.classList.add("loading");
    try{

 const response = await fetch(url);
 
 const data = await response.json();

 console.log("resposta da API:", data)

 
 if (data.status === "error"){
   
    breedName.textContent = data.message;
    albunsImage.src = "";
  
    return;
 }

    albunsImage.src = data.message;

    const partes = data.message.split("/")

    const musica = partes[5]

    breedName.textContent =
        musica.charAt(0).toUpperCase() + musica.slice(1);

    } catch (erro){
        console.error(erro);

        breedName.textContent =
        "📴 servidor offline - rode: node server.js"

        albunsImage.src = "";
    } finally {
        albunsArea.classList.remove("loading")
    }
 
}