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
        $user = DB::table('tbl_usuario')->where('usu_usuario', $correo)->first();
        if ($user != null && Hash::check($contra, $user->usu_contra)) {
            //usuario autenticado
            session_start();
            $_SESSION['user'] = $user;
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
        $funciono = DB::table('tbl_usuario')->insert(['usu_nombre' => 'admin', 'usu_cedula' => '1', 'usu_tipo' => '1', 'usu_contra' => Hash::make('admin'), 'usu_correo' => 'admin', 'usu_emp' => 1,'usu_cedula'=>'1','usu_usuario'=>'admin']);
        if ($funciono) {
            return 'exito';
        }
    }

    //usado para crear el usuario admin cuando la BD esta vacia
    public static function registrar($nombre, $apellidos, $correo, $contra, $telefono, $provincia, $canton, $distrito)
    {
        //verificar si telefono y correo ya existen
        if (DB::table('tbl_usuario')->where('usu_correo', $correo)->exists()) {
            return 'Correo ya se encuentra registrado.';
        }
        if (DB::table('tbl_usuario')->where('usu_telefono', $telefono)->exists()) {
            return 'Telefono ya se encuentra registrado.';
        }

        $funciono = DB::table('tbl_usuario')->insert(['usu_nombre' => $nombre, 'usu_apellido' => $apellidos, 'usu_telefono' => $telefono, 'usu_contra' => Hash::make($contra), 'usu_correo' => $correo, 'usu_provincia' => $provincia, 'usu_distrito' => $distrito, 'usu_canton' => $canton, 'usu_otrassenas' => '']);
        if ($funciono) {
            return 'exito';
        }
    }

    public static function recuperarContra($correo)
    {
        if (DB::table('tbl_usuario')->where('usu_correo', $correo)->exists()) {
            //enviar correo aqui
            $contra =  self::generarPass();
            DB::table('tbl_usuario')->where('usu_correo', $correo)->update(['usu_contra' => Hash::make($contra)]);

            $user = DB::table('tbl_usuario')->where('usu_correo', $correo)->first();
            Mail::to($correo)->send(new RecuperarContra($user, $contra));
            return 'exito';
        } else {
            return 'No existe cuenta asociada al correo ingresado.';
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
}
