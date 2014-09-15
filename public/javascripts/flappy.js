var lienzo, intervalX, juegoInicio, tubosPos, pts, mueveAlas;

juegoInicio = false;
mueveAlas = true;
tubosPos = 600;
pts = 0;

var Element = function(ctx, img, x, y) {
    this.contexto = ctx;
    this.imagenURL = img;
    this.imagenOK = false;
    this.x = x;
    this.y = y;

    this.createImg();
};

Element.prototype.createImg = function () {
    this.imagen = new Image();
    this.imagen.src = this.imagenURL;
    this.imagen.onload = this.confirmItem();
};

Element.prototype.confirmItem = function () {
    this.imagenOK = true;
};

Element.prototype.draw = function () {
    this.contexto.drawImage(this.imagen,this.x,this.y);
};

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
}

Text.prototype.drawText = function ()
{
    this.contexto.fillText(this.texto,this.x,this.y);
    this.contexto.strokeText(this.texto,this.x,this.y);
}



function iniciar() {
    var canvas = document.getElementById("lienzo");
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
    puntaje = new Text(contexto, pts , 155, 100, "#ffffff");

    window.addEventListener("mousedown", volar, false);
    window.addEventListener("mouseup", caida, false);
};

window.onload = function() {
    animationX(10, 2);
    moverAlas ();
}

function animationX(fps, numero) {
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
            };

            //evitar colisiones con tubo nro 1
            if (tubo1.x <= flappy.x+24 && tubo1.x >= flappy.x-75  && tubo1.y+380<=flappy.y) {
                clearInterval(intervalX)
            };

            if (tubo1.x <= flappy.x+24 && tubo1.x >= flappy.x-75  && tubo1.y+285>=flappy.y) {
                clearInterval(intervalX)
            };

            //evitar colisiones con tubo nro 2
            if (tubo2.x <= flappy.x+24 && tubo2.x >= flappy.x-75  && tubo2.y+380<=flappy.y) {
                clearInterval(intervalX)
            };

            if (tubo2.x <= flappy.x+24 && tubo2.x >= flappy.x-75  && tubo2.y+285>=flappy.y) {
                clearInterval(intervalX)
            };

            //evitar colisiones con tubo nro 3
            if (tubo3.x <= flappy.x+24 && tubo3.x >= flappy.x-75  && tubo3.y+380<=flappy.y) {
                clearInterval(intervalX)
            };

            if (tubo3.x <= flappy.x+24 && tubo3.x >= flappy.x-75  && tubo3.y+285>=flappy.y) {
                clearInterval(intervalX)
            };

            //capa 4: animando y dibujando el personaje
            flappy.y = flappy.y > 386 ? 385 : flappy.y + (numero);
        };
        //hacer que las se muevan
        flappy.draw();

        //capa 5:animando y dibujando el objeto que representa la tierra
        tierra.x = tierra.x <= -202 ? 0 : tierra.x - 1;
        tierra.draw();

        puntaje.drawText();

        if (tubo1.x == flappy.x || tubo2.x == flappy.x || tubo3.x == flappy.x) {
            pts = pts + 1;
            puntaje.texto = pts;
            puntaje.drawText();
        };

    }, fps);
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function caida() {
    clearInterval(intervalX);
    animationX(10,2);
}

function volar(){
    if (juegoInicio) {
        tubosPos = 330;
    }else{
        tubosPos = 600;
    };
    juegoInicio = true;
    clearInterval(intervalX);
    animationX(10,-5);
}

function moverAlas () {
    setInterval(function() {
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