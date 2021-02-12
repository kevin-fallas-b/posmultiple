@extends('dashboard/dashboard')

@section('content')
<!--
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
-->
<link rel="stylesheet" href="{{ url('/css/estilo.css') }}">
<script src="{{url('/js/ordenes.js')}}"></script>

<script src="{{ url('/js/alertify.min.js') }}"></script>
<script src="{{ url('/js/axios.min.js') }}"></script>
<script src="{{ url('/js/plain-draggable.min.js') }}"></script>
<script src="{{ url('/js/plain-draggable-limit.min.js') }}"></script>

<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<input type="text" id="tab" hidden value="{{$tab}}">


<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cantProdModal">
  Launch demo modal
</button>

<!-- Modal -->
<!--<div class="modal fade" id="cantProdModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>-->


<div class="container-fluid">
    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">
                <div class="card">
                    <div class="card-header">
                        <div class="input-group">
                            <h3 class="card-title">Ordenes</h3>
                        </div>
                    </div>
                    <div class='card-body' id="contenedormesas" class="col">
                        <div class='table-responsive'> 
                            <div style='background-color: gray;' id='div_principal'></div>
                        </div>
                    </div>
                    <div class='card-body' id="contenedororden" style='display:none;'>
                        <div class="row">
                            <div class="col contenedorproductos"> 
                                <div class="input-group mt-1">
                                    <input id="txtbuscarNombre" type="text" class="form-control" placeholder="Buscar nombre"
                                       onkeyup="buscarProductoPorNombre(this.value)">  
                                    <input id="txtbuscarCodigo" type="text" class="form-control" placeholder="Buscar código"
                                       onkeyup="buscarProductoPorCodigo(this.value)">                                                                         
                                </div>
                                <div class="input-group mt-2">
                                    <ul class="nav nav-pills nav-fill">
                                        <li class="nav-item">
                                            <button type="button" class="btn nav-link" onclick="mostrarProductos()">Todo</button>
                                        </li>
                                        <li class="nav-item ml-1">
                                            <button type="button"  class="btn nav-link" onclick="mostrarEntradas()">Entradas</button> 
                                        </li>
                                        <li class="nav-item">
                                            <button type="button" class="btn nav-link" onclick="mostrarBebidas()">Bebidas</button>
                                        </li>                                        
                                    </ul>
                                </div>
                                <div class="input-group mt-2 grid-container" id="div_productos">
                                </div>                    
                                <div class="input-group mt-3 mb-1 ">
                                    <button type="button" class="btn btn-danger " id="botcancelar"
                                        onclick="cancelar()">Cancelar</button>
                                    <button type="button" class="btn btn-success ml-1" id="btnguardar"
                                        onclick="guardarOrden()">Guardar</button>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="card-header">
                                    <div class="row caja">
                                        <div class="col">
                                           <h3 class="card-title mt-3 ml-1">{{$_SESSION['user']->usu_nombre}}</h3>
                                        </div>
                                        <button type="button" class="btn btn-outline-dark mt-1 mb-1 mr-1 btn_x" onclick="">✖️</button>
                                    </div>

                                    <div class="row mt-1">
                                        <div class="col mt-2">
                                            <h2 class="card-title">Orden</h2>
                                        </div>
                                       
                                        <button type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="">🗑️</button>
                                        
                                        <button type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="">💾</button>
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