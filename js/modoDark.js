let btn = document.querySelector(".tema");
let contador = 1;
let circulo = document.querySelector(".circulo");
let circuloWhite = document.querySelector("#noturno");
/* bacground API */
let bckgVideoApi = document.getElementById('bckg-api-video');

btn.addEventListener("click", (event) => {
    event.preventDefault();
    contador++;
    
    if(contador % 2 == 0){
        corSite = document.body.style.background = "rgb(54, 57, 63) ";
        title = document.body.style.color = "rgb(228, 215, 204)";
        circulo.style.animation = "deslizar-1 0.3s ease forwards";
        btn.style.background = "rgb(228, 215, 204)";
        circuloWhite.classList.add("circulo-2");
        bckgVideoApi.style.opacity = "0";
    } else{
        corSite = document.body.style.background = "rgb(219, 219, 219";
        title = document.body.style.color = "#201e1e";
        circulo.style.animation = "deslizar-2 0.3s ease forwards";
        btn.style.background = "rgb(85, 52, 14)";
        circuloWhite.classList.remove("circulo-2");
        bckgVideoApi.style.opacity = "1";
    }

})