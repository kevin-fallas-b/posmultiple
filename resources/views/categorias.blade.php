@extends('dashboard/dashboard')

@section('content')
<script>
setactive('linkadministracion')
</script>

<script src="{{url('/js/categorias.js')}}"></script>
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Categorias</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtbuscar" type="text" class="form-control" placeholder="Buscar Categoria"
                                onkeyup="buscarCategoria(this.value)">

                            <button id="btnnuevo" type="button" class="btn btn-primary ml-2" onclick="nuevo()"> Nuevo
                            </button>
                        </div>

                        <br>
                        <div id="contenedor-data" class='table-responsive'>
                            <!-- Le agregue esa clase, que es de bootstrap para hacer la tabla responsiva -->

                            <table class="table" id="tabla" style="text-align: center;">
                                <thead class="thead-dark">
                                    <tr>
                                        <th style="text-align: left;">Nombre</th>
                                        <th colspan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>

                        <div id="contenedorcampos" hidden>
                            <div class="input-group mt-5">
                                <label for="txtNombre" style="position: absolute;top:-22px;">Nombre</label>
                                <input type="text" class="form-control rounded" placeholder="Nombre" id="txtNombre">
                            </div>

                            <div class="input-group mt-5 ">
                                <button type="button" class="btn btn-danger " id="botcancelar"
                                    onclick="cancelar()">Cancelar</button>
                                <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                    onclick="guardar()">Guardar</button>
                                <button type="button" class="btn btn-primary ml-2" id="btneditar"
                                    onclick="editarCategoria()">Editar</button>
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