<?php

namespace App\Http\Controllers;

use App\Http\Controllers\DashboardController;
use App\Models\Producto;
class ProductoController extends Controller{

    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('productos');
        }
    }

    public function pantIngresarproductos(){
        if (DashboardController::estaLogeado()) {
            return view('ingresarMercaderia');
        }
    }

    public function GuardarProducto(){
        if (isset($_POST['id'])) {
            //editando un producto
            return Producto::editar(
                $_POST['id'], 
                $_POST['proveedor'],
                $_POST['nombre'], 
                $_POST['descripcion'], 
                $_POST['precio'], 
                $_POST['control'], 
                $_POST['cantidad'],
                $_POST['codigo'],
                $_POST['unidad'],
                $_POST['cabys'],
                $_POST['tarifa'],
                $_POST['emp']);
        } else {
            //crear producto nuevo
            return Producto::crear( 
                $_POST['proveedor'],
                $_POST['nombre'], 
                $_POST['descripcion'], 
                $_POST['precio'], 
                $_POST['control'], 
                $_POST['cantidad'],
                $_POST['codigo'],
                $_POST['unidad'],
                $_POST['cabys'],
                $_POST['tarifa'],
                $_POST['emp']);
        }
    }

    public function buscarProductos(){
        if(isset($_POST['proveedor'])){
            return Producto::buscarProductos(
                $_POST['proveedor'],
                $_POST['nombre'],
                $_POST['emp']);
        }else{
            if(isset($_POST['codigoBarras'])){
                return Producto::getProducto($_POST['codigoBarras'],$_POST['emp']);
            }else{
                return Producto::fetch(
                    $_POST['nombre'],
                    $_POST['emp']);
            }
        }
    }

    public function getProducto(){
        return Producto::getProducto($_POST['codigoBarras'],$_POST['emp']);
    }

    public function ingresarProductos(){
        return Producto::ingresarProductos($_POST['emp'],$_POST['jsnproductos'],$_POST['accion']);
    }

    public function cargarProductos(){
        if(isset($_POST['nombre'])){
            return Producto::cargarProductosPorNombre($_POST['id_empresa'],$_POST['nombre']);
        }else{
            return Producto::cargarProductosPorCodigo($_POST['id_empresa'],$_POST['codigo']);
        }
    }
}