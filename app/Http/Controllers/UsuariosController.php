<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\DashboardController;
use App\Models\Usuarios;
class UsuariosController extends Controller
{
    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('usuarios');
        }
    }

    public function guardarUsuario(){
        if (isset($_POST['id'])) {
            //editando un usuario
            return Usuarios::actualizarUsuario($_POST['id'], $_POST['cedula'], $_POST['nombre'], $_POST['contra'], $_POST['tipo'], $_POST['idemp'], $_POST['correo'], $_POST['usuario'],$_POST['activo']);
        } else {
            //crear usuario nuevo
            return Usuarios::crearUsuario($_POST['cedula'], $_POST['nombre'], $_POST['contra'], $_POST['tipo'], $_POST['idemp'], $_POST['correo'], $_POST['usuario'],$_POST['activo']);
        }
    }
    //funcion que le permite ver a un administrador los usuarios dentro de su empresa.
    public function buscarUsuarios(){
        if (is_numeric($_POST['nombre'])) {
            //enviaron cedula
            return Usuarios::buscarCedula($_POST['nombre'], $_POST['idemp']);
        } else {
            return Usuarios::buscarNombre($_POST['nombre'], $_POST['idemp']);
        }
    }
}
