<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->


  <!-- Sidebar -->
  <div class="sidebar">


    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->


        <li class="nav-item">
          <a href="{{ url('/dashboard/agregar') }}" class="nav-link" id="linkagregar">
            <i class="nav-icon far fa-edit"></i>
            <p>
              Ordenes
            </p>
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ url('/administracion/ordenes') }}" class="nav-link" id="linkordenes">
            <i class="nav-icon far fa-edit"></i>
            <p>
              Ordenes Restaurante
            </p>
          </a>
        </li>

        <li class="nav-item">
          <a href="{{ url('/dashboard/actualizar') }}" class="nav-link" id="linkactualizar">
            <i class="nav-icon fas fa-cash-register"></i>
            <p>
              Facturacion
            </p>
          </a>
        </li>


        <li class="nav-item">
          <a href="{{ url('/dashboard/clientes') }}" class="nav-link" id="linkclientes">
            <i class="nav-icon far fa-address-card"></i>
            <p>
              Clientes
            </p>
          </a>
        </li>

        <li class="nav-item has-treeview menu-close">
          <a href="{{ url('/administracion') }}" class="nav-link " id="linkinventario">
            <i class="nav-icon fas fa-cubes"></i>
            <p>
              Inventario
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
          <li class="nav-item">
              <a href="{{ url('/ingresarmercaderia') }}" class="nav-link" id="linkproductos">
                <i class="far fa-circle nav-icon"></i>
                <p>Ingresar Mercaderia</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ url('/administracion/productos') }}" class="nav-link" id="linkproductos">
                <i class="far fa-circle nav-icon"></i>
                <p>Productos</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ url('/administracion/proveedores') }}" class="nav-link" id="linkproveedores">
                <i class="far fa-circle nav-icon"></i>
                <p>Proveedores</p>
              </a>
            </li>   
          </ul>
        </li>

        <li class="nav-item has-treeview menu-close">
          <a href="{{ url('/administracion') }}" class="nav-link " id="linkadministracion">
            <i class="nav-icon fas fa-chart-bar"></i>
            <p>
              Administracion
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ url('/administracion/reportes') }}" class="nav-link" id="linkreportes">
                <i class="far fa-circle nav-icon"></i>
                <p>Reportes</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ url('/administracion/usuarios') }}" class="nav-link" id="linkusuarios">
                <i class="far fa-circle nav-icon"></i>
                <p>Usuarios</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ url('/administracion/empresas') }}" class="nav-link" id="linkempresas">
                <i class="far fa-circle nav-icon"></i>
                <p>Empresas</p>
              </a>
            </li> 
            <li class="nav-item">
              <a href="{{ url('/administracion/mesas') }}" class="nav-link" id="linkmesas">
                <i class="far fa-circle nav-icon"></i>
                <p>Mesas</p>
              </a>
            </li>            
          </ul>
        </li>
        <li class="nav-item">
          <a href="{{ url('/logout') }}" class="nav-link" id="logout">
            <i class="nav-icon fas fa-sign-out-alt "></i>
            <p>
              Cerrar sesión
            </p>
          </a>
        </li>

      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>