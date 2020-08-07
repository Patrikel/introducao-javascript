//Aqui no remove-paciente nos vamos remover o paciente com um duplo click e para isso vamos criar algumas funções
//Primeira coisa preciso adicinar um evendo quando clico duas vezes sobre um paciente na tabela
//Mas para remover um paciente da tabela eu deveria colocar em um evento em cada paciente existente e novo. Isso não é viavel
//Vou usar uma propriedade do do js que é... todo elemento pai escuta o evento que está sendo feito. É como se fou uma bolha que iniciou lá em baixo e foi subindo até chegar no body e estourar.
//Então se o evento está na tabela (table) não posso usar o this.remove() pq o this pega sempre o dono do evento. e o dono do evento vai ser o table. Se eu usar o this a minha tabela vai ser removida.
//Vou usar a tabela para escutar o evento e vou eliminar o alvo (target) mas se eu usar o comando event.target.remove() ele não vai excluir o tr e sim o td, porque vou estar eliminando o filho que é o "td" e como eu quero eliminar a linha eu devo remover o tr. por isso devo usar uma propriedade do js que é: parentNode (devo "atirar" no pai)
//Entre outras palavra a tabela (table) está escutando e quando ela escutar eu estou pedindo para eliminar o pai parentNode

var tabela = document.querySelector("table"); 
tabela.addEventListener("dblclick", function(event){
	event.target.parentNode.classList.add("fadeOut"); //adicinando uma classe nos parametros para executar um efeito CSS

	setTimeout(function(){ //a função setTimeout serve para para o js esperar um certo tempo até executar uma coisa. Quando eu declado essa função eu preciso abrir outra função (seja ela anonima ou nao) para executar o conteudo. Em outras palavras eu estou dizendo.. js espera espera um pouco para executar isso
		var alvoEvento = event.target;
		var paiDoAlvo = alvoEvento.parentNode;
		paiDoAlvo.remove();
	},500); //para declarar o tempo no final da função eu coloco , e declaro o tempo que quero em ms(milissegundos)

});

