<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DashboardController;
use App\Models\Proveedor;
class ProveedorController extends Controller{

    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('proveedores');
        }
    }

    public function guardarProveedor(){
        if (isset($_POST['id'])) {
            //editando un proveedor
            return Proveedor::editar(
                $_POST['id'], 
                $_POST['nombre'], 
                $_POST['razon'], 
                $_POST['cedula'], 
                $_POST['tipoCed'], 
                $_POST['telefono'],
                $_POST['correo'],
                $_POST['direccion'],
                $_POST['emp']);
        } else {
            //crear proveedor nuevo
            return Proveedor::crear( 
                $_POST['nombre'], 
                $_POST['razon'], 
                $_POST['cedula'], 
                $_POST['tipoCed'], 
                $_POST['telefono'],
                $_POST['correo'],
                $_POST['direccion'],
                $_POST['emp']);
        }
    }

    public function buscarProveedor(){
        return Proveedor::fetch($_POST['nombre'], $_POST['idemp']);
    }

    public function borrarProveedor(){
        return Proveedor::borrar($_POST['id']);
    }
}