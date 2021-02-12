/*
    Archivo que controla la administracion de usuarios dentro de la misma empresa del admin logeado.
    Creado por KFallas. 20/01/21 
*/
window.addEventListener('load', inicial, false);

var temporizador;//temporizador que usamos para solo buscar clientes despues de que el usuario dejo de digitar en campo nombre

var txtclienteeditar;

var txtcedula
var txtnombre;
var txtcorreo;
var txtcontra;
var txtusername;//nombre de usuario del usuario que se esta creando.
var idusuario;//id del usuario logeado quien registra el cliente
var idemp;//id de la empresa del usuario logeado
var checkactivo;//check para saber si el usuario esta activo o no

var contenedorcampos;

var editando;//bandera
var ideditando;
var usuarios;//array que contiene el resultado de la busqueda de usuarios
var btnTipoUsuario;//el boton que es un dropdown
var tipousuario;//1 = mesero, 2 = cajero, 3 = admin

function inicial() {
    txtclienteeditar = document.getElementById('txtclienteeditar');
    txtcedula = document.getElementById('txtcedula');
    txtnombre = document.getElementById('txtnombre');
    txtcorreo = document.getElementById('txtcorreo');
    txtcontra = document.getElementById('txtcontra')
    txtusername = document.getElementById('txtusername');
    checkactivo = document.getElementById('checkactivo')
    idusuario = document.getElementById('idusuario').value;
    idemp = document.getElementById('idempresa').value;

    btncancelarr = document.getElementById('botcancelar')
    btnguardar = document.getElementById('btnguardar');

    contenedorcampos = document.getElementById('contenedorcampos');
    btnTipoUsuario = document.getElementById('dropdownTipo')
    
    limpiarcampos();
}

function tipoUsuario(tipo) {
    //para cuando se esta editando
    //tipo llega como un valor numerico, entonces primero pasarlo a su equivalente en texto
    if(Number.isInteger(tipo)){
        switch(tipo){
            case '2':
                tipousuario=2;
                break;
            case '1':
                tipo='mesero';
                break;
            case '3':
                tipo='Administrador';
                break;
        }
    }
    btnTipoUsuario.innerHTML = tipo;
    switch(tipo){
        case 'Cajero':
            tipousuario=2;
            break;
        case 'Mesero':
            tipousuario=1;
            break;
        case 'Administrador':
            tipousuario=3;
            break;
    }
    btnTipoUsuario.classList.remove('btn-secondary');
    btnTipoUsuario.classList.add('btn-primary');
    btnTipoUsuario.style.width ='145px'
}

function limpiarcampos() {
    txtnombre.value = '';
    txtcedula.value = '';
    txtcorreo.value = '';
    txtcontra.value = '';
    txtusername.value ='';
    txtclienteeditar.value = '';
    editando = false;
    document.getElementById('primerfila').classList.remove('disabled');
    btnTipoUsuario.innerHTML = 'Tipo de Usuario';
    btnTipoUsuario.classList.remove('btn-primary');
    btnTipoUsuario.classList.add('btn-secondary');
    txtcedula.removeAttribute('disabled');
    tipousuario=0;
    $('#checkactivo').bootstrapToggle('on')
}

function buscarusuarios(texto) {
    clearTimeout(temporizador);
    document.getElementById('resultadosbusqueda').setAttribute('hidden', true)
    temporizador = setTimeout(function () {
        if (texto != '') {
            //buscar clientes mediante ajax y meterlos al dropdown list
            var form = new FormData();
            form.append('nombre', texto.toUpperCase());
            form.append('idemp', idemp);
            axios.post('buscarUsuarios', form)
                .then(function (response) {
                    usuarios = response.data
                    document.getElementById('resultadosbusqueda').innerHTML = ''
                    for (var i = 0; i < usuarios.length; i++) {
                        document.getElementById('resultadosbusqueda').innerHTML += '<div class="dropdown-item" style=" cursor: pointer;" onclick="editar(' + usuarios[i]['usu_id'] + ')"> ' + usuarios[i]['usu_nombre'] + '</div>';
                    }
                    if (usuarios.length == 0) {
                        document.getElementById('resultadosbusqueda').innerHTML = ' <div class="dropdown-item" style="pointer-events: none;"> No se encontraron resultados. </div>';
                    }
                    document.getElementById('resultadosbusqueda').removeAttribute('hidden')
                })
                .catch(function (error) {
                    alertify.error('Ocurrio un error interno al intentar buscar usuarios. Por favor intente mas tarde.');
                })

        }
    }, 900); // Will do the ajax stuff after 1000 ms, or 1 s
}

function esconderresultados() {
    document.getElementById('resultadosbusqueda').setAttribute('hidden', true)
}

function cancelar() {
    contenedorcampos.setAttribute('hidden', true);
    limpiarcampos();
}

function nuevo() {
    limpiarcampos();
    document.getElementById('primerfila').classList.add('disabled');
    contenedorcampos.removeAttribute('hidden');
}

function editar(id) {
    ideditando = id;
    editando = true;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i]['usu_id'] == id) {
            txtcedula.value = usuarios[i]['usu_cedula'];
            txtnombre.value = usuarios[i]['usu_nombre'];
            txtcorreo.value = usuarios[i]['usu_correo'];
            txtusername.value = usuarios[i]['usu_usuario'];
            switch(usuarios[i]['usu_tipo']){
                case '2':
                    tipo='Cajero';
                    break;
                case '1':
                    tipo='Mesero';
                    break;
                case '3':
                    tipo='Administrador';
                    break;
            }
            tipoUsuario(tipo);
            if(usuarios[i]['usu_activo'] ==1 ){
                $('#checkactivo').bootstrapToggle('on') 
            }else{
                $('#checkactivo').bootstrapToggle('off')
                
            }
            break;
        }
    }
    txtcedula.setAttribute('disabled', true);
    document.getElementById('primerfila').classList.add('disabled');
    contenedorcampos.removeAttribute('hidden');
}


function guardar() {
    if (validarcampos()) {
        var form = new FormData();
        form.append('tipo', tipousuario);
        form.append('idemp', idemp)
        form.append('nombre', txtnombre.value);
        form.append('cedula', txtcedula.value);
        form.append('correo', txtcorreo.value);
        form.append('contra', txtcontra.value);
        form.append('usuario', txtusername.value);
        if(checkactivo.checked){
            form.append('activo', 1);
        }else{
            form.append('activo', 0);
        }
        if (editando) {
            form.append('id', ideditando);
        }
        axios.post('usuarios', form)
            .then(function (response) {
                if (response.data === 'exito') {
                    if (editando) {
                        alertify.success('Usuario editado correctamente.');
                    } else {
                        alertify.success('Usuario registrado correctamente.');
                    }
                    cancelar();
                } else {
                    alertify.error(response.data);
                }
            })
            .catch(function (error) {
                alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
            })
    }
}

function validarcampos() {

    if (!stringvalido(txtnombre.value, 50) || !stringvalido(txtcedula.value, 50) ||!stringvalido(txtusername.value, 50) || !stringvalido(txtcorreo.value, 50) || ( !editando && !stringvalido(txtcontra.value, 50))) {
        alertify.error('Existen errores en los campos.')
        return false;
    }
    if (btnTipoUsuario.innerHTML == 'Tipo de Usuario') {
        alertify.error('Debe especificar el tipo de usuario.')
        return false;
    }
    if (!validateEmail(txtcorreo.value)) {
        alertify.error('Correo invalido.')
        return false;
    }
    return true;
}
