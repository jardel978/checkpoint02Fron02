
function carregandoJanela() {
    tempo = 0;
    let loading = document.getElementById('loading');
    console.log(loading)

    setTimeout(() => {
        loading.style.display = 'none';
    }, 2200);
}

let sectionTarefas = document.getElementById('secao-tarefas');

function criarTarefa(descricao, id) {
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


async function requisitarTarefas() {
    try {
        const resquisicao = await (await fetch('https://jsonplaceholder.typicode.com/todos/')).json();
        for (let i = 0; i < resquisicao.length; i++) {
            let novaTarefa = criarTarefa(resquisicao[i].title, resquisicao[i].id)
            if(resquisicao[i].completed == true) {
                novaTarefa.children[0].classList.toggle('tachado');
                novaTarefa.style.opacity = "0.87";
                novaTarefa.style.filter = "grayscale(0.75)";
            }
            sectionTarefas.appendChild(novaTarefa);
        }
    } catch (erro) {
        console.log(erro.name);
        return erro.name;
    }
}

requisitarTarefas();