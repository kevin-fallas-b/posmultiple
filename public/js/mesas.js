window.addEventListener('load',inicial,false)

var draggable;
var nuevaorden;
var div_principal;
var opciones;
var mesas;//array que contiene el resultado de la busqueda de las mesas de la empresa
var mesasAux;
var mesasAux2;
var finArrastre;//Bandera que se habilita cuando un elemento arrastrado es soltado y evitar que lo tome como un click
var temporizador;//temporizador para desabilitar la bandera finArrastre 
var espaciosOcup;
var derecha;
var abajo;
var izquierda;
var arriba;

var coordLeft;
var coordTop;

var contenedormesas;
var contenedorcampos;
var btnnuevo;
var btneliminar;

var txtnombre;
var txtdescripcion;

var editando;//bandera
var ideditando;

var idUsu;

var height;
var width;

function inicial() {
    espaciosOcup = new Array();
    finArrastre=false;
    
    alertify.set('notifier', 'position', 'top-right');

    contenedormesas = document.getElementById('contenedormesas');
    contenedorcampos = document.getElementById('contenedorcampos');

    txtnombre = document.getElementById('txtnombre');
    txtdescripcion = document.getElementById('txtdescripcion');
    
    div_principal = document.getElementById('div_principal');
    height = div_principal.clientHeight;
    width = div_principal.clientWidth;

    btnnuevo = document.getElementById('btnnuevamesa');
    btneliminar = document.getElementById('btneliminar');

    idUsu = document.getElementById('idusuario').value;
    idEmp = document.getElementById('idempresa').value;

    cargarMesas(idUsu);

    limpiarcampos();

    console.log('actualizado');
}

function limpiarcampos(){
  txtnombre.value = '';
  txtdescripcion.value = '';

  editando = false;
  ideditando =-1;
}

function onDragStart(){//como un click
  draggable.onDragStart = function(pointerXY) {
  };
}

function onDrag($idMesa){
  draggable.onDrag = function(newPosition) {
    finArrastre=true;
    
    for(var i=0; i<espaciosOcup.length; i++) {
      for(var j=0; j<espaciosOcup[i].length; j++) {
        if(j==2){//estaría en la columna de id
          if(espaciosOcup[i][j]!=$idMesa){//diferente al id de la mesa actual
           izquierda = espaciosOcup[i][0];
           arriba = espaciosOcup[i][1];
           derecha = izquierda + 64;
           abajo = arriba + 64;

            var dx = newPosition.left - izquierda;
            var dy = newPosition.top - arriba;
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 64) {
              newPosition.top = this.rect.top;
              newPosition.left = this.rect.left;
            }
          }
        }  
      }
    }    
  };
}

function onDragEnd($idMesa){
  draggable.onDragEnd = function() {
    //cargarMesas(1);console.log(this.rect.left+' - '+this.rect.top+' - '+this.rect.right+' - '+this.rect.bottom);
    actualizarPosMesaMatriz($idMesa,this.rect.left,this.rect.top);
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      finArrastre=false;
    }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  };
}

function onTouchstart(){
  if(finArrastre==false){
    console.log('click actual: ' + this.id);
    nuevaMesa();
    var mesa;
    editando=true;
    ideditando=this.id;
    for(var i=0;i<mesas.length;i++){
        if(mesas[i]['mes_id']==this.id){
            mesa = mesas[i];
            break;
        }
    }
    txtnombre.value=mesa['mes_nombre'];
    txtdescripcion.value=mesa['mes_descripcion'];
    if(mesa['mes_imagen']=='mesa.png'){
      document.querySelector('[value="mesa.png"]').checked = true;
    }else if(mesa['mes_imagen']=='mesa3redonda.png'){
      document.querySelector('[value="mesa3redonda.png"]').checked = true;
    }else{
      document.querySelector('[value="mesa4cuadrada.png"]').checked = true;
    }
    btneliminar.removeAttribute('disabled');
  }
}

function onClick(){
  if(finArrastre==false){
    console.log('click actual: ' + this.id);
    nuevaMesa();
    var mesa;
    editando=true;
    ideditando=this.id;
    for(var i=0;i<mesas.length;i++){
        if(mesas[i]['mes_id']==this.id){
            mesa = mesas[i];
            break;
        }
    }
    txtnombre.value=mesa['mes_nombre'];
    txtdescripcion.value=mesa['mes_descripcion'];
    if(mesa['mes_imagen']=='mesa.png'){
      document.querySelector('[value="mesa.png"]').checked = true;
    }else if(mesa['mes_imagen']=='mesa3redonda.png'){
      document.querySelector('[value="mesa3redonda.png"]').checked = true;
    }else{
      document.querySelector('[value="mesa4cuadrada.png"]').checked = true;
    }
    btneliminar.removeAttribute('disabled');
  }
}

function cargarMesas(idUsuario) {
      if (idUsuario != null) {
          var form = new FormData();
          form.append('id_usuario', idUsuario);
          axios.post('cargarMesas',form)
              .then(function (response) {
                if(response.data.length===0){
                  alertify.error('No hay mesas asociadas al restaurante.');
                  btnactposmesas.setAttribute('disabled',true);
                }
                mesas = response.data;
                div_principal.innerHTML = '';
                mostrarMesas();
                
              })
              .catch(function (error) {
                //console.log(error.message);
                alertify.error('Ocurrio un error interno al intentar buscar las mesaa. Por favor intente mas tarde.');
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
      console.log('i: '+draggable.rect.top+' - '+draggable.rect.left);

      self = draggable.setOptions({left: mesas[i]['mes_posicionX'],top: mesas[i]['mes_posicionY']});
      mesasAux[i].addEventListener('touchstart',onClick,false);
      mesasAux[i].addEventListener('click',onClick,false);
      
      espaciosOcup[i]=new Array();
      espaciosOcup[i][0]=mesas[i]['mes_posicionX'];
      espaciosOcup[i][1]=mesas[i]['mes_posicionY'];
      espaciosOcup[i][2]=mesas[i]['mes_id'];
      
      onDrag(mesas[i]['mes_id']);
      onDragStart();
      onDragEnd(mesas[i]['mes_id']);
    }
  }
}

function guardarMesa(){
  if (validarcampos()) {
    if(obtenerCoord()){//calcular posiocion libre
      var form = new FormData();
      if (!editando) {
        form.append('id_emp', idEmp);
        form.append('pos_x',coordLeft);
        form.append('pos_y',coordTop);
        console.log(coordLeft+' - '+coordTop);
      }
      form.append('nombre_mesa', txtnombre.value);
      form.append('descripcion',txtdescripcion.value);
      form.append('foto', document.querySelector('input[name=foto]:checked').value);
      
      if (editando) {
        form.append('id', ideditando);
      }
      axios.post('guardarNuevaMesa', form)
          .then(function (response) {
              if (response.data === 'exito') {
                if (editando) {
                  alertify.success('Mesa editada correctamente.');
                } else {
                  alertify.success('Mesa registrada correctamente.');
                } 
                cancelar();
                cargarMesas(idUsu);
                
              } else {
                  alertify.error(response.data);
              }
          })
          .catch(function (error) {
              alertify.error(error.message);
              alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
          })
    }else{
      alertify.error('Espacio insuficiente para agregar nueva mesa');
    }
  }  
}

function eliminar(){
  //ideditando
  var x = confirm("¿Desea eliminar la información de la mesa?");
  if (x){
      eliminarMesa();
  }
}

function eliminarMesa(){
  //antes de eliminar una mesa debo validar que no tenga orden asociada
  //if(!obtenerOrdenMesa()){//pendiente validar lo de las ordenes de las mesas antes de eliminarlas
    var form = new FormData();
    form.append('id',ideditando);
    axios.post('eliminarMesa',form)
        .then(function(response){
            if(response.data === 'exito'){
                alertify.success('Mesa eliminada correctamente.');
                cancelar();
                cargarMesas(idUsu);
            }else{
              if(response.data === 'mesa_con_ordenes'){
                alertify.error('No se puede eliminar la mesa porque está asociada a una orden.');
              }else{
                alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
              }
            }
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
        })
  //}
}

function obtenerOrdenMesa(){
    //ideditando = id de la mesa
    var form = new FormData();
    form.append('id_mesa', ideditando);
    axios.post('obtenerOrden',form)
        .then(function (response) {
          if(response.data.length===0){
            return false;
          }else{
            //return true;
            alertify.error('La mesa no se puede eliminar porque tiene orden asociada');
            return true;
          }      
        })
        .catch(function (error) {
          alertify.error('Ocurrio un error interno al intentar consultar la orden de la mesa. Por favor intente mas tarde.');
          return true;
        })
}

function actualizarPosMesas(){ 
  mesasAux2 = document.getElementsByClassName('draggable');
  
  for(var i=0; i<mesasAux2.length; i++){  
    if(mesas[i]['mes_id']==mesasAux2[i].id){
      draggable = new PlainDraggable(mesasAux2[i]);
      console.log('i: '+draggable.rect.top+' - '+draggable.rect.left);

      self = draggable.setOptions({left: draggable.rect.left,top: draggable.rect.top});
      //mesasAux[i].addEventListener('touchstart',onClick,false);
      //mesasAux[i].addEventListener('click',onClick,false);
      
      espaciosOcup[i]=new Array();
      espaciosOcup[i][0]=draggable.rect.left//mesas[i]['mes_posicionX'];
      espaciosOcup[i][1]=draggable.rect.top//mesas[i]['mes_posicionY'];
      espaciosOcup[i][2]=mesas[i]['mes_id'];
      
      //onDrag(mesas[i]['mes_id']);
      //onDragStart();
      //onDragEnd(mesas[i]['mes_id']);
    }
  }
  var form = new FormData();
  var actualizar = false;
  var cont = 0;
  for(var i=0; i<espaciosOcup.length; i++) {
    for(var j=0; j<espaciosOcup[i].length; j++) {
      if(j==2){//estaría en la columna de id
        for (var k = 0; k < mesas.length; k++) {//recorremos las mesas que ya se habían cargado de la BD
          if(espaciosOcup[i][2]==mesas[k]['mes_id']){//filtramos por coincidencia de id para enviar las coordenadas correspondientes de la mesa
            if( (espaciosOcup[i][0] != mesas[k]['mes_posicionX']) || (espaciosOcup[i][1] != mesas[k]['mes_posicionY']) ){//Si alguna coordenada se modificó enviamos los cambios
              form.append('mesa['+cont+'][0]', espaciosOcup[i][0]);
              form.append('mesa['+cont+'][1]', espaciosOcup[i][1]);
              form.append('mesa['+cont+'][2]', espaciosOcup[i][2]);
              cont++;
              actualizar = true;   
            }
          }
        }
      }
    }
  }
  if(actualizar){
    axios.post('actualizarPosMesas', form)
    .then(function (response) {
        if (response.data === 'exito') {
            alertify.success('Mesas actualizadas correctamente.');
            cargarMesas(idUsu);//obtener el id del usuario actual
        } else {
              alertify.error(response.data);
        }
    })
    .catch(function (error) {
        alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
    })
  }
}

function actualizarPosMesaMatriz($idMesa,$posX,$posY){
  for(var i=0; i<espaciosOcup.length; i++) {
    for(var j=0; j<espaciosOcup[i].length; j++) {
      if(j==2){//estaría en la columna de id
        if(espaciosOcup[i][j]==$idMesa){//diferente al id de la mesa actual
         espaciosOcup[i][0]=$posX;
         espaciosOcup[i][1]=$posY;
        }
      }
    }
  }
}


function obtenerCoord(){
  coordLeft = 109;
  coordTop = 232;

  for(var j=232; j<((height+232)-64); j++){
    for(var i=109; i< ((width+109)-64); i++){
      if(posicionOcupada(coordLeft,coordTop)){
        coordLeft += 1;
      }else{
        return true;
      }
    }
    coordTop += 1;
  }
  return false;
}

function posicionOcupada(l,t){//66 223 
  for(var i=0; i<espaciosOcup.length; i++) {
    for(var j=0; j<espaciosOcup[i].length; j++) {
      if(j==2){
        var izq = espaciosOcup[i][0];
        var arrb = espaciosOcup[i][1];

        var dx = l - izq;
        var dy = t - arrb;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= 64) {
          return true;
        }
      }
    }
  }
  return false;
}

function nuevaMesa(){
  contenedormesas.style.display='none';
  contenedorcampos.style.display='block';
  btnnuevo.setAttribute('disabled',true);
  btnactposmesas.setAttribute('disabled',true);
  btneliminar.setAttribute('disabled',true);
}

function cancelar(){
  contenedormesas.style.display='block';
  contenedorcampos.style.display='none';
  btnnuevo.removeAttribute('disabled');
  btnactposmesas.removeAttribute('disabled');
  limpiarcampos();
  cargarMesas(idUsu);
}

function validarcampos() {
  if (!stringvalido(txtnombre.value, 50)){
    alertify.error('Existen errores en el campo de nombre.')
    return false;
  }
  if (!stringvalido(txtdescripcion.value, 150)){
    alertify.error('Existen errores en el campo de descripcioneee.')
    return false;
  }
  if(document.querySelector('input[name=foto]:checked')==null){
    alertify.error('Debe seleccionar una mesa')
    return false;
  }

  return true;
}

