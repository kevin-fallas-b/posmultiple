<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\DashboardController;
use App\Models\Empresas;

class EmpresasController extends Controller
{
    public function index()
    {
        if (DashboardController::estaLogeado()) {
            return view('empresas',['empresas'=> self::getEmpresas()]);
        }
    }

    //retorna todas las empresas registradas en el sistema
    public function getEmpresas(){
        return Empresas::getEmpresas();
    }

    public function guardarEmpresa(){
        if (isset($_POST['id'])) {
            //editando una empresa
            return Empresas::actualizarEmpresa($_POST['id'],$_POST['iddir'],$_POST['cedula'],$_POST['tipo'],$_POST['nombre'],$_POST['razonsocial'],$_POST['telefono'],$_POST['correo'],$_POST['slogan'],$_POST['provincia'],$_POST['canton'],$_POST['distrito'],$_POST['codigoactividad'],$_POST['usuarioprod'],$_POST['claveprod'],$_POST['usuarioapi'],$_POST['claveapi'],$_POST['activo']);
        } else {
            //crear usuario nuevo
            return Empresas::crearEmpresa($_POST['cedula'],$_POST['tipo'],$_POST['nombre'],$_POST['razonsocial'],$_POST['telefono'],$_POST['correo'],$_POST['slogan'],$_POST['provincia'],$_POST['canton'],$_POST['distrito'],$_POST['codigoactividad'],$_POST['usuarioprod'],$_POST['claveprod'],$_POST['usuarioapi'],$_POST['claveapi'],$_POST['activo'],$_POST['nombreuser'],$_POST['cedulauser'],$_POST['contrauser'],$_POST['correouser'],$_POST['usernameuser']);
        }
    }
}
