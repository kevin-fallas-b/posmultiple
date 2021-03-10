<?php

namespace App\Models;

use App\Mail\RecuperarContra;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;


class Auth extends Model
{
    public static function getusu()
    {
        return DB::table('tbl_usuario')->where('usu_id', 1)->first();
    }

    public static function autenticar($correo, $contra)
    {
        $user = DB::table('tbl_usuario as usuario')->join('tbl_empresa as empresa', 'usuario.usu_emp', '=', 'empresa.emp_id')->where('usu_usuario', $correo)->first();
        if ($user != null && Hash::check($contra, $user->usu_contra)) {
            //usuario autenticado
            session_start();
            $_SESSION['user'] = $user;
            /* Obtener token para el API de facturacion */
            $_SESSION['user']->token = self::getToken($user->emp_usuarioAPI, $user->emp_claveAPI);
            return true;
        } else {
            return false;
        }
        return false;
    }

    public static function logout()
    {
        session_start();
        if (isset($_SERVER['HTTP_COOKIE'])) {
            $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
            foreach ($cookies as $cookie) {
                $parts = explode('=', $cookie);
                $name = trim($parts[0]);
                setcookie($name, '', 1);
                setcookie($name, '', 1, '/');
            }
        }
        session_unset();
        session_destroy();
        $_SESSION = array();
    }

    //usado para crear el usuario admin cuando la BD esta vacia
    public static function crearprimero()
    {
        $funciono = DB::table('tbl_usuario')->insert(['usu_nombre' => 'admin', 'usu_cedula' => '1', 'usu_tipo' => '1', 'usu_contra' => Hash::make('admin'), 'usu_correo' => 'admin', 'usu_emp' => 1, 'usu_cedula' => '1', 'usu_usuario' => 'admin']);
        if ($funciono) {
            return 'exito';
        }
    }



    public static function recuperarContra($correo)
    {
        if (DB::table('tbl_usuario')->where('usu_correo', $correo)->exists()) {
            //enviar correo aqui
            $contra =  self::generarPass();
            DB::table('tbl_usuario')->where('usu_correo', $correo)->update(['usu_contra' => Hash::make($contra), 'usu_cambioContra' => 1]);

            $user = DB::table('tbl_usuario')->where('usu_correo', $correo)->first();
            //la variable $contra contiene la contraseña sin encriptar, se la enviamos al usuario en texto plano
            Mail::to($correo)->send(new RecuperarContra($user, $contra));

            return 1; //'exito';
        } else {
            return 0; //'No existe cuenta asociada al correo ingresado.';
        }
    }

    private static function generarPass()
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array();
        $alphaLength = strlen($alphabet) - 1;
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass);
    }

    public static function cambiarContra($usuario)
    {
        $user = DB::table('tbl_usuario as usuario')->join('tbl_empresa as empresa', 'usuario.usu_emp', '=', 'empresa.emp_id')->where('usu_usuario', $usuario)->first();
        if ($user != null && $user->usu_cambioContra == 1) {
            return true;
        } else {
            return false;
        }
    }

    public static function ejecCambioContra($contra, $usuario)
    {
        if (DB::table('tbl_usuario')->where('usu_usuario', $usuario)->exists()) {
            //enviar correo aqui
            DB::table('tbl_usuario')->where('usu_usuario', $usuario)->update(['usu_contra' => Hash::make($contra), 'usu_cambioContra' => 0]);

            //$user = DB::table('tbl_usuario as usuario')->join('tbl_empresa as empresa', 'usuario.usu_emp', '=', 'empresa.emp_id')->where('usu_usuario', $usuario)->first();
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['user']->usu_cambioContra = 0;
            return true; //'exito';
        } else {
            return false; //'No existe cuenta asociada al correo ingresado.';
        }
    }

    public static function getToken($user, $pass)
    {
        $url = 'http://201.191.144.55:8989/login';
        $data = array('user' => $user, 'password' => $pass);

        // use key 'http' even if you send the request to https://...
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);
        if ($result === FALSE) { /* Handle error */
            return 'error';
        }
        $respuesta = json_decode($result, true);
        return $respuesta['resultado']['data'];
        //return 'resultado';
    }
}
