//VARIAVEIS DE CONTROLE DE INTERFACE

let seuVotoPara = document.querySelector('.d-1-1 span'); //Variável Para retirar a escrita SEU VOTO PARA quando começar a digitar o voto.
let cargo = document.querySelector('.d-1-2 span'); //Variável para alterar o campo cargo "Prefeito ou Vereado".
let descricao = document.querySelector('.d-1-4'); //Variável para alterar o campo da descrição do candidato.
let aviso = document.querySelector('.d-2'); //Variável para trabalhar com campo de aviso de como votar do rodapé da tela.
let lateral = document.querySelector('.d-1-right'); //Variável para trabalhar com a imagem dos candidatos.
let numeros = document.querySelector('.d-1-3'); //Variável para trabalhar no campo digitos dos candidatos.


/*VARIAVEIS DE CONTROLE DE AMBIENTE -> SABENDO QUE COMEÇAMOS DA ETAPA 0*/
let etapaAtual = 0;
let numero = ''; // Variavel irá guardar a informação quando clicar o número no teclado.
let votoBranco = true; //Variavel para clicar em voto em branco.
let votos = []; //Salva a informação do voto para poder enviar para alguma base.

function comecarEtapa() {//Vai limpar a tela, pegar a etapa atual e preencher as informações

    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++){ //Quantidade de espaços que deve aparecer para digitar.
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>'; //Para adicionar a div com a class pisca, pois ela é a ação para inserir o número no campo;
        }else{
        numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none'; //Vai ocultar a informação de inicio da votação.
    cargo.innerHTML = etapa.titulo; //Vai puxar o titulo do script etapas.
    descricao.innerHTML = ''; //Vai limpar as informações inicial da descrição do candidato até a escolha dele.
    aviso.style.display = 'none'; //Vai ocultar a div com os avisos que aparece no inicio da votação.
    lateral.innerHTML = ''; //Inicia com as imagens dos candidatos vazio.
    numeros.innerHTML = numeroHtml;

}
// FUNÇÃO PARA ATUALIZAR A INTERFACE DA TELA APÓS ESCOLHER O CANDIDATO.
function atualizaInterface(){ //Sempre quando tiver uma ação de clicar nos números, irá atualizar a interface.
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length >0){//Se a veridicação foi true e achou o candidato, irá preencher as informações com a escolha.
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
        for (let i in candidato.fotos){//Traz a foto e a descrição do cargo.
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }else{
                fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}


//CRIANDO AS AÇÕES DE CLICAR NOS BOTÕES
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca'); // Vinculado com a class pisca para aparecer o número no campo.
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`; //Comando para adicionar o número no campo.

        elNumero.classList.remove('pisca'); //Remove o pisca depois de digitado no primeiro campo.

        if(elNumero.nextElementSibling !== null){ //Comando para verificar se está no último campo para não dar erro.
            elNumero.nextElementSibling.classList.add('pisca'); //Vai adicionar o pisca no campo do lado, para continuar a clicar número.
        }else{
            atualizaInterface();
        }
    }
}

function branco() {
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'; //Aparecer o displas do aviso
        numeros.innerHTML = '';//Para retirar o display dos número
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML ='';
    }else{
        alert("Para voltar em branco, não deve digitar nenhum número!!!")
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {//Aqui entra  o backend para enviar as informações para algum lugar
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({ //Vai criar a array do voto branco.
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({ //Vai criar a array do voto confirmado ou nulo.
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        }
    }
}

//Ativar o começar a votação

comecarEtapa(); //Primeira coisa que ira iniciar