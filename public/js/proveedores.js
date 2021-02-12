window.addEventListener('load', inicial, false);

var contenedorCampos;
var txtNombre;
var txtRazon;
var txtCedula;
var txtTelefono;
var txtCorreo;
var btnTipo;
var txtSenas;
var primeraFila;
var tipocedula;
var tabla;
var proveedores;
var tipoCedula;
var tablaCompleta;
var btnEditar;
var btnGuardar;
var selectorcantones;
var selectorDistritos;
var selectorProvincias;

var idemp;
var editando;
var id;
var dirid;

var provinciaSeleccionada;
var cantonSeleccionado;
var distritoSeleccionado;

var listaCantones;
var listaDistritos;

function inicial(){
    idemp = document.getElementById('idempresa').value;    
    tabla =  document.getElementById('tabla').getElementsByTagName('tbody')[0];
    tablaCompleta =  document.getElementById('tabla');
    contenedorcampos = document.getElementById('contenedorcampos');
    txtNombre = document.getElementById('txtNombre');
    txtRazon = document.getElementById('txtRazon');
    txtCedula = document.getElementById('txtCedula');
    txtTelefono = document.getElementById('txtTelefono');
    txtCorreo = document.getElementById('txtCorreo');
    txtSenas = document.getElementById('txtSenas');
    btnTipo = document.getElementById('dropdownTipo');
    btnEditar = document.getElementById('btneditar');
    btnGuardar = document.getElementById('btnguardar');
    selectorProvincias = document.getElementById('provincia');
    selectorcantones = document.getElementById('cantones');
    selectorDistritos = document.getElementById('distritos');
    primeraFila = document.getElementById('primerfila');

    provinciaSeleccionada = 0;
    cantonSeleccionado = 0;
    distritoSeleccionado = 0;

    selectorcantones = document.getElementById('cantones');
    selectorDistritos = document.getElementById('distritos');
    
    editando = false;
    tipocedula = 0;
    buscarProveedor('');
}

function esconderresultados() {
    document.getElementById('tabla').setAttribute('hidden', true)
}

function buscarProveedor(texto){
    var form = new FormData();
    form.append('nombre', texto.toUpperCase());
    form.append('idemp', idemp);
    axios.post('buscarProveedores', form)
        .then(function(response){
            proveedores = response.data;
            tabla.innerHTML = '';
            proveedores.forEach(proveedor => {
                tabla.innerHTML += '<tr><td>'+proveedor['pro_proNombre']+'</td><td>'+proveedor['pro_razonSocial']+'</td><td>'+proveedor['pro_cedula']+'</td><td>'+proveedor['pro_telefono']+'</td><td>'+proveedor['pro_correo']+'</td><td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+proveedor['pro_proId']+')">Visualizar</button></td><td><button type="button" class="btn btn-danger" onClick="eliminar('+proveedor['pro_proId']+')">Eliminar</button></td><td><button type="button" class="btn btn-primary ml-2" onClick="representantes('+proveedor['pro_proId']+')">Representantes</button></td></tr>';
            });
        }).catch(function(error){
            alertify.error('Ocurrio un error interno al intentar buscar proveedores. Por favor intente mas tarde.');
        });
        
}

function representantes(id){
    window.location.href = getbaseurl()+'/administracion/representantes?pro_id='+id;
}

function guardar(){
    var exito = true;
    if(validar()){
        var form = new FormData();
        form.append('provincia', provinciaSeleccionada);
        form.append('canton', cantonSeleccionado);
        form.append('distrito', distritoSeleccionado);
        form.append('senas', txtSenas.value);
        if(editando){
            form.append('id',dirid);
        }

        axios.post('direcciones', form)
            .then(function(response){
                if(!editando){
                    dirid = response.data;
                }

                var form1 = new FormData();
                form1.append('nombre', txtNombre.value);
                form1.append('razon', txtRazon.value)
                form1.append('cedula', txtCedula.value);
                form1.append('tipoCed', tipocedula);
                form1.append('telefono', txtTelefono.value);
                form1.append('correo', txtCorreo.value);
                form1.append('direccion', dirid);
                form1.append('emp', idemp);
                if (editando) {
                    form1.append('id', id);
                }
                axios.post('proveedores', form1)
                    .catch(function(error){
                        alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
                        exito = false;
                    }); 
               
                if(exito){
                    if (editando) {
                        alertify.success('Proveedor editado correctamente.');
                    } else {
                        alertify.success('Proveedor registrado correctamente.');
                    }   
                    buscarProveedor('');
                    cancelar();
                }
            })
            .catch(function (error){
                alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
                console.log('Error proveedor: ',error.message);
            });
    }
}

function cancelar(){
    editando = false;
    primeraFila.removeAttribute('hidden');
    tablaCompleta.removeAttribute('hidden');
    contenedorcampos.setAttribute('hidden', true);
    tipocedula = 0;
}

function visualizar(id){
    var proveedor = proveedores.filter(function(pro){
        return pro['pro_proId'] == id;
    });
    llenar(proveedor[0]);
    habilitar(true);

    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);

    
    btnGuardar.setAttribute('hidden',true);
    btnEditar.removeAttribute('hidden');
    contenedorcampos.removeAttribute('hidden');
}

function editarProveedor(){
    habilitar(false);
    editando = true;
    btnGuardar.removeAttribute('hidden');
    btnEditar.setAttribute('hidden',true);
}

function eliminar(id){
    var x = confirm("¿Desea eliminar la información del proveedor?");
    if (x){
        eliminarProveedor(id);
    }
}

function eliminarProveedor(id){
    var form = new FormData();
    form.append('id',id);
    axios.post('borrarProveedores',form)
        .then(function(response){
            if(response.data == 'exito'){
                buscarProveedor('');
                alertify.success('Proveedor eliminado correctamente.');
            }else{
                alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
            }
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
        })
        
}

function nuevo(){
    limpiar();
    habilitar(false);
    selectorcantones.setAttribute('disabled', true);
    selectorDistritos.setAttribute('disabled', true);
    contenedorcampos.removeAttribute('hidden');
    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);
    btnEditar.setAttribute('hidden', true);
    btnGuardar.removeAttribute('hidden');
    tipocedula = 0;
}

function llenar(proveedor){
    txtNombre.value = proveedor['pro_proNombre'];
    txtRazon.value = proveedor['pro_razonSocial'];
    txtCedula.value = proveedor['pro_cedula'];
    txtTelefono.value = proveedor['pro_telefono'];
    txtCorreo.value = proveedor['pro_correo'];
    tipocedula = proveedor['pro_tipoCed'];

    editarUbicacion(proveedor['dir_provincia'], proveedor['dir_canton'], proveedor['dir_distrito']);
    txtSenas.value = proveedor['dir_otrasSenas'];

    dirid = proveedor['pro_dir'];
    id = proveedor['pro_proId'];
    tipoCedula(proveedor['pro_tipoCedula']);
}

function limpiar(){
    txtNombre.value = '';
    txtRazon.value = '';
    txtCedula.value = '';
    txtTelefono.value = '';
    txtCorreo.value = '';

    limpiarubicacion();
    txtSenas.value = '';

    btnTipo.innerHTML = 'Tipo de Cédula';
    btnTipo.classList.remove('btn-primary');
    btnTipo.classList.add('btn-secondary');
    tipocedula = '';
}

function habilitar(op){
    txtNombre.disabled = op;
    txtRazon.disabled = op;
    txtCedula.disabled = op;
    txtTelefono.disabled = op;
    txtCorreo.disabled = op;

    selectorProvincias.disabled = op;
    selectorcantones.disabled = op;
    selectorDistritos.disabled = op;
    txtSenas.disabled = op;

    btnTipo.disabled = op;
}

function tipoCedula(texto){
    if(texto == 'F'){
        tipocedula = 'Física';
    }else{
        if(texto == 'J'){
            tipocedula = 'Júridica';
        }else{
            tipocedula = texto; 
        }
    }
    btnTipo.innerHTML = tipocedula;
    if(tipocedula == 'Física'){
        tipocedula = 'F';
    }else{
        tipocedula = 'J';
    }
    btnTipo.classList.remove('btn-secondary');
    btnTipo.classList.add('btn-primary');
}

function canton(provincia,op) {
    axios.get('https://ubicaciones.paginasweb.cr/provincia/' + provincia + '/cantones.json')
        .then(function (response) {
            // handle success
            provinciaSeleccionada = provincia;
            cantonSeleccionado = 0;
            distritoSeleccionado = 0;
            listaCantones = '<option value="" hidden="">Seleccione un Canton</option>';
            var arrayCantones = Object.values(response.data);
            for (var i = 0; i < arrayCantones.length; i++) {
                listaCantones += '<option value="' + (i + 1) + '"   >' + arrayCantones[i] + '</option>'
            }
            selectorcantones.innerHTML = listaCantones;
            selectorDistritos.innerHTML = '<option value="" hidden="">Seleccione un Distrito</option>';
            if(op){
                selectorcantones.removeAttribute('disabled');
            }
            selectorDistritos.setAttribute('disabled', true);
        })
        .catch(function(error){
            console.log(error.response);
        })
}

function distrito(canton,op) {
    axios.get('https://ubicaciones.paginasweb.cr/provincia/' + provinciaSeleccionada + '/canton/' + canton + '/distritos.json')
        .then(function (response) {
            // handle success
            cantonSeleccionado = canton;
            listaDistritos = '<option value="" hidden="">Seleccione un Distrito</option>';
            var arrayDistritos = Object.values(response.data);
            for (var i = 0; i < arrayDistritos.length; i++) {
                listaDistritos += '<option  value="' + (i + 1) + '">' + arrayDistritos[i] + '</option>'
            }
            selectorDistritos.innerHTML = listaDistritos;
            if(op){
                selectorDistritos.removeAttribute('disabled')
            }
            
        })
}

function editarUbicacion(provinciausu, cantonusu, distritousu) {
    provinciaSeleccionada = provinciausu;
    canton(provinciausu,false);
    distrito(cantonusu,false);
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

function validar(){
    if(!stringvalido(txtNombre.value, 50) || !stringvalido(txtRazon.value, 50) || !stringvalido(txtCedula.value, 20) || !stringvalido(txtCorreo.value, 50) || !stringvalido(txtTelefono.value, 50)){
        alertify.error('Existen errores en los campos de texto.')
        return false;
    }

    if(tipocedula == 0){
        alertify.error('Seleccione un tipo de cédula.')
        return false;
    }

    if(provinciaSeleccionada == 0 || cantonSeleccionado == 0 || distritoSeleccionado == 0 || !stringvalido(txtSenas.value, 250)){
        alertify.error('Error en la úbicación.')
        return false;
    }

    return true;
}