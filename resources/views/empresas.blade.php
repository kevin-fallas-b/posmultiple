@extends('dashboard/dashboard')
<!-- Vista creada por KFallas. 
    permite a un superadmin crear otras empresas y un admin para la empresa
    tambien puede suspender la empresa.-->
    
@section('content')
<script src="{{url('/js/empresas.js')}}"></script>
<script>
setactive('linkempresas')
guardarEmpresas(<?php echo $empresas ?>);
</script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css"
    rel="stylesheet">
<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Empresas</h3>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <button id="btnnuevo" type="button" class="btn btn-primary ml-2" onclick="nuevo()"> Crear
                                Nueva </button>
                        </div>
                    </div>
                    <div class='card-body' id="contenedortabla">
                        <div class='table-responsive'>
                            <table class="table  table-hover">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                        <th>Correo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id='tbody-empresas'>
                                    <?php 
                                    for($i=0;$i<count($empresas);$i++){
                                        echo '<tr>
                                                <th scope="row">'.($i+1).'</th>
                                                <td>'.$empresas[$i]->emp_nombre.'</td>
                                                <td>'.$empresas[$i]->emp_telefono.'</td>
                                                <td>'.$empresas[$i]->emp_correo.'</td>';
                                        if($empresas[$i]->emp_estado == 'A'){
                                            echo '<td>Activa</td>';
                                        }else{
                                            echo '<td>Inactiva</td>';
                                        }
                                        echo'
                                        <td><button type="button" class="btn btn-primary" onClick="visualizar('.$empresas[$i]->emp_id.')">Ver/Editar</button></td>
                                             </tr>';
                                    }
                                ?>

                                </tbody>
                            </table>


                        </div>
                    </div>
                    <!-- aqui termina la tabla -->

                    <div class='card-body' id="contenedorcampos" style='display:none;'>

                        <div class='input-group'>
                            <label for="txtcedula" style="position: absolute;top:-22px;">Cedula</label>
                            <input type="text" class="form-control rounded mr-3 col-4" placeholder="Cedula"
                                id="txtcedula" onkeypress="return isNumber(event)">
                            <div class="custom-control custom-checkbox mt-2">
                                <input type="checkbox" class="custom-control-input" id="chkfisica"
                                    onclick="checks(this.id)">
                                <label class="custom-control-label" style="font-weight: normal;"
                                    for="chkfisica">Fisica</label>
                            </div>
                            <div class="custom-control custom-checkbox mt-2">
                                <input type="checkbox" class="custom-control-input ml-3" id="chkjuridica"
                                    onclick="checks(this.id)">
                                <label class="custom-control-label ml-3" style="font-weight: normal;"
                                    for="chkjuridica">Juridica</label>
                            </div>

                            <!-- div que contiene el slider para empresa activo, si se quita se joden los estilos-->
                            <div class='col-5'></div>
                            <div class='ml-2'>
                                <label for="" style="position: absolute;top:-25px">Empresa Activa</label>
                                <input type="checkbox" id='checkactivo' class="ml-5" data-width="100" checked
                                    data-toggle="toggle" data-on="Activo" data-off="Inactivo" data-onstyle="success"
                                    data-offstyle="danger">

                                <!-- /btn-group -->
                            </div>

                        </div>

                        <div class="input-group mt-5">
                            <label for="txtnombre" style="position: absolute;top:-22px;">Nombre</label>
                            <input type="text" class="form-control rounded" placeholder="Nombre" id="txtnombre">
                            <label for="txtrazonsocial" style="position: absolute;top:-22px;left:47vw">Razon
                                Social</label>
                            <input type="text" class="form-control rounded ml-5" placeholder="Razon Social"
                                id="txtrazonsocial">
                        </div>

                        <div class="input-group mt-5">
                            <!-- /btn-group -->
                            <label for="txttelefono" style="position: absolute;top:-22px;">Telefono</label>
                            <input type="text" class="form-control rounded" placeholder="Telefono" id="txttelefono"
                                onkeypress="return isNumber(event)">
                            <label for="txtcorreo" style="position: absolute;top:-22px;left:47vw">Correo</label>
                            <input type="text" class="form-control ml-5 rounded" placeholder="Correo" id="txtcorreo">
                        </div>

                        <div class="input-group mt-5">
                            <!-- /btn-group -->
                            <label for="txtslogan" style="position: absolute;top:-22px">Slogan</label>
                            <input type="text" class="form-control rounded" placeholder="Slogan" style="max-width:48.5%"
                                id="txtslogan">
                        </div>
                        <!-- /input-group -->

                        <div class="input-group mt-5 ">
                            <label style="position: absolute;top:-22px">Direccion</label>
                            <select class="btn" style="border-color:black" id="provincia" required=""
                                onChange="canton(this.value)">
                                <option value="0" hidden>Seleccione una Provincia</option>
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
                            </select><select class="btn ml-3" style="border-color:black" id="cantones" required=""
                                disabled onChange="distrito(this.value)">
                                <option value="" hidden="">Seleccione un Canton</option>

                            </select><select class="btn ml-3" style="border-color:black" id="distritos" required=""
                                disabled onChange="setDistrito(this.value)">
                                <option value="" hidden="">Seleccione un Distrito</option>

                            </select>





                            <!-- /btn-group -->
                        </div>
                        <!-- /input-group -->

                        <div class="input-group mt-5 ">
                            <label for="txtactividadeconomica" style="position: absolute;top:-22px;">Codigo Actividad
                                Economica</label>
                            <input type="text" class="form-control rounded" style="max-width:48.5%"
                                placeholder="Codigo Actividad Economica" id="txtactividadeconomica">

                        </div>


                        <div class="input-group mt-5">
                            <label for="txtusuarioprod" style="position: absolute;top:-22px;">Usuario Produccion
                                (Hacienda)</label>
                            <input type="text" class="form-control rounded" placeholder="Usuario Produccion (Hacienda)"
                                id="txtusuarioprod">
                            <label for="txtclaveproduccion" style="position: absolute;top:-22px;left:47vw">Clave
                                Produccion (Hacienda)</label>
                            <input type="text" class="form-control rounded ml-5"
                                placeholder="Clave Produccion (Hacienda)" id="txtclaveprod">
                        </div>
                        <div class="input-group mt-5">
                            <label for="txtusuarioapi" style="position: absolute;top:-22px;">Usuario API (Fact.
                                Elect.)</label>
                            <input type="text" class="form-control rounded" placeholder="Usuario API (Fact. Elect.)"
                                id="txtusuarioapi">
                            <label for="txtclaveapi" style="position: absolute;top:-22px;left:47vw">Clave API (Fact.
                                Elect.)</label>
                            <input type="text" class="form-control rounded ml-5" placeholder="Clave API (Fact. Elect.)"
                                id="txtclaveapi">
                        </div>


                        <hr class='mt-4' />
                        <label>Info del Administrador</label>
                        <div class="input-group mt-3">
                            <label for="txtnombreuser" style="position: absolute;top:-22px;">Nombre</label>
                            <input type="text" class="form-control rounded" placeholder="Nombre" id="txtnombreuser">
                            <label for="txtcedulauser" style="position: absolute;top:-22px;left:47vw">Cedula</label>
                            <input type="text" class="form-control rounded ml-5" placeholder="Cedula" id="txtcedulauser"
                                onkeypress="return isNumber(event)">

                        </div>

                        <div class="input-group mt-5">
                            <!-- /btn-group -->
                            <label for="txtcontrauser" style="position: absolute;top:-22px;">Contraseña</label>
                            <input type="password" class="form-control rounded" placeholder="Contraseña"
                                id="txtcontrauser">
                            <label for="txtcorreouser" style="position: absolute;top:-22px;left:47vw">Correo</label>
                            <input type="text" class="form-control ml-5 rounded" placeholder="Correo"
                                id="txtcorreouser">
                        </div>
                        <!-- /input-group -->

                        <div class="input-group mt-5 ">
                            <label for="txtusernameuser" style="position: absolute;top:-22px;">Nombre de
                                Usuario</label>
                            <input type="text" class="form-control rounded" style="max-width:48.5%"
                                placeholder="Nombre de Usuario" id="txtusernameuser">

                            <!-- /btn-group -->
                        </div>

                        <div class="input-group mt-5 ">
                            <button type="button" class="btn btn-danger " id="botcancelar"
                                onclick="cancelar()">Cancelar</button>
                            <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                onclick="guardar()">Guardar</button>
                            <!-- /btn-group -->
                        </div>
                    </div>
                    <!-- aqui termina contenedorcampos -->

                </div>
            </div>
        </div>

    </div>


    <!-- /.row -->
</div><!-- /.container-fluid -->

@endsection