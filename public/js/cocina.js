window.addEventListener('load', inicial, false);

var body;
var modal;
var idemp;
var ordenes;
function inicial(){
    body = document.getElementById('body');
    modal = document.getElementById('modal');
    idemp = document.getElementById('idempresa').value;
    llenarBody();
    modal.setAttribute('hidden',true);
}

function llenarBody(){
    var form = new FormData();
    form.append('id_empresa',idemp);

    axios.post('cargarNoEntregadas',form)
        .then(function(response){
            ordenes = response.data;
            body.innerHTML = '';
            console.log('Ordenes: ',ordenes);
            ordenes.forEach(orden=>{
                if(orden['mes_id'] != null){
                    body.innerHTML+="<div class='orden mt-1 ml-1' id='"+orden['ord_id']+"'data-bs-toggle='modal'><div>"+orden['mes_nombre']+"</div><div>"+orden['ord_hora']+"</div></div>";
                }else{
                    body.innerHTML+="<div class='orden mt-1 ml-1' id='"+orden['ord_id']+"'data-bs-toggle='modal'><div>Sin mesa</div><div>"+orden['ord_hora']+"</div></div>";
                }
            });
            var ordenesHTML = document.getElementsByClassName('orden');
            for(var i=0; i<ordenesHTML.length; i++){  
                ordenesHTML[i].addEventListener('click',verOrden,false);
            }
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar visualizar las ordenes. Por favor intente mas tarde.');
        });
}

function verOrden(){
    var ordid = this.id;
    var temp = ordenes.filter(function(ord){
        return ord['ord_id'] == ordid;
    });
    var orden = temp[0];
    var form = new FormData();
    form.append('id',this.id);
    axios.post('cargarProductosXOden',form)
        .then(function(response){
            var productos = response.data;
            if(orden['ord_mesa'] != null){
                modal.innerHTML = '<div class="titulo"><p>Orden '+orden['mes_nombre']+'</p></div>';
            }else{
                modal.innerHTML = '<div class="titulo"><p>Orden sin Mesa</p></div>';
            }
            console.log('Productos: ',productos);
            modal.innerHTML += '<hr style="height:2px;border-width:0;width: 80%;color:black;background-color:black;margin: auto;">';
            productos.forEach(producto=>{
                modal.innerHTML += '<div class = "nompre"><p>'+producto['pro_nombre']+'</p><p class="float-right">Precio: '+producto['pro_precio']+'</p></div>';
                modal.innerHTML += '<br>';
                modal.innerHTML += '<div class = "descripcion"><li>'+producto['pro_descripcion']+'</li></div>';
                modal.innerHTML += '<hr style="height:6px;border-width:0;color:black;background-color:black">';
            })
            modal.innerHTML += '<button type="button" class="btn btn-danger" onClick="cancelar()">Cancelar</button>';
            modal.innerHTML += '<button type="button" class="btn btn-success ml-1" onClick="entregar('+ordid+')">Entregar</button>';
            modal.removeAttribute('hidden');
        })
        .catch(function(error){
            console.log(error);
        });
}

function cancelar(){
    modal.setAttribute('hidden',true);
}

function entregar(id){
    var form = new FormData();
    form.append('id',id);
    axios.post('/administracion/entregarOrden',form)
        .then(function(response){
            if(response.data = 'exito'){
                llenarBody();
                cancelar();
                alertify.success('Orden entregada correctamente.');
            }else{
                alertify.error('Ocurrio un error interno al intentar entregar la orden. Por favor intente mas tarde.');
            }
        })
        .catch(function(error){
            console.log(error.response);
            alertify.error('Ocurrio un error interno al intentar entregar la orden. Por favor intente mas tarde.');
        })
}