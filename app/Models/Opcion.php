<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Opcion extends Model
{
    public static function crear($nombre, $precio, $proID){
        $exito = DB::table('tbl_opcion')
            ->insert(['opc_nombre' =>$nombre,
                    'opc_precio' => $precio,
                    'opc_pro' => $proID]);
        if($exito){
            return 'exito';
        }
    }

    public static function eliminar($id){
        $exito = DB::table('tbl_opcion')->where('opc_id',$id)->delete(); 
        if($exito){
            return 'exito';
        }
    }

    public static function fetch($proID){
        return DB::table('tbl_opcion')->where('opc_pro', $proID)->get(); 
    }
}