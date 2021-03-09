<?php

namespace App\Http\Controllers;

use App\Models\Facturacion;
use Illuminate\Http\Request;

class FacturacionController extends Controller
{
    public function index(){
        if (DashboardController::estaLogeado()) {
            return view('facturacion');
        }
    }

    public function buscarProductos(){
        if (DashboardController::estaLogeado()) {
            return Facturacion::buscarProductos($_POST["idEmp"],$_POST['termino']);
        }
    }

    public function buscarClientes(){
        if (DashboardController::estaLogeado()) {
            return Facturacion::buscarClientes($_POST["idEmp"],$_POST['termino']);
        }
    }

}
