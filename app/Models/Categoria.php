<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Categoria extends Model
{
    public static function crear($nombre,$idemp){
        $exito = DB::table('tbl_categoria')->insertGetId(['cat_nombre' => $nombre, 'cat_emp' => $idemp]);
        if($exito){
            return 'exito';
        }
    }

    public static function borrar($id){
        $exito = DB::table('tbl_categoria')->where('cat_id',$id)->delete();
        if($exito){
            return 'exito';
        }
    }

    public static function editar($id,$nombre,$emp){
        $exito = DB::table('tbl_categoria')->where('cat_id',$id)->update(['cat_nombre' => $nombre, 'cat_emp' => $emp]);
        if($exito){
            return 'exito';
        }
    }

    public static function fetch($nombre,$emp){
        return DB::table('tbl_categoria')->where('cat_emp',$emp)->where('cat_nombre', 'LIKE', $nombre . '%')->get();
    }

    public static function crearRelacion($pro_id,$cat_id){
        $exito = DB::table('tbl_categoriaxproducto')->insert(['cxp_producto' => $pro_id, 'cxp_categoria' => $cat_id]);
        if($exito){
            return 'exito';
        }
    }

    public static function borrarRelacion($pro_id,$cat_id){
        $exito = DB::table('tbl_categoriaxproducto')->where('cxp_producto',$pro_id)->where('cxp_categoria',$cat_id)->delete();
        if($exito){
            return 'exito';
        }
    }
    
    public static function buscarRelacionxProducto($id, $nombre){
        return DB::table('tbl_categoriaxproducto as relacion')->join('tbl_categoria as categoria', 'relacion.cxp_categoria', '=', 'categoria.cat_id')->where('cxp_producto',$id)->where('cat_nombre', 'LIKE', $nombre . '%')->get();
    }

    public static function buscarRelacionxCategoria($id){
        return DB::table('tbl_categoriaxproducto as relacion')->join('tbl_producto as producto', 'relacion.cxp_producto', '=', 'producto.pro_id')->where('cxp_categoria',$id)->get();
    }

    public static function cargarCategorias($emp_id){
        return DB::table('tbl_categoria')->where('cat_emp',$emp_id)->get();
    }
}
