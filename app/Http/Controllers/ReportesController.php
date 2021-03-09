<?php

namespace App\Http\Controllers;
use App\Models\Orden;
use App\Models\Producto;

use Illuminate\Http\Request;
use \PDF;

class ReportesController extends Controller
{
    public function index(){
        if (DashboardController::estaLogeado()) {
            return view('reportes/reportes');
        }
    }

    public static function reporteVentas()
    { 
    
        $cant_ordenes = Orden::cantidadOrdenes($_POST['id_empresa'],$_POST['dt_fchInicial'],$_POST['dt_fchFinal']);//empresa,orden, mesas, usuarios
        
        $ordenes = Orden::mayorVenta($_POST['id_empresa'],$_POST['dt_fchInicial'],$_POST['dt_fchFinal']);
       
        $mayor_venta = 0;
        $promedio = 0;
        foreach($ordenes as $o){
            $promedio += $o->total;
            if($o->total > $mayor_venta){
                $mayor_venta = $o->total;
            }
        }
        if(sizeof($ordenes)>0){
            $promedio = $promedio/sizeof($ordenes);
        }
        
        $data = [
            'fecha'           =>date("d/m/Y"),
            'fechainicio'     => date("d/m/Y", strtotime($_POST['dt_fchInicial'])),
            'fechafinal'      => date("d/m/Y", strtotime($_POST['dt_fchFinal'])),
            'ordenes'         => $cant_ordenes,
            'mayorVenta'      => $mayor_venta,//$mayor_venta,
            'promedioPorDia'  => $promedio
        ];
        $pdf = PDF::loadView('reportes/ventas', $data);
        //return view('administracion/reportes/citas', $data);
        return $pdf->stream('ReporteVentas_' . date("d/m/y-h:i A") . '.pdf');
    }

    public static function reporteInventario(){
        /****/
        $inventario = Producto::reporteInventario($_POST['id_empresa']);
        $total=0;
        
        foreach($inventario as $i){
            $total += $i->precioProd*$i->cantProd;
          }

        $data = [
            'fecha'     =>date("d/m/Y"),
            'inventario'=> $inventario,
            'total'     =>$total      
        ];

        //$pdf = PDF::loadView('reportes/prueba', $data);
        //
        if (DashboardController::estaLogeado()) {
            //return view('reportes/prueba', $data);

            $pdf = PDF::loadView('reportes/inventario', $data);

            return $pdf->stream('ReporteInventario_' . date("d/m/y-h:i A") . '.pdf');
        }
        //return $pdf->stream('ReporteRestaurante_' . date("d/m/y-h:i A") . '.pdf');        
    }
}
