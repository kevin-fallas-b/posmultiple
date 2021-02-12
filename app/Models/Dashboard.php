<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Dashboard extends Model
{

    public static function crearcliente($cedula, $tipocedula, $nombre, $apellidos, $telefono, $correo, $provincia, $canton, $distrito, $otrassenas, $idemp)
    {
        //insertar la direccion del cliente y guardar el ID del registro
        $iddireccion = DB::table('tbl_direccion')->insertGetId(['dir_provincia' => $provincia, 'dir_canton' => $canton, 'dir_distrito' => $distrito, 'dir_otrasSenas' => $otrassenas]);
        if (is_numeric($iddireccion)) {
            //si se guardo existosamente la direccion, intentar insertar el cliente
            if ($tipocedula == 1) {
                $apellidos = '';
            }
            if (DB::table('tbl_cliente')->insert(['cli_cedula' => $cedula, 'cli_tipocedula' => $tipocedula, 'cli_nombre' => $nombre, 'cli_apellidos' => $apellidos, 'cli_telefono' => $telefono, 'cli_correo' => $correo, 'cli_direccion' => $iddireccion, 'cli_empresa' => $idemp])) {
                return 'exito';
            }
        }
        //si llego aqui es que no retorno exito, por lo tanto, no se guardo el cliento
        //se ingreso direccion pero no se pudo ingresar usuario, para evitar informacion innecesaria en BD borrar la direccion que acabamos de crear.
        DB::table('tbl_direccion')->where('dir_id', $iddireccion)->delete();
        return 'error';
    }

    public static function actualizarcliente($id, $nombre, $apellidos, $telefono, $correo, $provincia, $canton, $distrito, $otrassenas)
    {
        DB::table('tbl_cliente as cliente')->join('tbl_direccion as direccion', 'cliente.cli_direccion', '=', 'direccion.dir_id')->where('cli_id', $id)->update(['cli_nombre' => $nombre, 'cli_apellidos' => $apellidos, 'cli_telefono' => $telefono, 'cli_correo' => $correo, 'dir_provincia' => $provincia, 'dir_canton' => $canton, 'dir_distrito' => $distrito, 'dir_otrasSenas' => $otrassenas]);
        return 'exito';
    }

    public static function buscarclientes($nombre, $idemp)
    {
        return DB::table('tbl_cliente as cliente')->join('tbl_direccion as direccion', 'cliente.cli_direccion', '=', 'direccion.dir_id')->whereRaw("concat(UPPER(cli_nombre), ' ', UPPER(cli_apellidos)) like '%" . $nombre . "%' AND cli_empresa = " . $idemp)->get();
    }

    public static function buscarcedula($cedula, $idemp)
    {
        return DB::table('tbl_cliente as cliente')->join('tbl_direccion as direccion', 'cliente.cli_direccion', '=', 'direccion.dir_id')->where('cli_cedula', 'LIKE', $cedula . '%')->where('cli_empresa', $idemp)->get();
    }
}
