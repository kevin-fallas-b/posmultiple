<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Producto extends Model
{
    public static function crear($proveedor, $nombre, $descripcion, $precio, $control, $cantidad, $codigo, $unidad, $cabys, $tarifa, $emp){
        $exito = DB::table('tbl_producto')
            ->insert(['pro_pro' => $proveedor, 
                    'pro_nombre' => $nombre, 
                    'pro_descripcion' => $descripcion,
                    'pro_precio' => $precio,
                    'pro_controlInventario' => $control, 
                    'pro_cantidad' => $cantidad, 
                    'pro_codigo' => $codigo, 
                    'pro_unidadMedida' => $unidad, 
                    'pro_cabys' => $cabys, 
                    'pro_tarifaImpuesto' => $tarifa, 
                    'pro_emp' => $emp]);
        if($exito){
            return 'exito';
        }
    }

    public static function editar($id, $proveedor, $nombre, $descripcion, $precio, $control, $cantidad, $codigo, $unidad, $cabys, $tarifa, $emp){
        $exito = DB::table('tbl_producto')->where('pro_id',$id)
            ->update(['pro_pro' => $proveedor, 
                    'pro_nombre' => $nombre, 
                    'pro_descripcion' => $descripcion,
                    'pro_precio' => $precio,
                    'pro_controlInventario' => $control, 
                    'pro_cantidad' => $cantidad, 
                    'pro_codigo' => $codigo, 
                    'pro_unidadMedida' => $unidad, 
                    'pro_cabys' => $cabys, 
                    'pro_tarifaImpuesto' => $tarifa, 
                    'pro_emp' => $emp]);
        if($exito){
            return 'exito';
        }
    }

    public static function borrar($id){
        $exito = DB::table('tbl_producto')->where('pro_id',$id)->delete();
        if($exito){
            return 'exito';
        }
    }

    public static function fetch($nombre, $emp){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $emp)->where('pro_nombre', 'LIKE', $nombre . '%')->get(); 
    }

    public static function buscarProductos($proveedor, $nombre, $emp){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $emp)->where('pro_pro', $proveedor)->where('pro_nombre', 'LIKE', $nombre . '%')->get(); 
    }

    public static function getProducto($codigobarras, $emp){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $emp)->where('pro_codigo', $codigobarras)->get();
    }

    public static function ingresarProductos($emp,$jsnProductos,$accion){
        $array = json_decode($jsnProductos);
        for($i=0;$i<count($array);$i++){
            if($accion=='Ingresar'){
                DB::table('tbl_producto')->where('pro_emp', $emp)->where('pro_codigo', $array[$i][0])->increment('pro_cantidad',$array[$i][1]);
            }else{
                DB::table('tbl_producto')->where('pro_emp', $emp)->where('pro_codigo', $array[$i][0])->decrement('pro_cantidad',$array[$i][1]);
            }
        }
        return 'exito';
    }

    public static function cargarProductosPorNombre($id_empresa,$nombre){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $id_empresa)->where('pro_nombre', 'LIKE', $nombre . '%')->get();
    }

    public static function cargarProductosPorCodigo($id_empresa,$codigo){
        return DB::table('tbl_producto as producto')->join('tbl_proveedor as proveedor', 'producto.pro_pro', '=', 'proveedor.pro_proId')->where('producto.pro_emp', $id_empresa)->where('pro_codigo', 'LIKE', $codigo . '%')->get();
    }
}