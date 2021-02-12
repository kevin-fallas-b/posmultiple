window.addEventListener('load', inicial, false);


/*agregamos un listener a todo el documento para ver
  cuando el usuario estripa enter(buscar producto) o cuando estripa F3(guardar producto)
*/
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "Enter":
        if(!editando){
            buscarProducto();
        }else{
            guardar();
        }
        break;
      case "F3":
        if(editando){
            guardar();
        }
        break;
      
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);


var contenedortabla;
var contenedorcampos;
var btnbuscar;
var btndropdown;

var txtnombre;
var txtdescripcion;
var txtsaldoExistente;
var txtcantidadIngresar;

var accion;//marca si la mercaderia se debe ingresar o sacar
var txtcodigoBarras;//contiene el codigo de barras a buscar

var editando;//bandera que me indica si se esta ingresando un producto actualmente. Ayuda para controlar el funcionamiento al estripar enter o f3
var idemp;

var productoeditando;//contiene toda la informacion del producto que se esta editando en el momento
var tbody;//cuerpo de la tabla
var codigos = new Map();//aray que contiene como llave un codigo de barras y valor la cantidad a ingresar o sacar

function inicial(){
    contenedortabla = document.getElementById('contenedortabla');
    contenedorcampos = document.getElementById('contenedorcampos');
    btnbuscar = document.getElementById('btnbuscar');
    btndropdown = document.getElementById('btndrowndown');
    tipoaccion('Ingresar');

    txtcodigoBarras = document.getElementById('txtcodigoBarras');
    txtnombre = document.getElementById('txtnombre');
    txtdescripcion = document.getElementById('txtdescripcion');
    txtsaldoExistente = document.getElementById('txtsaldoexistente');
    txtcantidadIngresar = document.getElementById('txtcantidadingresar');
    idemp = document.getElementById('idempresa').value;
    tbody = document.getElementById('tbody-productos')
    limpiarcampos();
}




  function buscarProducto(){
    if(txtcodigoBarras.value!=''){
        var form = new FormData();
        form.append('codigoBarras', txtcodigoBarras.value);
        form.append('emp', idemp);
        axios.post('getproducto', form)
        .then(function (response) {
            if (response.data.length < 1) {
                alertify.error('No existe ningun producto registrado con el codigo de barras buscado.')
                cancelar();
            } else {
                productoeditando = response.data[0];
                txtdescripcion.value = productoeditando['pro_descripcion'];
                txtnombre.value = productoeditando['pro_nombre'];
                txtsaldoExistente.value = productoeditando['pro_cantidad'];
                contenedorcampos.style.display = "inline"; 
                contenedortabla.style.display = "none";
                txtcantidadIngresar.focus();
                editando=true;
            }
        })
        .catch(function (error) {
            alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');
        })
    }else{
        alertify.error('Ingrese un codigo de barras para poder buscar.')
    }
  }

  function tipoaccion(act){
      accion = act;
      if(act=='Ingresar'){
        btndropdown.classList.remove("btn-danger");
        btndropdown.classList.add("btn-success");
        btndropdown.innerHTML = 'Ingresar';
      }else{
        btndropdown.classList.remove("btn-success");
        btndropdown.classList.add("btn-danger");
        btndropdown.innerHTML = 'Sacar';
      }
  }

  function limpiarcampos(){
      txtsaldoExistente.value='';
      txtnombre.value='';
      txtdescripcion.value='';
      txtcantidadIngresar.value='';
      txtcodigoBarras.value='';
      editando = false;
      txtcodigoBarras.focus();
  }

  function cancelar(){
      limpiarcampos();
      contenedorcampos.style.display = "none"; 
      contenedortabla.style.display = "inline"; 
  }

  function guardar(){
      if(editando){
          if(isNumber(txtcantidadIngresar.value) && txtcantidadIngresar.value>0){
            tbody.innerHTML+='<tr><td>'+productoeditando['pro_nombre']+'</td><td>'+productoeditando['pro_codigo']+'</td><td>'+txtcantidadIngresar.value+'</td> <td><button type="button" class="btn btn-danger" onClick="eliminardelista(\''+productoeditando['pro_codigo']+','+(codigos.size+1)+'\')">Eliminar</button></td></tr>';
            codigos.set(productoeditando['pro_codigo'],txtcantidadIngresar.value);
            cancelar();
          }else{
              alertify.error('Debe introducir un numero mayor a 0 para poder guardar.');
          }
      }
    }

    function eliminardelista(codigo){
        var partes = codigo.split(',')
        document.getElementById('tabla-productos').deleteRow(partes[1]);
        codigos.delete(partes[0]);
    }

function guardarFinal(){
    var form = new FormData();
    form.append('emp', idemp);
    form.append('jsnproductos', JSON.stringify(Array.from(codigos)));
    form.append('accion', accion);
    axios.post('ingresarproductos', form)
    .then(function (response) {
        if(response.data==='exito'){
            alertify.success("Se guardo exitosamente.");
            tbody.innerHTML='';
            codigos = new Map();
            cancelar();
        }else{
            alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.');

        }
        
    })
    .catch(function (error) {
        alertify.error('Ocurrio un error interno al intentar guardar. Por favor intente mas tarde.' + error);
    })

}