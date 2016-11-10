$(document).ready(function () {

    var animales =["bear", "bird", "cat", "dog", "fish1", "fish2", "fish3", "fish4", "lion", "rabbit"];
    var vidas = 3;
    var level = 0;
    
    $("#empezar").on("click", startgame);
    
    function startgame(){
        vidas = 3;
        level++;
        
        $("#levelmsg").text(level);

        $("#empezar").attr('disabled', 'true');

        $("#contenedor").children().remove();

        for(var i = 0; i < 20; i++){
            $("#contenedor").append("<div></div>");
        }

        $("#contenedor").children().each(function(){
            var animalesAleatorios = Math.floor(Math.random()*10);
            var animalLeft = Math.floor(Math.random()*500);
            var animalTop = Math.floor(Math.random()*300);
            $(this).css({"background-image": "url(images/" + animales[animalesAleatorios] + ".png)", "left" : animalLeft, "top" : animalTop});
            $(this).addClass("animal").attr("animal", animales[animalesAleatorios] );
            $("#animalmsg").text(animales[animalesAleatorios]);
        })

        $("#contenedor").children().on("click", compruebaAnimal);
        lifes();
    }

    

    function compruebaAnimal(){
        var animalpinchado = $(this).attr("animal");
        var animalSelecionar = $("#animalmsg").text();
        console.log(animalpinchado);
        console.log(animalSelecionar);
        if(animalpinchado == animalSelecionar){
            $(this).animate({left: "500"}, "slow" , function(){
                $(this).hide();
                $(this).remove();
            }); 
        } else {
            vidas--;
            lifes();
        }
    }

    function lifes(){
        console.log("h");
        $("#lifes").children().remove();

        for(var i = vidas; i > 0; i--){
            $("#lifes").append("<div></div>");
        }

        $("#lifes").children().each(function(){
            $(this).css("background-image", "url(images/heart.png)").addClass("corazon");
        });
        
        if(vidas == 0){
            $("#contenedor").children().remove();
            $("#contenedor").html("<h1>GAME OVER!!!</h1>");
        }

    }

    $("#nextLevel").on("click", nextLevel);

    function nextLevel(){

        $("#levelmsg").text(level);

        startgame();
    }

});