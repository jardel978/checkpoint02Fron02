//VARIÁVEIS
let botaoSalvar = document.getElementById('btn-salvar');
let form = document.getElementById('formulario');
let sectionTarefas = document.getElementById('secao-tarefas');

/* gerando data atual */
let data = new Date();
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = data.getFullYear();
let dataAtual = ano + '-' + mes + '-' + dia;
var cores = ["rgba(49, 40, 29, 0.733)", "#336699", "#006666", "#8C2703", "#011F26", "#0F71F2"];
//variáveis de localStorage
const localStorageTarefas = JSON.parse(localStorage.getItem('arrayTarefas'));//busca o "arrayTarefas" no localStorage
const minhasTarefas = localStorage.getItem('arrayTarefas') !== null ? localStorageTarefas : [];//se existir o "arrayTarefas" no localStorage "minhasTarefas" recebe esses valores já parciados de JSON para JS, caso contrário: inicia um array vazio onde salvaremos dados e armazenaremos no localStorage

const localStorageIdTarefas = JSON.parse(localStorage.getItem('idsTarefas'));//busca o "idsTarefas" no localStorage
let indexTarefas = localStorage.getItem('idsTarefas') !== null ? localStorageIdTarefas : [];//se existir o "idsTarefas" no localStorage "indexTarefas" recebe esses valores já parciados de JSON para JS, caso contrário: inicia um array vazio onde salvaremos dados e armazenaremos no localStorage

for (objTarefa of minhasTarefas) {//leitura e recuperção de itens no localStorage
    let novoTarefa = criarTarefa(objTarefa.dataCriacao, objTarefa.dataLimite, objTarefa.descricao, objTarefa.idTarefa);
    sectionTarefas.appendChild(novoTarefa);
}

//A aplicação do método forEach nas próximas 3 variáveis (iconsChecked, iconsColor e iconsLixeira) é responsável por manipular alguns elementos. Usadas para tachar texto ou modificar cor da nota ou excluir uma nota. 
let iconsChecked = document.querySelectorAll('[data-click-checked]');//capturando todos os elementos com o atributo "data-click-checked"
iconsChecked.forEach(el => el.addEventListener('click', (e) => {//percorrendo elementos contidos no NodeList "iconsChecked" e ouvindo evento de click
    e.preventDefault();
    let divInput = el.parentElement;
    let artigo = divInput.parentElement
    let paragrafo = divInput.parentElement.children[2].children[0];
    paragrafo.classList.toggle('tachado');//adiciona ou remove o tachado ao texto da nota
    artigo.classList.toggle('artigo-checked');//adiciona ou remove classe responsável por dar opacidade a uma nota
}))


let iconsColor = document.querySelectorAll('[data-click-color]');//capturando todos os elementos com o atributo "data-click-color"
iconsColor.forEach(el => el.addEventListener('mouseover', (e) => {//percorrendo elementos contidos no NodeList "iconsColor" e ouvindo evento de click
    e.preventDefault();
    let divInput = el.parentElement;
    let article = divInput.parentElement;
    let paletaCores = article.children[1];
    paletaCores.appendChild(criarPaleta(article));//chama a paleta de cores e adiciona a cor selecionada pelo usuário ao background da nota
    paletaCores.classList.remove('escolhas-none');//exibe paleta de cores
    el.disabled = true;//sesabilita temporáriamente o ícone da paleta de cores
}))

let iconsLixeira = document.querySelectorAll('[data-click-lixeira]');//capturando todos os elementos com o atributo "data-click-lixeira"
iconsLixeira.forEach(el => el.addEventListener('click', (e) => {//percorrendo elementos contidos no NodeList "iconsLixeira" e ouvindo evento de click
    e.preventDefault();
    let idTarefa = parseInt(el.id);
    let indexTarefa = indexTarefas.indexOf(idTarefa);//recuperando index da nota para fazer exclusão
    let confirmacao = confirm("Você quer mesmo excluir essa tarefa?");//confirmando exclusão de nota
    if (confirmacao) {//se confirmação true: excluir nota
        minhasTarefas.splice(indexTarefa, 1);
        indexTarefas.splice(indexTarefa, 1);
        location.reload();
    } else//se confirmação false
        e.stopPropagation();//evita propagação do evento

    localStorage.setItem('arrayTarefas', JSON.stringify(minhasTarefas));//atualização do localStorage
    localStorage.setItem('idsTarefas', JSON.stringify(indexTarefas));//atualização do localStorage
}))


function aplicarBackground(el, article) {//função responsável por aplicar uma cor selecionada pelo usuário ao background da nota
    let paletaCores = article.children[1];
    let input = article.children[0].children[1];
   
        return function () {
            article.style.backgroundColor = el.value;//setando cor escolhida ao background da nota
            paletaCores.removeChild(paletaCores.firstChild);//removendo paleta de cores
            input.disabled = false;//reabilita ícone de paleta de cores
        }
}

function criarPaleta(artigo) {//função que gera a paleta de cores por meio da varredura de array de cores "cores"(linha 12)
    let divPaleta = document.createElement('div');
    divPaleta.setAttribute('class', 'child-paleta');
    cores.forEach(function (cor) {
        var button = document.createElement('button');
        button.setAttribute('class', 'btn-cor');
        button.value = cor;
        button.type = 'button';
        button.style.backgroundColor = cor;
        button.addEventListener('click', aplicarBackground(button, artigo));//ouvindo evento de click para cada botão referente a uma cor da paleta de cores
        divPaleta.appendChild(button);
    });
    return divPaleta;
}

function objetoTarefa() {//função que gera um objeto que será usado para armazenamento no localSotrage
    let tarefa = {};
    tarefa.dataCriacao = dataAtual;
    tarefa.dataLimite = form.dataLimite.value;
    tarefa.descricao = form.descricao.value;
    tarefa.checked = false;
    tarefa.idTarefa = idGenerator();//chamando função para gerar um id ramdomico para o objeto
    return tarefa;
}

function idGenerator() {//função para gerar ids para as notas
    return Math.round(Math.random() * 10000);
}


function criarTarefa(dataCriacao, dataLimite, descricao, id) {//função responsável por criar uma tarefa com uma estrutura HTML definida e com as informações inputadas pelo usuário
    const artigo = document.createElement('article');
    artigo.innerHTML =
        `
    <div class="section__box-icons">
        <input data-click-checked id="${id}" type="image" src="./midias/check.png" alt="checked">
        <input data-click-color id="${id}" type="image" src="./midias/color-palette.png" alt="cor">
        <input data-click-lixeira id="${id}" type="image" src="./midias/bin.png" alt="lixeira">
    </div>
    <div class="escolhas-flex paleta"></div>
    <div class="section__box-paragrafo">
         <p>${descricao}</p>
    </div>
    <div class="section__box-datas">
        <p>Criado em: ${dataCriacao}</p>
        <p>Data limite: ${dataLimite}</p>
    </div>
    `
    return artigo;
}

botaoSalvar.addEventListener('click', (e) => {//ouvindo evento de click no botão da formulário
    e.preventDefault();
//  Etapa de validação de entradas de data e descrição
    if (form.dataLimite.value === '' || form.descricao.value === '') {//alerta de campos vazios
        alert("Os campos de Data Limite e Descrição não podem estar vazios!");
        return;
    } else if (form.dataLimite.value < dataAtual) {
        alert("A Data Limite deve ser igual ou superior à data atual!");
        return
    } else {//se passar na validação de entradas
        const objTarefa = objetoTarefa();//chamando essa função para gerar um objeto com as informações dados pelo usuário
        let novaTarefa = criarTarefa(objTarefa.dataCriacao, objTarefa.dataLimite, objTarefa.descricao, objTarefa.idTarefa);//criando nova tarefa com as infomaçoes inputadas pelo usuário

        form.dataLimite.value = "";//limpando campos de input
        form.descricao.value = "";//limpando campos de input

//      manibulando os dados no localStorage
        minhasTarefas.push(objTarefa);//adicinando "objTarefa" em array "minhasTarefas"
        indexTarefas.push(objTarefa.idTarefa);//adicinando "objTarefa" em array "indexTarefas"
        localStorage.setItem('arrayTarefas', JSON.stringify(minhasTarefas));//adicionando array "minhasTarefas" ao localStorage já em JSON
        localStorage.setItem('idsTarefas', JSON.stringify(indexTarefas));//adicionando array "indexTarefas" ao localStorage já em JSON
        sectionTarefas.appendChild(novaTarefa);//apendando nota criada à section
        location.reload();
    }
})