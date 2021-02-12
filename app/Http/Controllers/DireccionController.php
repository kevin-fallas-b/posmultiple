<?php

namespace App\Http\Controllers;

use App\Models\Direccion;

class DireccionController extends Controller
{
    public function guardarDireccion(){
        if(isset($_POST['id'])){
            return Direccion::edit($_POST['id'],$_POST['provincia'],$_POST['canton'],$_POST['distrito'],$_POST['senas']);
        }else{
            return Direccion::create($_POST['provincia'],$_POST['canton'],$_POST['distrito'],$_POST['senas']);
        }
    }

    public function borrarDireccion(){
        return Direccion::borrar($_POST['id']);
    }
}
