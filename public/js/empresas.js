window.addEventListener('load', inicial, false);

var contenedortabla;
var contenedorcampos;
var btnnuevo;

var txtnombre;
var txtrazonsocial;
var txtcedula;
var txttelefono;
var txtcorreo;
var txtslogan;
var txtactividadeconomica;
var txtusuarioprod;
var txtclaveprod;
var txtusuarioapi;
var txtclaveapi;

var slideractivo; //slider de si la empresa esta activa o no
var chkfisica;
var chkjuridica;

var listaCantones;
var listaDistritos;
var provinciaSeleccionada;
var cantonSeleccionado;
var distritoSeleccionado;


var selectorcantones;
var selectorDistritos;


//cosas para el usuario admin de la empresa
var txtnombreuser;
var txtcedulauser;
var txtcontrauser;
var txtcorreouser;
var txtnombreusuariouser;

var editando;//bandera
var ideditando;
var iddireccion;//id de la direccion que le pertenece a la empresa que estamos editando, se guarda aqui para no tener que hacer una consulta de mas en el servidor cuando se guarda

var tbody;

var empresas;//array que contiene toda la informacion de todas las empresas mostradas en pantalla


function inicial() {
    contenedortabla = document.getElementById('contenedortabla');
    contenedorcampos = document.getElementById('contenedorcampos');
    txtnombre = document.getElementById('txtnombre');
    txtrazonsocial = document.getElementById('txtrazonsocial');
    txtcedula = document.getElementById('txtcedula');
    txttelefono = document.getElementById('txttelefono');
    txtcorreo = document.getElementById('txtcorreo');
    txtslogan = document.getElementById('txtslogan');
    txtactividadeconomica = document.getElementById('txtactividadeconomica');
    txtusuarioprod = document.getElementById('txtusuarioprod');
    txtclaveprod = document.getElementById('txtclaveprod');
    txtusuarioapi = document.getElementById('txtusuarioapi');
    txtclaveapi = document.getElementById('txtclaveapi');
    
    slideractivo = document.getElementById('checkactivo');
    chkfisica = document.getElementById('chkfisica');
    chkjuridica = document.getElementById('chkjuridica');

    selectorcantones = document.getElementById('cantones');
    selectorDistritos = document.getElementById('distritos');
    provinciaSeleccionada = 0;
    cantonSeleccionado = 0;
    distritoSeleccionado = 0;
    tbody = document.getElementById('tbody-empresas')

    txtnombreuser = document.getElementById('txtnombreuser');
    txtcedulauser = document.getElementById('txtcedulauser');
    txtcontrauser = document.getElementById('txtcontrauser');
    txtcorreouser = document.getElementById('txtcorreouser');
    txtnombreusuariouser = document.getElementById('txtusernameuser');

    btnnuevo = document.getElementById('btnnuevo');

    limpiarcampos();
}

function limpiarcampos(){
    txtnombre.value = '';
    txtrazonsocial.value = '';
    txtcedula.value = '';
    txttelefono.value = '';
    txtcorreo.value = '';
    txtslogan.value = '';
    txtactividadeconomica.value = '';
    txtusuarioprod.value = '';
    txtclaveprod.value = '';
    txtusuarioapi.value = '';
    txtclaveapi.value = '';

    txtnombreuser.value ='';
    txtcedulauser.value ='';
    txtcontrauser.value ='';
    txtcorreouser.value ='';
    txtnombreusuariouser.value ='';
    editando = false;
    ideditando =-1;

    $('#checkactivo').bootstrapToggle('on')
    limpiarubicacion();

    disableUser(false);
    iddireccion=-1;
}

//Le hace peticion al servidor de traer todas las empresas para asi poblar la tabla
function buscarEmpresas(){
    var form = new FormData();
    axios.post('getempresas', form)
    .then(function (response) {
        guardarEmpresas(response.data)
        tbody.innerHTML ='';
        for(var i=0;i<response.data.length;i++){
            var estado='';
            if(response.data[i]['emp_estado'] == 'A'){
                estado+= '<td>Activa</td>';
            }else{
                estado+= '<td>Inactiva</td>';
            }
            tbody.innerHTML+='<tr><th scope="row">'+(i+1)+'</th><td>'+response.data[i]['emp_nombre']+'</td><td>'+response.data[i]['emp_telefono']+'</td><td>'+response.data[i]['emp_correo']+'</td>'+estado+' <td><button type="button" class="btn btn-primary" onClick="visualizar('+response.data[i]['emp_id']+')">Ver/Editar</button></td></tr>';
        }
    })
    .catch(function (error) {
        alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
    })
}

//mostrar los espacios para crear una empresa nueva
function nuevo(){
    contenedortabla.style.display='none';
    contenedorcampos.style.display='block';
    btnnuevo.setAttribute('disabled',true);
}

function cancelar(){
    contenedortabla.style.display='block';
    contenedorcampos.style.display='none';
    btnnuevo.removeAttribute('disabled');
    limpiarcampos();
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
                listaCantones += '<option value="' + (i + 1) + '">' + arrayCantones[i] + '</option>'
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
                listaDistritos += '<option  value="' + (i + 1) + '">' + arrayDistritos[i] + '</option>'
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

//funcion que controla los checks, si uno se activa el otro se desactiva
function checks(checkactivar) {
    chkfisica.checked = false;
    chkjuridica.checked = false;
    document.getElementById(checkactivar).checked = true;
}


function guardar() {
    if (validarcampos()) {
        var form = new FormData();
        form.append('cedula', txtcedula.value);
        if(chkfisica.checked){
            form.append('tipo', '1')
        }else{
            form.append('tipo', '2')
        }
        form.append('nombre', txtnombre.value);
        form.append('razonsocial', txtrazonsocial.value);
        form.append('telefono', txttelefono.value);
        form.append('correo', txtcorreo.value);
        form.append('slogan',txtslogan.value);
        form.append('provincia',provinciaSeleccionada);
        form.append('canton',cantonSeleccionado);
        form.append('distrito',distritoSeleccionado);
        form.append('codigoactividad',txtactividadeconomica.value);
        form.append('usuarioprod',txtusuarioprod.value);
        form.append('claveprod',txtclaveprod.value);
        form.append('usuarioapi',txtusuarioapi.value);
        form.append('claveapi',txtclaveapi.value);
        if(slideractivo.checked){
            form.append('activo', 'A');
        }else{
            form.append('activo', 'I');
        }
        if (editando) {
            form.append('id', ideditando);
            form.append('iddir',iddireccion);
        }else{
            form.append('nombreuser',txtnombreuser.value);
            form.append('cedulauser',txtcedulauser.value);
            form.append('contrauser',txtcontrauser.value);
            form.append('correouser',txtcorreouser.value);
            form.append('usernameuser',txtnombreusuariouser.value);
        }
        axios.post('empresas', form)
            .then(function (response) {
                if (response.data === 'exito') {
                    buscarEmpresas();
                    if (editando) {
                        alertify.success('Empresa editada correctamente.');
                    } else {
                        alertify.success('Empresa registrado correctamente.');
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

    if (!stringvalido(txtnombre.value, 50) || !stringvalido(txtrazonsocial.value, 50) ||!stringvalido(txtcedula.value, 50) || !stringvalido(txtcorreo.value, 50) || !stringvalido(txttelefono.value, 50) || !stringvalido(txtslogan.value, 50) ||!stringvalido(txtactividadeconomica.value, 50) || !stringvalido(txtusuarioprod.value, 50) || !stringvalido(txtclaveprod.value, 50) || !stringvalido(txtusuarioapi.value, 50) || !stringvalido(txtusuarioapi.value, 50) || !stringvalido(txtclaveapi.value, 50)  || provinciaSeleccionada == 0 || cantonSeleccionado == 0 || distritoSeleccionado == 0) {
        alertify.error('Existen errores en los campos.')
        return false;
    }
    
    if (!validateEmail(txtcorreo.value)) {
        alertify.error('Correo invalido.')
        return false;
    }
    return true;
}

function visualizar(id){
    var emp;
    editando=true;
    ideditando=id;
    for(var i=0;i<empresas.length;i++){
        if(empresas[i]['emp_id']==id){
            emp = empresas[i];
            break;
        }
    }
    //meter toda la info a campos en pantalla
    editarUbicacion(emp['dir_provincia'], emp['dir_canton'], emp['dir_distrito'])
    iddireccion = emp['dir_id'];
    txtcedula.value=emp['emp_cedula'];
    txtnombre.value=emp['emp_nombre'];
    txtrazonsocial.value=emp['emp_razonSocial'];
    txttelefono.value=emp['emp_telefono'];
    txtcorreo.value=emp['emp_correo'];
    txtslogan.value=emp['emp_slogan'];
    txtactividadeconomica.value = emp['emp_actividadEconomica'];
    txtusuarioprod.value = emp['emp_usuarioProd'];
    txtclaveprod.value = emp['emp_claveProd'];
    txtusuarioapi.value = emp['emp_usuarioAPI'];
    txtclaveapi.value = emp['emp_claveAPI'];
    if(emp['emp_tipoCedula']==1){
        checks('chkfisica');
    }else{
        checks('chkjuridica');
    }
    if(emp['emp_estado']=='A'){
        $('#checkactivo').bootstrapToggle('on')
    }else{    
        $('#checkactivo').bootstrapToggle('off')
}

    //hacer todo visible
    contenedortabla.style.display='none';
    contenedorcampos.style.display='block';
    btnnuevo.setAttribute('disabled',true);
    disableUser(true);
}

//este metodo guarda las empresas en un array para cuando el usuario intente editarlas no tener que hacerle peticion al servidor
function guardarEmpresas(empresasparam){
    empresas = empresasparam;
}

//metodo que desabilita o habilita, segun lo recibido por parametro, todos los campos que tienen que ver con el admin de una empresa.
function disableUser(cond){
    txtnombreuser.disabled =cond;
    txtcedulauser.disabled= cond;
    txtcontrauser.disabled = cond;
    txtcorreouser.disabled =cond;
    txtnombreusuariouser.disabled = cond;
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