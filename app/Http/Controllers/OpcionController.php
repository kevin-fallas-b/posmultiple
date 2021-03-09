<?php

namespace App\Http\Controllers;

use App\Models\Opcion;
class OpcionController extends Controller{

    public function guardarOpcion(){
       return Opcion::crear($_POST['nombre'],$_POST['precio'],$_POST['producto']);
    }

    public function fetch(){
        return Opcion::fetch($_POST['producto']);
    }

    public function eliminar(){
        return Opcion::eliminar($_POST['id']);
    }
}