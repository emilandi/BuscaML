var region='AR';  

searchUrbanDict = function(word){        
    var region = fnRegion();       
    var query = word.selectionText;
    chrome.tabs.create({url: "https://listado.mercadolibre.com." + region + "/" + query});
};

// evento menu contextual
chrome.contextMenus.create({
    title: "Buscar '%s' en Mercado Libre",
    contexts:["selection"],  // ContextType
    onclick: searchUrbanDict // A callback function
});
 
// retorna ubicacion cliente web
function fnRegion () {    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {      
        var obj = JSON.parse(xhttp.responseText);
        region = obj.countryCode;        
      }
    };
    xhttp.open("GET", "http://ip-api.com/json", true);
    xhttp.send();
    return region;
}

/*
DOMINIOS
AR
BO
BR
CL
CO
CR
DO
EC
BR
HN
MX
NI
PA
PY
PE
SV
UY
VE
*/
