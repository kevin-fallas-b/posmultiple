<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>POS Multiple</title>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">

</head>

<body style="background: linear-gradient(to right,#191919,#19191C);">
    <div style='border: 5px solid transparent;'>
        <div style='border-radius:30px 50px;background-color: black;border: 1px solid gray;'>
            <div style=" margin:0;">
                <div style="position: relative;
                    height:40px;
                    background-color: black;
                    border-radius:30px 50px;
                    color:white;
                    text-align:center;
                    padding-top:20px;
                    padding-bottom:10px;
                    font-family:'Dancing Script', cursive;
                    font-size: 30px;
                ">PosMultiple</div>
            </div>
            <br>
            <div style="padding-left:25px; padding-top:10px;padding-bottom:10px; color:white">Hola {{$nombre}}!</div>
            <label style="padding-left: 25px; margin-top:15px; color:white"> Hemos procesado tu cambio de contraseña. Tu nueva contraseña la podes encontrar mas abajo</label>
            <br><br>
        </div>
    </div>

    <div style='border: 5px solid transparent;'>
        <div style='border-radius:30px 50px;border: 1px solid gray;background-color: gray;margin-top:5px;'>
            <div style=" margin:0; ">
                <div style="position: relative;
                    height:60px;
                    background-color: #181922;
                    border-radius:30px 50px;
                    color:white;
                    text-align:center;
                    padding-top:20px;
                    padding-bottom:20px;
                    font-size: 26px;
                ">Tu contraseña es:<br>{{$contra}}</div>
            </div>
        </div>
    </div>
</body>

</html>