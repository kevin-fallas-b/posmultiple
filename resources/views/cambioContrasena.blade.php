<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>P.O.S Multiple</title>
    <link rel="stylesheet" href="{{ url('/css/style.css') }}">
    <link rel="stylesheet" href="{{ url('/css/login.css') }}">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
    <link rel="icon" href="{{ url('/img/logo.png') }}" type="image/x-icon">
    <link rel="shortcut icon" type="image/x-icon" href="{{ url('/img/logo.png') }}" />
    <link rel="stylesheet" type="text/css" href="{{ url('/css/alertify.min.css') }}" />


    <script src="{{url('/js/login.js')}}"></script>
    <script src="{{url('/js/posmultiple.js')}}"></script>
    <script src="{{url('/js/cambiocontra.js')}}"></script>
    <script src="{{ url('/js/alertify.min.js') }}"></script>
    <script src="{{ url('/js/axios.min.js') }}"></script>

</head>

<body>
    <?php
    if (isset($_POST['mensaje'])) {
        echo "<script> mensajeError('" . $_POST['mensaje'] . "'); </script>";
    }    
    ?>
    <div id="contenedorTitulos">
        <label id="titulo">Cambiar contraseña</label>
        <br>
    </div>
    <div class="centroblanco">
        <div id="contenedorcentroIzquierda">
            <p> Por su seguridad es necesario cambiar la contraseña de su cuenta. <br>Para continuar, por favor introduzca una nueva contraseña.</p>
            <br>
            <p> Una contraseña segura debe contar con mayusculas, minisculas, numeros y caracteres especiales.</p>
        </div>
        <div id="contenedorcentroderecha">
            <!--<label>Cambiar contraseña</label>-->
            <br>
            <form id="formlogin" method="POST" autocomplete="off" action="{{route('cambiarContra')}}">
                {{csrf_field()}}
                <input type="password" id="contra" name="contra" placeholder="Contraseña" title="Contraseña" class="cajatexto"><br>
                 
                <input type="password" name="conf_contra" id="conf_contra" placeholder="Confirmar contraseña" title="Contraseña" class="cajatexto"/><br />
                <input type="submit" value="OK" name="btn_login" id="btn_login">
            </form>
            <br><br>
        </div>



    </div>
</body>

</html>