@extends('dashboard/dashboard')

@section('content')
<script>
    setactive('linkordenes');
</script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">

<link rel="stylesheet" href="{{ url('/css/estilo.css') }}">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

<script src="{{url('/js/ordenes.js')}}"></script>

<script src="{{ url('/js/alertify.min.js') }}"></script>
<script src="{{ url('/js/axios.min.js') }}"></script>
<script src="{{ url('/js/plain-draggable.min.js') }}"></script>
<script src="{{ url('/js/plain-draggable-limit.min.js') }}"></script>

<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<input type="text" id="tab" hidden value="{{$tab}}">

<!-- Modal -->
<div class="modal fade" id="cantProdModal" tabindex="-1" aria-labelledby="titleModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
            <h5 class="modal-title" id="titleModal">Producto</h5>
            <h5 class="modal-title" id="txt_disponibles">Disponibles:</h5>
      </div>

      <div class="modal-body">
        <div class="input-group mt-5">
            <label for="txtnombre" style="position: absolute;top:-22px;" id="lbl_nombreProducto"></label>
            <input type="text" class="form-control rounded" placeholder="Cantidad" id="txtCantidadProducto" autocomplete="off" onkeypress="return isNumber(event)" autofocus>
        </div>
        <div class="input-group mt-5">
            <label for="txtdetalle" style="position: absolute;top:-22px;">Detalle</label>
            <input type="text" class="form-control rounded" placeholder="Detalle" autocomplete="off" id="txtdetalle">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" id="btn_close" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick="agregarInfoProducto()">Ok</button>
      </div>

    </div>
  </div>
</div>


<div class="container-fluid">
    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">
                <div class="card">
                    <div class="card-header">
                        <h3>Ordenes</h3>
                    </div>
                    <div class='card-body'>
                        <div class="row" id="primerfila">
                            <button type="button" id="btn_ordenSinMesa" class="btn btn-primary ml-1 mb-1" onclick="ordenSinMesa()">Nueva orden sin mesa</button>
                            <button type="button" id="btn_mesas" class="btn btn-success mb-1 ml-1" onclick="cargarMesas(true)">Mesas</button>
                            <button type="button" id="btn_cocina" class="btn btn-primary ml-1 mb-1" onclick="cocina()">Cocina</button>
                        </div>

                        <div id="contenedormesas" class="col" style='display:none;'>

                            <div class='table-responsive'>
                                <div style='background-color: gray;' id='div_principal'>
                                </div>
                                <div class="input-group mt-3 mb-1 ">
                                    <button type="button" class="btn btn-danger " id="botcancelar"
                                            onclick="cancelarEnMesas()">Atras</button> 
                                </div>
                            </div>
                        </div>

                        <div id="contenedororden" style='display:none;'>
                            <div class="row">
                                <div class="col contenedorproductos">
                                    <!--<div class="input-group mt-1">-->
                                        <div class="row">
                                            <div class="col-lg-1 mt-3 mb-1 mr-2">
                                                <button type="button" class="btn btn-danger " id="botcancelar" onclick="cancelarEnOrden()">Atras</button> 
                                            </div>
                                            <div class="col-lg-10 mt-3 mb-1">
                                               <input id="txtbuscarNombre" type="text" class="form-control" placeholder="Buscar por nombre"
                                                  onkeyup="buscarProductoPorNombre(this.value)">  
                                            </div>
                                        </div>
                                    <!--</div>-->
                                    <div class="input-group mt-2">
                                        <ul id="ul_tabs" class="nav nav-pills nav-fill">
                                            <li class="nav-item">
                                                <button type="button" class="btn nav-link" onclick="mostrarProductos(true,0)">Todo</button>
                                            </li>
                                            <!--Los demás "tabs" se cargan de forma dinámica-->                                   
                                        </ul>
                                    </div>

                                    <div class="input-group mt-2 mb-3 grid-container" id="div_productos">
                                    
                                    </div>
                                    <!--<div class="input-group mt-3 mb-1 ">
                                        <button type="button" class="btn btn-danger " id="botcancelar" onclick="cancelarEnOrden()">Atras</button> 
                                    </div>-->
                                </div>
                                <div class="col-lg-4">
                                    <div class="card-header">
                                        <div class="row caja">
                                            <div class="col"><!--POnerle id para cuanodo carga una orden-->
                                               <h3 id='h_mesero' class="card-title mt-2 ml-1 mb-1">{{$_SESSION['user']->usu_nombre}}</h3>
                                            </div>
                                            <!--<button type="button" class="btn btn-outline-dark mt-1 mb-1 mr-1 btn_x" onclick="">✖️</button>-->
                                        </div>
    
                                        <div class="row mt-1">
                                            <div class="col mt-2">
                                            <select class="btn ml-3" style="border-color:black" id="sel_mesa" required="" onChange="">
                                                <!--<option value="" hidden="">Orden</option>-->
                                            </select>                                         
                                                <!--<h2 id="title_orden" class="card-title">Orden</h2>-->
                                            </div>
                                        
                                            <button id="btn_elimOrden" type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="eliminarOrden()">🗑️</button>
                                        
                                            <button id="btn_guardOrden" type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="guardarOrden()">💾</button>
                                        </div>
                                        <div class="row mt-2" id="div_chks">
                                            <div class="col mt-3"><label for="" style="position: absolute;top:-22px;">Est. entrega</label>
                                            <input type="checkbox" id='checkentrega' class="ml-5" data-width="140" checked data-toggle="toggle" data-on="Entregada" data-off="No Entregada" data-onstyle="success" data-offstyle="danger"></div>
                                            <div class="col mt-3"><label for="" style="position: absolute;top:-22px;">Est. pago</label>
                                            <input type="checkbox" id='checkpago' class="ml-5" data-width="140" checked data-toggle="toggle" data-on="Pagada" data-off="No Pagada" data-onstyle="success" data-offstyle="danger"></div>
                                        </div>
                                    </div>
                                
                                    <div id="contenedor-orden" class='table-responsive'>
                                        <table class="table" id="tabla_productos" style="text-align: center;">
                                            <thead class="thead-dark">
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                   
                                    <div class="card-footer">
                                        <div class="row mt-1">
                                           <div class="col mt-2">Total</div>
                                           <div id="col_total"class="col mt-2">0.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        <div id="contenedorOrdenes" class="row">
                            <div class='table-responsive'>
                                <table class="table  table-hover">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Mesero</th>
                                            <th>Fecha/Hora</th>
                                            <th>Estado</th>
                                            <th>Pagado</th>
                                            <th>Mesa</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id='tbody_ordenes'>
                                         
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- aqui termina la tabla -->
                    </div>
                </div>
            </div>
        </div>   
    </div>

    <!-- /.row -->
</div><!-- /.container-fluid -->

@endsection