window.addEventListener('load', iniciar, false);

var txt_correo;
var txt_contra;
var txt_conf_contra;
var frm;

function iniciar() {
    frm = document.getElementById('formlogin');
    frm.addEventListener('submit',validarFormulario);

    txt_contra = document.getElementById('contra'); 
    txt_conf_contra = document.getElementById('conf_contra'); 
}

function validarFormulario(e){
	e = e || window.event;
    
	if(!stringvalido(txt_contra.value,50)){
		e.preventDefault();
        if(txt_contra.value!=""){
            mensajeError("Contraseña no valida");
        }else{
            mensajeError("Debe ingresar una contraseña");
        }
	}else{
        if(txt_contra.value!=txt_conf_contra.value){
            e.preventDefault();
            mensajeError("La contraseña ingresada, no coincide con el campo de verificación");
        }
    }
}