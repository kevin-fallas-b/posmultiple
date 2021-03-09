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
            return DB::table('tbl_cliente as cliente')->join('tbl_direccion as direccion', 'cliente.cli_direccion', '=', 'direccion.dir_id')->whereRaw("cli_empresa = " . $idEmpresa . " AND CAST(cli_cedula AS VARCHAR(12)) LIKE '" . $terminoBusqueda . "%'")->get();
        } else {
            return DB::table('tbl_cliente as cliente')->join('tbl_direccion as direccion', 'cliente.cli_direccion', '=', 'direccion.dir_id')->whereRaw("concat(UPPER(cli_nombre), ' ', UPPER(cli_apellidos)) like '%" . $terminoBusqueda . "%' AND cli_empresa = " . $idEmpresa)->get();
        }
    }

    //guardar en Bd peticion a servidor de FE por si existe un error externo a nosotros, y mandar a API
    public static function facturar($emisor, $usuario, $token, $detalles, $receptor, $tipoDocumento, $medioPago)
    {
        return self::enviarAPI($token, $detalles, $receptor, $tipoDocumento, $medioPago); 
    }

    public static function enviarAPI($token, $detalles, $receptor, $tipoDocumento, $medioPago)
    {
        $url = 'http://201.191.144.55:8989/facturar';
        $data = array('token' => $token, 'detalles' => $detalles, 'receptor' => $receptor, 'tipoDocumento' => $tipoDocumento, 'medioPago' => $medioPago);

        // use key 'http' even if you send the request to https://...
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        if ($result === FALSE) { /* Handle error */
        }
        $respuesta = json_decode($result, true);
        return $respuesta;
    }
}
