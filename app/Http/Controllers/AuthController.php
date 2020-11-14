<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auth;
use Illuminate\Support\Facades\URL;


class AuthController extends Controller
{
    public function login()
    {
        if (Auth::autenticar($_POST['txt_correo'], $_POST['txt_password'])) {
            header('Location: ' . URL::to('/dashboard'), true, 302);
            die();
            //para obtener cualquier informacion del usuario logeado se usa Session('user') y eso le devuelve un array con toda la info del usuario  
            //entonces obtener nombre seria  Session::get('user')->nombre;
        } else {
            $_POST['mensaje'] = 'Nombre de usuario o contraseña incorrecta por favor intente de nuevo.';
            return view("login");
        }
    }

    public function logout()
    {
        Auth::logout();
        return view('cerrosession');
    }

    public function registrar()
    {
        //return Auth::registrar($_POST['nombre'],$_POST['apellidos'],$_POST['correo'],$_POST['contra'],$_POST['telefono'],$_POST['provincia'],$_POST['canton'],$_POST['distrito']);
    }

    public function recuperarContra(){
        return Auth::recuperarContra($_POST['correo']);
    }
}
