var botaoAdicionarPaciente = document.querySelector("#adicionar-paciente"); //estou pegando o botão lá do html

botaoAdicionarPaciente.addEventListener("click", function(event){ //evento para escutar em um click e a função a exe
	event.preventDefault();	//o parametro event está presendo o comportamento padrão do form

	//Extraindo informações do paciente
	var form = document.querySelector("#form-adiciona"); // variavel form está recebendo o id do form no html
	var paciente = obtemPacienteDoFormulario(form); //var paciente está recebendo o valor da função obtemPacienteDoFormulario(form) com o parametro form que contem todo conteudo do form lá no html
	
	var erros = validaPaciente(paciente); // variavel erros está recebendo meu array de erros vindo da função validaPaciente(paciente) (parametro paciente para usar na função)
	console.log(erros);

	if(erros.length > 0){ //validação dos erros. se o tamanho dos erros(length) for maior que 0 significa que tem erro então ele executa  a função exibeMensagemDeErro(erros) com o parametro erros  
		exibeMensagemDeErro(erros);
		return; // return vazio para NÃO adicionar paciente com erro. quando a função está vazia ele não retorna nada e fica só com a mensagem de erro
	}

	adicionaPacienteNaTabela(paciente);

	form.reset(); // limpa formulário
	var apagaMensagemDeErro = document.querySelector("#mensagens-erro") // variavel está recebendo a <ul></ul> de erros
	apagaMensagemDeErro.innerHTML = ""; // estou manipulando o conteudo da apagaMensagemDeErro para nada (assim limpo as mensagens de erro que ficam aparecendo no formulario)
});

function adicionaPacienteNaTabela(paciente){ //Nessa função eu pego o paciente, monto o TR do paciente e depois jogo dentro de uma variavel. Depois puxo a tabela lá do html e dou um appendChild nela com o Tr montado
	var pacienteTr =  montaTr(paciente); // pacienteTr está recebendo a Tr já com os Td´s dentro
	//Adicionando paciente na tabela
	var tabela = document.querySelector("#tabela-pacientes"); // estou pegando o id da tabela e guardando em uma var
	tabela.appendChild(pacienteTr); //a tabela está recebendo pacienteTr que contem as Td´s
}


function obtemPacienteDoFormulario(form){

	var paciente = { // o paciente é um objeto e possui caracteristicas (carcteristicas de um mesmo objeto)
		nome: form.nome.value,	//pela propriedade form eu posso buscar o name(propriedade lá do html que possibilita buscar ela) e o valor dela que está no input
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}
	return paciente; //a função precisa retornar alguma coisa e no caso ela está retornando o meu paciente com suas caracteristicas
}

function montaTr(paciente){ //parametro paciente precisa ser declarado aqui pq vou ustilizar ele na função mostraTd
	//Cria tr e td do paciente
	var pacienteTr = document.createElement("tr"); //criando elemento tr com o document.createElement

	pacienteTr.classList.add("paciente"); // pacienteTr está recebendo uma classe (classList.add) para ficar na mesma classe dos demais pacientes feitos no html

	//Adicionando (appendChild) as td´s dentro do pacienteTr
	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome")); // a função appendChild() ela coloca "como filho" os outros elementos 
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso")); // a appendChild está colocando dentro da Tr as Td´s atraves da função montaTd. Dentro da montaTd está os parametros que eu quero colocar que é um dado e uma classe de acordo com a função montaTd
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

	return pacienteTr; //função retorna o pacienteTr (agora minha Tr contem dentro dela as Td´s (Assim formando minha tabela))

}

function montaTd(conteudo, classe){//Minha função montatd precisa receber como parametro um dado e uma classe (exatamente como esta no html)

	var td = document.createElement("td"); //criando o elemento (document.createElement("td")) e salvando na variavel td
	td.textContent = conteudo; //adicionando conteudo (td.textContent = conteudo)
	td.classList.add(classe);  //adicionando a classe (td.classList.add(classe))
	return td; //função está retornando minha td já com o conteudo e com a classe
}

function validaPaciente(paciente){ //função para validar meu paciente

	var erros = []; // declarei um array pois preciso que a função me retorne mais de um valor (e com esses valores de erros posso manipular em outra função)

	if(!validaPeso(paciente.peso)) erros.push("Peso inválido"); //se (! <- negação | validaPeso(paciente.peso) essa função validaPeso é a função criada lá no calcula-imc, pq estou utilizando a logica dela para validar o paciente.peso). Se não validou eu vou colocar dentro do meu array erros[] (erros.push("mensagem") uma mensagem de erro) e assim sucessivamente. Preciso validar todos os campos.
	if(!validaAltura(paciente.altura)) erros.push("Altura inválida");
	if(paciente.nome.length == 0) erros.push("Nome não pode ser em branco"); //se nome do paciente tiver um tamanho (length) == 0 eu exibo uma mensagem de campo em branco
	if(paciente.peso.length == 0) erros.push("Peso não pode ser em branco");
	if(paciente.altura.length == 0) erros.push("Altura não pode ser em branco");
	if(paciente.gordura.length == 0) erros.push("Gordura não pode ser em branco");

	return erros; //a função está retornando o meu array de erros e validações.
}

function exibeMensagemDeErro(erros){ //com essa função eu vou criar uma lista de erros (<ul><li>erro</li></ul>) para isso eu preciso receber como parametro os meus erros armazenados na variavel erros (que recebeda da minha função validaPaciente)
		//em vez de criar sempre um <span></span> vazio no html é melhor criar uma lista e atraves do js manipular essa lista

		var ul = document.querySelector("#mensagens-erro"); // variavel ul está rebecendo a ul lá no html.
		ul.innerHTML = ""; //a propriedade innerHTML serve para eu manipular o conteudo lá no HTML e nesse caso eu estou "limpando" o conteudo da ul, para ele não ficar com o conteudo das antigas mensagens de erro e para colocar as novas
		erros.forEach(function(erro){ //forEach é uma forma diferente de usar o for(o js já sabe a quantidade de interações que vou ter que fazer para criar as <li></li> com o conteudo erro)  esse erro que está como parametro pode ser qualquer nome pq ele representa a minha mensagem de erro dentro do array erros 
			var li = document.createElement("li"); //crio os elementos <li></li>
			li.textContent = erro; //adiciono o conteudo erro dentro de <li></li>
			ul.appendChild(li); //e coloco dentro da ul com o (ul.appendChild(li))
		})
}