var campoFiltro = document.querySelector("#filtrar-tabela"); //Estou pegando o campo la no html

campoFiltro.addEventListener("input", function(){ //Estou adcionando um evento de escuta no campoFiltro do tipo "input". E executando uma função
	console.log(this.value);

	var pacientes = document.querySelectorAll(".paciente"); //Para eu comparar com os pacientes eu preciso importar todos (All)

	if(campoFiltro.value.length > 0){ 			//Se o meu campoFiltro com valor(value) de tamanho(length) maior(>) que 0 então eu vou verificar o que foi digitado com todos os pacientes
		pacientes.forEach(function(paciente){ 	//Estou usando o forEach no meu array de pacientes para passar por cada um. E o (paciente) que está no parametro da função está retornando a Tr dos pacientes. Então preciso filtrar dentro da tr o conteudo da td que tem o nome do paciente
			var nomeTd = paciente.querySelector(".info-nome"); //Variavel nomeTd está está recebendo todos os info-nomes contido no meu array paciente 
			var nome = nomeTd.textContent; 		// Variavel nome vai receber o conteudo das td´s
			var expressao = new RegExp(campoFiltro.value,"i"); //**IMPORTANTE** (variavel expressão está recebendo "uma expressão regular" que é um objeto regular do js) essa expressão regular = new RegExp recebe duas coisas (o que eu quero que ela busque, que é lá no campoFiltro.value e como vc quer que a ela busque(case sensitive ou case insensitive))
			
			if(!expressao.test(nome)){ 			//com o this.value não funciona //a minha expressao tem uma propriedade (uma função) chamada expressao.teste() e dentro do meu parenteses vai o que eu quero testar que no caso é o "nome" 
				paciente.classList.add("invisivel");
			}
			else{ 								//Se o nome é igual eu tiro o display:none(que "retira" no paciente da tela)
				paciente.classList.remove("invisivel");
			}
		}); 									//Fim do meu forEach
	}
	else{ 										//Se o valor do campoFiltro for diferente da condição do else então eu faço outro laço (usei forEach de novo para percorrer todos meus pacientes) e tirar a classe invisivel  
		pacientes.forEach(function(paciente){
			paciente.classList.remove("invisivel"); //removendo dos meus td´s (paciente) a classe invisivel
		})
	}	
}); 