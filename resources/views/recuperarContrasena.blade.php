<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

   <link rel="stylesheet" href="{{ url('/css/style.css') }}">

    <link rel="icon" href="{{ url('/img/logo.png') }}" type="image/x-icon">
    <link rel="shortcut icon" type="image/x-icon" href="{{ url('/img/logo.png') }}" />
    
    <link rel="stylesheet" type="text/css" href="{{ url('/css/alertify.min.css') }}" />
    <link rel="stylesheet" href="{{ url('/css/login.css') }}">

    <script src="{{url('/js/login.js')}}"></script>
    <script src="{{url('/js/posmultiple.js')}}"></script>
    <script src="{{ url('/js/alertify.min.js') }}"></script>
    <script src="{{url('/js/recuperacioncontra.js')}}"></script>
</head>

<body>
    <?php
    if (isset($_POST['mensaje'])) {
        echo "<script> mensajeError('" . $_POST['mensaje'] . "'); </script>";
    }
    ?>
  
    <div id="contenedorTitulos">
        <label id="titulo">Recuperar contraseña</label>
        <br>
       <!-- <label id="lema">P.O.S Multiple</label>-->
    </div>
    <div class="centroblanco">
        <div id="contenedorcentroIzquierda">
            <img src="{{ url('/img/laptop.png')}}" alt="">
        </div>
        <div id="contenedorcentroderecha">
            <br><br>
            <label>Ingrese su correo</label>
            <br>
            <form id="formlogin" method="POST" autocomplete="off" action="{{route('recuperarcont')}}">
                {{csrf_field()}}
                <input type="text" id="correo" name="correo" placeholder="Correo" title="Correo" class="cajatexto"><br>
                <button type="button" id="btn_cancelar" onclick="cancelar()">Cancelar</button> 
                <input type="submit" value="OK" name="btn_login" class="ml-5" id="btn_login">
            </form>
            <br><br>
        </div>
    </div>
</body>

</html>