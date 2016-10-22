//Alejandro zambrana

$(document).ready(function () {

var bolasCreadas = 0;

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
									 	.appendTo("#juego").animate({top: top + "px"
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

	  $("#arbol").animate({
	  					 "left": "+=30px"
	  },"fast", function(){
	  	$("#arbol").animate({
	  					 "left": "-=60px"
	  	},"fast", function(){
	  		$("#arbol").animate({
	  					 	"left": "+=60px"
		  	},"fast", function(){
					$("#arbol").animate({
										"left": "-=30px"
					});
				});
	  	});
	  });
	});

});