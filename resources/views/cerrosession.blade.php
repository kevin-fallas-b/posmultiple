<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>P.O.S Multiple</title>
    <link rel="stylesheet" type="text/css" href="{{ url('/css/style.css') }}" />

    <?php
    
    use Illuminate\Support\Facades\URL;
    header('Refresh: 2; URL=' . URL::to('/'));
    ?>
</head>

<body>

    <div id="contenedorcerro">
        <p id="cerrosession"> Sesión cerrada correctamente.</p>
        <p id="cerrosession2"> Espere y pronto sera redireccionado.</p>
        <?php
    echo '<a href="' . URL::to('/') . '" id="sinadasucede">Si nada sucede presione aqui.</a>';
    ?>
    </div>

</body>
</html>