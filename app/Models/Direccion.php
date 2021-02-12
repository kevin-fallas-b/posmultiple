<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Direccion extends Model
{
    public static function create($provincia, $canton, $distrito, $senas){
        return DB::table('tbl_direccion')->insertGetId(['dir_provincia' => $provincia, 'dir_canton' => $canton, 'dir_distrito' => $distrito, 'dir_otrasSenas' => $senas]);
    }

    public static function edit($id,$provincia, $canton, $distrito, $senas){
        $exito = DB::table('tbl_direccion')->where('dir_id',$id)->update(['dir_provincia' => $provincia, 'dir_canton' => $canton, 'dir_distrito' => $distrito, 'dir_otrasSenas' => $senas]);
        if($exito){
            return 'exito';
        }
    }

    public static function borrar($id){
        $exito = DB::table('tbl_direccion')->where('dir_id',$id)->delete();
        if($exito){
            return 'exito';
        }
    }
}
