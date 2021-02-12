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
        <label id="titulo">P.O.S Multiple</label>
        <br>
        <label id="lema">P.O.S Multiple</label>
    </div>
    <div class="centroblanco">
        <div id="contenedorcentroIzquierda">
            <img src="{{ url('/img/laptop.png')}}" alt="">
        </div>
        <div id="contenedorcentroderecha">
            <label>Ingresar al Sistema</label>
            <br>
            <form id="formlogin" method="POST" autocomplete="off">
                {{csrf_field()}}
                <input type="text" id="txt_correo" name="txt_correo" placeholder="Correo" title="Correo" class="cajatexto"><br>
                <input type="password" name="txt_password" id="txt_password" placeholder="**********" title="Contraseña" class="cajatexto" /><br />
                <input type="submit" value="OK" name="btn_login" id="btn_login">
            </form>
            <br><br>
            
            <label class="lblAyuda" onclick="olvidocontra()">Olvide mi contraseña</label>
            
        </div>



    </div>
</body>

</html>