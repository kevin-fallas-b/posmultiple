<?php

namespace App\Http\Controllers;
use App\Http\Controllers\DashboardController;
use App\Models\Orden;

use Illuminate\Http\Request;
use Illuminate\View\ViewName;

class OrdenesController extends Controller
{
    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('ordenes/ordenes',['tab'=>'todos']);
        }
    }

    public function obtenerOrden(){
        if(DashboardController::estaLogeado()){
            return Orden::obtenerOrden($_POST['id_mesa']);
        }
    }

    public function guardarOrden(){
        if(isset($_POST['id_orden'])){//si recibe un id de orden estaría editando una orden
            if(isset($_POST['idsEliminados'])){
                return Orden::actualizarOrden($_POST['id_orden'],$_POST['id_usuario'],$_POST['id_empresa'],$_POST['fecha'],$_POST['productos'],$_POST['idsEliminados']);
            }else{
                return Orden::actualizarOrden($_POST['id_orden'],$_POST['id_usuario'],$_POST['id_empresa'],$_POST['fecha'],$_POST['productos'],0);
            }
        }else{
            if(isset($_POST['id_mesa'])){
                return Orden::guardarOrden($_POST['id_usuario'],$_POST['id_empresa'],$_POST['fecha'],$_POST['id_mesa'],$_POST['productos']);
            }else{
                return Orden::guardarOrden($_POST['id_usuario'],$_POST['id_empresa'],$_POST['fecha'],0,$_POST['productos']);
            }
        }
    }

    public function cargarOrdenes(){
        return Orden::cargarOrdenes($_POST['id_empresa']);
    }

    public function cargarProductosOrden(){
        return Orden::cargarProductosOrden($_POST['id_empresa']);
    }

    public function eliminarOrden(){
        return Orden::eliminarOrden($_POST['id_orden']);
    }

    /*public function cargartodosproductos(){
        if(DashboardController::estaLogeado()){
            return view('ordenes/ordenes',['tab'=>'todos']);
        }
    }

    public function cargarentradas(){
        if(DashboardController::estaLogeado()){
            return view('ordenes/ordenes',['tab'=>'entradas']);
        }
    }
    
    public function cargarbebidas(){
        if(DashboardController::estaLogeado()){
            return view('ordenes/ordenes',['tab'=>'bebidas']);
        }
    }*/ 
}
