var lienzo,intervalX, intervalFlappy, juegoInicio, tubosPos, pts, mueveAlas;

juegoInicio = false;
mueveAlas = true;
tubosPos = 600;
pts = 0;

//definimos un prototipo, que utilice para cada objeto canvas
var Element = function(ctx, img, x, y) {
    this.contexto = ctx;
    this.imagenURL = img;
    this.imagenOK = false;
    this.vivo = true;
    this.x = x;
    this.y = y;

    this.createImg();
};

//comprobar si la imagen de fondo del canvas ha cargado
Element.prototype.createImg = function () {
    this.imagen = new Image();
    this.imagen.src = this.imagenURL;
    this.imagen.onload = this.confirmItem();
};

//confirmar que la imagen cargo
Element.prototype.confirmItem = function () {
    this.imagenOK = true;
};

//una vez que ya sabemos que la imagen cargo dibujamos el canvas
Element.prototype.draw = function () {
    this.contexto.drawImage(this.imagen,this.x,this.y);
};

//definimos un prototipo, que utilice para cada objeto canvas del tipo Texto
var Text = function(cont, text, x, y, color)
{
    this.contexto = cont;
    this.contexto.font ="bold 3em sans-serif";
    this.contexto.fillStyle = color;
    this.contexto.strokeStyle = "black";
    this.contexto.lineWidth = 3;
    this.texto = text;
    this.x = x;
    this.y = y;
};

//dibujamos el texto en el canvas
Text.prototype.drawText = function ()
{
    this.contexto.fillText(this.texto,this.x,this.y);
    this.contexto.strokeText(this.texto,this.x,this.y);
};

//funcion de inicio
function iniciar() {
    var canvas = document.getElementById("lienzo");
    var areaJuego = document.getElementById("preparate");
    var nuevoJuego = document.getElementById("btn-newgame");
    var btnFullscreen = document.getElementById("btn_fullscreen");

    canvas.width = 340;
    canvas.height  = 510;
    var contexto = canvas.getContext("2d");

    lienzo = new Element(contexto,"fondo.png",0,0);
    tierra = new Element(contexto,"ground.png",-202,420);
    arbustos = new Element(contexto,"bush.png",0,380);
    tubo1 = new Element(contexto,"pipe.png",-70,-150);
    tubo2 = new Element(contexto,"pipe.png",-70,-150);
    tubo3 = new Element(contexto,"pipe.png",-70,-150);
    flappy = new Element(contexto,"fly2.png",80,200);
    gameover = new Element(contexto,"game_over.png",40,70);
    puntaje = new Text(contexto, pts , 155, 100, "#ffffff");

    areaJuego.addEventListener("mousedown", volar, false);
    areaJuego.addEventListener("mouseup", caida, false);
    nuevoJuego.addEventListener("click",reiniciarJuego);
    btnFullscreen.addEventListener("click",toggleFullScreen);

    ajustarPantalla(0);
}

window.onload = function() {
    animationX(10, 2);
    moverAlas ();
};

//funcion de animacion caida y vuelo de flappy
function animationX(fps, sentido) {
    intervalX = setInterval(function() {
        var aleatorio = getRandom(40,200);
        var separacion = 200;
        //capa 1: dibujando fondo
        lienzo.draw();
        //capa 2: dibujando arbustos
        arbustos.draw();

        if (juegoInicio) {
            //capa 3: animando y dibujando los tres pares de tubos que son los obstaculos
            tubo1.x = tubo1.x <= -70 ? tubosPos : tubo1.x - 1;
            tubo2.x = tubo1.x  - separacion;
            tubo3.x = tubo1.x  + separacion;
            tubo1.draw();
            tubo2.draw();
            tubo3.draw();

            //haciendo que la posicion en eje Y, cambie aleatoriamente
            if(tubo1.x <= -70){
                tubo1.y = (aleatorio)*-1;
            }

            //evitar colisiones con tubo nro 1
            if (tubo1.x <= flappy.x+24 && tubo1.x >= flappy.x-75  && tubo1.y+380<=flappy.y) {
                perdiste();
            }

            if (tubo1.x <= flappy.x+24 && tubo1.x >= flappy.x-75  && tubo1.y+285>=flappy.y) {
                perdiste();
            }

            //evitar colisiones con tubo nro 2
            if (tubo2.x <= flappy.x+24 && tubo2.x >= flappy.x-75  && tubo2.y+380<=flappy.y) {
                perdiste();
            }

            if (tubo2.x <= flappy.x+24 && tubo2.x >= flappy.x-75  && tubo2.y+285>=flappy.y) {
                perdiste();
            }

            //evitar colisiones con tubo nro 3
            if (tubo3.x <= flappy.x+24 && tubo3.x >= flappy.x-75  && tubo3.y+380<=flappy.y) {
                perdiste();
            }

            if (tubo3.x <= flappy.x+24 && tubo3.x >= flappy.x-75  && tubo3.y+285>=flappy.y) {
                perdiste();
            }

            //capa 4: animando y dibujando el personaje
            if (flappy.y > 386) {
                flappy.y = 386;
                perdiste();
            }else{
                flappy.y = flappy.y + (sentido);
            }
        }
        //hacer que las se muevan
        flappy.draw();

        //capa 5:animando y dibujando el objeto que representa la tierra
        tierra.x = tierra.x <= -202 ? 0 : tierra.x - 1;
        tierra.draw();

        puntaje.drawText();

        //Actualizando el texto de puntaje en el canvas
        if (tubo1.x == flappy.x || tubo2.x == flappy.x || tubo3.x == flappy.x) {
            var puntos = document.getElementById("score");
            var puntajeFinal = document.getElementById("lbl_puntos");
            pts = pts + 1;
            puntos.value = pts;
            puntajeFinal.innerHTML = pts;
            puntaje.texto = pts;
            puntaje.drawText();
        }

    }, fps);
}

//funcion para obtener numeros aleatorios
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//funcion que hace que el flappy caiga *gravedad
function caida() {
    clearInterval(intervalX);
    animationX(10,2);
}

//cada vez que se hace clic se dispara esta funcion que hace volar al flappy
function volar(){
    var preImage = document.getElementById("preparate");
    clearInterval(intervalX);
    preImage.className += " fadeOut";
    if (juegoInicio) {
        tubosPos = 330;
    }else{
        tubosPos = 600;
    }
    juegoInicio = true;
    if(flappy.vivo){
        animationX(10,-5);
    }
}

//animacion que cambia imagen de fondo para hacer efecto de movimiento de alas
function moverAlas () {
    intervalFlappy = setInterval(function() {
        if (mueveAlas) {
            flappy.imagenURL = "fly1.png";
            flappy.createImg();
            flappy.draw();
            mueveAlas = false;
        }else{
            flappy.imagenURL = "fly2.png";
            flappy.createImg();
            flappy.draw();
            mueveAlas = true;
        }
    }, 180);
}

//funcion que se dispara cuando el flappy toca el suelo o cualquiera de los tubos
function perdiste() {
    var perdiste = document.getElementById("perdiste");
    var areaJuego = document.getElementById("preparate");
    puntaje.texto = '';
    puntaje.drawText();
    gameover.draw();
    perdiste.style.display = "block";
    clearInterval(intervalX);
    clearInterval(intervalFlappy);
    flappy.vivo = false;
    areaJuego.style.pointerEvents = 'none';
}

//funcion que permite reinicializar los valores para poder reiniciar el juego
function reiniciarJuego() {
    var perdiste = document.getElementById("perdiste");
    var preImage = document.getElementById("preparate");
    var puntajeFinal = document.getElementById("lbl_puntos");
    puntajeFinal.innerHTML = 0;
    preImage.style.pointerEvents = 'auto';
    pts = 0;
    juegoInicio = false;
    perdiste.style.display = "none";
    preImage.classList.remove("fadeOut");
    preImage.style.display = "block";
    flappy.y = 200;
    tubosPos = 600;
    clearInterval(intervalX);
    iniciar();
    window.onload();
}

//funcion para activar/desactivar pantalla completa
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
  ajustarPantalla (121);
}

//ajusta pantalla al tamaño adecuado del navegador
function ajustarPantalla (ajuste) {
    var principal = document.getElementById("wrapper");
    var altoPantalla = window.innerHeight;
    var altoFinal = parseInt(altoPantalla) + parseInt(ajuste);
    principal.style.height = altoFinal+"px";
}

//defino la url para obtener datos ajax
//pro : en produccion
//dev : en desarrollo
var url = {
  dev:"http://localhost:3000",
  pro:"http://flappy-mejorandola.herokuapp.com"
};

//Función de inicio
function init() {
    var refresh = document.getElementById("refresh");

    //funcion que llama el JSON del servidor
    loadJSON();

    //refrescar los datos de la tabla de puntaje
    refresh.addEventListener("click",function() {
         loadJSON();
    });
}

//funcion que llama el JSON del servidor
function loadJSON()
{
   //defino una variable del tipo XMLHttpRequest
   var http_request = new XMLHttpRequest();

   //defino una variable para la url
   var url_source = url.dev+"/list_score";

   //llamo la funcion que valida que el navegador se compatible con ajax
   validacion_ajax();

   http_request.onreadystatechange = function(){
     //compruebo el estado de la peticion
     //1: server connection established 2: request received  3: processing request
      if (http_request.readyState == 1 || http_request.readyState == 2 || http_request.readyState == 3)
      {
        var table = document.getElementById('lista');
        table.innerHTML = "<tr><th>Nombre</th><th>Puntos</th></tr>";
        table.innerHTML += "<tr><td colspan='2'><img width='40px' src='../images/load.gif'/></td></tr>";
        table.innerHTML += "<tr><td colspan='2'>Cargando...</td></tr>";
      }
     //compruebo el estado de la peticion
     //4: request finished and response is ready
      else if (http_request.readyState == 4  )
      {
        var table = document.getElementById('lista');
        var mejorPuntaje = document.getElementById('lbl_mejor');
        var jsonObjects = JSON.parse(http_request.responseText);

        //renderizo los datos JSON a una tabla HTML
        table.innerHTML = "<tr><th>Nombre</th><th>Puntos</th></tr>";
        for (var object in jsonObjects){
            var nombre = jsonObjects[object].nombre;
            var puntos = jsonObjects[object].puntos;
            table.innerHTML+="<tr><td>"+nombre+"</td><td>"+puntos+"</td></tr>";
        }

        //renderizo el Mejor Puntaje
        mejorPuntaje.innerHTML = " "+jsonObjects[0].puntos;
      }
   };
   http_request.open("GET", url_source, true);
   http_request.send();
}

//funcion que valida que el navegador se compatible con ajax
function validacion_ajax() {
   try{
      http_request = new XMLHttpRequest();
   }catch (e){
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            console.log("Tu Navegador No Soporta XMLHttpRequest");
            return false;
         }
      }
   }
}