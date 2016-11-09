$(document).ready(function () {

	
	//oculta las imagenes
	$("#boxcard div img").css("opacity", 0);

	moverImagenes();

	function moverImagenes(){
		var imagenes = [];
		var numAleatorios = [];
		var imagenesAleatorias = [];
		var contador = 0;

		//mete en un array el nombre de las imagenes
		for(var i = 1; i <= 10; i++){
			imagenes[i] = $("#card" + i + " img").attr("src");
		}
		//se puede hacer con un each y te ahorras un for
		/*$("#boxcard div img").each(function(i){
			imagenes[i] = $("#card" + i + " img").attr("src");
		});*/
		


		//saca numeros aleatorios sin que se repitan
		do{
			numAleatorios[contador] = Math.floor((Math.random()*10) + 1); //saca numero aleatorio
			jQuery.unique(numAleatorios); //elimina los numeros repetidos
			contador = numAleatorios.length; //saca la cantidad de numeros que tiene el array
		}while(contador < 10)

		//pone las imagenes de forma aleatoria
		for(var i = 0; i < 10; i++){
			imagenesAleatorias[i] = imagenes[numAleatorios[i]]
		}
		
		//muestra las imagenes aleatoriamente
		for(var i = 1; i <= 10; i++){
			$("#card" + i + " img").attr("src", imagenesAleatorias[i - 1]);
		}
	}

	juego();

	function juego(){

		var destapado = [];
		var i = 0;
		var contador2 = 0;
		var click = 0;
		var acertadas = 0;

		//cuando pincha sobre un cuadro muestra la imagen
		$("#boxcard div img").click(function(){;
			click++;
			$("#count").text(click);
			$(this).animate({opacity: "1"},"fast", function(){
				destapado[i] = $(this).attr("src"); //saca cual es la imagen
				i++;
				contador2++;
				if(destapado[0] != destapado[1] && contador2 == 2){ //si la imagenes no coinciden oculta las imagenes
					$("img[src='" + destapado[0] + "']").css("opacity", 0);
					$("img[src='" + destapado[1] + "']").css("opacity", 0);
					i = 0;
					contador2 = 0;
				} else if(destapado[0] == destapado[1] && contador2 == 2) { //si acierta una pareja pone las variables a 0 para poder seguir jugando
					i = 0;
					contador2 = 0;
					acertadas++;
				}
				if(acertadas == 5){
					$("span").text("EnhoraBuena ha terminado en " + click + " clicks");
				}
			});
		});

		
	}

	function resetGame(){

		//vuelve a barajar las imagenes
		moverImagenes();

		//oculta las imagenes
		$("#boxcard div img").css("opacity", 0);

		click = 0;

		//pone los click a 0
		$("#count").text(click);

	}
	

});