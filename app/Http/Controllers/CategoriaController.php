<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DashboardController;
use App\Models\Categoria;
class CategoriaController extends Controller{

    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('categorias');
        }
    }

    public function indexCategoria(){
        if (DashboardController::estaLogeado()) {
            return view('categoria');
        }
    }

    public function guardarCategoria(){
        if (isset($_POST['id'])) {
            //editando un proveedor
            return Categoria::editar(
                $_POST['id'], 
                $_POST['nombre'], 
                $_POST['emp']);
        } else {
            //crear proveedor nuevo
            return Categoria::crear( 
                $_POST['nombre'], 
                $_POST['emp']);
        }
    }

    public function buscarCategoria(){
        return Categoria::fetch($_POST['nombre'], $_POST['emp']);
    }

    public function borrarCategoria(){
        return Categoria::borrar($_POST['id']);
    }

    public function crearRelacion(){
        return Categoria::crearRelacion($_POST['pro_id'],$_POST['cat_id']);
    }

    public function borrarRelacion(){
        return Categoria::borrarRelacion($_POST['pro_id'],$_POST['cat_id']);
    }

    public function buscarRelacion(){
        if (isset($_POST['pro_id'])){
            return Categoria::buscarRelacionxProducto($_POST['pro_id'],$_POST['nombre']);
        }else{
            return Categoria::buscarRelacionxCategoria($_POST['cat_id']);
        }
    }

    public function cargarCategoriasEmpresa(){
        return Categoria::cargarCategorias($_POST['id_empresa']);
    }
}