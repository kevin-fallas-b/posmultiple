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
        if(txt_contra.value.length<8){
            e.preventDefault();
            mensajeError("La contraseña debe tener al menos 8 caracteres");
        }else{
            var val_txtconf = true;
            var mayuscula = false;
            var minuscula = false;
            var numero = false;
            
            for(var i = 0;i<txt_contra.value.length;i++)
            {
                if(txt_contra.value.charCodeAt(i) >= 65 && txt_contra.value.charCodeAt(i) <= 90){
                    mayuscula = true;
                }
                else if(txt_contra.value.charCodeAt(i) >= 97 && txt_contra.value.charCodeAt(i) <= 122){
                    minuscula = true;
                }
                else if(txt_contra.value.charCodeAt(i) >= 48 && txt_contra.value.charCodeAt(i) <= 57){
                    numero = true;
                }
            }
            if(!mayuscula || !minuscula || !numero)
            {
                e.preventDefault();
                val_txtconf=false;
                mensajeError("La contraseña no se considera fuerte. Ingrese una nueva");
                
            }
            if(val_txtconf){
                if(txt_contra.value!=txt_conf_contra.value){
                    e.preventDefault();
                    mensajeError("La contraseña ingresada, no coincide con el campo de verificación");
                }
            }
        }
    }
}