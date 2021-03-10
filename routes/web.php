<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\RepresentanteController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\EmpresasController;
use App\Http\Controllers\MesasController;
use App\Http\Controllers\OpcionController;
use App\Http\Controllers\OrdenesController;
use App\Http\Controllers\ReportesController;
use App\Http\Controllers\FacturacionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
});

Route::post('/', [AuthController::class, 'login']);

Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/nolog', function () {
    return view('nolog');
});

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::get('/dashboard/clientes', [DashboardController::class, 'clientes']);

Route::post('/dashboard/clientes', [DashboardController::class, 'guardarcliente']);

Route::post('/dashboard/buscarclientes',  [DashboardController::class, 'buscarclientes']);

Route::get('/administracion/usuarios', [UsuariosController::class, 'index']);

Route::post('/administracion/usuarios', [UsuariosController::class, 'guardarUsuario']);

Route::post('/administracion/buscarUsuarios', [UsuariosController::class, 'buscarUsuarios']);



Route::get('/administracion/proveedores', [ProveedorController::class, 'index']);

Route::post('/administracion/proveedores', [ProveedorController::class, 'guardarProveedor']);

Route::post('/administracion/borrarProveedores', [ProveedorController::class, 'borrarProveedor']);

Route::post('/administracion/buscarProveedores', [ProveedorController::class, 'buscarProveedor']);


Route::get('/administracion/productos', [ProductoController::class, 'index']);

Route::post('/administracion/productos', [ProductoController::class, 'guardarProducto']);

Route::post('/administracion/buscarProductos', [ProductoController::class, 'buscarProductos']);


Route::post('/administracion/opciones', [OpcionController::class, 'guardarOpcion']);

Route::post('/administracion/buscarOpciones', [OpcionController::class, 'fetch']);

Route::post('/administracion/borrarOpciones', [OpcionController::class, 'eliminar']);


Route::get('/administracion/representantes', [RepresentanteController::class, 'index']);

Route::post('/administracion/representantes', [RepresentanteController::class, 'guardarRepresentante']);

Route::post('/administracion/buscarRepresentantes', [RepresentanteController::class, 'buscarRepresentantes']);

Route::post('/administracion/borrarRepresentantes', [RepresentanteController::class, 'borrarRepresentate']);



Route::get('/administracion/categorias', [CategoriaController::class, 'index']);

Route::get('/administracion/categoria', [CategoriaController::class, 'indexCategoria']);

Route::post('/administracion/categorias', [CategoriaController::class, 'guardarCategoria']);

Route::post('/administracion/buscarCategorias', [CategoriaController::class, 'buscarCategoria']);

Route::post('/administracion/borrarCategorias', [CategoriaController::class, 'borrarCategoria']);

Route::post('/administracion/crearRelacionCategorias', [CategoriaController::class, 'crearRelacion']);

Route::post('/administracion/borrarRelacionCategorias', [CategoriaController::class, 'borrarRelacion']);

Route::post('/administracion/buscarRelacionCategorias', [CategoriaController::class, 'buscarRelacion']);

Route::post('/cargarCategoriasEmpresa', [CategoriaController::class, 'cargarCategoriasEmpresa']);

Route::post('administracion/direcciones', [DireccionController::class, 'guardarDireccion']);

Route::post('administracion/borrardirecciones', [DireccionController::class, 'borrarDireccion']);

Route::get('/recuperarpass', function () {
    return view('recuperarContrasena');
});

Route::post('/recuperarcont', [AuthController::class, 'recuperarContra'])->name('recuperarcont');

Route::get('/cambioContra', function () {
    return view('cambioContrasena');
})->name('cambioContra');

Route::post('/cambiarContra', [AuthController::class, 'cambiarContra'])->name('cambiarContra');

Route::get('/administracion/empresas', [EmpresasController::class, 'index']);

Route::post('/administracion/empresas', [EmpresasController::class, 'guardarEmpresa']);

Route::post('/administracion/getempresas', [EmpresasController::class, 'getEmpresas']);

//Route::get('/administracion/mesas',[])

/*Route::get('/', function () {
    return view('mesas');
});*/

Route::get('/administracion/mesas', [MesasController::class, 'index']);

Route::post('/administracion/cargarMesas',  [MesasController::class, 'cargarMesas']);

Route::post('/cargarMesas',  [MesasController::class, 'cargarMesas']);

Route::get('/administracion/cargar',  [MesasController::class, 'cargar']);

Route::post('/administracion/guardarNuevaMesa', [MesasController::class, 'guardarMesa']);

Route::post('/administracion/actualizarPosMesa', [MesasController::class, 'actualizarPosMesa']);

Route::post('/administracion/actualizarPosMesas', [MesasController::class, 'actualizarPosMesas']);

Route::post('/administracion/eliminarMesa', [MesasController::class, 'eliminarMesa']);


Route::get('/ordenes', [OrdenesController::class, 'index']);

Route::post('/obtenerOrden', [OrdenesController::class, 'obtenerOrden']);

Route::post('/guardarOrden', [OrdenesController::class, 'guardarOrden']);

Route::post('/cargarOrdenes', [OrdenesController::class, 'cargarOrdenes']);

Route::post('/cargarProductosOrden', [OrdenesController::class, 'cargarProductosOrden']);

Route::post('/eliminarOrden', [OrdenesController::class, 'eliminarOrden']);


Route::post('/cargarProductos', [ProductoController::class, 'cargarProductos']);


Route::get('/ingresarmercaderia', [ProductoController::class, 'pantIngresarproductos']);

Route::post('/getproducto', [ProductoController::class, 'getProducto']);

Route::post('/ingresarproductos', [ProductoController::class, 'ingresarProductos']);

Route::get('/cocina', function () {
    if (DashboardController::estaLogeado()) {
        return view('cocina');
    }
});

Route::post('/cargarNoEntregadas', [OrdenesController::class, 'cargarNoEntregadas']);

Route::post('/cargarNoPagadas', [OrdenesController::class, 'cargarNoPagadas']);

Route::post('/cargarProductosXOden', [OrdenesController::class, 'cargarProductosXOrden']);

Route::post('/entregarOrden', [OrdenesController::class, 'entregarOrden']);

Route::get('/prueba', function () {
    return view('cambioContrasena');
});

Route::get('/administracion/reportes',[ReportesController::class,'index']);

Route::post('/administracion/reporteVentas',[ReportesController::class, 'reporteVentas'])->name('reporteVentas');

Route::post('/administracion/reporteInventario',[ReportesController::class,'reporteInventario'])->name('reporteInventario');

Route::post('/administracion/reporteFacturasRealizadas',[ReportesController::class,'reporteFacturasRealizadas'])->name('reporteFacturasRealizadas');

Route::get('dashboard/facturacion',[FacturacionController::class,'index']);

Route::post('dashboard/facturacion',[FacturacionController::class,'facturar']);

Route::post('dashboard/facturacion/buscarproductos',[FacturacionController::class,'buscarProductos']);

Route::post('dashboard/facturacion/buscarclientes',[FacturacionController::class,'buscarClientes']);
