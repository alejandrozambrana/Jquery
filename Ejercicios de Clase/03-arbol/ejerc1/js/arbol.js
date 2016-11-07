//Alejandro zambrana

$(document).ready(function () {

var bolasCreadas = 0;
var bolasEliminadas = 0;

	//deshabilita el boton de mover el arbol
	  $("#mover").attr("disabled", "true");

	//lo realiza al darle al boton adornar
	$("#adornar").click(function(){
	 	
	 	//deshabilita el boton de mover el arbol
	  $("#mover").attr("disabled", "true");

	 	//coje el color aleatorio
	 	var color1 = Math.floor(Math.random() * 255);
	 	var color2 = Math.floor(Math.random() * 255);
	 	var color3 = Math.floor(Math.random() * 255);
	 	var color = "rgb(" + color1 + "," + color2 + "," + color3 + ")";

	 	//calcula la posicion
	 	var top = Math.floor(Math.random() * 330);
	 	var left;
	 	if(top < (330/3)){
	 		left = Math.floor(Math.random() * 50) + 180;
	 	} else if((top >= (330/3)) && (top < 2 * (330/3))){
	 		left = Math.floor(Math.random() * 180) + 110;
	 	} else if ((top >= (2 * (330/3))) && (top < 340)) {
      left = Math.floor(Math.random() * 290) + 50;
    }

    //
 	  $("<div></div>").addClass("bolita").css({"background" : color , "left" : left + "px"})
									 	.appendTo("#juego").animate({
									 												top: top + "px"
																			},"slow", function(){
																				$("#mover").removeAttr("disabled");
																			});

		bolasCreadas++;
		$("#creadas").text(bolasCreadas);
									
	});

	//lo realiza al darle al boton mover
	$("#mover").click(function(){

		//deshabilita el boton de adornar el arbol
	  $("#adornar").attr("disabled", "true");

	  //mueve el arbol para los lados
	  $('#arbol').animate({"left" : "+=30px"}, 50)
	  $('#arbol').animate({"left" : "-=60px"}, 50)
	  $('#arbol').animate({"left" : "+=60px"}, 50)
	  $('#arbol').animate({"left" : "-=30px"},"fast", function(){

			//tira las bolas al suelo del arbol
			$("#juego .bolita").each(function(index){

				//delay pone retraso ala ejecucion
				$(this).delay(50*index).animate({
							top : "351px"
				},"fast", function(){
					//cuando estan en el suelo desaparecen
					$(this).animate({
						opacity: "0"
					},"fast", function(){
						
						//aumenta el numero de bolas eliminadas
						bolasEliminadas++;
						$("#eliminadas").text(bolasEliminadas);
						
						//pone las bolas creadas a cero
						bolasCreadas = 0;
						$("#creadas").text(bolasCreadas);
						
						//elimina capa del DOM
						$(this).remove();

						//pone visible el boton de poner adorno
						$("#adornar").removeAttr("disabled");

						//deshabilita el boton de mover el arbol
						$("#mover").attr("disabled", "true");

					});
				});
			});
	  });
	});

});