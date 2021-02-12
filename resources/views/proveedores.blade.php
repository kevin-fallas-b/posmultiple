@extends('dashboard/dashboard')

@section('content')
<script>
setactive('linkadministracion')
</script>

<script src="{{url('/js/proveedores.js')}}"></script>
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Proveedores</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtbuscar" type="text" class="form-control" placeholder="Buscar Proveedor"
                                onkeyup="buscarProveedor(this.value)">

                            <button id="btnnuevo" type="button" class="btn btn-primary ml-2" onclick="nuevo()"> Nuevo
                            </button>
                        </div>

                        <br>
                        <div id="contenedor-data" class='table-responsive'>
                            <!-- Le agregue esa clase, que es de bootstrap para hacer la tabla responsiva -->

                            <table class="table" id="tabla" style="text-align: center;">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Razón social</th>
                                        <th>Cédula</th>
                                        <th>Teléfono</th>
                                        <th>Correo</th>
                                        <th colspan="3">Acciones</th>
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
                                <label for="txtRazon" style="position: absolute;top:-22px;left:47vw">Razón
                                    Social</label>
                                <input type="text" class="form-control rounded" placeholder="Razón Social"
                                    id="txtRazon">
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtCedula" style="position: absolute;top:-22px">Cédula</label>
                                <input type="text" style="max-width:48.5%" class="form-control rounded"
                                    placeholder="Cédula" id="txtCedula">
                                <div>
                                    <label for="" style="position: absolute;top:-22px;left:47vw">Tipo de Cédula</label>
                                    <button class="btn btn-secondary dropdown-toggle ml-5" type="button"
                                        id="dropdownTipo" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        Tipo de Cédula
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownTipo">
                                        <button class="dropdown-item" type="button"
                                            onclick="tipoCedula('fisica')">Física</button>
                                        <button class="dropdown-item" type="button"
                                            onclick="tipoCedula('juridica')">Jurídica</button>
                                    </div>
                                </div>
                            </div>
                                <div class="input-group mt-5">
                                    <label for="txtTelefono" style="position: absolute;top:-22px;">Telefono</label>
                                    <input type="text" class="form-control rounded" placeholder="Telefono"
                                        id="txtTelefono">
                                    <label for="txtCorreo" style="position: absolute;top:-22px;left:47vw">Correo</label>
                                    <input type="text" class="form-control rounded" placeholder="Correo" id="txtCorreo">
                                </div>

                                <div class="input-group mt-4  ">
                                    <select class="btn" style="border-color:black" id="provincia" required=""
                                        onChange="canton(this.value,true)">
                                        <option value="1" hidden="">Seleccione una Provincia</option>
                                        <option value="1">
                                            San José
                                        </option>
                                        <option value="2">
                                            Alajuela
                                        </option>
                                        <option value="3">
                                            Cartago
                                        </option>
                                        <option value="4">
                                            Heredia
                                        </option>
                                        <option value="5">
                                            Guanacaste
                                        </option>
                                        <option value="6">
                                            Puntarenas
                                        </option>
                                        <option value="7">
                                            Limón
                                        </option>
                                    </select>
                                    <select class="btn ml-3" style="border-color:black" id="cantones" required=""
                                        onChange="distrito(this.value,true)">
                                        <option value="" hidden="">Seleccione un Canton</option>
                                    </select>
                                    <select class="btn ml-3" style="border-color:black" id="distritos" required=""
                                        onChange="setDistrito(this.value)">
                                        <option value="" hidden="">Seleccione un Distrito</option>
                                    </select>

                                    <!-- /btn-group -->
                                </div>
                                <div class="input-group mt-5">
                                    <label for="txtSenas" style="position: absolute;top:-22px;">Otras Señas</label>
                                    <input type="text" class="form-control rounded mr-3" placeholder="Otras señas"
                                        id="txtSenas">

                                </div>
                                <!-- /input-group -->

                                <div class="input-group mt-5 ">
                                    <button type="button" class="btn btn-danger " id="botcancelar"
                                        onclick="cancelar()">Cancelar</button>
                                    <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                        onclick="guardar()">Guardar</button>
                                    <button type="button" class="btn btn-primary ml-2" id="btneditar"
                                        onclick="editarProveedor()">Editar</button>
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