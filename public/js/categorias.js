window.addEventListener('load', inicial, false);

var txtNombre;
var tabla;

var primeraFila;
var tablaCompleta;
var btnEditar;
var btnGuardar;
var contenedorCampos;

var categorias;
var idemp;
var editando;
var idCat;

function inicial(){
    idemp = document.getElementById('idempresa').value;    

    tabla =  document.getElementById('tabla').getElementsByTagName('tbody')[0];
    tablaCompleta =  document.getElementById('tabla');
    contenedorcampos = document.getElementById('contenedorcampos');
    txtNombre = document.getElementById('txtNombre');
    btnEditar = document.getElementById('btneditar');
    btnGuardar = document.getElementById('btnguardar');
    primeraFila = document.getElementById('primerfila');

    editando = false;
    idCat = 0;

    buscarCategoria('');
}

function buscarCategoria(texto){
    var form = new FormData();
    form.append('nombre', texto.toUpperCase());
    form.append('emp', idemp);
    axios.post('buscarCategorias', form)
        .then(function(response){
            categorias = response.data;
            tabla.innerHTML = '';
            categorias.forEach(categoria => {
                tabla.innerHTML += '<tr><td>'+categoria['cat_nombre']+'</td><td><button type="button" class="btn btn-primary ml-2" onClick="visualizar('+categoria['cat_id']+')">Visualizar</button></td><td><button type="button" class="btn btn-danger" onClick="eliminar('+categoria['cat_id']+')">Eliminar</button></td></tr>';
            });
        }).catch(function(error){
            alertify.error('Ocurrio un error interno al intentar buscar categorias. Por favor intente mas tarde.');
        });
}

function eliminar(id){
    var x = confirm("¿Desea eliminar la información de la categoria?");
    if (x){
        eliminarCategoria(id);
    }
}

function eliminarCategoria(id){
    var form = new FormData();
    form.append('id',id);
    axios.post('borrarCategorias',form)
        .then(function(response){
            if(response.data == 'exito'){
                buscarCategoria('');
                alertify.success('Categoria eliminada correctamente.');
            }else{
                alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
            }
        })
        .catch(function(error){
            alertify.error('Ocurrio un error interno al intentar eliminar. Por favor intente mas tarde.');
        })
        
}

function guardar(){
    if(stringvalido(txtNombre.value, 50)){
        var form = new FormData();
        form.append('nombre',txtNombre.value);
        form.append('emp',idemp);
        if(editando){
            form.append('id',idCat);
        }
        axios.post('categorias', form)
            .then(function(response){
                if(response.data = 'exito'){
                    if (editando) {
                        alertify.success('Categoria editada correctamente.');
                    } else {
                        alertify.success('Categoria registrada correctamente.');
                    }   
                    buscarCategoria('');
                    cancelar();    
                }else{
                    alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');  
                }   
            })
            .catch(function(error){
                alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
            })
    }else{
        alertify.error('Existen errores en los campos de texto.')
    }
}

function nuevo(){
    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);
    contenedorcampos.removeAttribute('hidden');
    btnGuardar.removeAttribute('hidden');
    btnEditar.setAttribute('hidden',true);


    txtNombre.disabled = false;
    txtNombre.value = '';
}

function visualizar(id){
    var categoria = categorias.filter(function(cat){
        return cat['cat_id'] == id;
    });
    console.log('Categoria: ',categoria)
    txtNombre.value = categoria[0]['cat_nombre'];
    txtNombre.disabled = true;
    idCat = id;

    primeraFila.setAttribute('hidden', true);
    tablaCompleta.setAttribute('hidden', true);

    btnGuardar.setAttribute('hidden',true);
    btnEditar.removeAttribute('hidden');
    contenedorcampos.removeAttribute('hidden');
}

function editarCategoria(){
    txtNombre.disabled = false;
    editando = true;
    btnGuardar.removeAttribute('hidden');
    btnEditar.setAttribute('hidden',true);
}

function cancelar(){
    editando = false;
    primeraFila.removeAttribute('hidden');
    tablaCompleta.removeAttribute('hidden');
    contenedorcampos.setAttribute('hidden', true);
    idCat=0;
}

function productos(){
    window.location.href = getbaseurl()+'/administracion/productos';
}