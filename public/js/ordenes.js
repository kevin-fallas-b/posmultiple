window.addEventListener('load',inicial,false)

var nuevaorden;
var div_principal;
var div_productos;
var mesas;//array que contiene el resultado de la busqueda de las mesas de la empresa
var mesasAux;
var productos;
var productosAux;

var contenedormesas;
var contenedororden;
var btnnuevo;
var btneliminar;

var editando;//bandera
var ideditando;

var idUsu;
var idEmp;

var tab;

var txtbuscar;
var a_productos;
var tabla;

function inicial() {    
    alertify.set('notifier', 'position', 'top-right');

    contenedormesas = document.getElementById('contenedormesas');
    contenedororden = document.getElementById('contenedororden');
    txtbuscar = document.getElementById('txtbuscar');

    div_principal = document.getElementById('div_principal');
    div_productos = document.getElementById('div_productos');
    
    btnnuevo = document.getElementById('btnnuevo');
    btneliminar = document.getElementById('btneliminar');

    idUsu = document.getElementById('idusuario').value;
    idEmp = document.getElementById('idempresa').value;
    tab = document.getElementById('tab').value;

    tabla =  document.getElementById('tabla_productos').getElementsByTagName('tbody')[0];

    if(tab=='noseleccionado'){
      cargarMesas();
      console.log('actualizadassso');
    }
    
    limpiarcampos();
}

function limpiarcampos(){
  tabla.innerHTML = '';
/*  editando = false;
  ideditando =-1;*/
}

function onClick(){
    nuevaOrden();
    //var orden;
    //editando=true;
   // ideditando=this.id;
    /**id de la mesa
     * producto, precio y cantidad
     * id del usuario mesero
     * 
     * tbl_orden: ord_id, ord_usu, ord_hora (Date), ord_emp,
     * 
     * tbl_producto: pro_id, pro_proveedor, pro_nombre, pro_descripcion, pro_precio, pro_controlInventario, pro_cantidad,
     *               pro_codigo, pro_unidadMedida, pro_cabys, pro_tarifaImpuesto, pro_emp
     * 
     * tbl_productoxorden: pxo_id, pxo_producto, pxo_orden, pxo_cantidad, pxo_detalles
     * 
     */
    //console.log(this.id);
    /*for(var i=0;i<mesas.length;i++){
        if(mesas[i]['mes_id']==this.id){
            mesa = mesas[i];
            break;
        }
    }
    txtnombre.value=mesa['mes_nombre'];
    txtdescripcion.value=mesa['mes_descripcion'];
    if(mesa['mes_imagen']=='mesa.png'){
      document.querySelector('[value="mesa.png"]').checked = true;
    }else if(mesa['mes_imagen']=='mesa2.png'){
      document.querySelector('[value="mesa2.png"]').checked = true;
    }else{
      document.querySelector('[value="mesa3.png"]').checked = true;
    }
    btneliminar.removeAttribute('disabled');*/
}

function cargarMesas() {
  if (idUsu != null) {
      var form = new FormData();
      form.append('id_usuario', idUsu);
      axios.post('cargarMesas',form)
          .then(function (response) {
            if(response.data.length===0){
              alertify.error('No hay mesas asociadas al restaurante.');
            }
            mesas = response.data;
            div_principal.innerHTML = '';
            mostrarMesas();    
          })
          .catch(function (error) {
            alertify.error('Ocurrio un error interno al intentar cargar las mesas. Por favor intente mas tarde.');
          })
  }
}

function mostrarMesas(){
  for (var i = 0; i < mesas.length; i++) {
    div_principal.innerHTML+="<div class='draggable' id='"+mesas[i]['mes_id']+"'><img src='/img/"+mesas[i]['mes_imagen']+"'><div class='label_icon'>"+mesas[i]['mes_nombre']+"</div></div>";
  }
  mesasAux = document.getElementsByClassName('draggable');

  for(var i=0; i<mesasAux.length; i++){  
    if(mesas[i]['mes_id']==mesasAux[i].id){
      draggable = new PlainDraggable(mesasAux[i]);
      self = draggable.setOptions({left: mesas[i]['mes_posicionX'],top: mesas[i]['mes_posicionY']});
      mesasAux[i].addEventListener('touchstart',onClick,false);
      mesasAux[i].addEventListener('click',onClick,false);
      onDrag();
    }
  }
}

function onDrag(){
  draggable.onDrag = function(newPosition) {
    newPosition.top = this.rect.top;
    newPosition.left = this.rect.left;     
  };
}

function guardarOrden(){
  /*if (validarcampos()) {
    var form = new FormData();//ates de calcular posiocion libre
    if (!editando) {
    }
    if (editando) {
      form.append('id', ideditando);
    }
    axios.post('guardarOrden', form)
        .then(function (response) {
            if (response.data === 'exito') {
              if (editando) {
                alertify.success('Orden editada correctamente.');
              } else {
                alertify.success('Orden registrada correctamente.');
              } 
              cancelar();
              //cargarMesas(idUsu);
              
            } else {
                alertify.error(response.data);
            }
        })
        .catch(function (error) {
            alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
        })
  }*/
}

function eliminar(){
  //ideditando
  /*var x = confirm("¿Desea eliminar la información de la orden?");
  if (x){
      eliminarOrden();
  }*/
}

function eliminarOrden(){
  /*var form = new FormData();
  form.append('id',ideditando);
  axios.post('eliminarOrden',form)
      .then(function(response){
          if(response.data === 'exito'){
              alertify.success('Orden eliminada correctamente.');
              cancelar();
              cargarMesas(idUsu);
          }else{
              alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
          }
      })
      .catch(function(error){
          alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
      })*/
}

function validarcampos() {
  /*Çif (txtNombreMesa.value=='' || txtNombreMesa.value == null) {//if (!stringvalido(txtNombreMesa.value, 50)) {
      alertify.error('Existen errores en los campos.')
      return false;
  }*/
  return true;
}

function nuevaOrden(){
  contenedormesas.style.display='none';
  contenedororden.style.display='block';
  cargarProductos('');
  //mostrarProductos();    
}

function cancelar(){
  contenedororden.style.display='none';
  contenedormesas.style.display='block';
  //limpiarcampos();
}

function buscarProductoPorNombre(texto){
  var producto = productos.filter(function(pro){
    return  pro['pro_nombre'].toLowerCase().indexOf(texto.toLowerCase()) >= 0; 
  });
  div_productos.innerHTML='';
  if(producto.length>0){
    for (var i = 0; i < producto.length; i++) {
      div_productos.innerHTML+="<div class='producto mt-1' id='"+producto[i]['pro_id']+"'><div class='label_icon'>"+producto[i]['pro_nombre']+"</div></div>";
    }
  }
}

function buscarProductoPorCodigo(texto){
  var producto = productos.filter(function(pro){
    return  pro['pro_codigo'].toLowerCase().indexOf(texto.toLowerCase()) >= 0; 
  });
  div_productos.innerHTML='';
  if(producto.length>0){
    for (var i = 0; i < producto.length; i++) {
      div_productos.innerHTML+="<div class='producto mt-1' id='"+producto[i]['pro_id']+"'><div class='label_icon'>"+producto[i]['pro_nombre']+"</div></div>";
    }
  }
}

function cargarProductos(nombre){
  if(idEmp != null){
      var form = new FormData();
      form.append('id_empresa', 1);//idEmp
      form.append('nombre',nombre);
      axios.post('cargarProductos',form)
          .then(function (response) {
            if(response.data.length===0){
              alertify.error('No hay productos asociados a la empresa.');
            }
            productos = response.data;
            mostrarProductos();
          })
          .catch(function (error) {
            console.log(error);
            alertify.error('Ocurrio un error interno al intentar cargar los productos. Por favor intente mas tarde.');
          })
  }
} 
 
function mostrarProductos(){
  div_productos.innerHTML="";
  for (var i = 0; i < productos.length; i++) {
    div_productos.innerHTML+="<div class='producto mt-1' id='"+productos[i]['pro_id']+"'><div class='label_icon'>"+productos[i]['pro_nombre']+"</div></div>";
  }
  productosAux = document.getElementsByClassName('producto');
  for(var i=0; i<productosAux.length; i++){  
    productosAux[i].addEventListener('click',agregarProductoOrden,false);
  }
}

function mostrarEntradas(){
  console.log('Ha hecho click en el tab de mostrar entradas');
}

function mostrarBebidas(){
  console.log('Ha hecho click en el tab de mostrar bebidas');
}

function agregarProductoOrden(){
  var prod_id = this.id;
  var producto = productos.filter(function(pro){
    return pro['pro_id'] == prod_id; 
  });
  
  if(producto.length>0){
    //llamar a la ventana modal
    //
    //var total = 3*producto[0]['pro_precio'];
    //tabla.innerHTML += '<tr><td><label>'+producto[0]['pro_nombre']+' x 3 </label><br><label> '+producto[0]['pro_precio']+'</label></td><td>'+total+'</td></tr>';
  }
}