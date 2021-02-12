@extends('dashboard/dashboard')

@section('content')
<script>
    //setactive('linkusuarios')
    setactive('linkadministracion')
</script>

<script src="{{url('/js/usuarios.js')}}"></script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Usuarios</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtclienteeditar" type="text" class="form-control" placeholder="Buscar Usuario" onfocus="esconderresultados()" onkeyup="buscarusuarios(this.value)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                <label for="txtnombre" style="position: absolute;top:-22px;">Nombre</label>
                                <input type="text" class="form-control rounded" placeholder="Nombre" id="txtnombre">
                                <label for="txtcedula" style="position: absolute;top:-22px;left:47vw">Cedula</label>
                                <input type="text" class="form-control rounded ml-5" placeholder="Cedula" id="txtcedula" onkeypress="return isNumber(event)">
                                
                            </div>

                            <div class="input-group mt-5">
                                <!-- /btn-group -->
                                <label for="txtcontra" style="position: absolute;top:-22px;">Contraseña</label>
                                <input type="password" class="form-control rounded" placeholder="Contraseña" id="txtcontra">
                                <label for="txtcorreo" style="position: absolute;top:-22px;left:47vw">Correo</label>
                                <input type="text" class="form-control ml-5 rounded" placeholder="Correo" id="txtcorreo">
                            </div>
                            <!-- /input-group -->

                            <div class="input-group mt-5 ">
                                <label for="txtusername" style="position: absolute;top:-22px;">Nombre de Usuario</label>
                                <input type="text" class="form-control rounded" style="max-width:48.5%" placeholder="Nombre de Usuario" id="txtusername">
                                <div>                            
                                <label for="" style="position: absolute;top:-22px;left:47vw">Tipo de Usuario</label>
                                 <button class="btn btn-secondary dropdown-toggle ml-5" type="button" id="dropdownTipo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Tipo de Usuario
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownTipo" style='width:100px'>
                                <button class="dropdown-item" type="button" onclick="tipoUsuario('Mesero')">Mesero</button>
                                <button class="dropdown-item" type="button" onclick="tipoUsuario('Cajero')">Cajero</button>
                                <button class="dropdown-item" type="button" onclick="tipoUsuario('Administrador')">Administrador</button></div>
                                
                                <label for="checkactivo" style="position: absolute;top:-22px;left:56.5vw">Usuario Activo</label>
                                <input type="checkbox" id='checkactivo' class="ml-5" data-width="100" checked data-toggle="toggle" data-on="Activo" data-off="Inactivo" data-onstyle="success" data-offstyle="danger">
                                
                                </div>
                                <!-- /btn-group -->
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