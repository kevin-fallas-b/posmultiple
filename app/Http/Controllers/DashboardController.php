<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Models\Dashboard;


class DashboardController extends Controller
{
    public function index()
    {
        if (self::estaLogeado()) {
            return view('inicio');
        }
    }

    public function agregar()
    {
        if (self::estaLogeado()) {
            return view('agregarpedido');
        }
    }

    public function clientes()
    {
        if (self::estaLogeado()) {
            return view('mantenimientoClientes');
        }
    }

    public static function estaLogeado()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user'])) {
            header('Location: ' . URL::to('/nolog'), true, 307);
            die();
            return false;
        }
        return true;
    }

    public function guardarcliente()
    {
        if (isset($_POST['id'])) {
            //editando un cliente
            return Dashboard::actualizarcliente($_POST['id'], $_POST['nombre'], $_POST['apellidos'], $_POST['telefono'], $_POST['correo'], $_POST['provincia'], $_POST['canton'], $_POST['distrito'], $_POST['otrassenas']);
        } else {
            //crear cliente nuevo
            return Dashboard::crearcliente($_POST['cedula'], $_POST['tipo'], $_POST['nombre'], $_POST['apellidos'], $_POST['telefono'], $_POST['correo'], $_POST['provincia'], $_POST['canton'], $_POST['distrito'], $_POST['otrassenas'], $_POST['idemp']);
        }
    }

    public function buscarclientes()
    {
        if (is_numeric($_POST['nombre'])) {
            //enviaron cedula
            return Dashboard::buscarcedula($_POST['nombre'], $_POST['idemp']);
        } else {
            return Dashboard::buscarclientes($_POST['nombre'], $_POST['idemp']);
        }
    }

}
