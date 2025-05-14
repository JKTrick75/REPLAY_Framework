function control_activity() {
    //Recogemos token de localStorage
    var token = localStorage.getItem('access_token');
    //Si logeado -> comprobamos tiempo inactividad:
    if (token) {
        ajaxPromise(friendlyURL('?module=auth&op=check_actividad'), 'POST', 'JSON')
            .then(function(data) {
                if (data == "inactivo") {
                    console.log("Usuario INACTIVO");
                    logout(); //main_auth.js -> Deslogueamos
                } else {
                    console.log("Usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usario logeado");
    }
}

function control_user() {
    var token = localStorage.getItem('access_token');

    if (!token) {
        console.log("control_user1 -> Sesión no iniciada");
    } else {
        ajaxPromise(friendlyURL('?module=auth&op=controluser'), 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            // console.log(data);
            if (data == "Correct_User") {
                console.log("control_user -> CORRECTO: El usuario coincide con la session");
            } else if (data == "Wrong_User") {
                console.log("control_user -> INCORRECTO: Estan intentando acceder a una cuenta");
                logout(); //main_auth.js -> Deslogueamos
            }
        })
        .catch(function() { 
            console.log("control_user2 -> Sesión no iniciada");
        });
    }
}

function control_token_vigency() {
    var token = localStorage.getItem('access_token');

    if (!token) {
        console.log("control_timer1 -> Sesión no iniciada");
    }else{
        ajaxPromise(friendlyURL('?module=auth&op=controltimer'), 'POST', 'JSON', { 'token': token })
        .then(function(data) {
            // console.log(data);
            if (data == "Correct_Timer") {
                console.log("control_token -> CORRECTO Access_token vigente");
            } else if (data == "Wrong_Timer") {
                console.log("INCORRECTO--> Access_token y refresh_token sin vigencia, sesión expirada");
                logout(); //main_auth.js -> Deslogueamos
            } else {
                localStorage.setItem("access_token", data);
                load_auth_button(); //main_auth.js -> Recargamos página y regeneramos botón auth
                console.log("CORRECTO--> Refresh_token vigente -> Regeneramos access_token");
            }
        })
        .catch(function() { 
            console.log("control_timer2 -> Sesión no iniciada");
        });
    }
}

function refresh_cookie() {
    ajaxPromise(friendlyURL('?module=auth&op=refresh_cookie'), 'POST', 'JSON')
        .then(function(data) {
            console.log("Refresh cookie correctly");
        });
}

$(document).ready(function() {
    //Control inactividad
    setInterval(function() { control_activity() }, 60000); //600000=10min | 60000=1min
    //Control seguridad usuario
    control_user();
    //Control seguridad vigencia tokens
    control_token_vigency();
    setInterval(function() { control_token_vigency() }, 59000); // 59000=59sec
    //Refresh cookies login user
    setInterval(function() { refresh_cookie() }, 600000);
    console.log("Bienvenido al activity!");
});