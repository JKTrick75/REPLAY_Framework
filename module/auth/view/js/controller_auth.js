/* ============================================================================================ */
/*                                              LOGIN                                           */
/* ============================================================================================ */

function validate_login() {
    var error = false;

    if (document.getElementById('user_log').value.length === 0) {
        document.getElementById('error_user_log').innerHTML = "Escribe tu nombre de usuario o email";
        error = true;
    } else {
        if (document.getElementById('user_log').value.length < 6) {
            document.getElementById('error_user_log').innerHTML = "El usuario tiene que tener 6 caracteres como mínimo";
            error = true;
        } else {
            document.getElementById('error_user_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "Escribe tu contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

function login() {
    if (validate_login() != 0) {
        var data = $('#login__form').serialize();
        // console.log(data);

        ajaxPromise(friendlyURL('?module=auth&op=login'), 'POST', 'JSON', data)
            .then(function(result) {
                // console.log(result);
                if (result == "error_user") {
                    document.getElementById('error_user_log').innerHTML = "El username o correo no existe, asegúrate de que lo has escrito correctamente"
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } else {
                    //Guardamos el access_token en localStorage
                    localStorage.setItem("access_token", result);
                    
                    //Registro completado
                    Swal.fire("Has iniciado sesión!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            //Comprobamos si veníamos de redirect o login normal
                            if (localStorage.getItem('redirect_like')) { //Si ha hecho login por like
                                window.location.href = '?module=shop&op=view';
                            } else { //Si ha hecho login normal
                                window.location.href = '?module=home&op=view';
                            }
                        }
                    });
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function clicks_login(){
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

/* ============================================================================================ */
/*                                           REGISTER                                           */
/* ============================================================================================ */

function validate_register() {
    var username_regex = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var passwd_regex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "Escribe un nombre de usuario";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "El username tiene que tener 5 caracteres como mínimo";
            error = true;
        } else {
            if (!username_regex.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "No se pueden poner carácteres especiales";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!email_regex.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "Escribe una contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!passwd_regex.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "Escribe otra vez la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
            document.getElementById('error_passwd2_reg').innerHTML = "";
        } else {
            document.getElementById('error_passwd2_reg').innerHTML = "Las contraseñas no coinciden";
            error = true;
        }
    }

    if (error == true) {
        return 0;
    }
}

function register() {
    if (validate_register() != 0) {
        var data = $('#register__form').serialize();
        // console.log(data);

        ajaxPromise(friendlyURL('?module=auth&op=register'), 'POST', 'JSON', data)
            .then(function(result) {
                // console.log(result);
                if (result == "error_username") {
                    document.getElementById('error_username_reg').innerHTML = "Ya existe un usuario con este nombre, inténtalo con otro."
                }else if (result == "error_email"){
                    document.getElementById('error_email_reg').innerHTML = "Ya existe un usuario con este correo, inténtalo con otro."
                } else {
                    //Registro completado, redirigimos al login
                    Swal.fire("Se ha registrado correctamente!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            window.location.href = '?module=auth&op=view';
                            $('.register_auth').hide();
                        }
                    });
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("El registro ha fallado: " + textStatus);
                }
            });
    }
}

function clicks_register(){
    $("#register").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
    $('#register').on('click', function(e) {
        e.preventDefault();
        register();
        // console.log('hola register');
    });
}

/* ============================================================================================ */
/*                                            GENERAL                                           */
/* ============================================================================================ */

function clicks_auth() {
    $('.toggle_auth_login').on('click', function () {
        //Limpiar formulario
        $('#login__form')[0].reset();
        $('.login_auth .error').text('');
        //Alternar formularios
        $('.login_auth').hide();
        $('.register_auth').show();
    });
    $('.toggle_auth_register').on('click', function () {
        //Limpiar formulario
        $('#register__form')[0].reset();
        $('.register_auth .error').text('');
        //Alternar formularios
        $('.register_auth').hide();
        $('.login_auth').show();
    });
}

function ocultar_elementos(){
    $('.register_auth').hide();
}

$(document).ready(function () {
    clicks_login();
    clicks_register();
    clicks_auth();
    ocultar_elementos();
    console.log("Bienvenido al Auth");
});