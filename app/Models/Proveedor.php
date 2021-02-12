<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Proveedor extends Model
{
    public static function crear($nombre, $razon, $cedula, $tipoCed, $telefono, $correo, $direccion, $emp){
        $exito = DB::table('tbl_proveedor')->insert(['pro_proNombre' => $nombre, 'pro_razonSocial' => $razon, 'pro_cedula' => $cedula, 'pro_tipoCedula' => $tipoCed, 'pro_telefono' => $telefono, 'pro_correo' => $correo, 'pro_dir' => $direccion, 'pro_emp' => $emp]);
        if($exito){
            return 'exito';
        }
    }

    public static function editar($id, $nombre, $razon, $cedula, $tipoCed, $telefono, $correo, $direccion, $emp){
        $exito = DB::table('tbl_proveedor')->where('pro_proId',$id)->update(['pro_proNombre' => $nombre, 'pro_razonSocial' => $razon, 'pro_cedula' => $cedula, 'pro_tipoCedula' => $tipoCed, 'pro_telefono' => $telefono, 'pro_correo' => $correo, 'pro_dir' => $direccion, 'pro_emp' => $emp]);
        if($exito){
            return 'exito';
        }
    }

    public static function borrar($id){
        $exito = DB::table('tbl_proveedor')->where('pro_proId',$id)->delete();
        if($exito){
            return 'exito';
        }
    }

    public static function fetch($nombre, $emp){
        return DB::table('tbl_proveedor as proveedor')->join('tbl_empresa as empresa', 'proveedor.pro_emp', '=', 'empresa.emp_id')->join('tbl_direccion as direccion', 'proveedor.pro_dir', '=', 'direccion.dir_id')->where('pro_emp', $emp)->where('pro_proNombre', 'LIKE', $nombre . '%')->get(); 
    }
}
