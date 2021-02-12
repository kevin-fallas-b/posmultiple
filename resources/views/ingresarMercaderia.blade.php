@extends('dashboard/dashboard')

@section('content')
<script>
setactive('linkinventario')
</script>

<script src="{{url('/js/ingresarproductos.js')}}"></script>
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Ingresar Mercaderia</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtcodigoBarras" type="text" class="form-control" placeholder="Codigo de Barras">
                            <button type="button" id='btndrowndown' class="btn btn-success dropdown-toggle ml-2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ingresar
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" type="button"
                                    onclick="tipoaccion('Ingresar')">Ingresar</button>
                                <button class="dropdown-item" type="button" onclick="tipoaccion('Sacar')">Sacar</button>
                            </div>
                            <button id="btnbuscar" type="button" class="btn btn-primary ml-2"
                                onclick="buscarProducto()"> Buscar
                            </button>
                        </div>
                        <div class='card-body' id="contenedortabla" style='display:inline;'>
                            <div class='table-responsive'>
                                <table class="table  table-hover" id='tabla-productos'>
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Codigo de barras</th>
                                            <th>Cantidad</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id='tbody-productos'>
                                    </tbody>
                                </table>


                            </div>
                            <div class="input-group mt-5 ">
                                <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                    onclick="guardarFinal()">Guardar</button>
                                <!-- /btn-group -->
                            </div>
                        </div>

                        <div id="contenedorcampos" style='display:none;'>
                            <div class="input-group mt-5">
                                <label for="txtnombre" style="position: absolute;top:-22px;">Nombre</label>
                                <input type="text" class="form-control rounded" placeholder="Nombre" id="txtnombre"
                                    disabled>
                                <label for="txtdescripcion"
                                    style="position: absolute;top:-22px;left:47vw">Descripción</label>
                                <input type="text" class="form-control rounded ml-5" placeholder="Descripción" disabled
                                    id="txtdescripcion">
                            </div>

                            <div class="input-group mt-5">
                                <label for="" style="position: absolute;top:-22px;">Saldo existente</label>
                                <input type="text" class="form-control rounded" placeholder="Saldo existente"
                                    id="txtsaldoexistente" disabled>
                                <label for="" style="position: absolute;top:-22px;left:47vw">Cantidad a ingresar</label>
                                <input type="text" class="form-control rounded ml-5" placeholder="Cantidad a ingresar"
                                    id="txtcantidadingresar">
                            </div>

                            <div class="input-group mt-5 ">
                                <button type="button" class="btn btn-danger " id="botcancelar"
                                    onclick="cancelar()">Cancelar</button>
                                <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                    onclick="guardar()">Guardar (F3)</button>
                                <!-- /btn-group -->
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- /.row -->
</div><!-- /.container-fluid -->

@endsection