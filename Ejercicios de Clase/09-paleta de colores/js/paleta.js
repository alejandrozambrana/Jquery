$(document).ready(function () {

    //variables globales
    var colorSeleccionado = "";
    var segundoColorSeleccionado = "";
    var colorRGB = "";
    var colorRGB2 = "";

    $("#paletaUno").children().on("click", selecionarColor);
    $("#paletaDos").children().on("click", selecionarColorSegundaPaleta);
    $("#contenedor").children().on("mouseenter", colorear);

    function selecionarColor(){
        //cuando pincha en la paleta 1 coje la clase para poder colorear
        colorSeleccionado = $(this).attr("class");

        //saca el color en RGB del div en el que hemos hecho click
        colorRGB = $(this).css("background-color");
        //muestra el color
        $("#colorPaletaUno").text(colorRGB);
        //pinta una linea con el color selecionado para saber cual es
        $("#colorPaletaUno").css("border-bottom", "2px solid " + colorRGB);

    }

    function selecionarColorSegundaPaleta(){
        segundoColorSeleccionado = $(this).attr("class");

        //saca el color en RGB del div en el que hemos hecho click
        colorRGB2 = $(this).css("background-color");
        //muestra el color
        $("#colorPaletaDos").text(colorRGB2);
        //pinta una linea con el color selecionado para saber cual es
        $("#colorPaletaDos").css("border-bottom", "2px solid " + colorRGB2);
    }

    function colorear(){
        //añade la clase del color seleccionado
        $(this).attr("class", colorSeleccionado);

        actualizarNum();
    }

    function actualizarNum(){

        $('#paletaUno .rojo').text($('#contenedor div.rojo').length);
        $('#paletaUno .amariyo').text($('#contenedor div.amariyo').length);
        $('#paletaUno .verde').text($('#contenedor div.verde').length);
        $('#paletaUno .azul').text($('#contenedor div.azul').length);
        $('#paletaUno .negro').text($('#contenedor div.negro').length);
        $('#paletaUno .blanco').text($('#contenedor div.blanco').length);

    }

    $("#intercambiar").on("click", intercambiar);

    function intercambiar(){

        $("#contenedor").children().each(function(){
            if($(this).hasClass(colorSeleccionado)){
                $(this).attr("class", segundoColorSeleccionado);
            }
        });
       
        actualizarNum();
    }


    $("#rellenar").on("click", rellenar);

    function rellenar(){

        $("#contenedor").children().each(function(){
            $(this).attr("class", segundoColorSeleccionado);
        });

        actualizarNum();
    }

    $("#limpiar").on("click", limpiar);

    function limpiar(){

        $("#contenedor").children().each(function(){
            $(this).attr("class", "nada");
        });
        actualizarNum();

    }




});