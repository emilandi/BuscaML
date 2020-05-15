var region='';

fnSetRegion(region);

document.addEventListener('DOMContentLoaded', init, false);

function init(){
  
  var url = "http://ip-api.com/json";
  var xhr = new XMLHttpRequest();
  
  xhr.onload = success;
  xhr.onerror = error;
  xhr.open('GET', url);
  xhr.send();

  if(getValues('condicion')==null){
    setValues('condicion','todo');
  }

  if(getValues('order')==null){
    setValues('order','rele');
  }
  
  if(getValues('envio')==null){
    setValues('envio',false);
  }

};

function getValues(value) {
  return localStorage.getItem(value);
}

function setValues(key,value) {
  localStorage.setItem(key,value);
}

function success() {
  var obj = JSON.parse(this.responseText);
  region = obj.countryCode;
  fnSetRegion(region);  
  fnInfo(obj);
}

function error(err) {
  console.log('Error Occurred :', err);
}

function fnInfo (obj) {
  console.log('Datos de conexion: ')
  console.log('Pais: ' + obj.country);
  console.log('Region: ' + obj.regionName);
  console.log('Cuidad: ' + obj.city);
  console.log(obj);
}

fnBuscarML = function(word){

  var params = [];
  var region = fnGetRegion('region');
  
  if (region) {        
    
    var url = fnDominio(region);             
    var key = word.selectionText;

    var paramOrder = getValues('order');
    var paramCondicion=getValues('condicion');
    var paramEnvio=getValues('envio');
        
    if(paramOrder=='mayor'){
      var order = '_OrderId_PRICE*DESC';
      params.push('Mayor precio');
    }
    
    if(paramOrder=='menor'){
      var order = '_OrderId_PRICE';
      params.push('Menor precio');
    }    
    
    if(paramOrder=='rele'){
      var order=''; //mas relevantes
      params.push('Mas relevantes');
    }
        
    if(paramCondicion=='nuevo'){
      var condicion  = '_ITEM*CONDITION_2230284';
      params.push('Nuevo');
    }
    
    if(paramCondicion=='usado'){
      var condicion = '_ITEM*CONDITION_2230581';
      params.push('Usado');
    }
    
    if(paramCondicion=='todo'){    
      var condicion = '' // nuevos + usados
      params.push('Todos');
    }    

    if(paramEnvio=='true'){
      var envio = '_CostoEnvio_Gratis';
      params.push('Envio gratis');
    }else{
      var envio = '';
    }

    var query = key + envio + order + condicion + envio; 
    chrome.tabs.create({url: url + "/" + query});

  }else{
    alert ('No se pudo obtener geolocalizacion');
  };

  console.clear();
  console.log('Buscar: ' + key);
  console.log('Dominio: ' + region );
  console.log('URL: ' + url);  
  console.log('Params: '  + params);
};

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

/*evento menu contextual */
chrome.contextMenus.create({
  title: "Buscar  '%s' en Mercado Libre",
  contexts:["selection"],  // ContextType
  onclick:fnBuscarML // A callback function
});


function fnSetRegion(value) {
  localStorage.setItem('region',value)
}

function fnGetRegion(value){
  return (localStorage.getItem('region'))
}

/*DOMINIOS AR,BO,BR,CO,DO,EC,HN,MX,NI,PA,PY,PE,SV,UY,VE */