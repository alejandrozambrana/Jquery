//Alejandro zambrana

$(document).ready(function () {

	//al clickar en comenzar, llamo a pintarTablero
  $('button#botonComenzar').on('click', juega);

  

});

function juega(){

	//deshabilita el boton comenzar
	$(this).attr('disabled','true');

	for(var i = 1; i <= 9; i++){
		$("#tablero").append("<div id=capa"+i+"></div>");
		$("#tablero div").addClass("casilla");
	}
	
	//inicializa el jugador a cruz
	var jugador = "cruz";

	$("#texto").text("Juega cruz");

	//añade la clase cruz o circulo cuando pinchas sobre el la casilla
	$(".casilla").click(function(){

		//si jugador es igual a cruz pinta la cruz y cambia a circulos 
		if(jugador == "cruz"){

			//si el hasClass devuelve false es decir no tiene la clase circulo, 
			//pinta la clase cruz y si la tubiera pone jugado a cruz que quiere decir que jugador cruz sigue jugando  
			if($(this).hasClass("circulo") == false && $(this).hasClass("cruz") == false){
				$(this).addClass("cruz");
				$("#texto").text("Juega circulos");
				compruebaGanador(jugador);
				jugador = "circulo";
			} else {
				jugador = "cruz";
			}
		} else {//si no es cruz pinta el circulo y pone jugador a cruz
			
			//si el hasClass devuelve false es decir no tiene la clase cruz, 
			//pinta la clase circulo y si la tubiera pone jugado a circulo que quiere decir que jugador circulo sigue jugando  
			if($(this).hasClass("cruz") == false && $(this).hasClass("circulo") == false){
				$(this).addClass("circulo");
				$("#texto").text("Juega cruz");
				compruebaGanador(jugador);
				jugador = "cruz";
			}else{
				jugador = "circulo";
			}
		}
		
	});

}

function compruebaGanador(jugador){

	var combinacion = [[1,2,3],
										 [1,4,7],
										 [1,5,9],
										 [2,5,8],
										 [3,5,7],
										 [3,6,9],
										 [4,5,6],
										 [7,8,9]]

	for(var i = 0; i <= 7;i++){
		if(($("#capa" + combinacion[i][0]).hasClass(jugador) && 
				$("#capa" + combinacion[i][1]).hasClass(jugador) && 
				$("#capa" + combinacion[i][2]).hasClass(jugador))){

			//hace el animate y una vez que termina borra las capas
			$(".casilla").animate({height: '0px'}, 3000, function(){
				$("div.casilla").remove();
				$('#texto').text("Pulse Comenzar para jugar otra partida");
			});

			if(jugador == "cruz"){
				$("#texto").text("Gana cruz");
			} else {
				$("#texto").text("Gana circulos");
			}
			
			$('#botonComenzar').removeAttr('disabled');	
		} 
	}
}
