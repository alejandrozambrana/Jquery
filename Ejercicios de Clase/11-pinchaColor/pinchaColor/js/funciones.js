$(document).ready(function() {
    
    var nivel = 1;
    var color = ['red','orange','yellow','green','blue'];

   $("#comenzar").on("click", empezar);

    function empezar(){

        for(var i = 0; i<nivel; i++){
            $("#juego").append("<div></div>");
        }
        nivel++;

        $("#juego").children().each(function(){

            var posicionLeft = Math.floor(Math.random()*300);
            var posicionLeftAnimate = Math.floor(Math.random()*300);
            $(this).attr("id", "bola").addClass("bolita").css({"left": posicionLeft + "px", "background-color": color[Math.floor(Math.random()*5)]});
            $(this).animate({top: "0", left: posicionLeftAnimate }, 5000);
        });
    }

    function comprueba(){



    }
});