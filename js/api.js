
function carregandoJanela() {//função para evento e animação de carregamento de página
    tempo = 2300;
    let loading = document.getElementById('loading');

    setTimeout(() => {
        loading.style.display = 'none';
    }, tempo);
}

let sectionTarefas = document.getElementById('secao-tarefas');

function criarTarefa(descricao, id) {//função que gera uma nota com dados da API fornecida
    const artigo = document.createElement('article');
    artigo.setAttribute('id', 'visualizar');
    artigo.innerHTML =
     ` 
    <div class="section__box-paragrafo">
         <p>${descricao}</p>
    </div>       
    <div class="section__box-datas">
        <p class="id-card-api">Id: ${id}</p>
    </div>
    `
    return artigo;
}


async function requisitarTarefas() {//função assíncriona que recupera dados da API fornecida
    try {//tentativa de executar dados contido nesse bloco try
        const resquisicao = await (await fetch('https://jsonplaceholder.typicode.com/todos/')).json();//variável que recebe o método fetch com a url da API a ser consultada. A resposta desse fetch e desencapsulada com o await dentro dos parentese e em seguida, o await de fora dos parenteses desencapsula o resultado  obtido do fetch já desencapsulado aplicado o método json(). Assim temos em uma única linha de código a requisição dos dados, seu desencapsulamento e todo o resultado já parseado de JSON para JS
        for (let i = 0; i < resquisicao.length; i++) {//iterando array vindo da API
            let novaTarefa = criarTarefa(resquisicao[i].title, resquisicao[i].id)//criando nota com dados iterados do array requsitado à API
            if(resquisicao[i].completed == true) {//verifica tarefas já concluidas
                novaTarefa.children[0].classList.toggle('tachado');//aplica propriedade de tachado ao texto da nota
                novaTarefa.style.opacity = "0.87";//da opacidade a essa nota
                novaTarefa.style.filter = "grayscale(0.75)";//deixa essa nota em escla de cinza
            }
            sectionTarefas.appendChild(novaTarefa);//apenda nota gerada à section
        }
    } catch (erro) {//para caso de erro no bloco try... emita um alerta do tipo Error
        alert(Error("Falha em requisitar os dados. \n Verifique sua conexão com a Internet ou tente novamente mais tarde"));
    }
}

requisitarTarefas();//chamando a função que requisita os dados, os trata e apenda elementos resultantes à section