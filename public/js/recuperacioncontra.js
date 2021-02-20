window.addEventListener('load', iniciar, false);

var txt_correo;
var frm;

function iniciar() {
    frm = document.getElementById('formlogin');
    frm.addEventListener('submit',validarFormulario);

    txt_correo = document.getElementById('correo'); 
}

function validarFormulario(e){
	e = e || window.event;
	if(!validateEmail(txt_correo.value)){
		e.preventDefault();
        if(txt_correo.value!=""){
            mensajeError("Correo no valido");
        }else{
            mensajeError("Debe ingresar el correo");
        }
	} 
}