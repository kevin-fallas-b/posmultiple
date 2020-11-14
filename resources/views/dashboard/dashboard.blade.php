<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <link rel="icon" href="{{ url('/img/logo.png') }}" type="image/x-icon">

  <title>P.O.S Multiple</title>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="{{ url('/bower_components/admin-lte/plugins/fontawesome-free/css/all.min.css') }}">
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="{{ url('/css/dashboard.css') }}">
  <link rel="stylesheet" href="{{ url('/css/alertify.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ url('/bower_components/admin-lte/dist/css/adminlte.min.css') }}">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <!-- REQUIRED SCRIPTS -->
  <script src="{{ url('/js/posmultiple.js') }}"></script>
  <script src="{{ url('/js/alertify.min.js') }}"></script>
  <script src="{{ url('/js/axios.min.js') }}"></script>
  <!-- jQuery -->
  <script src="{{ url('/bower_components/admin-lte/plugins/jquery/jquery.min.js') }}"></script>
  <!-- Bootstrap 4 -->
  <script src="{{ url('/bower_components/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
  <!-- AdminLTE App -->
  <script src="{{ url('/bower_components/admin-lte/dist/js/adminlte.min.js') }}"></script>
</head>




<body class="hold-transition sidebar-mini sidebar-collapse">

  <?php

  use Illuminate\Support\Facades\URL;


  if (!isset($_SESSION['user'])) {
    header('Location: ' . URL::to('/nolog'), true, 307);
    die();
  }
  ?>
  <div class="wrapper">


    @include('dashboard/header')

    @include('dashboard/sidebar')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">

      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        @yield('content')
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->


    </div>



    @include('dashboard/footer')

    <!-- ./wrapper -->

</body>

</html>