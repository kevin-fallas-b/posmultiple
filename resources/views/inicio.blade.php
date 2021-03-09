@extends('dashboard/dashboard')

@section('content')
<button id="tokenFact" hidden style="display: none;">{{$_SESSION['user']->token}}</button>
<div style="display: flow-box; align-items:center">
    <h1 style="width: 100%;text-align:center;">Bienvenido {{$_SESSION['user']->usu_nombre}} </h1>
</div>
<script>
    getTokenFacturacion();
</script>
@endsection