<!DOCTYPE html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>P.O.S. Multiple</title>
    <link rel="stylesheet" href="{{url('/css/reportes.css')}}">

</head>


<body>
    <div class="header">

        <label id="titulo">P.O.S. Multiple</label>
        <br>
        <label>Reporte de ordenes</label>
        <br>
        <div id="fechas">
            <label style="font-weight:bold;">Fecha de elaboracion: </label> {{$fecha}}
            <br><br>
            <label style="font-weight:bold;">Rango de fechas: </label> {{$fechainicio}} - {{$fechafinal}}

        </div>
        <div class="lineadivision" style="position: absolute; top:190px;"></div>
    </div>
    <div id="contenedor2">
        <label style="position:relative;  width:100%; text-align: center;">Resumen</label>
        <br><br>
        <div id="" class="cajonresumen ordenestotales">
            <label style="margin-top: 20px;">Ordenes Totales:</label>
            <br>
            <label>{{$ordenes}}</label>

        </div>
        <div id="" class="cajonresumen mayorventa">
            <label>Mayor Venta:</label>
            <br>
            <label>{{$mayorVenta}}</label>
        </div>
        <div id="" class="cajonresumen promediopordia">
            <label>Promedio por dia:</label>
            <br>
            <label>{{$promedioPorDia}}</label>
        </div>
       
    
    </div>



    <!--Vamos con tabla de datos -->

    <script type="text/php">
        if ( isset($pdf) ) {
            $pdf->page_script('
                $font = $fontMetrics->get_font("Arial, Helvetica, sans-serif", "normal");
                $pdf->text(270, 780, "Pág $PAGE_NUM de $PAGE_COUNT", $font, 10);
            ');
        }
	</script> 
</body>

</html>