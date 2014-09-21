//defino la url para obtener datos ajax
//pro : en produccion
//dev : en desarrollo
var url = {
  dev:"http://localhost:3000",
  pro:"http://flappy-mejorandola.herokuapp.com"
}

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
   var url_source = url.pro+"/list_score";

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
   }
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