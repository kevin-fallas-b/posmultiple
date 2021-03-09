@extends('dashboard/dashboard')

@section('content')
<script>
    setactive('linkfacturacion')
</script>
<link rel="stylesheet" href="{{ url('/css/facturacion.css') }}">
<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">

<div>

    <div class="container-fluid">

        <div class="row">
            <div class="card col-sm-12 col-lg-9" id="contenedortabla">

                <div class="input-group mt-3">
                    <input type="button" hidden id="btnmostrarresultadosproductos">
                    <input id="txtproducto" type="text" class="form-control rounded" autocomplete="off" tabindex="5" placeholder="Producto o servicio" onfocus="esconderresultadosproductos()" onkeyup="buscarproductos(this.value)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="dropdown-menu" id="resultadosbusquedaproductos">
                    </div>

                    <div class="input-group-append">
                        <button type="button" class="btn btn-primary" onclick="mensajeagregardetalle()"> <i class="fa fa-plus" aria-hidden="true" onclick="agregardetalle();"></i> Agregar</button>
                        <button type="button" class="btn btn-secondary ml-2 rounded" onclick="">Cargar Orden</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped table-hover mt-3" data-toggle="table" style="text-align: center;" id="tabladetalles">
                        <thead>
                            <tr>
                                <th>Detalle</th>
                                <th style="width: 150px;">Cantidad</th>
                                <th style="width: 150px;">Precio (I.V.I)</th>
                                <th style="width: 150px;">Desc. (%)</th>
                                <th>SubTotal (I.V.I)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-lg-3">
                <div class="sticky-top mb-3">

                    <!-- /.card -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Detalles de factura</h3>
                        </div>
                        <div class="card-body">

                            <!-- CADA INPUT GROUP ES UNA FILA-->

                            <div class="input-group">
                                <input type="button" hidden id="btnmostrarresultados">
                                <input id="txtcliente" type="text" class="form-control" placeholder="Cliente" onfocus="esconderresultados()" onkeyup="buscarclientes(this.value)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="dropdown-menu" id="resultadosbusqueda">
                                </div>
                                <div class="input-group-append" id="clienteinputgroup">
                                    <button id="btncreareditar" type="button" class="btn btn-primary"> <i class="far fa-address-card" aria-hidden="true"> </i> </button>
                                    <button id="btnQuitarCliente" type="button" class=" ml-1 btn btn-danger" style='display:none' onclick="quitarCliente()">X</button>
                                </div>
                            </div>
                            <div class="input-group mt-3">
                                <label style="font-weight: normal;">SubTotal:</label>
                                <label class="ml-3" style="font-weight: normal;">₡</label><label style="font-weight: normal;" id="lblsubtotal"> </label>
                            </div>
                            <div class="input-group ">
                                <label style="font-weight: normal;">Impuestos:</label>
                                <label class="ml-2" style="font-weight: normal;">₡</label><label style="font-weight: normal;" id="lblimpuestos"> </label>
                            </div>
                            <div class="input-group ">
                                <label style="font-weight: normal;">Descuentos:</label>
                                <label class="ml-2" style="font-weight: normal;">₡</label><label style="font-weight: normal;" id="lbldescuentos"> </label>
                            </div>

                            <div class="input-group mt-4">
                                <label>Total:</label>
                                <label class="ml-2">₡</label><label id="lbltotal"></label>
                            </div>

                        </div>
                        <div class="card-footer">
                            <button id="btnvender" type="button" class="btn" style="background-color: #00a65a; width: 100%; color:white" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="abrirModalVender()"> <i class="fa fa-shopping-cart" aria-hidden="true"> </i> Vender</button>

                        </div>
                    </div>
                </div>
            </div>

            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div><!-- /.container-fluid -->
</div>


<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg ">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Pagar Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <label>Total:</label>
                    <label class="ml-2">₡</label><label id="lbltotalModal"></label>
                </div>
                <div class="input-group">
                    <label style="font-weight: normal;">Pendiente:</label>
                    <label class="ml-2" style="font-weight: normal;">₡</label><label style="font-weight: normal;" id="lblPendienteModal"> </label>
                </div>
                <div class="input-group">
                    <label style="font-weight: normal;">Vuelto:</label>
                    <label class="ml-2" style="font-weight: normal;">₡</label><label style="font-weight: normal;" id="lblVueltoModal"> </label>
                </div>

                <div class="input-group mt-3 pb-1">
                    <button id="txtmetododepago" type="text" class="btn btn-secondary col-md-4" onkeypress="return false" tabindex="6" onfocus="blur()" placeholder="Agregar Metodo de pago" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Agregar Metodo de pago</button>
                    <div class="input-group-append">
                        <div class="dropdown-menu">
                            <!-- AQUI VAN OPCIONES DE DROPDOWN MENU -->
                            <div class="dropdown-item" style=" cursor: pointer;" onclick="agregarMetodoPago(01,'Efectivo')">Efectivo</div>
                            <div class="dropdown-item" style=" cursor: pointer;" onclick="agregarMetodoPago(02,'Tarjeta')">Tarjeta</div>
                            <div class="dropdown-item" style=" cursor: pointer;" onclick="agregarMetodoPago(04,'Sinpe movil')">Sinpe movil</div>
                        </div>
                    </div>
                </div>
                <div id="contenedorMetodosPago">
                    <div class="input-group mt-4 metodoDePago" id='metodoDePago,1,1'>
                        <label for="txtNombre" style="position: absolute;top:-22px;">Efectivo</label>
                        <input id="" type="text" class="form-control col-md-6" onkeyup="calcularPendientes()" value="0" onfocus="this.select();" onkeypress="return isNumber(event)" placeholder="Efectivo">
                        <div class="input-group-append" id="clienteinputgroup">
                            <button id="btnQuitarCliente" type="button" class=" ml-1 btn btn-danger" onclick="eliminarMetodoPago('metodoDePago,1,1')">X</button>
                        </div>
                    </div>

                </div>

                <div class="form-group">
                    <label for="message-text" class="col-form-label">Observaciones:</label>
                    <textarea class="form-control" id="message-text"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="vender()">Procesar Pago</button>
            </div>


        </div>
    </div>
</div>
<script src="{{url('/js/facturacion.js')}}"></script>

@endsection