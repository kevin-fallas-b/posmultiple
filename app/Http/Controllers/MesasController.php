<?php

namespace App\Http\Controllers;
use App\Http\Controllers\DashboardController;
use App\Models\Mesa;

use Illuminate\Http\Request;

class MesasController extends Controller
{

    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('mesas/mesas');
        }
    }

    public function cargarMesas()
    {
        return Mesa::cargarMesas($_POST['id_usuario']); 
    }

    public function cargar()
    {
        return Mesa::cargarMesas(1);//User::where('usu_usuario','=',$_POST['usuario'])->get();//User::getAdmin($_POST['usuario']);
    } 

    public function guardarMesa()
    {
        if (isset($_POST['id'])) {
            return Mesa::actualizarMesa($_POST['id'],$_POST['nombre_mesa'], $_POST['descripcion'],$_POST['foto']);
        } else {
            return Mesa::guardarMesa($_POST['id_emp'], $_POST['nombre_mesa'], $_POST['descripcion'],$_POST['foto'],$_POST['pos_x'],$_POST['pos_y']);
        }
    }

    public function actualizarPosMesa(){
        return Mesa::actualizarPosMesa($_POST['id_mesa'],$_POST['pos_x'],$_POST['pos_y']);
    }

    public function actualizarPosMesas(){
        return Mesa::actualizarPosMesas($_POST['mesa']);
    }

    public function eliminarMesa(){
        return Mesa::eliminarMesa($_POST['id']);
    }
}
