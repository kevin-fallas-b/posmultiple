@extends('dashboard/dashboard')

@section('content')
<script>
    //setactive('linkusuarios')
    setactive('linkadministracion')
</script>

<script src="{{url('/js/representantes.js')}}"></script>
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<?php
    echo '<input type="text" id="idproveedor" hidden value="'.$_GET['pro_id'].'">'
?>

<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title" id="titulo">Representantes</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtbuscar" type="text" class="form-control" placeholder="Buscar Representante" onkeyup="buscarRepresentante(this.value)">

                            <button id="btnnuevo" type="button" class="btn btn-primary ml-2" onclick="nuevo()"> Nuevo </button>
                        </div>

                        <br>
                        <div id="contenedor-data">
                            <table class="table" id="tabla" style="text-align: center;">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                        <th>Correo</th>
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
                                <label for="txtTelefono" style="position: absolute;top:-22px;left:47vw">Teléfono</label>
                                <input type="text" class="form-control rounded" placeholder="Teléfono" id="txtTelefono">
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtCorreo" style="position: absolute;top:-22px">Correo</label>
                                <input type="text" style="max-width:48.5%" class="form-control rounded" placeholder="Correo" id="txtCorreo">
                            </div>

                            <div class="input-group mt-5 ">
                                    <button type="button" class="btn btn-danger " id="btncancelar"
                                        onclick="cancelar()">Cancelar</button>
                                    <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                        onclick="guardar()">Guardar</button>
                                    <button type="button" class="btn btn-primary ml-2" id="btneditar"
                                        onclick="editarRepresentante()">Editar</button>
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