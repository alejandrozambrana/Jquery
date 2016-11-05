$(document).ready(function () {

	//variables Globales
	var tablero = [];
	var barcos = 5;
	var filas = ["A", "B", "C", "D", "E"];
	var columna = 0;
	var contador = 0;
	var aciertos = 0;
	var fallos = 0;

	crearTablero();

	function crearTablero(){

		//Se asignan las casillas de agua
		for(var i = 0; i < 25; i++){
			tablero[i] = "agua";
		}

		//Se asignan los barcos sin que se pisen 
		do{
			var posicion = Math.floor(Math.random()*25);
			if(tablero[posicion] == "agua"){
				tablero[posicion] = "barco";
				barcos --;
			}
		} while (barcos > 0);

		//crea cuadricula
		for(var i = 1;i <= 5;i++){
			//linea horizontales
			var lineaH = $("<span></span>").addClass("lineaH").css("top", (51 * i) + (i - 1) + "px");
			//lo añade al contenedor
			$("#tablero").append(lineaH);
			//linea vertical
			var lineaV = $("<span></span>").addClass("lineaV").css("left", (51 * i) + (i - 1) + "px");
			//lo añade al contenedor
			$("#tablero").append(lineaV);
		}

		//crea marco del tablero
		for(var i = 0; i < 36; i++){
			var casilla = $("<div></div>").addClass("casilla");//crea los divs y le añade la clase casilla
			if(i > 0 && i < 6){
				casilla.text(filas[i - 1]);
			} else if((i % 6 == 0) && (i != 0)) { //Se rellena la columna
          casilla.text(i - i + columna);
          columna++;
      } else if(i != 0) { //Se rellenan el agua y los barcos
          casilla.addClass(tablero[contador]);
          contador++;
          //Se asigna el evento click
          casilla.on("click",function(){
              compruebaCasilla(this);
          });
      }
      //Se añaden las casillas al tablero
      $("#tablero").append(casilla);
		}
	}

	function compruebaCasilla(casillaComprobar){

		if($(casillaComprobar).hasClass("agua") == true){
			$(casillaComprobar).animate({opacity:'1'},1000);
			fallos++;
			$("#fallos").text("Fallos: " + fallos);
		} else {
			$(casillaComprobar).animate({opacity:'1'},1000);
			aciertos++;
			$("#aciertos").text("Aciertos: " + aciertos);
		}
		if(aciertos == 5){
      $("#tablero p").text("WIN!!!").css("display","block");
    }
    if(fallos == 20){
      $("#tablero p").text("GAME OVER!!!").css("display","block");
    }
   }

  //al clickar en ver Barcos, llamo a muestraBarcos
	$('#botonBarcos').on('click', muestraBarcos);

	function muestraBarcos(){

		$(".barco").each(function(){
			if($(this).css("opacity") == 0){
				$(this).animate({opacity:'1'},100, function(){
					$(this).animate({opacity:'0'},400);
				});
			}	
		});
		
	}

	//al clickar en comenzar de nuevo, llamo a nuevaPartida
	$('#botonComenzar').on('click', nuevaPartida);

	function nuevaPartida(){

	//pone las variables a 0
	tablero = [];
	barcos = 5;
	columna = 0;
	contador = 0;
	aciertos = 0;
	fallos = 0;

	//$("#tablero div").remove();

	//otra menara de borrar con un each
	$(".casilla").each(function(){
		$(this).remove();
	});
	$("#tablero span").remove();
	$("#tablero p").text("").css("display","none");
	$("#fallos").text("Fallos: 0" );
	$("#aciertos").text("Aciertos: 0");

	crearTablero();

	}

});