<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Representante extends Model
{
    public static function crear($nombre, $telefono, $correo, $proveedor, $emp){
        $exito = DB::table('tbl_representante')->insert(['rep_emp' => $emp, 'rep_nombre' => $nombre, 'rep_telefono' => $telefono, 'rep_correo' => $correo,'rep_pro' => $proveedor]);
        if($exito){
            return 'exito';
        }
    }

    public static function editar($id, $nombre, $telefono, $correo, $proveedor, $emp){
        $exito = DB::table('tbl_representante')->where('rep_id',$id)->update(['rep_emp' => $emp, 'rep_nombre' => $nombre, 'rep_telefono' => $telefono, 'rep_correo' => $correo,'rep_pro' => $proveedor]);
        if($exito){
            return 'exito';
        }
    }

    public static function borrar($id){
        $exito = DB::table('tbl_representante')->where('rep_id',$id)->delete();
        if($exito){
            return 'exito';
        }
    }

    public static function fetch($nombre, $emp){
        return DB::table('tbl_representante as representante')->join('tbl_empresa as empresa', 'representante.rep_emp', '=', 'empresa.emp_id')->where('rep_emp', $emp)->where('emp_nombre', 'LIKE', $nombre . '%')->get(); 
    }

    public static function buscar($nombre, $proveedor, $emp){
        return DB::table('tbl_representante as representante')->join('tbl_empresa as empresa', 'representante.rep_emp', '=', 'empresa.emp_id')->join('tbl_proveedor as proveedor', 'representante.rep_pro', '=', 'proveedor.pro_proId')->where('rep_emp', $emp)->where('rep_pro',$proveedor)->where('emp_nombre', 'LIKE', $nombre . '%')->get(); 
    }
}
