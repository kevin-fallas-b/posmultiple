window.addEventListener('load',inicial,false);

var div_repSelFechas;
var title;

var dt_fchInicialV;
var dt_fchFinalV;
var frmV;
var div_formVentas;

var dt_fchInicialFR;
var dt_fchFinalFR;
var frmFR;
var div_formFactR;


function inicial(){
    div_repSelFechas = document.getElementById('div_repSelFechas');
    title = document.getElementById('title');

    dt_fchInicialV = document.getElementById('dt_fchInicialV');
    dt_fchInicialV.addEventListener('keyup',noEscribirFIV,false);
    dt_fchFinalV = document.getElementById('dt_fchFinalV');
    dt_fchFinalV.addEventListener('keyup',noEscribirFFV,false);
    frmV = document.getElementById('formRepVentas');
    frmV.addEventListener('submit',generarReporteVentas);
    div_formVentas = document.getElementById('div_formVentas');

    dt_fchInicialFR = document.getElementById('dt_fchInicialFR');
    dt_fchInicialFR.addEventListener('keyup',noEscribirFIFR,false);
    dt_fchFinalFR = document.getElementById('dt_fchFinalFR');
    dt_fchFinalFR.addEventListener('keyup',noEscribirFFFR,false);
    frmFR = document.getElementById('formRepFactR');
    frmFR.addEventListener('submit',generarReporteFactR);
    div_formFactR = document.getElementById('div_formFactR');

}

function mostrarDivVentas(){
    div_repSelFechas.style.display='block';
    div_formVentas.style.display='block';
    div_formFactR.style.display='none';
    title.innerHTML = 'Ventas';
}

function mostrarDivFacturasRealizadas(){
    div_repSelFechas.style.display='block';
    div_formFactR.style.display='block';
    div_formVentas.style.display='none';
    title.innerHTML = 'Facturas realizadas';
}

function inventario(){
    dt_fchInicialV.value="";
    dt_fchFinalV.value="";
    dt_fchInicialFR.value="";
    dt_fchFinalFR.value="";
    div_repSelFechas.style.display='none';
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

	if(fechasVaciasV()){
        e.preventDefault();
        alertify.error("Debe seleccionar las dos fechas");
	}else if(!fechaInicialMenorV()){//valida que la fecha inicial sea mayor a la final
	    	e.preventDefault();
            alertify.error("La fecha final debe ser mayor a la inicial");
		    dt_fchInicialV.value="";
	}else if(dt_fchInicialV.value > fechaActual || dt_fchFinalV.value > fechaActual){
        e.preventDefault();
        alertify.error("Las fechas seleccionadas no pueden ser mayores a la fecha actual");
    }
}

function generarReporteFactR(e){
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

	if(fechasVaciasFR()){
        e.preventDefault();
        alertify.error("Debe seleccionar las dos fechas");
	}else if(!fechaInicialMenorFR()){//valida que la fecha inicial sea mayor a la final
	    	e.preventDefault();
            alertify.error("La fecha final debe ser mayor a la inicial");
		    dt_fchInicialFR.value="";
	}else if(dt_fchInicialFR.value > fechaActual || dt_fchFinalFR.value > fechaActual){
        e.preventDefault();
        alertify.error("Las fechas seleccionadas no pueden ser mayores a la fecha actual");
    }
}

function fechaInicialMenorV(){
	if(dt_fchInicialV.value > dt_fchFinalV.value){
	    return false;
	}
	return true;
}

function fechaInicialMenorFR(){
	if(dt_fchInicialFR.value > dt_fchFinalFR.value){
	    return false;
	}
	return true;
}

function fechasVaciasV(){
    if(dt_fchInicialV.value!="" && dt_fchFinalV.value!=""){
		return false;
	}	
	return true;
}

function fechasVaciasFR(){
    if(dt_fchInicialFR.value!="" && dt_fchFinalFR.value!=""){
		return false;
	}	
	return true;
}

function noEscribirFIV(){//no permite escribir en el campo de fecha
    dt_fchInicialV.value="";
}

function noEscribirFFV(){
	dt_fchFinalV.value="";
}

function noEscribirFIFR(){//no permite escribir en el campo de fecha
    dt_fchInicialFR.value="";
}

function noEscribirFFFR(){
	dt_fchFinalFR.value="";
}