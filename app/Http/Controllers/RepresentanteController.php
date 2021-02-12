<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DashboardController;
use App\Models\Representante;
class RepresentanteController extends Controller{

    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('representantes');
        }
    }

    public function guardarRepresentante(){
        if (isset($_POST['id'])) {
            //editando un proveedor
            return Representante::editar(
                $_POST['id'], 
                $_POST['nombre'], 
                $_POST['telefono'], 
                $_POST['correo'], 
                $_POST['proveedor'], 
                $_POST['emp']);
        } else {
            //crear proveedor nuevo
            return Representante::crear( 
                $_POST['nombre'], 
                $_POST['telefono'], 
                $_POST['correo'], 
                $_POST['proveedor'], 
                $_POST['emp']);
        }
    }

    public function buscarRepresentantes(){
        if(isset($_POST['proveedor'])){
            return Representante::buscar($_POST['nombre'], $_POST['proveedor'], $_POST['idemp']);
        }
        return Representante::fetch($_POST['nombre'], $_POST['idemp']);
    }

    public function borrarRepresentate(){
        return Representante::borrar($_POST['id']);
    }
}