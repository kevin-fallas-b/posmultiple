<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Facturacion extends Model
{
    public static function buscarProductos($idEmpresa, $terminoBusqueda)
    {
        if (is_numeric($terminoBusqueda)) {
            return DB::table('tbl_producto')->where("pro_emp", $idEmpresa)->where("pro_codigo", $terminoBusqueda)->get();
        } else {
            return DB::table('tbl_producto')->where("pro_emp", $idEmpresa)->whereRaw("UPPER(pro_nombre) LIKE '%" . $terminoBusqueda . "%'")->get();
        }
    }

    public static function buscarClientes($idEmpresa, $terminoBusqueda)
    {
        if (is_numeric($terminoBusqueda)) {
            return DB::table('tbl_cliente')->whereRaw("cli_empresa = " . $idEmpresa . " AND CAST(cli_cedula AS VARCHAR(12)) LIKE '". $terminoBusqueda . "%'")->get();
        } else {
            return DB::table('tbl_cliente')->whereRaw("concat(UPPER(cli_nombre), ' ', UPPER(cli_apellidos)) like '%" . $terminoBusqueda . "%' AND cli_empresa = " . $idEmpresa)->get();
        }
    }
}
