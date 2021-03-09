<!DOCTYPE html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>P.O.S. Multiple</title>
    <link rel="stylesheet" href="{{url('/css/reporteInventario.css')}}">
</head>
<body>
    <div class="header">
        <label id="titulo">P.O.S. Multiple</label>
        <br>
        <label>Reporte de inventario</label>
        <div id="fechas">
            <label style="font-weight:bold;">Fecha de elaboracion: </label> {{$fecha}}
        </div>
    </div><br><br>
    <div class="container">
        <table class="table-striped">    
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody id='tbl_inventario'>
                @foreach($inventario as $i)
                    <tr>
                        <td>{{$i->nombCat}}</td>
                        <td>{{$i->nombProd}}</td>
                        <td>{{$i->cantProd}}</td>
                        <td>{{$i->unidMedProd}}</td>
                        <td>{{$i->precioProd}}</td>
                        <td>{{$i->precioProd*$i->cantProd}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <br>
        <div class="cajontotal">
            <label>Total</label>
            <br>
            <label id='lbl_total'>{{$total}}</label>
        </div>
    </div>
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
