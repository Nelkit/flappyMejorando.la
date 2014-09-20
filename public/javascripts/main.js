var url = {
  dev:"http://localhost:3000",
  pro:"http://flappy-mejorandola.herokuapp.com"
}

function init() {
    loadJSON();
    var refresh = document.getElementById("refresh");
    // refresh.addEventListener("click",function() {
    //     loadJSON();
    // });
}

function loadJSON()
{
   var http_request = new XMLHttpRequest();
   var url_source = url.pro+"/list_score";
   validacion_ajax();

   http_request.onreadystatechange = function(){
      if (http_request.readyState == 4  )
      {
        var table = document.getElementById('lista');
        var jsonObjects = JSON.parse(http_request.responseText);
        table.innerHTML = "<tr><th>Nombre</th><th>Puntos</th></tr>";
        for (var object in jsonObjects){
            var nombre = jsonObjects[object].nombre;
            var puntos = jsonObjects[object].puntos;
            table.innerHTML+="<tr><td>"+nombre+"</td><td>"+puntos+"</td></tr>";
        }
      }
   }
   http_request.open("GET", url_source, true);
   http_request.send();
}

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