window.addEventListener('load', iniciar, false);

function iniciar() {
    alertify.set('notifier', 'position', 'top-right');
}

function mensajeError(mensaje) {
    alertify.error(mensaje);
}


function olvidocontra() {
    window.location.href = getbaseurl() + '/recuperarpass';
}