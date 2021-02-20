@extends('dashboard/dashboard')

@section('content')
<script>
    //setactive('linkusuarios')
    setactive('linkadministracion')
</script>

<script src="{{url('/js/categoria.js')}}"></script>
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<?php
    echo '<input type="text" id="idproducto" hidden value="'.$_GET['pro_id'].'"><input type="text" id="nombrepro" hidden value="'.$_GET['pro_nombre'].'">'
?>

<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title" id="titulo">Categorias</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input id="txtbuscar" type="text" class="form-control" placeholder="Buscar Categorias" onkeyup="buscarCategorias(this.value)">

                            <button id="btnnuevo" type="button" class="btn btn-primary ml-2" onclick="agregar()">Agregar</button>
                        </div>

                        <br>
                        <div id="contenedor-data">
                            <table class="table" id="tabla" style="text-align: center;">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.row -->
</div><!-- /.container-fluid -->

@endsection