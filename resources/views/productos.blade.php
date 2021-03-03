@extends('dashboard/dashboard')

@section('content')
<script>
    setactive('linkadministracion')
</script>

<script src="{{url('/js/productos.js')}}"></script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Productos</h3>
                        <button style="position: absolute;right:20px;top:3.5px" type="button" class="btn btn-success ml-1" onclick="mantenimientoCategoria()">Mantenimiento de Categorias</button>
                    </div>
                    <div class="card-body">

                        <!-- CADA INPUT GROUP ES UNA FILA-->

                        <div class="input-group" id="primerfila">
                            <input type="button" hidden id="btnmostrarresultados">
                            <input id="txtbuscar" type="text" class="form-control" placeholder="Buscar nombre" onkeyup="buscarProducto(this.value)">
                            <input id="txtBuscarC" type="text" class="form-control" placeholder="Buscar código">
                            <button class="btn btn-secondary dropdown-toggle ml-5" type="button" id="dropdownBusqueda" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:145px">
                                Proveedor
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownBusqueda" style='width:100px' id="dropBusqueda"></div>
                            <button id="btnnuevo" type="button" class="btn btn-success ml-1" onclick="nuevo()"> Nuevo
                            </button>
                        </div>

                        <br>
                        <div id="contenedor-data" class='table-responsive'>
                            <!-- Le agregue esa clase, que es de bootstrap para hacer la tabla responsiva -->

                            <table class="table" id="tabla" style="text-align: center;">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Proveedor</th>
                                        <th>Precio</th>
                                        <th>Control Inventario</th>
                                        <th>Cantidad</th>
                                        <th>Unidad de Medida</th>
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
                                <label for="txtPrecio" style="position: absolute;top:-22px;left:47vw">Precio</label>
                                <input type="text" class="form-control rounded" placeholder="Precio" id="txtPrecio">
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtDescripcion" style="position: absolute;top:-22px;">Descripción</label>
                                <input type="text" class="form-control rounded mr-3" placeholder="Descripción" id="txtDescripcion">
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtCantidad" style="position: absolute;top:-22px;">Cantidad</label>
                                <input type="text" style="max-width:48.5%" class="form-control rounded" placeholder="Cantidad" id="txtCantidad">

                                <label for="" style="position: absolute;top:-22px;left:47vw">Proveedor</label>
                                 <button class="btn btn-secondary dropdown-toggle ml-5" type="button" id="dropdownProveedor" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Proveedor
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownTipo" style='width:100px' id="dropProveedor"></div>

                                <label for="" style="position: absolute;top:-22px;left:56.5vw">Control de Inventario</label>
                                <input type="checkbox" id='checkactivo' class="ml-5" data-width="100" checked data-toggle="toggle" data-on="Activo" data-off="Inactivo" data-onstyle="success" data-offstyle="danger">
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtCodigo" style="position: absolute;top:-22px;">Código</label>
                                <input type="text" class="form-control rounded" style="max-width:48.5%" placeholder="Código" id="txtCodigo">
                                <label for="" style="position: absolute;top:-22px;left:47vw">Unidad de Medida</label>
                                <button class="btn btn-secondary dropdown-toggle ml-5" type="button"
                                    id="dropdownUnidad" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Unidad de Medida
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownUnidad" style='width:100px'>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('Sp')">Servicios Profesionales</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('Unid')">Unidad</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('Kg')">Kilogramo</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('L')">Litro</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('cm')">Centimetro</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('ln')">Pulgada</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('Oz')">Onza</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('g')">Gramo</button> 
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('mm')">Milimetro</button> 
                                    <button class="dropdown-item" type="button"
                                        onclick="unidadMedida('mL')">Mililitro</button> 
                                </div>
                            </div>

                            <div class="input-group mt-5">
                                <label for="txtCabys" style="position: absolute;top:-22px;">Cabys</label>
                                <input type="text" class="form-control rounded" style="max-width:48.5%" placeholder="Cabys" id="txtCabys">
                                <label for="" style="position: absolute;top:-22px;left:47vw">Unidad de Medida</label>
                                <button class="btn btn-secondary dropdown-toggle ml-5" type="button"
                                    id="dropdownTarifa" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Tarifa de Impuesto
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownUnidad" style='width:100px'>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('01')">Tarifa 0% (Exento)</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('02')">Tarifa reducida 1%</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('03')">Tarifa reducida 2%</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('04')">Tarifa reducida 4% </button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('05')">Transitorio 0%,</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('06')">Transitorio 4% </button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('07')">Transitorio 8%</button>
                                    <button class="dropdown-item" type="button"
                                        onclick="tarifaImpuesto('08')">Tarifa general 13%</button> 
                                </div>
                            </div>
                                
                                
                            <!-- /input-group -->

                            <div class="input-group mt-5 ">
                                <button type="button" class="btn btn-danger " id="btnCancelar"
                                    onclick="cancelar()">Cancelar</button>
                                <button type="button" class="btn btn-success ml-1" id="btnGuardar"
                                    onclick="guardar()">Guardar</button>
                                <button type="button" class="btn btn-primary ml-2" id="btnEditar"
                                    onclick="editarProducto()">Editar</button>
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