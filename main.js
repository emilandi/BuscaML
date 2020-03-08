var region='';
fnSetRegion(region);

document.addEventListener('DOMContentLoaded', init, false);

function init(){
  var url = "http://ip-api.com/json";
  var xhttp = new XMLHttpRequest();  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {      
      var obj = JSON.parse(xhttp.responseText);     
      region = obj.countryCode;
      fnSetRegion(region);
      fnInfo(obj);
    }
  };
  xhttp.open("GET", url , true);
  xhttp.send();
};

function fnInfo (obj) {
  console.log('Datos de conexion: ')
  console.log('Pais: ' + obj.country);
  console.log('Region: ' + obj.regionName);
  console.log('Cuidad: ' + obj.city);
}

searchUrbanDict = function(word){
  
  var region = fnGetRegion('region');  
  
  if (region) {        
    var query = word.selectionText; 
    var url = fnDominio(region);             
    chrome.tabs.create({url: url + "/" + query});         
  }else{
    alert ('No se pudo obtener la localizacion');
  };

  console.clear();
  console.log('Buscar: ' + query);
  console.log('Dominio: ' + region );
  console.log('URL: ' + url);  

};

/*evento menu contextual */
chrome.contextMenus.create({
  title: "Buscar  '%s' en Mercado Libre",
  contexts:["selection"],  // ContextType
  onclick:searchUrbanDict // A callback function
});

/* Retorna la URL de busqueda en base al dominio  
DOMINIOS AR,BO,BR,CO,DO,EC,HN,MX,NI,PA,PY,PE,SV,UY,VE*/
function fnDominio(region){ 

  url='https://listado.mercadolibre.com.';
  
  if(region=='BR') {
      url='https://lista.mercadolivre.com.';
  }

  if(region=='CR'){
      url='https://listado.mercadolibre.co.';
  }
  
  if(region=='CL'){
    url='https://listado.mercadolibre.';
  }  
  
  return url + region;

}

function fnSetRegion(value) {
  localStorage.setItem('region',value)
}

function fnGetRegion(value){
  return (localStorage.getItem('region'))
}

/*DOMINIOS AR,BO,BR,CO,DO,EC,HN,MX,NI,PA,PY,PE,SV,UY,VE */