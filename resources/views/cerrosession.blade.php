<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>P.O.S Multiple</title>
    <link rel="stylesheet" type="text/css" href="{{ url('/css/style.css') }}" />

    <link rel="icon" href="{{ url('/img/logo.png') }}" type="image/x-icon">
</head>

<body style="text-align: center;">
    <div id="texto" style="width: 50vw; margin-left:25vw; text-align:center;height:50vh;margin-top:40vh;color:white;line-height:2;">
        <p id="cerrosession" style="font-size:25px;"> Session cerrada correctamente.</p>
        <p id="cerrosession2"> Espere y pronto sera redireccionado.</p>
    </div>
    <?php

    use Illuminate\Support\Facades\URL;

    echo '<a href="' . URL::to('/') . '" style="color:white;">Si nada sucede presione aqui.</a>';
    header('Refresh: 2; URL=' . URL::to('/'));
    ?>

</html>