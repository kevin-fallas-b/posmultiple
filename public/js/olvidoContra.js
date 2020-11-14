window.addEventListener('load', iniciar, false);

function iniciar() {
    alertify.set('notifier', 'position', 'top-right');
}


function cancelar() {
    window.location.href = getbaseurl();
}

function recuperar() {
    if (validateEmail(document.getElementById('txt_correo').value)) {
        var form = new FormData();
        form.append('correo', document.getElementById('txt_correo').value);
        axios.post('recuperarpass', form)
            .then(function (response) {
                if (response.data === 'exito') {
                    alertify.success('Contraseña restablecida correctamente. Se le ha enviado un correo con su nueva clave.');
                    window.setTimeout(function () {
                        // Move to a new location or you can do something else
                        window.location.href = getbaseurl()
                    }, 3500);
                } else {
                    alertify.error(response.data);
                }
            })
            .catch(function (error) {
                alertify.error('Ocurrio un error interno. Por favor intente mas tarde.');
            })

    } else {
        alertify.error('Correo invalido.')
    }
}