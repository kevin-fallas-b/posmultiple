//contiene funciones que se usan en distintas aprtes del proyecto
window.addEventListener('load', inicial, false)
var activo;//saber en que pantalla estoy


function inicial() {
    alertify.set('notifier', 'position', 'top-right');
}

//https://stackoverflow.com/questions/7295843/allow-only-numbers-to-be-typed-in-a-textbox
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getbaseurl() {
    var getUrl = window.location;
    return getUrl.protocol + "//" + getUrl.host;
}

//metodo validar la integridad y longitud de un string
function stringvalido(revisar, tamanomax) {
    //revisar que no sea nulo
    if (!revisar || /^\s*$/.test(revisar)) {
        return false;
    }
    //revisar que no sean puros espacios
    if (revisar.length === 0 || !revisar.trim()) {
        return false;
    }
    //revisar que no sobrepase tamano max
    if (revisar.length > tamanomax) {
        return false;
    }
    return true;
}

function setactive(id) {
    activo = id;
    document.getElementById(id).classList.add('active')
}
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function getCookies() {
    return document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
}
function getTokenFacturacion() {
    document.cookie = "tokenFacturacion=" + document.getElementById('tokenFact').innerHTML;
}
