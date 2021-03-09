window.addEventListener('load',inicial,false);

var contenedormesas, contenedororden, contenedorordenes;
var div_total;
var div_principal;
var div_productos;
var tabla;
var tablaCompleta;
var tabla_ordenes;
var tbody_acompanamientos;

var txtCantProd;
var txtDetProd;
var txtbuscar;
var titModal;
var txt_disponibles;
var t_orden;
var lbl_nombreProducto;
var h_mesero;

var btnnuevo;
var btneliminar;
var btn_mesas;
var btn_ordenSinMesa;
var btn_elimOrden;
var btn_guardOrden;
var btn_cocina;

var chk_entrega;
var chk_pago;

var sel_mesa;

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

function cocina(){
   window.location.href = getbaseurl()+'/cocina';
}

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
    tbody_acompanamientos = document.getElementById('tbody_acompanamientos');
    ul_tabs = document.getElementById('ul_tabs');

    txtbuscar = document.getElementById('txtbuscarNombre');
    txtCantProd = document.getElementById('txtCantidadProducto');
    txtDetProd = document.getElementById('txtdetalle');
    txt_disponibles = document.getElementById('txt_disponibles');
    titModal = document.getElementById('titleModal');
    //t_orden = document.getElementById('title_orden');
    tab = document.getElementById('tab').value;
    lbl_nombreProducto = document.getElementById('lbl_nombreProducto');
    h_mesero = document.getElementById('h_mesero');
    
    btnnuevo = document.getElementById('btnnuevo');
    btn_cocina = document.getElementById('btn_cocina');
    btneliminar = document.getElementById('btneliminar');
    btn_mesas = document.getElementById('btn_mesas');
    btn_ordenSinMesa = document.getElementById('btn_ordenSinMesa');
    btn_elimOrden = document.getElementById('btn_elimOrden');
    btn_guardOrden = document.getElementById('btn_guardOrden');

    chk_entrega = document.getElementById('checkentrega');
    chk_pago = document.getElementById('checkpago');

    sel_mesa = document.getElementById('sel_mesa');

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
    cargarMesas(false);
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
    //cargarProductos('');cargarProductos('');
    limpiarOrden();
    bloqueos('none','block','none','none','none',true);
    cargarOrden(idMesa);
}

function cargarOrden(idMesa){
  
  sel_mesa.disabled=true;

  var ord = ordenes.filter(function(o){
    return  o['mes_id']== idMesa; 
  });

  if(ord.length>0){
    //Bloqueo la lista de productos
    mostrarOrden(ord[0]['ord_id'],false,true,false);//mostraría la orden que está asociada a la mesa
    
    txtbuscar.disabled=true;
    txtbuscar.placeholder='Mesa con orden. No se permite editar orden en esta seccion';
  }else {
    $('#checkpago').bootstrapToggle('off');
    $('#checkentrega').bootstrapToggle('off');
    chk_entrega.disabled=true;
    chk_pago.disabled=true;
    cargarMesas(false);
    var mesa = mesas.filter(function(m){
      return  m['mes_id']== idMesa; 
    });
 
    /*if(mesa.length>0){//entra cuando la mesa no tiene orden
      sel_mesa.innerHTML = mesa[0]['mes_nombre'];
    }*/
    setTimeout(function () {
      selElemento(idMesa);
    }, 750);
    document.getElementById('div_chks').style.display='none';
    btn_guardOrden.style.display='block';
  }
}

function ordenSinMesa(){ 
   clickMesa = false;
   idMesa = 0;
   edicion = false;
   editando = false;
   orden_mesa = false;
   btn_elimOrden.style.display='none';
   
   limpiarOrden();
   cargarProductos('');
   bloqueos('none','block','none','none','none',false);
   $('#checkpago').bootstrapToggle('off');
   $('#checkentrega').bootstrapToggle('off');
   chk_entrega.disabled=true;
   chk_pago.disabled=true;
   
   document.getElementById('div_chks').style.display='none';
   btn_guardOrden.style.display='block';
   sel_mesa.style.display='none';
  }

function cargarMesas(est) {
  if (idUsu != null) {
    if(est){
      bloqueos('block','none','none','none','none',false);
    }
    var form = new FormData();
    form.append('id_usuario', idUsu);
    axios.post('cargarMesas',form)
          .then(function (response) {
            if(response.data.length===0){
              if(est){
                alertify.error('No hay mesas asociadas al restaurante.');
              }
            }
            mesas = response.data;
            if(est){
              div_principal.innerHTML = '';
              mostrarMesas();
            }else{
              cagarSelMesas();
            } 
          })
          .catch(function (error) {
            if(est){
              alertify.error('Ocurrio un error interno al intentar cargar las mesas. Por favor intente mas tarde.');
            }
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

function cagarSelMesas(){
  sel_mesa.style.display='block';
  sel_mesa.innerHTML = '<option value="0">Sin Mesa</option>';
  for (var i = 0; i < mesas.length; i++) {
    sel_mesa.innerHTML += '<option value="' + (mesas[i]['mes_id']) + '">' + mesas[i]['mes_nombre'] + '</option>';
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

  if(idMesa>0){
    form.append('id_mesa',idMesa);    
  }

  if(editando){
    form.append('id_orden',ideditando);
    if(chk_entrega.checked){
      form.append('entregada', 'E');
    }else{
        form.append('entregada', 'N');
    }
    if(chk_pago.checked){
      form.append('pagada', 'P');
    }else{
        form.append('pagada', 'N');
    }
    form.append('id_mesa',sel_mesa.value);

  }
  var cont = 0;

  if(!editando){
    form.append('id_usuario',idUsu);
    form.append('id_empresa',idEmp);
    var f = new Date();
    var fecha;
    var mes = f.getMonth()+1;
    //fecha = mes+'/'+f.getDate()+'/'+f.getFullYear()+' '+hora+':'+f.getMinutes()+':'+f.getSeconds();
    fecha =f.getDate()+'-'+mes+'-'+f.getFullYear()+' '+f.getHours()+':'+f.getMinutes()+':'+f.getSeconds();
    console.log('fecha:: '+fecha);    
    form.append('fecha',fecha);
  }

  for(var i=0; i < tabla.rows.length; i++){
    form.append('productos['+cont+'][0]',tabla.rows[i].cells[0].innerHTML);//id del producto
    form.append('productos['+cont+'][1]',tabla.rows[i].cells[1].innerHTML);//cantidad
    form.append('productos['+cont+'][2]',tabla.rows[i].cells[3].innerHTML);//detalle
    form.append('productos['+cont+'][3]',tabla.rows[i].cells[5].innerHTML);//id de productoxorden
    cont++;
  }
  form.append('total',div_total.innerHTML);
  if(idsPxOEliminados.length>0){
    var cont2 = 0;
    for(var k=0; k<idsPxOEliminados.length; k++){
      form.append('idsEliminados['+cont2+']',idsPxOEliminados[k]);
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
                if (response.data === 'PI'){
                  cargarProductos('');
                  alertify.error('Productos insuficientes para alguno de los productos ingresados. Revise la cantidad ingresada productos que ha ingresado');
                }else if(response.data === 'mesa_con_ordenes'){
                  alertify.error('No se puede cambiar la orden a la mesa seleccionada porque la mesa ya está asociada a una orden.');
                }else{
                  alertify.error(response.data);
                }
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
  chk_entrega.disabled=false;
  chk_pago.disabled=false;
}

function cancelarEnOrden(){
  if(clickMesa){
    bloqueos('block','none','none','none','none',false);
  }else{
    bloqueos('none','none','block','block','block',false);
  }
  editando = false;
  //mostrarProductos(true,0);
  cargarProductos('');
  chk_entrega.disabled=false;
  chk_pago.disabled=false;
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
        }else{
          categorias = response.data;
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
    ul_tabs.innerHTML +=  '<li class="nav-item">'
                              +'<button type="button" class="btn nav-link" onClick="mostrarProductos('+true+','+categorias[i]['cat_id']+')">'
                                  +categorias[i]['cat_nombre']
                              +'</button>'
                          +'</li>'; 
  }
}

function mostrarOrden(idOrden,edt,clkMesa,mostBtns){ 
  cargarMesas(false);
  mostrarProductos(false,0);
  var orden_id = idOrden;
  div_total.innerHTML='0.00';
  editando = edt;//indica si está editando o no una orden
  ideditando = idOrden;
  clickMesa = clkMesa;//indica si se accedió a parte de orden clickeado una mesa

  var prodxorden = productosOrden.filter(function(pxo){//guarda todos los productos de una orden
    return pxo['pxo_orden'] == orden_id; 
  });
  var ordenActual = ordenes.filter(function(ord){
    return ord['ord_id'] == orden_id; 
  });

  if(prodxorden.length>0){
    if(ordenActual[0]['ord_pagado']=='P'){
      $('#checkpago').bootstrapToggle('on')
    }else{    
      $('#checkpago').bootstrapToggle('off')
    }
    if(ordenActual[0]['ord_estado']=='E'){
      $('#checkentrega').bootstrapToggle('on')
    }else{    
      $('#checkentrega').bootstrapToggle('off')
    }

    if(!mostBtns){//Indica si se muestran o no los  botones de eliminar y guardar orden, eliminar registros o desabilitar los checks
      btn_elimOrden.style.display='none';
      btn_guardOrden.style.display='none';
      chk_entrega.disabled=true;
      chk_pago.disabled=true;
    }else{//Habilita elementos para edicion 
      btn_elimOrden.style.display='block';
      btn_guardOrden.style.display='block';
      chk_entrega.disabled=false;
      chk_pago.disabled=false;
    }

    h_mesero.innerHTML=ordenActual[0]['usu_nombre'];

    if(ordenActual[0]['mes_id']!=null){
      //sel_mesa.innerHTML=ordenActual[0]['mes_nombre'];
      idMesa = ordenActual[0]['mes_id'];
      setTimeout(function () {
        selElemento(idMesa);
      }, 750);
      
    }else{

      //sel_mesa.innerHTML='Orden';
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

      //div_total.innerHTML = ordenActual[0]['ord_total'];
      sumarTotal(total);
    }   
  }  
}

function selElemento(valueToSelect) {
  sel_mesa.value = valueToSelect;
}

function agregarProductoOrden(){//se ejecuta cuando se da click a un producto
  prod_id = this.id;
  txtCantProd.value='';
  txtDetProd.value='';
  producto = productos.filter(function(pro){
    return pro['pro_id'] == prod_id; 
  });
  if(producto.length>0){
    lbl_nombreProducto.innerHTML = producto[0]['pro_nombre'];
    txt_disponibles.innerHTML='';
    txt_disponibles.innerHTML= 'Disponibles: '+producto[0]['pro_cantidad'];
    txtCantProd.focus();
    mostrarInfoProductoXOrden(producto[0]['pro_id']);
  }
}

function agregarInfoProducto(){//se invoca cuando le da ok a la ventana modal
  if(txtCantProd.value != null && txtCantProd.value != '' && txtCantProd.value != '0'){
      cant = txtCantProd.value;
      if(producto.length>0){
        if(cant <= producto[0]['pro_cantidad']){
          document.getElementById('btn_close').click();
          if(valExistenciaProdTabla(producto[0]['pro_id'],producto[0]['pro_precio'],producto[0]['pro_nombre'],txtDetProd.value,cant)){
            //alertify.success('Producto ya existente en la tabla. Se agregó la información ingresada al producto');
          }else{
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
                                  +'</td>'
                                  +'<td>'+txtDetProd.value+'</td>'
                                  +'<td>'+total+'</td>'
                                  +'<td hidden>0</td>'
                                  +'<td>'
                                    +'<button type="button" class="btn btn-outline-dark mt-1 mr-1 btns" onclick="eliminar(event)">❌</button>'
                                  +'</td>'
                                +'</tr>';
              sumarTotal(total);
          }
        
        }else{
          alertify.error('Productos insuficientes. La cantidad de productos disponibles es: '+producto[0]['pro_cantidad']);
        }
      }
  }else{
      txtCantProd.style.borderColor = "red";
      setTimeout(function () {
          txtCantProd.style.borderColor = "gray";
      }, 500);
  }
}

function mostrarInfoProductoXOrden(prod_id){
  for(var i=0; i < tabla.rows.length; i++){
    if(prod_id == tabla.rows[i].cells[0].innerHTML){ 
      txtCantProd.value=tabla.rows[i].cells[1].innerHTML;
      txtDetProd.value=tabla.rows[i].cells[3].innerHTML;
      return true;
    }
  }
  return false;
}

function valExistenciaProdTabla(prod_id,pro_precio,pro_nombre,det,cant){
  for(var i=0; i < tabla.rows.length; i++){
    if(prod_id == tabla.rows[i].cells[0].innerHTML){ 
      var total = cant * pro_precio;
      restarTotal(parseInt(tabla.rows[i].cells[4].innerHTML));
      tabla.rows[i].cells[1].innerHTML =  cant;
      tabla.rows[i].cells[2].innerHTML = '<td>'
                                            +'<div class="col1_orden">'
                                                +pro_nombre+' x '+cant
                                                +'<label class="precio"> '
                                                    +pro_precio
                                                +'</label>'
                                          +'</div>'
      tabla.rows[i].cells[3].innerHTML = det;                                  
      tabla.rows[i].cells[4].innerHTML = total;
      sumarTotal(total); 
      
      return true;
    }
  }
  return false;
}

function sumarTotal(precio){
  div_total.innerHTML = parseInt(div_total.innerHTML) + precio;
  div_total.innerHTML += '.00';
  if(document.getElementById('div_chks').style.display=='none'){
    document.getElementById('div_chks').style.display='block'
  }
}

function restarTotal(precio){
  var precioActual = parseInt(div_total.innerHTML);
  div_total.innerHTML = precioActual - precio;
  div_total.innerHTML += '.00';
  if(precioActual - precio == 0){
    document.getElementById('div_chks').style.display='none'
  }
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
  btn_cocina.style.display=btnMesas;
  btn_ordenSinMesa.style.display=btnOrdenSinMesa;
  //if(contOrden=='block'){
    //console.log('Entro al contenedor de orden');
    //mostrarCategorias();
  //}
  
  //tablaCompleta.disabled=true;//btn//div_productos.disabled=disb;
}

function visualizarOrden(idOrden){
  sel_mesa.disabled=false;
  bloqueos('none','block','none','none','none',false);
  limpiarOrden();
  cargarProductos('');
  idsPxOEliminados=new Array();
  contIds=0; 
  mostrarOrden(idOrden,true,false,true);
}

function mostrarAcomp(){
  //tbody_acompanamientos.innerHTML = '';
 //productos.forEach(producto => {
    //tbody_acompanamientos.innerHTML += '<tr><td><input type="checkbox" class="ml-5" checked></td><td>Producto 1</td></tr>';
    //tbody_acompanamientos.innerHTML += '<tr><td><input type="checkbox" class="ml-5" checked></td><td>Producto 2</td></tr>';
    /*if(producto['pro_controlInventario'] == 's'){
        tabla.innerHTML += '<tr><td>'+producto['pro_nombre']+'</td><td>'+producto['pro_proNombre']+'</td><td>'+producto['pro_precio']+'</td><td><input type="checkbox" class="ml-5" disabled checked></td><td>'+producto['pro_cantidad']+'</td><td>'+verUnidad(producto['pro_unidadMedida'])+'<td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+producto['pro_id']+')">Visualizar</button></td><td><button type="button" class="btn btn-primary ml-2" onClick="categorias('+producto['pro_id']+')">Categorias</button></td></tr>';
    }else{
        tabla.innerHTML += '<tr><td>'+producto['pro_nombre']+'</td><td>'+producto['pro_proNombre']+'</td><td>'+producto['pro_precio']+'</td><td><input type="checkbox" class="ml-5" disabled></td><td>'+producto['pro_cantidad']+'</td><td>'+verUnidad(producto['pro_unidadMedida'])+'</td><td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+producto['pro_id']+')">Visualizar</button></td><td><button type="button" class="btn btn-primary ml-2" onClick="categorias('+producto['pro_id']+')">Categorias</button></td></tr>';
    }*/
 // });
}

