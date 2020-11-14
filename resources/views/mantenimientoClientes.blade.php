@extends('dashboard/dashboard')

@section('content')
<script>
    setactive('linkclientes')
</script>

<script src="{{url('/js/clientes.js')}}"></script>
<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Clientes</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtclienteeditar" type="text" class="form-control" placeholder="Buscar Cliente" onfocus="esconderresultados()" onkeyup="buscarclientes(this.value)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="dropdown-menu" id="resultadosbusqueda">
                            </div>
                            <div class="input-group-append">
                                <button id="add-new-event" type="button" class="btn btn-primary fas fa-user" style="pointer-events:none;"></button>
                            </div>

                            <button id="btneditar" type="button" class="btn btn-primary ml-2" onclick="editarcliente()"> Editar </button>
                            <button id="btnnuevo" type="button" class="btn btn-primary ml-2" onclick="nuevo()"> Nuevo </button>
                        </div>

                        <div id="contenedorcampos" hidden>
                            <div class="input-group mt-5">
                                <label for="txtcedula" style="position: absolute;top:-22px;">Cedula</label>
                                <input type="text" class="form-control rounded mr-3 col-4" placeholder="Cedula" id="txtcedula" onkeypress="return isNumber(event)">
                                <div class="custom-control custom-checkbox mt-2">
                                    <input type="checkbox" class="custom-control-input" id="chkfisica" onclick="checks(this.id)">
                                    <label class="custom-control-label" style="font-weight: normal;" for="chkfisica">Fisica</label>
                                </div>
                                <div class="custom-control custom-checkbox mt-2">
                                    <input type="checkbox" class="custom-control-input ml-3" id="chkjuridica" onclick="checks(this.id)">
                                    <label class="custom-control-label ml-3" style="font-weight: normal;" for="chkjuridica">Juridica</label>
                                </div>
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtnombre" style="position: absolute;top:-22px;">Nombre</label>
                                <input type="text" class="form-control rounded" placeholder="Nombre" id="txtnombre">
                                <label for="txtapellidos" style="position: absolute;top:-22px;left:47vw">Apellidos</label>
                                <input type="text" class="form-control ml-5 rounded" placeholder="Apellidos" id="txtapellidos">

                                <!-- /btn-group -->
                            </div>
                            <!-- /input-group -->

                            <div class="input-group mt-5 ">
                                <label for="txttelefono" style="position: absolute;top:-22px;">Telefono</label>
                                <input type="text" class="form-control rounded" placeholder="Telefono" id="txttelefono" onkeypress="return isNumber(event)">
                                <label for="txtcorreo" style="position: absolute;top:-22px;left:47vw">Correo</label>
                                <input type="text" class="form-control ml-5 rounded" placeholder="Correo" id="txtcorreo">

                                <!-- /btn-group -->
                            </div>

                            <div class="input-group mt-4  ">
                                <select class="btn" style="border-color:black" id="provincia" required="">
                                    <option value="1" hidden="">Seleccione una Provincia</option>
                                    <option onclick="canton(1)">
                                        San José
                                    </option>
                                    <option onclick="canton(2)">
                                        Alajuela
                                    </option>
                                    <option onclick="canton(3)">
                                        Cartago
                                    </option>
                                    <option onclick="canton(4)">
                                        Heredia
                                    </option>
                                    <option onclick="canton(5)">
                                        Guanacaste
                                    </option>
                                    <option onclick="canton(6)">
                                        Puntarenas
                                    </option>
                                    <option onclick="canton(7)">
                                        Limón
                                    </option>
                                </select><select class="btn ml-3" style="border-color:black" id="cantones" required="" disabled>
                                    <option value="" hidden="">Seleccione un Canton</option>

                                </select><select class="btn ml-3" style="border-color:black" id="distritos" required="" disabled>
                                    <option value="" hidden="">Seleccione un Distrito</option>

                                </select>

                                <!-- /btn-group -->
                            </div>
                            <div class="input-group mt-4">
                                <label for="txtotrassenas" style="position: absolute;top:-22px;">Otras Señas</label>
                                <input type="text" class="form-control rounded mr-3" placeholder="Otras señas" id="txtotrassenas">

                            </div>
                            <!-- /input-group -->


                            <div class="input-group mt-5 ">
                                <button type="button" class="btn btn-danger " id="botcancelar" onclick="cancelar()">Cancelar</button>
                                <button type="button" class="btn btn-success ml-1" id="btnguardar" onclick="guardar()">Guardar</button>
                                <!-- /btn-group -->
                            </div>
                            <!-- /input-group -->

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <!-- /.row -->
</div><!-- /.container-fluid -->

@endsection