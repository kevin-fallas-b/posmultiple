<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Orden extends Model
{
    protected $table = "tbl_orden";

    public static function obtenerOrden($id_mesa){
        return DB::table('tbl_orden as orden')->join('tbl_mesa as mesa', 'orden.mesa', '=', 'mesa.mes_id')->where('mesa.mes_id', $id_mesa)->get(); 
    }

    public static function getProducto2($codigobarras, $emp){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $emp)->where('pro_codigo', $codigobarras)->get();
    }
}
