window.addEventListener('load',inicial,false)

var contenedormesas, contenedororden, contenedorordenes;
var div_total;
var div_principal;
var div_productos;
var tabla;
var tablaCompleta;
var tabla_ordenes;

var txtCantProd;
var txtDetProd;
var txtbuscar;
var titModal;
var t_orden;
var lbl_nombreProducto;
var h_mesero;

var btnnuevo;
var btneliminar;
var btn_mesas;
var btn_ordenSinMesa;
var btn_elimOrden;
var btn_guardOrden;

var a_productos;
var nuevaorden;
var tab;
var ul_tabs;

var idUsu;
var idEmp;
var idMesa;
var prod_id;
var editando;//bandera
var ideditando;

var mesas;//array que contiene el resultado de la busqueda de las mesas de la empresa
var mesasAux;
var productos;
var productosOrden;
var producto;
var productosAux;
var ordenes;
var ordenSel;
var categorias;

var cant;
var edicion;
var orden_mesa;
var ind_elim;
var idsPxOEliminados;
var contIds;
var clickMesa;

function inicial() {    
    alertify.set('notifier', 'position', 'top-right');
    idsPxOEliminados = new Array();
    contIds = 0;
    contenedormesas = document.getElementById('contenedormesas');
    contenedororden = document.getElementById('contenedororden');
    contenedorordenes = document.getElementById('contenedorOrdenes');
    div_total = document.getElementById('col_total');
    div_principal = document.getElementById('div_principal');
    div_productos = document.getElementById('div_productos');
    tabla_ordenes = document.getElementById('tbody_ordenes');
    tabla =  document.getElementById('tabla_productos').getElementsByTagName('tbody')[0];
    tablaCompleta = document.getElementById('tabla_productos');
    ul_tabs = document.getElementById('ul_tabs');

    txtbuscar = document.getElementById('txtbuscarNombre');
    txtCantProd = document.getElementById('txtCantidadProducto');
    txtDetProd = document.getElementById('txtdetalle');
    titModal = document.getElementById('titleModal');
    t_orden = document.getElementById('title_orden');
    tab = document.getElementById('tab').value;
    lbl_nombreProducto = document.getElementById('lbl_nombreProducto');
    h_mesero = document.getElementById('h_mesero');
    
    btnnuevo = document.getElementById('btnnuevo');
    btneliminar = document.getElementById('btneliminar');
    btn_mesas = document.getElementById('btn_mesas');
    btn_ordenSinMesa = document.getElementById('btn_ordenSinMesa');
    btn_elimOrden = document.getElementById('btn_elimOrden');
    btn_guardOrden = document.getElementById('btn_guardOrden');

    idUsu = document.getElementById('idusuario').value;
    idEmp = document.getElementById('idempresa').value;
    pro_id = 0;
    idMesa = 0;

    cant = 0;    

    edicion = false;
    editando = false;
    orden_mesa = false;
    ind_elim = false;
    clickMesa = false;

    if(tab=='todos'){
      cargarOrdenes();
      cargarProductosOrden();
    }
    cargarCategorias();
   // mostrarCategorias();
}

function limpiarOrden(){
  tabla.innerHTML = '';
  div_total.innerHTML = '0.00';
}

function orden(){//se invoca cuando se hace click a una mesa, por tanto existe un id de mesa
    idMesa = this.id;
    clickMesa = true;
    editando = false;//aunque la mesa tuviera una orden, no se edita desde esta parte
    btn_elimOrden.style.display='none';
    limpiarOrden();
    bloqueos('none','block','none','none','none',true);
 
    cargarOrden(idMesa);//falta, muestra la orden si la mesa tiene
    //un metodo que bloquee los productos
}

function cargarOrden(idMesa){
  //si la mesa tiene una orden, orden_cargada = true
  var ord = ordenes.filter(function(o){
    return  o['mes_id']== idMesa; 
  });

  if(ord.length>0){
    mostrarOrden(ord[0]['ord_id'],false,true,false);//mostraría la orden que está asociada a la mesa
    
  }else {
    var mesa = mesas.filter(function(m){
      return  m['mes_id']== idMesa; 
    });
 
    if(mesa.length>0){
      t_orden.innerHTML = mesa[0]['mes_nombre'];
        
    }
  }
}

function ordenSinMesa(){
   t_orden.innerHTML='Orden';
   clickMesa = false;
   idMesa = 0;
   edicion = false;
   editando = false;
   orden_mesa = false;
   btn_elimOrden.style.display='none';
   t_orden.innerHTML='Orden';
   
   limpiarOrden();
   cargarProductos('');
   bloqueos('none','block','none','none','none',false);
   //div_productos.style.disabled=true;
}

function cargarMesas() {
  if (idUsu != null) {
    bloqueos('block','none','none','none','none',false);
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
      mesasAux[i].addEventListener('touchstart', orden,false);
      mesasAux[i].addEventListener('click',orden,false);
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
  if(tabla.rows.length>0){
  var form = new FormData();

  console.log(idMesa);
  if(idMesa>0){
    form.append('id_mesa',idMesa);    
  }

  if(editando){
    form.append('id_orden',ideditando);
  }
  var cont = 0;
  var f = new Date();
  var fecha;
  var mes = f.getMonth()+1;
  fecha = f.getDate()+'-'+mes+'-'+f.getFullYear();

  form.append('id_usuario',idUsu);
  form.append('id_empresa',idEmp);
  form.append('fecha',fecha);
    
  //enviamos el id del producto, la cantidad y el detalle
  console.log(tabla.rows.length);
  for(var i=0; i < tabla.rows.length; i++){
    form.append('productos['+cont+'][0]',tabla.rows[i].cells[0].innerHTML);//id del producto
    form.append('productos['+cont+'][1]',tabla.rows[i].cells[1].innerHTML);//cantidad
    form.append('productos['+cont+'][2]',tabla.rows[i].cells[3].innerHTML);//detalle
    form.append('productos['+cont+'][3]',tabla.rows[i].cells[5].innerHTML);//id de productoxorden
    cont++;
  }
  if(idsPxOEliminados.length>0){
    var cont2 = 0;
    console.log(idsPxOEliminados);
    for(var k=0; k<idsPxOEliminados.length; k++){
      form.append('idsEliminados['+cont2+']',idsPxOEliminados[k]);
      console.log(idsPxOEliminados[cont2]);
      cont2++;
    }
  }
  axios.post('guardarOrden', form)
        .then(function (response) {
            if (response.data === 'exito') {
              if (editando) {
                alertify.success('Orden editada correctamente.');
              } else {
                alertify.success('Orden registrada correctamente.');
              } 
              cargarOrdenes();
              cargarProductosOrden();
              cancelarEnOrden();
            } else {
                console.log(response);
                alertify.error(response.data);
            }
        })
        .catch(function (error) {
            alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
        })
  }else{
    alertify.error('La orden debe tener al menos un producto.');
  }
}

function eliminar(event){
  var tr = event.target.parentNode.parentNode;
  restarTotal(parseInt(tr.children[4].innerHTML));
  if(editando){
    idsPxOEliminados[contIds]=parseInt(tr.children[5].innerHTML);
    contIds++; 
  }
	tr.parentNode.removeChild(tr);  
}



function eliminarOrden(){
  var x = confirm("¿Desea eliminar la información de la orden?");
  if (x){
    var form = new FormData();
    console.log('id de la orden: '+ideditando);
    form.append('id_orden',ideditando);
    axios.post('eliminarOrden',form)
        .then(function(response){
          if(response.data === 'exito'){
            alertify.success('Orden eliminada correctamente.'); 
            cargarOrdenes();
            cargarProductosOrden();
            cancelarEnOrden();
          }else{
            alertify.error('error');alertify.error('Ocurrio jjjjun error interno al intentar eliminar. Por favor intente mas tarde.');
          }  
          
         
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
        })       
  }  
}

function validarcampos() {
  return true;
}

function cancelarEnMesas(){
  bloqueos('none','none','block','block','block',false);
  clickMesa=false;
  
}

function cancelarEnOrden(){
  if(clickMesa){
    bloqueos('block','none','none','none','none',false);
  }else{
    bloqueos('none','none','block','block','block',false);
  }
  editando = false;
  mostrarProductos(true,0);
}

function buscarProductoPorNombre(texto){
  var producto = productos.filter(function(pro){
    return  pro['pro_nombre'].toLowerCase().indexOf(texto.toLowerCase()) >= 0; 
  });
  div_productos.innerHTML='';
  if(producto.length>0){
    for (var i = 0; i < producto.length; i++) {
      div_productos.innerHTML+="<div class='producto mt-1 ml-1' id='"+producto[i]['pro_id']+"' data-bs-toggle='modal' data-bs-target='#cantProdModal'><div class='hijo_divProducto'>"+producto[i]['pro_nombre']+"</div></div>";
    }

    var prods = document.getElementsByClassName('producto');
    for(var i=0; i<prods.length; i++){  
      prods[i].addEventListener('click',agregarProductoOrden,false);
    }
  }
}

function cargarProductos(nombre){
  if(idEmp != null){
      var form = new FormData();
      form.append('id_empresa', idEmp);
      form.append('nombre',nombre);
      axios.post('cargarProductos',form)
          .then(function (response) {
            if(response.data.length===0){
              alertify.error('No hay productos asociados a la empresa.');
            }
            productos = response.data;
            mostrarProductos(true,0);
          })
          .catch(function (error) {
            console.log(error);
            alertify.error('Ocurrio un error interno al intentar cargar los productos. Por favor intente mas tarde.');
          })
  }
}
 
function mostrarProductos(mostrar,cat_id){
  div_productos.innerHTML="";
  txtbuscar.disabled=false;
  txtbuscar.placeholder="Buscar por nombre";
  var prodts;
  if(mostrar){
    if(cat_id > 0){
      var cId = cat_id;
      console.log('mostrarProductos: '+cat_id);
      prodts = productos.filter(function(c){
        return  c['cat_id'] == cId; 
      });
    }else{
      prodts = productos;
    }
    if(prodts.length>0){
      for (var i = 0; i < prodts.length; i++) {
        div_productos.innerHTML+="<div class='producto mt-1 ml-1' id='"+prodts[i]['pro_id']+"' data-bs-toggle='modal' data-bs-target='#cantProdModal'><div class='hijo_divProducto'>"+prodts[i]['pro_nombre']+"</div></div>";
      }
      productosAux = document.getElementsByClassName('producto');
      for(var i=0; i<productosAux.length; i++){  
        productosAux[i].addEventListener('click',agregarProductoOrden,false);
      }
    }
  }else{
    txtbuscar.disabled=true;
    txtbuscar.placeholder='Mesa con orden. No se permite editar orden en esta seccion';
  }
}

function cargarCategorias(){
  var form = new FormData();
  form.append('id_empresa', idEmp);
  axios.post('cargarCategoriasEmpresa',form)
      .then(function (response) {
        if(response.data.length===0){
          //alertify.error('No hay productos con ordenes asociadas.');
          console.log(response.data);
        }else{
          categorias = response.data;
          console.log(categorias);
          mostrarCategorias();
        }
      })
      .catch(function (error) {
        alertify.error('Ocurrio un error interno al intentar cargar los productos de la orden. Por favor intente mas tarde.');
      })
}

function mostrarCategorias(){
  var btnTodo = ul_tabs.innerHTML;
  ul_tabs.innerHTML = '';
  ul_tabs.innerHTML += btnTodo;
  //var tb = '<li class="nav-item"> <button type="button" class="btn nav-link" onClick="mostrarProductos('+categorias[0]['cat_id']+','+true+')">'+categorias[0]['cat_nombre']+'</button></li>'; 
  //ul_tabs.innerHTML += tab;
  /*'
   */
  for(var i=0; i<categorias.length; i++){
    console.log(categorias[i]['cat_id']+' - '+categorias[i]['cat_nombre']); 
    ul_tabs.innerHTML +=  '<li class="nav-item">'
                              +'<button type="button" class="btn nav-link" onClick="mostrarProductos('+true+','+categorias[i]['cat_id']+')">'
                                  +categorias[i]['cat_nombre']
                              +'</button>'
                          +'</li>'; 
  }
}

function mostrarOrden(idOrden,edt,clkMesa,mostBtns){
  mostrarProductos(false,0);
  var orden_id = idOrden;
  div_total.innerHTML='0.00';
  editando = edt;
  ideditando = idOrden;
  clickMesa = clkMesa;

  if(!mostBtns){
    btn_elimOrden.style.display='none';
    btn_guardOrden.style.display='none';
  }else{
    btn_elimOrden.style.display='block';
    btn_guardOrden.style.display='block';
  }

  var prodxorden = productosOrden.filter(function(pxo){//guarda todos los productos de una orden
    return pxo['pxo_orden'] == orden_id; 
  });
  console.log(prodxorden.length);
  var ordenActual = ordenes.filter(function(ord){
    return ord['ord_id'] == orden_id; 
  });
  
  if(prodxorden.length>0){

    h_mesero.innerHTML=ordenActual[0]['usu_nombre'];

    if(ordenActual[0]['mes_id']!=null){
      t_orden.innerHTML=ordenActual[0]['mes_nombre'];
      idMesa = ordenActual[0]['mes_id'];
    }else{
      t_orden.innerHTML='Orden';
      idMesa = 0;
    }
    
    for(var i=0; i<prodxorden.length; i++){
      var btnElim;
      if(mostBtns){
          btnElim = '<button type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="eliminar(event)">❌</button>';
      }else{
        btnElim='<button type="button" class="btn btn-outline-dark mt-1 mr-1 btns"></button>'
      }
      var total = prodxorden[i]['pxo_cantidad'] * prodxorden[i]['pro_precio'];
      tabla.innerHTML += '<tr>'
                            +'<td hidden>'+prodxorden[i]['pro_id']+'</td>'
                            +'<td hidden>'+prodxorden[i]['pxo_cantidad']+'</td>' 
                            +'<td>'
                                +'<div class="col1_orden">'
                                    +prodxorden[i]['pro_nombre']+' x '+prodxorden[i]['pxo_cantidad']
                                    +'<label class="precio"> '
                                        +prodxorden[i]['pro_precio']
                                    +'</label>'
                                +'</div>'
                            +'</td>'
                            +'<td>'+prodxorden[i]['pxo_detalles']+'</td>'
                            +'<td>'+total+'</td>'
                            +'<td hidden>'+prodxorden[i]['pxo_id']+'</td>'
                            +'<td>'+btnElim+'</td>'
                         +'</tr>';
      sumarTotal(total);
    }   
  }  
}

function agregarProductoOrden(){
  prod_id = this.id;
  txtCantProd.value='';
  txtDetProd.value='';
  producto = productos.filter(function(pro){
    return pro['pro_id'] == prod_id; 
  });

  if(producto.length>0){
    lbl_nombreProducto.innerHTML = producto[0]['pro_nombre'];
    txtCantProd.focus();
  }
}

function agregarInfoProducto(){
  if(txtCantProd.value != null && txtCantProd.value != '' && txtCantProd.value != '0'){
      cant = txtCantProd.value;
      document.getElementById('btn_close').click();
      if(producto.length>0){
        var total = cant * producto[0]['pro_precio'];
        tabla.innerHTML += '<tr>'
                              +'<td hidden>'+producto[0]['pro_id']+'</td>'
                              +'<td hidden>'+cant+'</td>' 
                              +'<td>'
                                  +'<div class="col1_orden">'
                                      +producto[0]['pro_nombre']+' x '+cant
                                      +'<label class="precio"> '
                                          +producto[0]['pro_precio']
                                      +'</label>'
                                  +'</div>'
                              +'<td>'+txtDetProd.value+'</td>'                                  
                              +'</td>'
                              +'<td>'+total+'</td>'
                              +'<td hidden>0</td>'
                              +'<td>'
                                +'<button type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="eliminar(event)">❌</button>'
                              +'</td>'
                            +'</tr>';
          sumarTotal(total);
      }
  }else{
      txtCantProd.style.borderColor = "red";
      setTimeout(function () {
          txtCantProd.style.borderColor = "gray";
      }, 500);
  }
}

function sumarTotal(precio){
  div_total.innerHTML = parseInt(div_total.innerHTML) + precio;
  div_total.innerHTML += '.00'; 
}

function restarTotal(precio){
  div_total.innerHTML = parseInt(div_total.innerHTML) - precio;
  div_total.innerHTML += '.00';
}

function cargarOrdenes(){//carga ordenes, con información de empresa, usuario, productos
  if (idUsu != null) {
    bloqueos('none','none','block','block','block',false);
    var form = new FormData();
    form.append('id_empresa', idEmp);
    axios.post('cargarOrdenes',form)
        .then(function (response) {
          if(response.data.length===0){
            alertify.error('No hay ordenes asociadas.');
          }else{
            ordenes = response.data;
            console.log(ordenes);
            mostrarOrdenes();
          }
        })
        .catch(function (error) {
          alertify.error('Ocurrio un error interno al intentar cargar las ordenes. Por favor intente mas tarde.');
        })
  }
}

function cargarProductosOrden(){//carga ordenes, con información de empresa, usuario, productos
  if (idUsu != null) {
    var form = new FormData();
    form.append('id_empresa', idEmp);
    axios.post('cargarProductosOrden',form)
        .then(function (response) {
          if(response.data.length===0){
            alertify.error('No hay productos con ordenes asociadas.');
          }else{
            productosOrden = response.data;
            console.log(productosOrden);
          }
        })
        .catch(function (error) {
          alertify.error('Ocurrio un error interno al intentar cargar los productos de la orden. Por favor intente mas tarde.');
        })
  }
}


function mostrarOrdenes(){//muestra nombre del mesero, hora, estado de entrega y estado de pago de las ordenes cargadas en una tabla
  tabla_ordenes.innerHTML='';
  for (var i = 0; i < ordenes.length; i++) {  
    var entrega,paga,mes_nombre;
    if(ordenes[i]['ord_estado'] == 'N'){
      entrega='<td>No entregada</td>';
    }else{
      entrega='<td>Entregada</td>';
    }
    if(ordenes[i]['ord_pagado'] == 'N'){
      paga='<td>No pagada</td>';
    }else{
      paga='<td>Pagada</td>';
    }
    if(ordenes[i]['mes_id']!=null){
      mes_nombre='<td>'+ordenes[i]['mes_nombre']+'</td>';
    }else{
      mes_nombre = '<td>Sin mesa</td>';
    }
    tabla_ordenes.innerHTML+='<tr>' 
                                +'<td>'+ordenes[i]['usu_nombre']+'</td>'
                                +'<td>'+ordenes[i]['ord_hora']+'</td>'  
                                +entrega
                                +paga
                                +mes_nombre                              
                                +'<td><button type="button" class="btn btn-primary" onClick="visualizarOrden('+ordenes[i]['ord_id']+')">Ver/Editar</button></td>'
                            +'</tr>';
  }
}

function bloqueos(contMesas,contOrden,contOrdenes,btnMesas,btnOrdenSinMesa,disb){  
  contenedormesas.style.display=contMesas;
  contenedororden.style.display=contOrden;
  contenedorordenes.style.display=contOrdenes;
  btn_mesas.style.display=btnMesas;
  btn_ordenSinMesa.style.display=btnOrdenSinMesa;
  //if(contOrden=='block'){
    //console.log('Entro al contenedor de orden');
    //mostrarCategorias();
  //}
  
  //tablaCompleta.disabled=true;//btn//div_productos.disabled=disb;
}

function visualizarOrden(idOrden){
  bloqueos('none','block','none','none','none',false);
  limpiarOrden();
  cargarProductos('');
  idsPxOEliminados=new Array();
  contIds=0; 
  mostrarOrden(idOrden,true,false,true);
}

