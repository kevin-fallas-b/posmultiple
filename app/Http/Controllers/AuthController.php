<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login()
    {
        if (Auth::autenticar($_POST['txt_correo'], $_POST['txt_password'])) {
            if(Auth::cambiarContra($_POST['txt_correo'])){
                return redirect()->route('cambioContra');
            }else{
                header('Location: ' . URL::to('/dashboard'), true, 302);
                die();
                
                //para obtener cualquier informacion del usuario logeado se usa Session('user') y eso le devuelve un array con toda la info del usuario  
                //entonces obtener nombre seria  Session::get('user')->nombre;
            }
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
        
        if(Auth::recuperarContra($_POST['correo'])==0){
            $_POST['mensaje']='No existe cuenta asociada al correo ingresado.';
            return view('recuperarContrasena');
        }else{
            return view('mensajeExito',['mensaje'=>'Se le ha enviado un correo con una clave temporal.','dir'=>'/']);
        }
        //return redirect()->back();
    }

    public function cambiarContra(){
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
                
        if (Hash::check($_POST['contra'], $_SESSION['user']->usu_contra)){        
            $_POST['mensaje']='La contraseña ingresada debe ser diferente a la que recibió en el correo,';
            return view('cambioContrasena');
        }else{
            if(Auth::ejecCambioContra($_POST['contra'],$_SESSION['user']->usu_usuario)){
                return view('mensajeExito',['mensaje'=>'Contraseña cambiada exitosamente.','dir'=>'/dashboard']);
            }else{
                $_POST['mensaje']='Ocurrió un error cambiando la contraseña.';
                return view('cambioContrasena');
                
            }
        }
        return redirect()->back();
    }
}
