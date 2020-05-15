
document.addEventListener("DOMContentLoaded", function(event) {    
    getParam();        
	console.log('ready!');
	document.getElementById('btnsave').addEventListener('click',fnGuardar);
});

function getParam() {
    var order = localStorage.getItem('order'); 
    var elem = document.getElementById('order');
    
    if(order=='rele'){
        elem.selectedIndex=0;
    }
    if(order=='menor'){
        elem.selectedIndex=1;
    }
    if(order=='mayor'){
        elem.selectedIndex=2;
    }

    var condicion = localStorage.getItem('condicion');
    var elem = document.getElementById('condicion');
    if(condicion=='todo'){
        elem.selectedIndex=0;
    }
    if(condicion=='nuevo'){
        elem.selectedIndex=1;
    }
    if(condicion=='usado'){
        elem.selectedIndex=2;
    }

    var envio = localStorage.getItem('envio');
    var elem = document.getElementById('envio');   
    if(envio=='true'){
        elem.checked=true;        
    }else{
        elem.checked=false;        
    }    
   
}

function fnGuardar() {
    
    var condicion=document.getElementById('condicion').value;       
    var order = document.getElementById('order').value;
    var envio = document.getElementById('envio').checked;

    localStorage.setItem('condicion',condicion);
    localStorage.setItem('order',order);
    localStorage.setItem('envio',envio);
    
    self.close();
    
}