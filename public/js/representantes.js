window.addEventListener('load', inicial, false);

var idemp;

var contenedorCampos;
var tabla;
var tablaCompleta;
var txtNombre;
var txtTelefono;
var txtCorreo;
var idProveedor;
var titulo;
var representantes;

var btnEditar;
var btnGuardar;
var primeraFila;

var editando;
var idRepresentante;

function inicial(){
    window.history.pushState('', '', '/administracion/representantes');
    idemp = document.getElementById('idempresa').value;    
    idProveedor = document.getElementById('idproveedor').value;  
    console.log('id proveedor ', idProveedor);
    tabla =  document.getElementById('tabla').getElementsByTagName('tbody')[0];
    tablaCompleta =  document.getElementById('tabla');
    contenedorcampos = document.getElementById('contenedorcampos');
    txtNombre = document.getElementById('txtNombre');
    txtTelefono = document.getElementById('txtTelefono');
    txtCorreo = document.getElementById('txtCorreo');

    btnGuardar = document.getElementById('btnguardar');
    btnEditar = document.getElementById('btneditar');
    primeraFila = document.getElementById('primerfila');
    document.getElementById('titulo').innerHTML = 'Representantes de: '+document.getElementById('nombrePro').value;
    editando = false;
    buscarRepresentante('');
}

function buscarRepresentante(texto){
    var form = new FormData();
    form.append('nombre', texto.toUpperCase());
    form.append('idemp', idemp);
    form.append('proveedor',idProveedor);
    axios.post('buscarRepresentantes', form)
        .then(function(response){
            representantes = response.data;
            tabla.innerHTML = '';
            
            representantes.forEach(representante => {
                tabla.innerHTML += '<tr><td>'+representante['rep_nombre']+'</td><td>'+representante['rep_telefono']+'</td><td>'+representante['rep_correo']+'</td><td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+representante['rep_id']+')">Visualizar</button></td><td><button type="button" class="btn btn-danger" onClick="eliminar('+representante['rep_id']+')">Eliminar</button></td></tr>';
            });
            console.log('Representantes: ',representantes);
        }).catch(function(error){
            alertify.error('Ocurrio un error interno al intentar buscar representantes. Por favor intente mas tarde.');
            console.log(error);
        });
}

function guardar(){
    if(validar()){
        var form = new FormData();
        form.append('nombre',txtNombre.value);
        form.append('telefono',txtTelefono.value);
        form.append('correo',txtCorreo.value);
        form.append('proveedor',idProveedor);
        form.append('emp',idemp);
        if(editando){
            form.append('id',idRepresentante);
        }
        axios.post('representantes',form)
            .then(function(response){
                if (editando) {
                    alertify.success('Representante editado correctamente.');
                } else {
                    alertify.success('Representante registrado correctamente.');
                }   
                buscarRepresentante('');
                cancelar();
            })
            .catch(function(error){
                alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
                console.log(error.response);
            });
    }
}

function eliminar(id){
    var x = confirm("¿Desea eliminar la información del representante?");
    if (x){
        eliminarRepresentante(id);
    }
}

function eliminarRepresentante(id){
    var form = new FormData();
    form.append('id',id);
    axios.post('borrarRepresentantes',form)
        .then(function(response){
            if(response.data == 'exito'){
                buscarRepresentante('');
                alertify.success('Representante eliminado correctamente.');
            }
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
        })
}

function nuevo(){
    limpiar();
    habilitar(false);

    contenedorcampos.removeAttribute('hidden');
    tablaCompleta.setAttribute('hidden', true);
    btnEditar.setAttribute('hidden', true);
    btnGuardar.removeAttribute('hidden');
}

function limpiar(){
    txtNombre.value = '';
    txtCorreo.value = '';
    txtTelefono.value = '';
}

function editarRepresentante(){
    habilitar(false);
    editando = true;
    btnGuardar.removeAttribute('hidden');
    btnEditar.setAttribute('hidden',true);
}

function visualizar(id){
    var representante = representantes.filter(function(rep){
        return rep['rep_id'] == id;
    });
    llenar(representante[0]);
    habilitar(true);

    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);

    btnGuardar.setAttribute('hidden',true);
    btnEditar.removeAttribute('hidden');
    contenedorcampos.removeAttribute('hidden');
}

function llenar(representante){
    txtNombre.value = representante['rep_nombre'];
    txtTelefono.value = representante['rep_telefono'];
    txtCorreo.value = representante['rep_correo'];
    idRepresentante = representante['rep_id'];
}

function habilitar(op){
    txtNombre.disabled = op;
    txtTelefono.disabled = op;
    txtCorreo.disabled = op;
}

function cancelar(){
    editando = false;
    primeraFila.removeAttribute('hidden');
    tablaCompleta.removeAttribute('hidden');
    contenedorcampos.setAttribute('hidden', true);
    tipocedula = 0;
}

function validar(){
    if(!stringvalido(txtNombre.value, 50) || !stringvalido(txtTelefono.value, 20) || !stringvalido(txtCorreo.value, 50) || !isNumber(txtTelefono.value)){
        alertify.error('Existen errores en los campos de texto.')
        return false;
    }
    return true;
}