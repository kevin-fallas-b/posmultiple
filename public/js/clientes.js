window.addEventListener('load', inicial, false);

var temporizador;//temporizador que usamos para solo buscar clientes despues de que el usuario dejo de digitar en campo nombre

var txtclienteeditar;

var txtcedula
var txtnombre;
var txtapellidos;
var txttelefono;
var txtcorreo;
var txtotrassenas;
var idusuario;//id del usuario logeado quien registra el cliente
var idemp;//id de la empresa del usuario logeado

var contenedorcampos;

var editando;//bandera
var ideditando;
var clientes;//array que contiene el resultado de la busqueda de clientes

var chkfisica;
var chkjuridica;


var listaCantones;
var listaDistritos;
var provinciaSeleccionada;
var cantonSeleccionado;
var distritoSeleccionado;


var selectorcantones;
var selectorDistritos;

function inicial() {
    txtclienteeditar = document.getElementById('txtclienteeditar');
    txtcedula = document.getElementById('txtcedula');
    txtnombre = document.getElementById('txtnombre');
    txtapellidos = document.getElementById('txtapellidos');
    txttelefono = document.getElementById('txttelefono');
    txtcorreo = document.getElementById('txtcorreo');
    txtotrassenas = document.getElementById('txtotrassenas');
    idusuario = document.getElementById('idusuario').value;
    idemp = document.getElementById('idusuario').value;
    chkjuridica = document.getElementById('chkjuridica');
    chkfisica = document.getElementById('chkfisica');

    btncancelarr = document.getElementById('botcancelar')
    btnguardar = document.getElementById('btnguardar');

    contenedorcampos = document.getElementById('contenedorcampos');


    selectorcantones = document.getElementById('cantones');
    selectorDistritos = document.getElementById('distritos');
    provinciaSeleccionada = 0;
    cantonSeleccionado = 0;
    distritoSeleccionado = 0;

    limpiarcampos();
}

//funcion que controla los checks, si uno se activa el otro se desactiva
function checks(checkactivar) {
    chkfisica.checked = false;
    chkjuridica.checked = false;
    document.getElementById(checkactivar).checked = true;
    if (chkjuridica.checked) {
        txtapellidos.setAttribute('disabled', true);
    } else {
        txtapellidos.removeAttribute('disabled');
    }
}

function limpiarcampos() {
    txtnombre.value = '';
    txtapellidos.value = '';
    txtcedula.value = '';
    txtcorreo.value = '';
    txtclienteeditar.value = '';
    txttelefono.value = '';
    txtotrassenas.value = '';
    editando = false;
    chkfisica.checked = false;
    chkjuridica.checked = false;
    txtapellidos.removeAttribute('hidden');
    txtcedula.removeAttribute('disabled');
    chkfisica.removeAttribute('disabled');
    chkjuridica.removeAttribute('disabled');
    document.getElementById('primerfila').classList.remove('disabled');
    limpiarubicacion();

}

function buscarclientes(texto) {
    clearTimeout(temporizador);
    document.getElementById('resultadosbusqueda').setAttribute('hidden', true)
    temporizador = setTimeout(function () {
        if (texto != '') {
            //buscar clientes mediante ajax y meterlos al dropdown list
            var form = new FormData();
            form.append('nombre', texto.toUpperCase());
            form.append('idemp', idemp);
            axios.post('buscarclientes', form)
                .then(function (response) {
                    clientes = response.data
                    document.getElementById('resultadosbusqueda').innerHTML = ''
                    for (var i = 0; i < clientes.length; i++) {
                        document.getElementById('resultadosbusqueda').innerHTML += '<div class="dropdown-item" style=" cursor: pointer;" onclick="editar(' + clientes[i]['cli_id'] + ')"> ' + clientes[i]['cli_nombre'] + ' ' + clientes[i]['cli_apellidos'] + '</div>';
                    }
                    if (clientes.length == 0) {
                        document.getElementById('resultadosbusqueda').innerHTML = ' <div class="dropdown-item" style="pointer-events: none;"> No se encontraron resultados. </div>';
                    }
                    document.getElementById('resultadosbusqueda').removeAttribute('hidden')
                })
                .catch(function (error) {
                    alertify.error('Ocurrio un error interno al intentar buscar clientes. Por favor intente mas tarde.');
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
    contenedorcampos.removeAttribute('hidden')
}

function editar(id) {
    ideditando = id;
    editando = true;
    for (var i = 0; i < clientes.length; i++) {
        if (clientes[i]['cli_id'] == id) {
            txtcedula.value = clientes[i]['cli_cedula'];
            txtnombre.value = clientes[i]['cli_nombre'];
            txtapellidos.value = clientes[i]['cli_apellidos'];
            txttelefono.value = clientes[i]['cli_telefono'];
            txtcorreo.value = clientes[i]['cli_correo'];
            txtotrassenas.value = clientes[i]['dir_otrasSenas'];
            editarUbicacion(clientes[i]['dir_provincia'], clientes[i]['dir_canton'], clientes[i]['dir_distrito'])
            if (clientes[i]['cli_tipoCedula'] == 1) {
                chkfisica.checked = true;
            } else {
                chkjuridica.checked = true;
                txtapellidos.setAttribute('disabled', true);
            }
            chkfisica.setAttribute('disabled', true);
            chkjuridica.setAttribute('disabled', true);
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
        if (chkfisica.checked) {
            tipo = 1;
        } else {
            tipo = 2;
        }
        form.append('tipo', tipo);
        form.append('idusu', idusuario)
        form.append('idemp', idemp)
        form.append('nombre', txtnombre.value);
        form.append('apellidos', txtapellidos.value);
        form.append('telefono', txttelefono.value);
        form.append('cedula', txtcedula.value);
        form.append('correo', txtcorreo.value);
        form.append('otrassenas', txtotrassenas.value);
        form.append('provincia', provinciaSeleccionada);
        form.append('canton', cantonSeleccionado);
        form.append('distrito', distritoSeleccionado);
        if (editando) {
            form.append('id', ideditando);
        }
        axios.post('clientes', form)
            .then(function (response) {
                if (response.data === 'exito') {
                    if (editando) {
                        alertify.success('Cliente editado correctamente.');
                    } else {
                        alertify.success('Cliente registrado correctamente.');
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
    if (!stringvalido(txtnombre.value, 50) || !stringvalido(txtotrassenas.value, 50) || !stringvalido(txttelefono.value, 11) || !stringvalido(txtcedula.value, 50) || !stringvalido(txtcorreo.value, 50) || provinciaSeleccionada == 0 || cantonSeleccionado == 0 || distritoSeleccionado == 0) {
        alertify.error('Existen errores en los campos.')
        return false;
    }
    if (chkfisica.checked && !stringvalido(txtapellidos.value, 50)) {
        alertify.error('Existen errores en los campos.')
        return false;
    }
    if (!validateEmail(txtcorreo.value)) {
        alertify.error('Correo invalido.')
        return false;
    }
    return true;
}

function canton(provincia) {
    axios.get('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/cantones.json')
        .then(function (response) {
            // handle success
            provinciaSeleccionada = provincia;
            cantonSeleccionado = 0;
            distritoSeleccionado = 0;
            listaCantones = '<option value="" hidden="">Seleccione un Canton</option>';
            var arrayCantones = Object.values(response.data);
            for (var i = 0; i < arrayCantones.length; i++) {
                listaCantones += '<option value="' + (i + 1) + '" onclick="distrito(' + (i + 1) + ')">' + arrayCantones[i] + '</option>'
            }
            selectorcantones.innerHTML = listaCantones;
            selectorcantones.removeAttribute('disabled')
        })
}

function distrito(canton) {
    axios.get('https://ubicaciones.paginasweb.cr/provincia/' + provinciaSeleccionada + '/canton/' + canton + '/distritos.json')
        .then(function (response) {
            // handle success
            cantonSeleccionado = canton;
            listaDistritos = '<option value="" hidden="">Seleccione un Distrito</option>';
            var arrayDistritos = Object.values(response.data);
            for (var i = 0; i < arrayDistritos.length; i++) {
                listaDistritos += '<option  value="' + (i + 1) + '" onclick="setDistrito(' + (i + 1) + ')">' + arrayDistritos[i] + '</option>'
            }
            selectorDistritos.innerHTML = listaDistritos;
            selectorDistritos.removeAttribute('disabled')
        })
}

function setDistrito(dis) {
    distritoSeleccionado = dis;
}

function limpiarubicacion() {
    var listaPronvincias = '<option value="0" hidden="">Seleccione una Provincia</option><option value="1" onclick="canton(1)">San José</option><option value="2" onclick="canton(2)">Alajuela</option><option value="3" onclick="canton(3)">Cartago</option><option value="4" onclick="canton(4)">Heredia</option><option value="5" onclick="canton(5)">Guanacaste</option><option value="6" onclick="canton(6)">Puntarenas</option><option value="7" onclick="canton(7)">Limón</option>'
    document.getElementById('provincia').innerHTML = listaPronvincias;
    listaCantones = '<option value="1" hidden="">Seleccione un Canton</option>';
    listaDistritos = '<option value="1" hidden="">Seleccione un Distrito</option>';
    selectorDistritos.innerHTML = listaDistritos;
    selectorcantones.innerHTML = listaCantones;
    provinciaSeleccionada = 0;
    cantonSeleccionado = 0;
    distritoSeleccionado = 0;
}

function editarUbicacion(provinciausu, cantonusu, distritousu) {
    provinciaSeleccionada = provinciausu;
    canton(provinciausu);
    distrito(cantonusu);
    setTimeout(function () {
        selectElement('provincia', provinciausu);
        selectElement('cantones', cantonusu);
        selectElement('distritos', distritousu);
        setDistrito(distritousu);
    }, 750);
}
function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}