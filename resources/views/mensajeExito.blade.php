<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>P.O.S Multiple</title>
    <link rel="stylesheet" type="text/css" href="{{ url('/css/style.css') }}" />

    <link rel="icon" href="{{ url('/img/logo.png') }}" type="image/x-icon">
    <?php
    
    use Illuminate\Support\Facades\URL;
    header('Refresh: 5; URL=' . URL::to($dir) );
    ?>
</head>

<body style="    background: linear-gradient(90deg, rgba(56, 0, 54, 1) 0%, rgba(12, 186, 186, 1) 100%);">

    <div id="contenedorcerro">
        <p id="cerrosession"> {{$mensaje}}</p>
        <p id="cerrosession2"> Espere y pronto sera redireccionado.</p>
        <?php
    echo '<a href="' .URL::to($dir)  . '" id="sinadasucede">Si nada sucede presione aqui.</a>';
    ?>
    </div>

</body>

</html>