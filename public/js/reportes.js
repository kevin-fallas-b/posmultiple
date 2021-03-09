window.addEventListener('load',inicial,false);

var idEmp;
var div_repVentas;
var dt_fchInicial;
var dt_fchFinal;
var frm;

function inicial(){
    btn_repVentas = document.getElementById('btn_repVentas');
    btn_consRepVentas = document.getElementsByName('btn_consRepVentas');
    div_repVentas = document.getElementById('div_repVentas');
    dt_fchInicial = document.getElementById('dt_fchInicial');
    dt_fchInicial.addEventListener('keyup',noEscribirFI,false);
    dt_fchFinal = document.getElementById('dt_fchFinal');
    dt_fchInicial.addEventListener('keyup',noEscribirFF,false);
    frm = document.getElementById('formRepVentas');
    frm.addEventListener('submit',generarReporteVentas);
}

function mostrarDivVentas(){
    div_repVentas.style.display='block';
}

function inventario(){
    div_repVentas.style.display='none';
}

function generarReporteVentas(e){
    e = e || window.event;
    
    var f = new Date();
    var mes = f.getMonth()+1;
    if(parseInt(mes)<10){
        mes = '0'+mes;
    }
    var dia = parseInt(f.getDate());
    if(dia<10){
        dia = '0'+dia;
    }

    var fechaActual = f.getFullYear()+'-'+mes+'-'+dia;
  //  txt_fechaActual.value = fechaActual;
    
	if(fechasVacias()){
        e.preventDefault();
        alertify.error("Debe seleccionar las dos fechas");
	}else if(!fechaInicialMenor()){//valida que la fecha inicial sea mayor a la final
	    	e.preventDefault();
            alertify.error("La fecha final debe ser mayor a la inicial");
		    dt_fchInicial.value="";
	}else if(dt_fchInicial.value > fechaActual || dt_fchFinal.value > fechaActual){
        e.preventDefault();
        alertify.error("Las fechas seleccionadas no pueden ser mayores a la fecha actual");
    }
}

function fechaInicialMenor(){
	if(dt_fchInicial.value > dt_fchFinal.value){
	    return false;
	}
	return true;
}

function fechasVacias(){
    if(dt_fchInicial.value!="" && dt_fchFinal.value!=""){
		return false;
	}	
	return true;
}

function noEscribirFI(){//no permite escribir en el campo de fecha
    dt_fchInicial.value="";
}

function noEscribirFF(){
	dt_fchFinal.value="";
}