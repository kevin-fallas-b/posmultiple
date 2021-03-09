window.addEventListener('load', inicial, false);
document.getElementById("txtproducto").addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "Enter":
            if (isNumeric(txtproducto.value)) {
                buscarProductoImediatamente(txtproducto.value);
                txtproducto.value = '';
            }

            break;


        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
});

var temporizador;//temporizador que usamos para solo buscar clientes despues de que el usuario dejo de digitar en campo nombre

var txtcliente;
var txtmetododepago;
var lblsubtotal;
var lbldescuentos;
var lblimpuestos;
var lbltotal;
var btncreareditar;//boton a la par del campo de cliente, que si no hay un cliente seleccionado ofrece abrir modal crear, si hay seleccionado ofrece modal editar

var idEmpresa;//de la empresa que esta facturando
var cliente;//cliente que atendimos

var clientes;//array que guarda el resultado de la busqueda de clientes.
var btnQuitarCliente;

var metododepago;//Integer, segun los terminos de hacienda. 01 = efectivo, 02 = tarjeta, 04 = transferencia bancaria / deposito

var tabladetalles;

var factura; //guarda detalles de la factura, los TableRows
var subtotal;
var descuentos;
var total;//los que son mostrados en panel derecho

var temporizadorproductos;//temporizador que usamos para solo buscar clientes despues de que el usuario dejo de digitar en campo nombre
var productos;//me guarda lo que me respondio la busqueda de productos
var txtproducto;//txt donde se escribe el nombre del producto o codigo de barras
var productosEnFactura;//guardar el objeto producto de BD que esta en factura

//lbls que se ven en la pantalla modal que se abre cuando se da click en vender
var lblTotalModal;
var lblPendienteModal;
var lblVueltoModal;
var contenedorMetodosPago;
var contadorMetodosPago;
var metodosdePago;//array que contiene que metodos de pago se han utilizado


function inicial() {
    if (window.innerWidth > 600) {
        document.getElementById('contenedortabla').classList.add('col-9');
    }

    txtcliente = document.getElementById('txtcliente');
    txtmetododepago = document.getElementById('txtmetododepago');
    lbldescuentos = document.getElementById('lbldescuentos');
    lblimpuestos = document.getElementById('lblimpuestos');
    lblsubtotal = document.getElementById('lblsubtotal');
    lbltotal = document.getElementById('lbltotal');
    idEmpresa = document.getElementById('idempresa').value;
    btnQuitarCliente = document.getElementById('btnQuitarCliente');
    btncreareditar = document.getElementById('btncreareditar');
    txtproducto = document.getElementById('txtproducto');
    limpiarcampos();
    tabladetalles = document.getElementById('tabladetalles');
    factura = [];
    productos = [];
    clientes = [];
    cliente = -1;
    productosEnFactura = [];
    txtproducto.focus();
    lblVueltoModal = document.getElementById('lblVueltoModal');
    lbltotalModal = document.getElementById('lbltotalModal');
    lblPendienteModal = document.getElementById('lblPendienteModal');
    contenedorMetodosPago = document.getElementById('contenedorMetodosPago');
    contadorMetodosPago = 1;
    metodosdePago = [];
    metodosdePago.push(1);
}

function abrirModalVender() {
    lbltotalModal.innerHTML = lbltotal.innerHTML;
    lblPendienteModal.innerHTML = lbltotal.innerHTML;
    lblVueltoModal.innerHTML = '0';
}

function agregarMetodoPago(codigo, nombre) {
    if (contadorMetodosPago >= 4) {
        //solo se permiten 4 metodos de pago, esto por hacienda
        alertify.warning("Solamente se permiten 4 metodos de pago.")
    } else {
        metodosdePago.push(codigo);
        contadorMetodosPago++;
        var divNuevo = document.createElement('div');
        divNuevo.classList.add('input-group');
        divNuevo.classList.add('mt-4');
        divNuevo.classList.add('metodoDePago');
        divNuevo.setAttribute('id', "metodoDePago," + contadorMetodosPago + "," + codigo)
        divNuevo.innerHTML = '<label for="txtNombre" style="position: absolute;top:-22px;">' + nombre + '</label>'
            + '<input id="" type="text" class="form-control col-md-6" onkeyup="calcularPendientes()" onfocus="this.select();" onkeypress="return isNumber(event)" placeholder="' + nombre + '" value="0">'
            + '<div class="input-group-append" id="clienteinputgroup">'
            + '<button id="btnQuitarCliente" type="button" class=" ml-1 btn btn-danger" onclick="eliminarMetodoPago(\'metodoDePago,' + contadorMetodosPago + ',' + codigo + '\')">X</button>'
            + '</div>';
        contenedorMetodosPago.appendChild(divNuevo);
    }

}
//metodo que revisa la suma de totales pagados y actualiza labels de pendiente y vuelto. esto en modal de vender
function calcularPendientes() {
    var inputs = document.getElementsByClassName('metodoDePago');
    var sumaInputs = 0
    var totalAPagar = parseFloat(lbltotal.innerHTML);
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getElementsByTagName('input')[0].value == null || inputs[i].getElementsByTagName('input')[0].value == '') {
            inputs[i].getElementsByTagName('input')[0].value = 0;
            inputs[i].getElementsByTagName('input')[0].select();
        }
        sumaInputs += parseFloat(inputs[i].getElementsByTagName('input')[0].value);
    }
    var pendiente = totalAPagar - sumaInputs;

    if (pendiente > 0) {
        lblPendienteModal.innerHTML = pendiente;
        lblVueltoModal.innerHTML = 0;
    } else {
        lblPendienteModal.innerHTML = 0;
        if (-1 * pendiente > 0)
            lblVueltoModal.innerHTML = -1 * pendiente;
    }
}

function eliminarMetodoPago(id) {

    var metodoEliminado = id.split(',');
    //eliminar de pantalla 
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
    contadorMetodosPago--;
    var index = metodosdePago.indexOf(parseInt(metodoEliminado[2]));
    if (index !== -1) {
        metodosdePago.splice(index, 1);
    }
    calcularPendientes();

}

function limpiarcampos() {
    txtcliente.value = '';
    txtmetododepago.value = '';
    lbltotal.innerHTML = '0';
    lblsubtotal.innerHTML = '0';
    lblimpuestos.innerHTML = '0';
    lbldescuentos.innerHTML = '0';
}

function esconderresultados() {
    if (clientes.length == 0) {
        document.getElementById('resultadosbusqueda').setAttribute('hidden', true)
    }
}

function buscarclientes(texto) {
    clearTimeout(temporizador);
    document.getElementById('resultadosbusqueda').setAttribute('hidden', true)
    temporizador = setTimeout(function () {
        if (texto != '') {
            //buscar clientes mediante ajax y meterlos al dropdown list
            var form = new FormData();
            form.append('termino', texto.toUpperCase());
            form.append('idEmp', idEmpresa);
            axios.post('facturacion/buscarclientes', form)
                .then(function (response) {
                    clientes = response.data
                    document.getElementById('resultadosbusqueda').innerHTML = ''
                    for (var i = 0; i < clientes.length; i++) {
                        document.getElementById('resultadosbusqueda').innerHTML += '<div class="dropdown-item" style=" cursor: pointer;" onclick="setcliente(' + clientes[i]['cli_id'] + ')"> ' + clientes[i]['cli_nombre'] + ' ' + clientes[i]['cli_apellidos'] + ' (' + clientes[i]['cli_cedula'] + ')' + '</div>';
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


function setcliente(idcli) {
    for (var i = 0; i < clientes.length; i++) {
        if (clientes[i]['cli_id'] == idcli) {
            cliente = clientes[i];
            txtcliente.value = clientes[i]['cli_nombre'] + ' ' + clientes[i]['cli_apellidos'] + '(' + clientes[i]['cli_cedula'] + ')';
            txtcliente.setAttribute("disabled", true);
            btncreareditar.setAttribute("disabled", true);
            btnQuitarCliente.style.display = 'block'
            break;
        }
    }
}

function quitarCliente() {
    idcliente = -1;
    txtcliente.removeAttribute("disabled");
    txtcliente.value = '';
    btncreareditar.removeAttribute("disabled");
    btnQuitarCliente.style.display = 'none'
}

function setmetodopago(tipo, nombre) {
    metododepago = tipo;
    txtmetododepago.value = nombre;
}

function calcularfila(tr) {
    fila = tr.getElementsByTagName('td')
    var cantidad = fila[1].querySelector("#cant").value
    var precio = fila[2].querySelector("#pre").value
    var descuento = fila[3].querySelector("#desc").value

    var total = cantidad * precio;
    total = total - (total * (descuento / 100));
    fila[4].innerHTML = total;

    calcularfactura();
}

function calcularfactura() {
    subtotal = 0;
    descuentos = 0;
    impuestos = 0;
    total = 0;
    for (var i = 0; i < factura.length; i++) {
        //aqui calculo numeros de cada fila;
        var can = parseInt(factura[i].getElementsByTagName('td')[1].querySelector("#cant").value)
        var precio = parseInt(factura[i].getElementsByTagName('td')[2].querySelector("#pre").value)
        var de = parseInt(factura[i].getElementsByTagName('td')[3].querySelector("#desc").value)
        var tota = can * precio;
        var imp = tota * 0.13;
        var des = tota * (de / 100);

        total += parseInt(factura[i].getElementsByTagName('td')[4].innerHTML);
        impuestos += imp;
        descuentos += des;
        subtotal += tota - imp;
    }
    lbltotal.innerHTML = total;
    lblsubtotal.innerHTML = subtotal;
    lblimpuestos.innerHTML = impuestos;
    lbldescuentos.innerHTML = descuentos;
}

function mensajeagregardetalle() {
    alertify.warning('Debe introducir el nombre del producto o servicio para buscarlo y seleccionarlo.');
}

function eliminarfila(tr) {
    factura.splice(factura.indexOf(tr), 1);
    tabladetalles.deleteRow(tr.rowIndex);
    calcularfactura();
}

function buscarproductos(texto) {
    clearTimeout(temporizadorproductos);
    document.getElementById('resultadosbusquedaproductos').setAttribute('hidden', true)
    temporizadorproductos = setTimeout(function () {

        if (texto != '') {
            //buscar productos mediante ajax y meterlos al dropdown list
            var form = new FormData();
            form.append('termino', texto.toUpperCase());
            form.append('idEmp', idEmpresa);
            axios.post('facturacion/buscarproductos', form)
                .then(function (response) {
                    productos = response.data
                    document.getElementById('resultadosbusquedaproductos').innerHTML = ''
                    for (var i = 0; i < productos.length; i++) {
                        document.getElementById('resultadosbusquedaproductos').innerHTML += '<div class="dropdown-item" style=" cursor: pointer;" onclick="agregardetalle(' + productos[i]['pro_id'] + ')"> ' + productos[i]['pro_nombre'] + '</div>';
                    }
                    if (productos.length == 0) {
                        document.getElementById('resultadosbusquedaproductos').innerHTML = ' <div class="dropdown-item" style="pointer-events: none;"> No se encontraron resultados. </div>';
                    }
                    document.getElementById('resultadosbusquedaproductos').removeAttribute('hidden')
                })
                .catch(function (error) {
                    alertify.error('Ocurrio un error interno al intentar buscar productos. Por favor intente mas tarde.');
                })

        }
    }, 900); // Will do the ajax stuff after 1000 ms, or 1 s
}

//metodo para buscar productos sin la espera de 1 segundo. esto es para cuando se usa lector de barras
function buscarProductoImediatamente(texto) {
    if (texto != '') {
        //buscar productos mediante ajax y meterlos al dropdown list
        var form = new FormData();
        form.append('termino', texto.toUpperCase());
        form.append('idEmp', idEmpresa);
        axios.post('facturacion/buscarproductos', form)
            .then(function (response) {
                productos = response.data
                document.getElementById('resultadosbusquedaproductos').innerHTML = ''
                if (productos.length == 0) {
                    alertify.warning("No se encontro el producto.");
                } else {
                    agregardetalle(productos[0]['pro_id']);

                }
            })
            .catch(function (error) {
                alertify.error('Ocurrio un error interno al intentar buscar productos. Por favor intente mas tarde.');
            })

    }
}


function esconderresultadosproductos() {
    if (productos.length == 0) {
        document.getElementById('resultadosbusquedaproductos').setAttribute('hidden', true)
    }
}

function agregardetalle(idpro) {


    for (var i = 0; i < productos.length; i++) {
        if (productos[i]['pro_id'] == idpro) {

            //validar que dicho producto no se encuentre ya en la factura
            for (var k = 0; k < factura.length; k++) {
                fila = factura[k].getElementsByTagName('td')
                if (productos[i]['pro_nombre'] == fila[0].innerHTML) {
                    //ya existe en la factura
                    var cant = parseInt(fila[1].querySelector("#cant").value);
                    fila[1].querySelector("#cant").value = (cant + 1);
                    calcularfila(factura[k]);
                    document.getElementById('txtproducto').value = "";
                    return 1;
                }
            }
            productosEnFactura.push(productos[i]);
            var fila = tabladetalles.insertRow(-1);
            var nombre = fila.insertCell(0);
            var cantidad = fila.insertCell(1);
            var precio = fila.insertCell(2);
            var descuento = fila.insertCell(3);
            var total = fila.insertCell(4);
            var acciones = fila.insertCell(5);
            //var contenerdoridproducto = fila.insertCell(6);

            nombre.innerHTML = productos[i]['pro_nombre'];
            cantidad.innerHTML = '<input type="text" id="cant" value="1" class="form-control campoinvisible" onfocus="this.type = \'number\'; select()" onblur="this.type = \'text\'; calcularfila(this.closest(\'tr\'))">'
            precio.innerHTML = '<input type="text" id="pre" value="' + productos[i]['pro_precio'] + '" class="form-control campoinvisible" onfocus="this.type = \'number\'; select()" onblur="this.type = \'text\'; calcularfila(this.closest(\'tr\'))">'
            descuento.innerHTML = '<input type="text" id="desc" value="0" class="form-control campoinvisible" onfocus="this.type = \'number\'; select()" onblur="this.type = \'text\'; calcularfila(this.closest(\'tr\'))">'
            total.innerHTML = productos[i]['pro_precio'];
            //contenerdoridproducto.innerHTML = idpro;
            //contenerdoridproducto.style.visibility = 'hidden'

            acciones.innerHTML = '<button type="button" class="btn btn-sm btn-danger fa fa-window-close " onclick="eliminarfila(this.closest(\'tr\'))"></button><input type="text" id="idpro" value="' + idpro + '" hidden>'

            factura.push(fila);
            document.getElementById('txtproducto').value = "";
            break;
        }
    }
    calcularfactura();
}

function vender() {
    var detalles = []; //array que contiene todos los detalles de la factura, ocupa pasar por JSON.stringify() antes de enviarse
    for (var i = 0; i < factura.length; i++) {
        //aqui calculo numeros de cada fila;
        var can = factura[i].getElementsByTagName('td')[1].querySelector("#cant").value;
        var precio = factura[i].getElementsByTagName('td')[2].querySelector("#pre").value;
        var de = factura[i].getElementsByTagName('td')[3].querySelector("#desc").value;
        var idproducto = factura[i].getElementsByTagName('td')[5].querySelector("#idpro").value;

        for (var k = 0; k < productosEnFactura.length; k++) {
            if (productosEnFactura[k]['pro_id'] = idproducto) {
                var pro = productosEnFactura[k];
                var detalle = new Detallefac(pro['pro_nombre'], pro['pro_unidadMedida'], precio, can, de, "", pro['pro_tarifaImpuesto'], pro['pro_cabys'])
                detalles.push(detalle);
                break;
            }
        }
    }

    var form = new FormData();
    form.append('token', getCookies().tokenFacturacion);
    form.append('detalles', JSON.stringify(detalles));
    if (cliente != -1) {
        form.append('receptor', JSON.stringify(new Receptor(cliente['cli_nombre'] + ' ' + cliente['cli_apellidos'], cliente['cli_tipoCedula'], cliente['cli_cedula'], cliente['cli_direccion'], "otras", cliente['cli_telefono'], cliente['cli_correo'])));
        form.append('tipoDocumento', 'fe');
    } else {
        form.append('receptor', "");
        form.append('tipoDocumento', 'te');
    }

    form.append('medioPago', metodosdePago);
    axios.post('https://webhook.site/07210713-cdd6-45d2-bd3a-5c87c6dfbbc8', form).then(function (response) {
    //axios.post('http://201.200.147.114:8989/facturar', form).then(function (response) {
        console.log(response.data);
    });
}

//clase utilizada para enviar al api de facturacion los detalles
class Detallefac {
    descripcion;
    unidadMedida;
    precioUnidad;
    cantidad;
    descuento;//en porcentaje
    detalleDescuento;
    tarifaImpuestos;
    codigoCabys;
    constructor(descripcion, unidadMedida, precioUnidad, cantidad, descuento, detalleDescuento, tarifaImpuestos, codigoCabys) {
        this.descripcion = descripcion;
        this.unidadMedida = unidadMedida;
        this.precioUnidad = precioUnidad;
        this.cantidad = cantidad;
        this.descuento = descuento;
        this.detalleDescuento = detalleDescuento;
        this.tarifaImpuestos = tarifaImpuestos;
        this.codigoCabys = codigoCabys;
    }
}

//clase utilizada para darle el formato pedido por el api de facturacion al receptor
class Receptor {
    nombre;
    tipoCedula;
    cedula;
    direccion;
    otrasSenas;
    telefono;
    correo;
    constructor(nombre, tipoced, ced, dir, otras, tel, correo) {
        this.nombre = nombre;
        this.tipoCedula = tipoced;
        this.cedula = ced;
        this.direccion = dir;
        this.otrasSenas = otras;
        this.telefono = tel;
        this.correo = correo;
    }
}
