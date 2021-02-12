<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Empresas extends Model
{
    public static function getEmpresas(){
        return DB::table('tbl_empresa as empresa')->join('tbl_direccion as direccion', 'empresa.emp_direccion', '=', 'direccion.dir_id')->get();
    }

    public static function crearEmpresa($cedula,$tipo,$nombre,$razonsocial,$telefono,$correo,$slogan,$provincia,$canton,$distrito,$codigoactividad,$usuarioprod,$claveprod,$usuarioapi,$claveapi,$empActiva,$nombreUser,$cedulaUser,$contraUser,$correoUser,$usernameUser){
        //generar primero que todo la direccion
        $idDireccion = DB::table('tbl_direccion')->insertGetId(['dir_provincia'=>$provincia,'dir_canton'=>$canton,'dir_distrito'=>$distrito]);
        //luego la empresa
        $idEmpresa = DB::table('tbl_empresa')->insertGetId(['emp_cedula'=>$cedula,'emp_tipoCedula'=>$tipo,'emp_nombre'=>$nombre,'emp_razonSocial'=>$razonsocial,'emp_telefono'=>$telefono,'emp_correo'=>$correo,'emp_slogan'=>$slogan,'emp_actividadEconomica'=>$codigoactividad,'emp_usuarioProd'=>$usuarioprod,'emp_claveProd'=>$claveprod,'emp_usuarioAPI'=>$usuarioapi,'emp_claveAPI'=>$claveapi,'emp_direccion'=>$idDireccion,'emp_estado'=>$empActiva]);
        //por ultimo el usuario
        $exito = DB::table('tbl_usuario')->insert(['usu_cedula'=>$cedulaUser,'usu_nombre'=>$nombreUser,'usu_contra'=>Hash::make($contraUser),'usu_tipo'=>3,'usu_correo'=>$correoUser,'usu_usuario'=>$usernameUser,'usu_cambioContra'=>0,'usu_activo'=>1,'usu_emp'=>$idEmpresa]);
        if($exito){
            return 'exito';
        }else{
            return 'Hubo un error interno. Por favor intente mas tarde.';
        
        }
    }

    public static function actualizarEmpresa($id,$iddir,$cedula,$tipo,$nombre,$razonsocial,$telefono,$correo,$slogan,$provincia,$canton,$distrito,$codigoactividad,$usuarioprod,$claveprod,$usuarioapi,$claveapi,$empActiva){
        DB::table('tbl_empresa')->where('emp_id',$id)->update(['emp_cedula'=>$cedula,'emp_tipoCedula'=>$tipo,'emp_nombre'=>$nombre,'emp_razonSocial'=>$razonsocial,'emp_telefono'=>$telefono,'emp_correo'=>$correo,'emp_slogan'=>$slogan,'emp_actividadEconomica'=>$codigoactividad,'emp_usuarioProd'=>$usuarioprod,'emp_claveProd'=>$claveprod,'emp_usuarioAPI'=>$usuarioapi,'emp_claveAPI'=>$claveapi,'emp_estado'=>$empActiva]);
        DB::table('tbl_direccion')->where('dir_id',$iddir)->update(['dir_provincia'=>$provincia,'dir_canton'=>$canton,'dir_distrito'=>$distrito]);
        return 'exito';
    }
}