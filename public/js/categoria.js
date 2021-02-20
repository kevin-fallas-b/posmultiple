window.addEventListener('load', inicial, false);

var idPro;
var tabla;
var idemp;
var proNombre;

function inicial(){
    window.history.pushState('', '', '/administracion/categoria');

    idPro = document.getElementById('idproducto').value; 
    proNombre = document.getElementById('nombrepro').value; 
    tabla =  document.getElementById('tabla').getElementsByTagName('tbody')[0];
    idemp = document.getElementById('idempresa').value;

    document.getElementById('titulo').innerHTML = 'Categorias de: ' +proNombre;
    buscarCategorias('');
}

function buscarCategorias(texto){
    var form = new FormData();
    form.append('pro_id',idPro);
    form.append('nombre',texto);
    axios.post('buscarRelacionCategorias', form)
        .then(function(response){
            llenarTabla(response.data);
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar buscar categorias. Por favor intente mas tarde.');
        });
}

function llenarTabla(relaciones){
    tabla.innerHTML = '';
    relaciones.forEach(relacion=>{
        tabla.innerHTML += '<tr><td>'+relacion['cat_nombre']+'</td><td><button type="button" class="btn btn-danger" onClick="eliminar('+relacion['cat_id']+')">Eliminar</button></td></tr>'
    })
    tabla.innerHTML += '<tr><td><button class="btn btn-secondary dropdown-toggle ml-5" type="button" id="dropdownProveedor" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categoria</button> <div class="dropdown-menu" aria-labelledby="dropdownTipo" style="width:100px" id="dropCategoria"></div></td></tr>'
    var form = new FormData();
    form.append('nombre', '');
    form.append('emp', idemp);
    axios.post('buscarCategorias', form)
        .then(function(response){
            var data = response.data;
            var categorias = data.filter(function(cate){
                var exito = true;
                relaciones.forEach(relacion => {
                    if(relacion['cat_id'] == cate['cat_id']){
                        exito = false;
                    }
                })
                if(exito){
                    return cate;
                }
            });
            var drop = document.getElementById('dropCategoria');
            drop.innerHTML = '';
            categorias.forEach(categoria => {
                drop.innerHTML += '<button class="dropdown-item" type="button" onClick="agregarCategoria('+categoria['cat_id']+')">'+categoria['cat_nombre']+'</button>'
            });
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar buscar categorias. Por favor intente mas tarde.');
        })
}

function agregarCategoria(id){
    var form = new FormData();
    form.append('pro_id', idPro);
    form.append('cat_id', id);
    axios.post('crearRelacionCategorias',form)
        .then(function(response){
            if(response.data == 'exito'){
                alertify.success('Relación registrada correctamente.');
                buscarCategorias('');
            }else{
                alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente más tarde.');  
            }

        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente más tarde.');
        })
}

function eliminar(id){
    var x = confirm("¿Desea eliminar la información de la relación?");
    if (x){
        eliminarCategoria(id);
    }
}

function eliminarCategoria(id){
    var form = new FormData();
    form.append('pro_id',idPro);
    form.append('cat_id',id)
    axios.post('borrarRelacionCategorias',form)
        .then(function(response){
            if(response.data == 'exito'){
                buscarCategorias('');
                alertify.success('Relación eliminada correctamente.');
            }else{
                alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
            }
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
        })
        
}