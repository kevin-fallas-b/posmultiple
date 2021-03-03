@extends('dashboard/dashboard')

@section('content')

<link rel="stylesheet" href="{{ url('/css/estilo.css') }}">
       
<script src="{{ url('/js/mesas.js') }}"></script>    
<script src="{{ url('/js/plain-draggable.min.js') }}"></script>
<script src="{{ url('/js/plain-draggable-limit.min.js') }}"></script>

<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">

<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!--/.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Mesas</h3>
                    </div>
                    <div class="card-body">
                         <!--CADA INPUT GROUP ES UNA FILA-->
                        <div class="input-group" id="primerfila">
                            <button id="btnnuevamesa" type="button" class="btn btn-primary ml-1 mt-1" onclick="nuevaMesa()"> Crear Nueva </button>
                            <button type="button" class="btn btn-success ml-1 mt-1" id="btnactposmesas" onclick="actualizarPosMesas()">Actualizar posiciones de las mesas</button>                                    
                        </div>
                    </div>
                    
                    <div class='card-body' id="contenedormesas">
                        <div class='table-responsive'>
                            <!--<div class="row">
                               <div class="col">-->   
                                   <div style='background-color: gray;' id='div_principal'></div>
                                <!--</div>
                            </div>-->
                       </div>
                    </div>
                    
                    <div class='card-body' id="contenedorcampos" style='display:none;'>
                        <div class="input-group mt-4">
                            <label for="txtnombre" style="position: absolute;top:-22px;">Nombre</label>
                            <input type="text" class="form-control rounded" placeholder="Nombre" id="txtnombre">
                            
                            <label for="txtdescripcion" style="position: absolute;top:-22px;left:47vw">Descripcion</label>
                            <input type="text" class="form-control rounded ml-5" placeholder="Descripción" id="txtdescripcion">
                        </div>
                         
                        <div class="input-group mt-5 ">
                            <label style="position: absolute;top:-22px">Foto</label>
                        </div>
<!--Tengo que buscar otras imagenes para mesas-->
                        <div class="input-group mt-2">
                            <div class='imgs_selecion mt-3'>
                                <input type="radio" name="foto" value="mesa.png">
                                <img src="/img/mesa.png" alt="Mesa" title="Mesa"/>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div class='imgs_selecion mt-3'>
                                <input type="radio" name="foto" value="mesa3redonda.png">
                                <img src="/img/mesa3redonda.png" alt="Mesa" title="Mesa"/>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div class='imgs_selecion mt-3'>
                                <input type="radio" name="foto" value="mesa4cuadrada.png">
                                <img src="/img/mesa4cuadrada.png" alt="Mesa" title="Mesa"/>
                            </div>
                        </div>
                                                
                        <div class="input-group mt-5 ">
                            <button type="button" class="btn btn-danger mt-1" id="botcancelar"
                                onclick="cancelar()">Cancelar</button>
                            <button type="button" class="btn btn-success ml-1 mt-1" id="btnguardar"
                                onclick="guardarMesa()">Guardar</button> 
                            <button type="button" class="btn btn-danger ml-1 mt-1" id="btneliminar"
                                onclick="eliminar()">Eliminar</button>                                 
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


     <!--/.row--> 
</div><!-- /.container-fluid -->

@endsection