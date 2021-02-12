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
            return view('ordenes/ordenes',['tab'=>'noseleccionado']);
        }
    }

    public function obtenerOrden(){
        if(DashboardController::estaLogeado()){
            return Orden::obtenerOrden($_POST['id_mesa']);
        }
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
