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

function mover(tirada){

	//multiplica el numero del dado por los pixeles a mover
	var movimiendoPX = tirada * 52;

	$("#" + jugador).animate({
							left: "+=" + movimiendoPX + "px"
	});

	//saca la posicion del jugador
	var posicionJugador = $("#" + jugador).attr("pos");

	//suma la posicion con la tirada del dado
	posicionJugador = parseFloat(posicionJugador) + parseFloat(tirada);

	//le pone al jugador la posicion
	$("#" + jugador).attr("pos", posicionJugador);

	//habilita el boton tirar dado
	$('#botonDado').removeAttr('disabled');
	
	turnos();
}

function turnos(){

	if(jugador == "rojo"){
		jugador = "verde";
		$("#texto").text("Juega Verde");
	} else {
		jugador = "rojo";
		$("#texto").text("Juega Rojo");
	} 

}