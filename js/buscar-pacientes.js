var botaoAdicionar = document.querySelector("#buscar-pacientes");
botaoAdicionar.addEventListener("click", function(){

	var xhr = new XMLHttpRequest(); 				//Objeto responsavel por fazer as requisições http. Mas para ele fazer essa requisição é preciso conf ele com algumas funções

	xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //A primeira função vai dizer qual tipo de requisição a gente quer fazer e para onde. Existe varios tipos de requisição mas nos vamos fazer a do tipo "GET"

	xhr.addEventListener("load", function(){ 		//estou adicionando um evento para escutar quando for carregado(load) e executar uma função para trazer os dados que eu pedi
			
		var erroAjax = document.querySelector("#erro-ajax"); //Caso contece algum erro ou não preciso manipular a classe incisivel que está lá no meu span

		if(xhr.status == 200){						//Se o estatus da minha requisição for 200 (OK)	
			erroAjax.classList.add("invisivel");	//Caso a requisição for bem sucedida, eu adiciono a classe invisivel no erroAjax para ele ficar apagado

			var resposta = xhr.responseText;		//xhr tem uma propriedade que eu posso pedir a "respostas" do "Texto" (responseText)
			console.log(typeof resposta); 			////imprime no console.log o tipo da minha resposta (typeof). Nesse caso vai ser uma string que se chama (json = js obecjt notation) é uma formatação leve de troca de dados
			console.log(resposta);

			var pacientes = JSON.parse(resposta);	//Aqui eu estou convertendo o arquivo JSON que veio em forma de string para um objeto que eu posso manipular no js. Os consoles.logs estão mostrando o tipo de cada variavel e em baixo o seu conteudo.
			console.log(typeof pacientes);
			console.log(pacientes);					//Como eu tenho um array cheio de paciente, para eu colocar 1 paciente por vez na tabela eu preciso interar esse pacientes atraves de um laço e ir passando por cada paciente na sua posição e adicionar ele na tabela atraves da função adicionaPacienteNaTabela()

			pacientes.forEach(function (paciente){  //Laço para passar pelo meu array de pacientes e na posição paciente vou adicionar na tabela atraves da função
				adicionaPacienteNaTabela(paciente); //função criada lá no form.js
			});
		}
		else{ 										//Caso a requisição não for bem sucedida eu removo a classe invisivel e mostro a mensagem de erro lá do span
			console.log(xhr.status);
			console.log(xhr.responseText);
			erroAjax.classList.remove("invisivel");
		}

	});

	xhr.send(); 									//pega os dados abertos e envia minha requisição
});


//Esse metodo de fazer essa requisição de chama AJAX. Uma requisição de modo a assíncrono (pq ele não está parando o meu fluxo do JS) "ele faz tudo ao mesmo tempo"
//Estudar https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/200