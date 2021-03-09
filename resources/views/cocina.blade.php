@extends('dashboard/dashboard')

@section('content')
<script>
    //setactive('linkusuarios')
    //setactive('linkadministracion')
</script>
<link rel="stylesheet" href="{{ url('/css/estilo.css') }}">
<script src="{{url('/js/cocina.js')}}"></script>
<input type="text" id="idempresa" hidden value="{{$_SESSION['user']->usu_emp}}">

<div class="container-fluid">

    <div class="row">
        <div class="col">
            <div class="sticky-top mb-3">

                <!-- /.card -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Cocina</h3>
                    </div>
                    <div class="card-body">
                        <div id="modal">
                        
                        
                        </div>

                        <div id="body" style=overflow:hidden;width:auto;display:inline;>
                        
                        
                        </div>

                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.row -->
</div><!-- /.container-fluid -->

@endsection