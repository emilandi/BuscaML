searchUrbanDict = function(word){
    var query = word.selectionText;
    chrome.tabs.create({url: "https://listado.mercadolibre.com.ar/" + query});
 };

chrome.contextMenus.create({
 title: "Buscar '%s' en Mercado Libre",
 contexts:["selection"],  // ContextType
 onclick: searchUrbanDict // A callback function
});