window.addEventListener('load', inicial, false);

var primeraFila;
var tablaCompleta;
var contenedorcampos;

var tabla;
var txtNombre;
var txtPrecio;
var txtDescripción;
var txtCantidad;
var control;
var txtCodigo;
var txtCabys;
var btnOpciones;
var btnAcompanamientos;

var btnUnidad;
var btnTarifa;

var btnProveedor;
var btnProveedorBusqueda;
var dropBusqueda;
var dropProveedor;

var btnGuardar;
var btnEditar;

var editando;
var idemp;
var proveedorBusqueda;
var proveedor;

var productos;
var idProducto;

var unidad;
var tarifa;

var modal;

var txtBuscarC;
function inicial(){
    idemp = document.getElementById('idempresa').value;    

    tablaCompleta =  document.getElementById('tabla');
    contenedorcampos = document.getElementById('contenedorcampos');
    primeraFila = document.getElementById('primerfila');

    dropBusqueda = document.getElementById('dropBusqueda');
    dropProveedor = document.getElementById('dropProveedor');

    tabla =  document.getElementById('tabla').getElementsByTagName('tbody')[0];
    txtNombre = document.getElementById('txtNombre');
    txtPrecio = document.getElementById('txtPrecio');
    txtDescripcion = document.getElementById('txtDescripcion');
    txtCantidad = document.getElementById('txtCantidad');
    control = document.getElementById('checkactivo');
    btnProveedor = document.getElementById('dropdownProveedor');
    btnProveedorBusqueda = document.getElementById('dropdownBusqueda');
    btnUnidad = document.getElementById('dropdownUnidad');
    btnTarifa = document.getElementById('dropdownTarifa');
    txtCodigo = document.getElementById('txtCodigo');
    txtCabys = document.getElementById('txtCabys');
    btnOpciones = document.getElementById('btnOpciones');
    btnAcompanamientos = document.getElementById('btnAcompanamientos');
    modal = document.getElementById('modal');
    

    btnGuardar  = document.getElementById('btnGuardar');
    btnEditar = document.getElementById('btnEditar');

    editando = false;
    proveedor = -1;
    proveedorBusqueda = -1;

    tabla.innerHTML = '';

    llenarDropDowns();
    buscarProducto('');
    $('#checkactivo').bootstrapToggle('off');

    txtBuscarC = document.getElementById("txtBuscarC");
    
    txtBuscarC.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        buscarCodigo();
    }
});
}

function llenarDropDowns(){
    var form = new FormData();
    form.append('nombre','');
    form.append('idemp',idemp);
    axios.post('buscarProveedores',form)
        .then(function(response){
            var proveedores = response.data;
            dropBusqueda.innerHTML="";
            dropProveedor.innerHTML="";
            proveedores.forEach(proveedor => {
                dropBusqueda.innerHTML += '<button class="dropdown-item" type="button" onClick="proveedorBuscar(\''+proveedor['pro_proId']+'\',\''+proveedor['pro_proNombre']+'\')">'+proveedor['pro_proNombre']+'</button>';
                dropProveedor.innerHTML += '<button class="dropdown-item" type="button" onClick="proveedorLlenar(\''+proveedor['pro_proId']+'\',\''+proveedor['pro_proNombre']+'\')">'+proveedor['pro_proNombre']+'</button>';
            });
            dropBusqueda.innerHTML += '<button class="dropdown-item" type="button" onClick="proveedorBuscar(\''+-1+'\',\''+"Proveedor"+'\')">Ninguno</button>';
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar llenar los parametros de busqueda. Por favor intente mas tarde.');
        });
}

function proveedorLlenar(id, nombre){
    proveedor = id;
    btnProveedor.innerHTML = nombre;

    btnProveedor.classList.remove('btn-secondary');
    btnProveedor.classList.add('btn-primary');
    btnProveedor.style.width ='145px'
}

function proveedorBuscar(id, nombre){
    proveedorBusqueda = id;
    btnProveedorBusqueda.innerHTML = nombre;
    
    if(proveedorBusqueda != -1){
        btnProveedorBusqueda.classList.remove('btn-secondary');
        btnProveedorBusqueda.classList.add('btn-primary');
        btnProveedorBusqueda.style.width ='145px'
    }else{
        btnProveedorBusqueda.classList.remove('btn-primary');
        btnProveedorBusqueda.classList.add('btn-secondary');
        btnProveedorBusqueda.style.width ='145px'
    }
   
    var form = new FormData();
    if(proveedorBusqueda != -1){
        form.append('proveedor',proveedorBusqueda);
    }
    form.append('nombre',txtNombre.value);
    form.append('emp',idemp);
    axios.post('buscarProductos',form)
        .then(function(response){
            productos = response.data;
            llenarTabla();
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar realizar la busqueda. Por favor intente mas tarde.');
            console.log(error.response);
        })
}

function buscarProducto(texto){
    var form = new FormData();
    form.append('nombre',txtNombre.value);
    form.append('emp',idemp);
    axios.post('buscarProductos',form)
        .then(function(response){
            productos = response.data;
            llenarTabla();
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar realizar la busqueda. Por favor intente mas tarde.');
            console.log(error.response);
        })
}

function buscarCodigo(){
    var form = new FormData();
    form.append('codigoBarras',txtBuscarC.value);
    form.append('emp',idemp);
    axios.post('buscarProductos',form)
        .then(function(response){
            visualizar(response.data[0]['pro_id']);
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar realizar la busqueda. Por favor intente mas tarde.');
            console.log(error.response);
        });
}

function guardar(){
    if(validar()){
        var form = new FormData();
        form.append('proveedor',proveedor);
        form.append('nombre',txtNombre.value);
        form.append('descripcion',txtDescripcion.value);
        form.append('precio',txtPrecio.value);
        if(control.checked){
            form.append('control','s');
        }else{
            form.append('control','n');
        }
        form.append('cantidad',txtCantidad.value);
        form.append('codigo',txtCodigo.value);
        form.append('unidad',unidad);
        form.append('cabys',txtCabys.value);
        form.append('tarifa',tarifa);
        form.append('emp',idemp);
        if(editando){
            form.append('id',idProducto);
        }
        axios.post('productos',form)
            .then(function(response){
                if(response.data = 'exito'){
                    if (editando) {
                        alertify.success('Producto editado correctamente.');
                    } else {
                        alertify.success('Producto registrado correctamente.');
                    }   
                    setTimeout(function () {
                        buscarProducto('');
                    }, 750);
                    cancelar();
                }else{
                    alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
                }
            })
            .catch(function(error){
                alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
            });
    }
}

function llenarTabla(){
    tabla.innerHTML = '';
    productos.forEach(producto => {
        if(producto['pro_controlInventario'] == 's'){
            tabla.innerHTML += '<tr><td>'+producto['pro_nombre']+'</td><td>'+producto['pro_proNombre']+'</td><td>'+producto['pro_precio']+'</td><td><input type="checkbox" class="ml-5" disabled checked></td><td>'+producto['pro_cantidad']+'</td><td>'+verUnidad(producto['pro_unidadMedida'])+'<td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+producto['pro_id']+')">Visualizar</button></td><td><button type="button" class="btn btn-primary ml-2" onClick="categorias('+producto['pro_id']+')">Categorias</button></td></tr>';
        }else{
            tabla.innerHTML += '<tr><td>'+producto['pro_nombre']+'</td><td>'+producto['pro_proNombre']+'</td><td>'+producto['pro_precio']+'</td><td><input type="checkbox" class="ml-5" disabled></td><td>'+producto['pro_cantidad']+'</td><td>'+verUnidad(producto['pro_unidadMedida'])+'</td><td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+producto['pro_id']+')">Visualizar</button></td><td><button type="button" class="btn btn-primary ml-2" onClick="categorias('+producto['pro_id']+')">Categorias</button></td></tr>';
        }
    });
}

function nuevo(){
    limpiar();
    habilitar(false);

    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);

    
    btnGuardar.removeAttribute('hidden');
    btnEditar.setAttribute('hidden',true);
    contenedorcampos.removeAttribute('hidden');
}

function categorias(id){
    var producto = productos.filter(function(pro){
        return pro['pro_id'] == id;
    });
    window.location.href = getbaseurl()+'/administracion/categoria?pro_id='+id+'&pro_nombre='+producto[0]['pro_nombre'];
}

function mantenimientoCategoria(){
    window.location.href = getbaseurl()+'/administracion/categorias';
}

function visualizar(id){
    var producto = productos.filter(function(pro){
        return pro['pro_id'] == id;
    });
    llenar(producto[0]);
    habilitar(true);

    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);
    
    btnGuardar.setAttribute('hidden',true);
    btnEditar.removeAttribute('hidden');
    contenedorcampos.removeAttribute('hidden');
}

function cancelar(){
    limpiar();

    proveedor = -1;
    proveedorBusqueda = -1;
    editando = false;
    idProducto = -1;
    txtBuscarC.value = '';

    primeraFila.removeAttribute('hidden');
    tablaCompleta.removeAttribute('hidden');
    contenedorcampos.setAttribute('hidden',true);
}

function editarProducto(){
    editando = true;
    habilitar(false);
    btnGuardar.removeAttribute('hidden');
    btnEditar.setAttribute('hidden',true);
}

function habilitar(op){
    txtNombre.disabled = op;
    txtPrecio.disabled = op;
    txtDescripcion.disabled = op;
    txtCantidad.disabled = op;
    control.disabled = op;
    txtCodigo.disabled = op;
    btnTarifa.disabled = op;
    txtCabys.disabled = op;
    btnUnidad.disabled = op;
    btnProveedor.disabled = op;
    btnOpciones.disabled = op;
    btnAcompanamientos.disabled = op;
}

function limpiar(){
    txtNombre.value ='';
    txtPrecio.value = '';
    txtDescripcion.value = '';
    txtCantidad.value = '';
    $('#checkactivo').bootstrapToggle('off');
    txtCodigo.value = '';
    txtCabys.value = '';

    btnTarifa.innerHTML = 'Tarifa de Impuesto';
    btnTarifa.classList.remove('btn-primary');
    btnTarifa.classList.add('btn-secondary');

    btnUnidad.innerHTML = 'Unidad de Medida';
    btnUnidad.classList.remove('btn-primary');
    btnUnidad.classList.add('btn-secondary');

    btnProveedor.innerHTML = 'Proveedor';
    btnProveedor.classList.remove('btn-primary');
    btnProveedor.classList.add('btn-secondary');

    tarifa = 0;
    unidad = 0;

    proveedor = -1;
    idProducto = -1;
}

function llenar(producto){
    txtNombre.value = producto['pro_nombre'];
    txtPrecio.value = producto['pro_precio'];
    txtDescripcion.value = producto['pro_descripcion'];
    txtCantidad.value = producto['pro_cantidad'];
    if(producto['pro_controlInventario'] == 's'){
        $('#checkactivo').bootstrapToggle('on');
    }else{
        $('#checkactivo').bootstrapToggle('off');
    }
    txtCodigo.value = producto['pro_codigo'];
    txtCabys.value = producto['pro_cabys'];
    unidadMedida(producto['pro_unidadMedida']);
    tarifaImpuesto(producto['pro_tarifaImpuesto']);

    
    btnProveedor.innerHTML = producto['pro_proNombre'];
    btnProveedor.classList.remove('btn-secondary');
    btnProveedor.classList.add('btn-primary');

    proveedor = producto['pro_pro'];
    idProducto = producto['pro_id'];
}

function verUnidad(uni){
    switch(uni){
        case 'Sp':
            return 'Servicios Profesionales';
        case 'Unid':
            return 'Unidad';
        case 'Kg':
            return 'Kilogramo';
        case 'L':
            return 'Litro';
        case 'cm':
            return 'Centimetro';
        case 'ln':
            return 'Pulgada';
        case 'Oz':
            return 'Onza';
        case 'g':
            return 'Gramo';
        case 'mm':
            return 'Milimetro';
        case 'mL':
            return 'Mililitro';
    }
}

function unidadMedida(uni){
    unidad = uni;
    btnUnidad.innerHTML = verUnidad(uni);
    btnUnidad.classList.remove('btn-secondary');
    btnUnidad.classList.add('btn-primary');
}

function tarifaImpuesto(tari){
    tarifa = tari;
    switch(tari){
        case '01':
            btnTarifa.innerHTML = 'Tarifa 0% (Exento)';
            break;
        case '02':
            btnTarifa.innerHTML = 'Tarifa reducida 1%';
            break;
        case '03':
            btnTarifa.innerHTML = 'Tarifa reducida 2%';
            break;
        case '04':
            btnTarifa.innerHTML = 'Tarifa reducida 4%';
            break;
        case '05':
            btnTarifa.innerHTML = 'Transitorio 0%';
            break;
        case '06':
            btnTarifa.innerHTML = 'Transitorio 4%';
            break;
        case '07':
            btnTarifa.innerHTML = 'Transitorio 8%';
            break;
        case '08':
            btnTarifa.innerHTML = 'Transitorio 13%';
            break;
    }
    btnTarifa.classList.remove('btn-secondary');
    btnTarifa.classList.add('btn-primary');
}

function validar(){
    if(unidad == 0 || tarifa == 0){
        alertify.error('Existen errores en los selectores.')
        return false;
    }

    if(!stringvalido(txtNombre.value, 50) || !stringvalido(txtDescripcion.value, 128) || !stringvalido(txtCodigo.value, 225) || !stringvalido(unidad, 5) || !stringvalido(txtCabys.value, 255) || !stringvalido(tarifa, 3)){
        alertify.error('Existen errores en los campos de texto.')
        return false;
    }

    if(!number(txtPrecio.value) || !number(txtCantidad.value)){
        alertify.error('Verifique los valores numericos del producto.')
        return false;
    }

    if(proveedor == -1){
        alertify.error('Seleccione un proveedor.')
        return false;
    }

    return true;
}

function number(n){
    return typeof Number(n)==='number' && !isNaN(n);
}

function opciones(){
    var form = new FormData();
    form.append('producto',idProducto);
    axios.post('buscarOpciones',form)
        .then(function(response){
            modal.innerHTML = '<table class="table" id="tabla" style="text-align: center;"><thead class="thead-dark"><tr><th>Nombre</th><th>Precio</th><th>Acciones</th></tr></thead><tbody></tbody></table>';
            modal.innerHTML += '<button style= "float:right" type="button" class="btn btn-danger" onClick="cancelarOpciones()">Cancelar</button>';
            modal.innerHTML += '<button style= "float:right" type="button" class="btn btn-success ml-1" onClick="nuevo()">Nueva opción</button>';
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar visualizar las opciones. Por favor intente mas tarde.');
            console.log(error.response);
        })
}

function acompanamientos(){

}