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
                    document.getElementById('error_user_log').innerHTML = "El username o correo no existe, asegúrate de que lo has escrito correctamente";
                } else if (result == "error_passwd") {
                    //+1 login_attempt
                    controller_attempts("attempt_plus",data); 
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta";
                } else if (result == "error_activate") {
                    //Cuenta no activada
                    Swal.fire("Tienes que activar tu cuenta para poder iniciar sesión!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            window.location.href = friendlyURL('?module=auth');
                        }
                    });
                } else {
                    //Reseteamos login_attempt
                    controller_attempts("attempt_reset", data); 

                    //Guardamos el access_token en localStorage
                    localStorage.setItem("access_token", result);
                    
                    //Inicio sesión completado
                    Swal.fire("Has iniciado sesión!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            //Comprobamos si veníamos de redirect o login normal
                            if (localStorage.getItem('redirect_like')) { //Si ha hecho login por like
                                window.location.href = friendlyURL('?module=shop');
                            } else { //Si ha hecho login normal
                                window.location.href = friendlyURL('?module=home');
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

function controller_attempts(mode, data){
    console.log(data);
    // console.log(mode);
    //Obtenemos el usuario:
    var params = new URLSearchParams(data);
    var usuario = params.get('user_log');

    if(mode == "attempt_plus"){
        ajaxPromise(friendlyURL('?module=auth&op=controller_attempts'), 'POST', 'JSON', data)
        .then(function(result) {
            console.log(result);

            if (result == '"mensaje_enviado"') {
                Swal.fire({
                    title: "Cuenta inhabilitada por seguridad",
                    html: "Hemos enviado un código de recuperación a tu WhatsApp.",
                    input: "text",
                    inputPlaceholder: "Introduce el código de 6 carácteres",
                    inputAttributes: {
                        autocapitalize: "off",
                        maxlength: 6
                    },
                    showCancelButton: false,
                    confirmButtonText: "Confirmar",
                    showLoaderOnConfirm: true,
                    preConfirm: async (codigo) => {
                        try {
                            console.log(codigo);
                            console.log(usuario);
                            
                            var response = await ajaxPromise(friendlyURL('?module=auth&op=verify_message'), 'POST', 'JSON', { 'codigo': codigo, 'username': usuario });
                            
                            console.log(response);

                            if (response !== 'success') {
                                throw new Error("Código inválido");
                            }
                            
                            return response;
                            
                        } catch (error) {
                            Swal.showValidationMessage(`Error: ${error.message}`);
                            Swal.getInput().value = ""; //Limpiamos campo texto
                            return false;
                        }
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed && result.value) {
                        Swal.fire({
                            title: "¡Cuenta recuperada!",
                            text: "Tu cuenta ha sido habilitada nuevamente, vuelve a iniciar sesión, o recupera tu contraseña.",
                            icon: "success"
                        }).then(() => {
                            window.location.href = friendlyURL('?module=auth');
                        });
                    }
                });
            }

        }).catch(function(textStatus) {
            if (console && console.log) {
                console.log("La solicitud ha fallado: " + textStatus);
            }
        });
    }else if(mode == "attempt_reset"){
        // console.log('RESETEAMOS');
        ajaxPromise(friendlyURL('?module=auth&op=reset_attempts'), 'POST', 'JSON', data)
        .then(function(result) {
            // console.log(result);
        }).catch(function(textStatus) {
            console.log("Error reseteo de intentos");
        });
    }
    
}

/* ============================================================================================ */
/*                                       SOCIAL LOGIN                                           */
/* ============================================================================================ */

function social_login(param){
    authService = firebase_config();
    authService.signInWithPopup(provider_config(param))
    .then(function(result) {
        // console.log('Hemos autenticado al usuario ', result.user);
        email_name = result.user.email;
        let username = email_name.split('@');

        social_user = {uid: result.user.uid, username: username[0], email: result.user.email, avatar: result.user.photoURL};
        // console.log(social_user);
        if (result) {
            ajaxPromise(friendlyURL("?module=auth&op=social_login"), 'POST', 'JSON', social_user)
                .then(function(result) {
                    // console.log(result);
                    //Guardamos el access_token en localStorage
                    localStorage.setItem("access_token", result);
                    //Inicio sesión completado
                    Swal.fire("Has iniciado sesión!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            //Comprobamos si veníamos de redirect o login normal
                            if (localStorage.getItem('redirect_like')) { //Si ha hecho login por like
                                window.location.href = friendlyURL('?module=shop');
                            } else { //Si ha hecho login normal
                                window.location.href = friendlyURL('?module=home');
                            }
                        }
                    });
                })
                .catch(function() {
                    console.log('Error: Social login error');
                });
        }
    })
    .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;
        console.log(email);
        var credential = error.credential;
        console.log(credential);
    });
}

function firebase_config(){
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }else{
        firebase.app();
    }
    return authService = firebase.auth();
}

function provider_config(param){
    if(param === 'google'){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        return provider;
    }else if(param === 'github'){
        return provider = new firebase.auth.GithubAuthProvider();
    }
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
        if (document.getElementById('username_reg').value.length < 6) {
            document.getElementById('error_username_reg').innerHTML = "El username tiene que tener 6 caracteres como mínimo";
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
                console.log(result);
                if (result == "error_username") {
                    document.getElementById('error_username_reg').innerHTML = "Ya existe un usuario con este nombre, inténtalo con otro."
                }else if (result == "error_email"){
                    document.getElementById('error_email_reg').innerHTML = "Ya existe un usuario con este correo, inténtalo con otro."
                } else {
                    //Registro completado, redirigimos al login
                    Swal.fire("Se ha enviado un correo de verificación, accede a él para activar tu cuenta!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            window.location.href = friendlyURL('?module=auth');
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
/*                                            RECOVER                                           */
/* ============================================================================================ */

function clicks_recover(){
    $("#recover__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_recover_password();
        }
    });

    $('#button_recover').on('click', function(e) {
        e.preventDefault();
        send_recover_password();
    }); 
}

function validate_recover_password(){
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if(document.getElementById('email_forg').value.length === 0){
		document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
		error = true;
	}else{
        if(!mail_exp.test(document.getElementById('email_forg').value)){
            document.getElementById('error_email_forg').innerHTML = "El formato del email es invalido"; 
            error = true;
        }else{
            document.getElementById('error_email_forg').innerHTML = "";
        }
    }
	
    if(error == true){
        return 0;
    }
}

function send_recover_password(){
    if(validate_recover_password() != 0){
        var data = $('#recover__form').serialize();
        // console.log(data);
        ajaxPromise(friendlyURL('?module=auth&op=send_recover_email'), 'POST', 'JSON', data)
            .then(function(result) {
                console.log(result);
                if(result == "error"){		
                    $("#error_email_forg").html("No existe una cuenta asociada a este correo! <br>(Las cuentas asociadas a login de tipo social no tienen permitido cambiar de contraseña)");
                } else{
                    //Guardamos recover_token en localStorage
                    localStorage.setItem("recover_token", result);
                    //Enviamos alerta de que hemos enviado un correo
                    Swal.fire("Se te ha enviado un correo, accede a él para recuperar tu contraseña! (Solo tiene validez durante 1 hora)").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            window.location.href = friendlyURL('?module=auth');
                        }
                    });
                }
            }).catch(function(textStatus) {
                console.log('Error: Recover password error');
            });
    }
}

function load_form_new_password(){
    token_email = localStorage.getItem('token_email');
    recover_token = localStorage.getItem('recover_token');
    ajaxPromise(friendlyURL('?module=auth&op=verify_token'), 'POST', 'JSON', {'token_email': token_email, 'recover_token': recover_token})
        .then(function(result) {
            console.log(result);
            if(result == "verify"){
                click_new_password(token_email); 
            }else {
                Swal.fire("Ha ocurrido un error, es posible que haya expirado el tiempo para poder cambiar la contraseña. Vuelve a intentarlo.").then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                        window.location.href = friendlyURL('?module=auth');
                    }
                });
            }
        }).catch(function(textStatus) {
            console.log('Error: Verify token error');
        });
}

function click_new_password(token_email){
    $(".recover_html").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_new_password(token_email);
            // console.log('confirmar contraseña');
        }
    });

    $('#button_set_pass').on('click', function(e) {
        e.preventDefault();
        send_new_password(token_email);
        // console.log('confirmar contraseña');
    }); 
}

function validate_new_password(){
    var error = false;

    if(document.getElementById('pass_rec').value.length === 0){
		document.getElementById('error_password_rec').innerHTML = "Escribe una contraseña";
		error = true;
	}else{
        if(document.getElementById('pass_rec').value.length < 8){
            document.getElementById('error_password_rec').innerHTML = "La contraseña tiene que ocupar más de 8 carácteres";
            error = true;
        }else{
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }

    if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
		document.getElementById('error_password_rec_2').innerHTML = "Las contraseñas no coinciden";
		error = true;
	}else{
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if(error == true){
        return 0;
    }
}

function send_new_password(token_email){
    if(validate_new_password() != 0){
        var data = {token_email: token_email, password : $('#pass_rec').val()};
        // console.log(data);

        ajaxPromise(friendlyURL('?module=auth&op=new_password'), 'POST', 'JSON', data)
            .then(function(result) {
                // console.log(result);
                if(result == "done"){
                    //Borramos tokens localStorage y mostramos mensaje
                    localStorage.removeItem('token_email');
                    localStorage.removeItem('recover_token');
                    Swal.fire("Contraseña cambiada correctamente!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            window.location.href = friendlyURL('?module=auth');
                        }
                    });
                } else {
                    Swal.fire("Ha ocurrido un error al intentar cambiar la contraseña, inténtelo de nuevo más tarde!").then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                            window.location.href = friendlyURL('?module=auth');
                        }
                    });
                }
            }).catch(function(textStatus) {
                console.log('Error: New password error');
            });
    }
}

/* ============================================================================================ */
/*                                            GENERAL                                           */
/* ============================================================================================ */

function clicks_auth() {
    $('.toggle_auth_login').on('click', function () {
        //Limpiar formulario login
        $('#login__form')[0].reset();
        $('.login_auth .error').text('');
        //Limpiar formulario recover
        $('#recover__form')[0].reset();
        $('#recover__form .error').text('');
        //Alternar formularios
        $('.login_auth').hide();
        $('.recover_auth').hide();
        $('.register_auth').show();
    });
    $('.toggle_auth_register').on('click', function () {
        //Limpiar formulario register
        $('#register__form')[0].reset();
        $('.register_auth .error').text('');
        //Limpiar formulario recover
        $('#recover__form')[0].reset();
        $('#recover__form .error').text('');
        //Alternar formularios
        $('.register_auth').hide();
        $('.recover_auth').hide();
        $('.login_auth').show();
    });
    $('#recover_pass').on('click', function(e) {
        //Limpiar formulario login
        $('#login__form')[0].reset();
        $('.login_auth .error').text('');
        //Limpiar formulario register
        $('#register__form')[0].reset();
        $('.register_auth .error').text('');
        //Alternar formularios
        $('.login_auth').hide();
        $('.register_auth').hide();
        $('.recover_auth').show();
    });

    $('#google').on('click', function(e) {
        social_login('google');
    });

    $('#github').on('click', function(e) {
        social_login('github');
    });
}

function ocultar_elementos(){
    $('.register_auth').hide();
    $('.recover_auth').hide();
}

$(document).ready(function () {
    clicks_login();
    clicks_register();
    clicks_auth();
    clicks_recover();
    ocultar_elementos();
    // console.log("Bienvenido al Auth");
});