@extends('dashboard/dashboard')

@section('content')
<div style="display: flow-box; align-items:center">
    <h1 style="width: 100%;text-align:center;">Bienvenido {{$_SESSION['user']->usu_nombre}} </h1>
</div>
@endsection