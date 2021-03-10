@extends('dashboard/dashboard')

@section('content')
<script>
    setactive('linkreportes')
</script>
<script src="{{url('/js/reportes.js')}}"></script>
<link rel="stylesheet" href="{{url('/css/reportes.css')}}">
<input type="text" id="idusuario" hidden value="{{$_SESSION['user']->usu_id}}">
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">
<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Reportes</h3>
                    </div>
                    <div class="card-body">
                        <div class="container">
                            <div class="row justify-content-center align-items-center">
                                    <button type="button" class="btn btn-primary" onClick="mostrarDivVentas()">Ventas</button>
                                    <form id="formRepInventario" method="POST" autocomplete="off" action="{{route('reporteInventario')}}"  target="_blank">
                                        {{csrf_field()}}
                                        <input type="text" name="id_empresa" hidden value="{{$_SESSION['user']->usu_emp}}">
                                        <input type="submit" value="Inventario"  class="btn btn-primary ml-2" onclick="inventario()">
                                    </form>
                                    <!--reporteFacturasRealizadas-->
                                    <button type="button" class="btn btn-primary ml-2" onClick="mostrarDivFacturasRealizadas()">Facturas realizadas</button>
                                   <!--<a href="" target="_blank" class="btn btn-primary float-left active mt-1 ml-2" role="button" aria-pressed="true">Facturas realizadas</a>-->
                                <hr style="width:100%">
                            </div>
                        </div>
                   
                        <div class="container" id='div_repSelFechas' style='display:none;'>
                           <div class="input-group justify-content-center align-items-center">
                                <h3 id='title'></h3>
                                
                           </div><br>

                            <div class="input-group justify-content-center align-items-center" id="div_formVentas">
                                <form id="formRepVentas" method="POST" autocomplete="off" action="{{route('reporteVentas')}}"  target="_blank">
                                    {{csrf_field()}}
                                    
                                    <input type="text" name="id_empresa" hidden value="{{$_SESSION['user']->usu_emp}}">
                                    <div class="row">
                                    <div>
                                       <label for='dt_fchInicialV'>Fecha inicial:</label>
		                               <input type="date" id="dt_fchInicialV" name="dt_fchInicial" value="" title='Fecha inicial' class = 'date ml-2 mr-5'>
                                    </div>
                                    <div>
                                        <label for="dt_fchFinalV">Fecha Final:&nbsp;&nbsp;</label>
                                        <input type="date" id='dt_fchFinalV' name="dt_fchFinal" value="" title="Fecha final" class="date ml-2">
                                    </div>
                                    <div>
                                        <input type="submit" value="Generar Reporte"  class="btn btn-success ml-5 mt-2">
                                    </div>
                                    </div>
                                </form>
                            </div>

                            <div class="input-group justify-content-center align-items-center" id="div_formFactR">
                                <form id="formRepFactR" method="POST" autocomplete="off" action="{{route('reporteFacturasRealizadas')}}"  target="_blank">
                                    {{csrf_field()}}
                                    
                                    <input type="text" name="id_empresa" hidden value="{{$_SESSION['user']->usu_emp}}">
                                    <div class="row">
                                    <div>
                                       <label for='dt_fchInicialFR'>Fecha inicial:</label>
		                               <input type="date" id="dt_fchInicialFR" name="dt_fchInicial" value="" title='Fecha inicial' class = 'date ml-2 mr-5'>
                                    </div>
                                    <div>
                                        <label for="dt_fchFinalFR">Fecha Final:&nbsp;&nbsp;</label>
                                        <input type="date" id='dt_fchFinalFR' name="dt_fchFinal" value="" title="Fecha final" class="date ml-2">
                                    </div>
                                    <div>
                                        <input type="submit" value="Generar Reporte"  class="btn btn-success ml-5 mt-2">
                                    </div>
                                    </div>
                                </form>
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