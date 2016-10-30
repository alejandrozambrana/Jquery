//Alejandro zambrana

//variables global
var numCasillas = 16;
var numOcas = 3;
var numPozo = 3;
//inicializa jugador
var jugador = "rojo";

$(document).ready(function () {

	//al clickar en comenzar, llamo a comenzar
  $('button#botonComenzar').on('click', comienza);

  //al clickar en Tirar dado, llamo a dado
  $('button#botonDado').on('click', dado);


});

function comienza(){

	//deshabilita el boton comenzar
	$(this).attr('disabled','true');

	//borra todas las capas
	$("div[id^=capa]").remove();
  $('#rojo').animate({left:'-45px'},500);
  $('#verde').animate({left:'-45px'},500);

	for(var i = 1; i <= numCasillas; i++){
		$("#tablero").append("<div id=capa"+ i +"></div>");//vrea los divs
		$("#tablero div").addClass("casilla");//le añade la clase casilla
		$("#tablero div[id=capa"+ i +"]").text(i).attr('pos',i); //le pone el numero a la casilla y la posicion
		$('#rojo').attr('pos',0);
    $('#verde').attr('pos',0);
	}

	var numerosAleatorios = [];
	var contador = 0;

	//crea un array con la posicion de los patos y de las trampas
	do{
		numerosAleatorios[contador] = Math.floor((Math.random()*(numCasillas - 1)) + 1); //saca numero aleatorio
		jQuery.unique(numerosAleatorios); //elimina los numeros repetidos
		contador = numerosAleatorios.length; //saca la cantidad de numeros que tiene el array
	} while(contador < (numOcas + numPozo));

	//dibuja las tres ocas
	for(var i = 0; i < numOcas;i++){
		$("#tablero div[id=capa" + numerosAleatorios[i] +"]").addClass("oca");	
	}

	//dibuja las tres trampas
	for(var i = numOcas; i < (numPozo * 2);i++){
		$("#tablero div[id=capa" + numerosAleatorios[i] +"]").addClass("pozo");	
	}

	//pinta la casilla final
	$("#tablero div[id=capa" + numCasillas +"]").addClass("fin");	

	//deshabilita el boton tirar dado
	$('#botonDado').removeAttr('disabled');

	//cambia mensaje
	$("#texto").text("Juega Rojo");

}

function dado(){

	//deshabilita el boton comenzar
	$(this).attr('disabled','true');

	var tirada = Math.floor((Math.random()*6) + 1);
	$("#dado").text("Tirada: " + tirada);

	//llama a la funcion mover
	mover(tirada);

}

var entraOca = false;

function mover(tirada){

	entraOca = false;

	//multiplica el numero del dado por los pixeles a mover
	var movimiendoPX = tirada * 52;

	//saca la posicion del jugador
	var posicionJugador = $("#" + jugador).attr("pos")
	//suma la posicion con la tirada del dado
	posicionJugador = parseFloat(posicionJugador) + parseFloat(tirada);
	//le pone al jugador la posicion
	$("#" + jugador).attr("pos", posicionJugador);

	//si la posicion se pasa del numero de casilla lo iguala al limite 
	if(posicionJugador >= numCasillas){
		posicionJugador = numCasillas;
		$("#" + jugador).animate({ left: (52 * (numCasillas - 1)) + 7 +"px"}, 2000);
			$("#texto").text("El jugador "+ jugador +" ha ganado la partida. Pulse en comenzar para jugar de nuevo.");
			//habilita el boton tirar dado
			$('#botonComenzar').removeAttr('disabled');
	} else { //sino juega normal

		//inicia el movimiento
		$("#" + jugador).animate({left: "+=" + movimiendoPX + "px"}, 2000, function(){

			//habilita el boton tirar dado
			$('#botonDado').removeAttr('disabled');

			//saca la posicion en la que esta las ocas y los pozos
			var posicionOcas = [];
			var posicionPozo = [];
			var contador = 0;
			var contador2 = 0;
			for (var i = 0; i < numCasillas; i++) {
				if($("div[pos="+ i +"]").hasClass("oca") == true){ //si el div con esa posicion tiene la clase oca guarda la posicion en un array
				 posicionOcas[contador] = i;
				 contador++;
				} else if($("div[pos="+ i +"]").hasClass("pozo") == true){
					posicionPozo[contador2] = i;
					contador2++;
				}
			}

			//si los divs en el que cae el jugador tiene la clase oca mueve a el jugador a la siguiente oca
			var posicionAnterior = posicionJugador; //guarda la posicion en una variable para no perder la posicion al cambiarla
			for (var i = 0; i < numOcas; i++) {
				if(posicionJugador == posicionOcas[i]){ //si la posicion del jugador es igual a la de una oca 
					posicionJugador = posicionOcas[i + 1]; //le pone la posicion de la siguiente oca
					//le añade la nueva posicion al jugador
					$("#" + jugador).attr("pos", posicionJugador);
					//le resta a la posicion nueva del jugador la posicion antigua y sale el numero de casillas que tiene que moverse 
					//y lo multiplica por 52 pasa saber los pixeles que tiene que aumentarle para hacer el movimiento
					movimiendoPX = (posicionJugador - posicionAnterior) * 52;
					//pinta la posicion nueva del jugador
					$("#" + jugador).animate({left: "+=" + movimiendoPX + "px"}, 2000);
					entraOca = true;
					i = 3;
				}
			}

			//si losdivs en el que cae el jugador tiene la clase pozo mueve el jugador a la casilla de salida
			for (var i = 0; i < numPozo; i++) {
				if(posicionJugador == posicionPozo[i]){
					$('#' + jugador).animate({left:'-45px'},500);
					$("#" + jugador).attr("pos" , 0);
				}
			}
			turnos();
		});
	}
}

function turnos(){

	if(jugador == "rojo" && entraOca == false){
		jugador = "verde";
		$("#texto").text("Juega Verde");
	} else if (jugador == "rojo" && entraOca == true) {
		jugador = "rojo";
		$('#texto').text("De oca a oca y tiro por que me toca. Sigue jugando el jugador " + jugador);
	} else if (jugador == "verde" && entraOca == false){
		jugador = "rojo";
		$("#texto").text("Juega Rojo");
	} else if (jugador == "verde" && entraOca == true){
		jugador = "verde";
		$('#texto').text("De oca a oca y tiro por que me toca. Sigue jugando el jugador " + jugador);
	}

}