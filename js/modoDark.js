//VARIÁVEIS
let btn = document.querySelector(".tema");
let contador = 1;//declando e atribuindo valor 1 à variável contador
let circulo = document.querySelector(".circulo");
let circuloWhite = document.querySelector("#noturno");
/* bacground API */
let bckgVideoApi = document.getElementById('bckg-api-video');

btn.addEventListener("click", (event) => {//escutando evento de click para alteração de modo da aplicação
    event.preventDefault();
    contador++;//a cada click o contador e acrescido uma unidade. O valor dessa variável será analizado: se for par aplique um tipo de estilização, se for impar, outro tipo de estilização
    
    if(contador % 2 == 0){//caso contador seja par aplique os seguites estilos abaixo
        //tema dark 
        corSite = document.body.style.background = "rgb(54, 57, 63) ";
        title = document.body.style.color = "rgb(228, 215, 204)";
        circulo.style.animation = "deslizar-1 0.3s ease forwards";
        btn.style.background = "rgb(228, 215, 204)";
        circuloWhite.classList.add("circulo-2");
        bckgVideoApi.style.opacity = "0";
    } else{//caso contador seja impar aplique os seguintes estilos abaixo
        //tema clen (tema normal da página)
        corSite = document.body.style.background = "rgb(219, 219, 219";
        title = document.body.style.color = "#201e1e";
        circulo.style.animation = "deslizar-2 0.3s ease forwards";
        btn.style.background = "rgb(85, 52, 14)";
        circuloWhite.classList.remove("circulo-2");
        bckgVideoApi.style.opacity = "1";
    }
})