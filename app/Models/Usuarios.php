<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Usuarios extends Model
{
    //metodo para ingresar al sistema un usuario dentro de la misma empresa.
    public static function crearUsuario($cedula,$nombre,$contra,$tipo,$emp,$correo,$usuario,$activo){
        if (DB::table('tbl_usuario')->where('usu_correo', $correo)->where('usu_emp',$emp)->exists()) {
            return 'Correo ya se encuentra registrado.';
        }
        if (DB::table('tbl_usuario')->where('usu_usuario', $usuario)->exists()) {
            return 'Nombre de usuario ya se encuentra registrado.';
        }
        $funciono = DB::table('tbl_usuario')->insert(['usu_nombre' => $nombre, 'usu_cedula' => $cedula, 'usu_contra' => Hash::make($contra), 'usu_correo' => $correo, 'usu_tipo'=>$tipo,'usu_emp'=>$emp,'usu_usuario'=>$usuario, 'usu_activo'=>$activo ]);
        if ($funciono) {
            return 'exito';
        }else{
            return 'Hubo un error interno. Por favor intente mas tarde.';
        }
    }

    public static function actualizarUsuario($id,$cedula,$nombre,$contra,$tipo,$emp,$correo,$usuario,$activo){
        if (DB::table('tbl_usuario')->where('usu_correo', $correo)->where('usu_id','!=',$id)->exists()) {
            return 'Correo ya se encuentra registrado.';
        }
        if (DB::table('tbl_usuario')->where('usu_usuario', $usuario)->where('usu_id','!=',$id)->exists()) {
            return 'Nombre de usuario ya se encuentra registrado.';
        }
        if($contra!=''){
            $funciono = DB::table('tbl_usuario')->where('usu_id',$id)->update(['usu_nombre' => $nombre, 'usu_cedula' => $cedula, 'usu_contra' => Hash::make($contra), 'usu_correo' => $correo, 'usu_tipo'=>$tipo,'usu_usuario'=>$usuario , 'usu_activo'=>$activo]);
        }else{
            $funciono = DB::table('tbl_usuario')->where('usu_id',$id)->update(['usu_nombre' => $nombre, 'usu_cedula' => $cedula, 'usu_correo' => $correo, 'usu_tipo'=>$tipo,'usu_usuario'=>$usuario, 'usu_activo'=>$activo ]);
        }
        if ($funciono) {
            return 'exito';
        }else{
            return 'Hubo un error interno. Por favor intente mas tarde.';
        }
    }
    //funcion que le permite ver a un administrador los usuarios dentro de su empresa.
    public static function buscarNombre($nombre,$idemp){
        return DB::table('tbl_usuario')->where('usu_nombre', 'LIKE', $nombre . '%')->where('usu_emp', $idemp)->get();
    }

    public static function buscarCedula($cedula,$idemp){
        return DB::table('tbl_usuario')->where('usu_cedula', 'LIKE', $cedula . '%')->where('usu_emp', $idemp)->get();
    }
}
