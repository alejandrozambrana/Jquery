$(document).ready(function () {

  $("body").keydown(function(e) {
  	if($("#block").position().left < 1140){
      switch((e.keyCode ? e.keyCode : e.which)){
        case 32: // Space
  				//Jumpif($("#block").position().left < 1100){}
  				$("#block").animate({top: "-=50", left: "+=50"},000);
  				$("#block").animate({top: "+=50", left: "+=50"},100);	
  			break;
        case 37:   // Left Arrow
          $("#block").animate({left: "-=10"},1);
        break;
        case 39:   // Right Arrow
          $("#block").animate({left: "+=10"},1);
          compruebaSemaforo();
        break;
      }
      compruebaPelota();
    }
  });

  //pone el coche en mitad de la pantalla
  $("body").children("div:nth-child(2)").css("top", "320px");

  //aplico estilo al cielo
  $("#cielo").css({"background-image": "url(imagenes/cielo.jpg)", "width": "1200px", "height": "350px"});

  //repite el cielo
  cielo()

  function cielo (){
    $("#cielo").css("background-position" , "0px 0px");
    $("#cielo").animate({backgroundPosition: '-1024px'},20000, function(){
      cielo();
    });
    
  }

  pelota();

  function pelota(){
    $("body").append('<div id="pelota"></div>');
    $("#pelota").addClass("pelota");
    $("#pelota").css("left", "1150px");

    $("#pelota").animate({left: "0px"},5000,function(){
      $("#pelota").remove();
      pelota();
    });



  }

  function compruebaPelota(){
    var cocheLeft = $("#block").position().left;
    var cocheTop = $("#block").position().top;
    var pelotaLeft = $("#pelota").position().left;
    pelotaLeft = Math.floor(pelotaLeft);
    var pelotaTop = $("#pelota").position().top;
    if((cocheLeft+15) >= pelotaLeft && (cocheLeft-15) <= pelotaLeft && (cocheTop + 10) == pelotaTop){
      $("#block").css({"background-image": "url(imagenes/pelota.png)"});

    }
  }


  var aleatorio = 0;

  semaforo();

  function semaforo(){

    //poner semaforo aleatorio
    aleatorio = Math.floor(Math.random()*120);

    aleatorio = aleatorio * 10;

    $("body").append('<div id="semaforo"></div>');

    $("#semaforo").addClass("semaforo");

    $("#semaforo").css("left", aleatorio + "px");
  }

  function compruebaSemaforo(){
    var coche = $( "#block" );
    var position = coche.position();
    if(position.left == (aleatorio-80)){
      console.log("hello");
    }
  }

});