<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Mesa extends Model
{

    protected $table = "tbl_mesa";
    public static function getusu()
    {
        return DB::table('tbl_usuario')->where('usu_id', 1)->first();
    }

    public static function getAdmin($usuario)//uno mesa con empresa con usuario
    {
        return DB::table('tbl_usuario')->where('usu_usuario', $usuario)->get();
    }

    public static function cargarMesas($id_usuario){
        return DB::table('tbl_mesa as mesa')->join('tbl_empresa as empresa', 'mesa.mes_emp', '=', 'empresa.emp_id')->join('tbl_usuario as usuario', 'empresa.emp_id', '=', 'usuario.usu_emp')->where('usu_id', $id_usuario)->get();    
    }

    public static function guardarMesa($idEmp, $nombreMesa,$descripcion,$foto,$posX,$posY)
    {
        $idMesa = DB::table('tbl_mesa')->insertGetId(['mes_nombre' => $nombreMesa, 'mes_posicionX' => $posX, 'mes_posicionY' => $posY, 'mes_imagen' => $foto, 'mes_emp' => $idEmp,'mes_descripcion'=>$descripcion]);
        if (is_numeric($idMesa)) {
            return 'exito';    
        }
        //si llego aqui es que no retorno exito, por lo tanto, no se guardo el cliento
        //se ingreso direccion pero no se pudo ingresar usuario, para evitar informacion innecesaria en BD borrar la direccion que acabamos de crear.
        DB::table('tbl_mesa')->where('mes_id', $idMesa)->delete();
        //DB::table('tbl_mesa')->where('mes_id', 1)->delete();
        //DB::table('tbl_mesa')->where('mes_id', 2)->delete();
        return 'error';
    }

    public static function actualizarMesa($idMesa, $nombreMesa,$descripcion,$foto){
        DB::table('tbl_mesa')->where('mes_id', $idMesa)->update(['mes_nombre' => $nombreMesa, 'mes_descripcion'=>$descripcion, 'mes_imagen' => $foto]);
        return 'exito';
    }    

    public static function actualizarPosMesa($idMesa,$posx,$posy){
        DB::table('tbl_mesa')->where('mes_id', $idMesa)->update(['mes_posicionX' => $posx, 'mes_posicionY' => $posy]);
        return 'exito';        
    }

    public static function actualizarPosMesas($mesas){
        for($i=0; $i<sizeof($mesas); $i++){
            for($j=0; $j<3; $j++){
              if($j==2){
                DB::table('tbl_mesa')->where('mes_id', $mesas[$i][2])->update(['mes_posicionX' => $mesas[$i][0], 'mes_posicionY' => $mesas[$i][1]]);
              }
            }
        }
        return 'exito';
    }

    public static function eliminarMesa($idMesa){
        $exito = DB::table('tbl_mesa')->where('mes_id',$idMesa)->delete();
        if($exito){
            return 'exito';
        }
    }
}
