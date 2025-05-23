// ------------------- LOAD CONTENT ------------------------ //
function load_content() {
    let path = window.location.pathname.split('/');
    console.log(path);
    
    if(path[4] === 'recover'){
        localStorage.setItem("token_email", path[5]);
        window.location.href = friendlyURL('index.php?module=auth&op=recover_view');
    }else if (path[4] === 'verify_email') {
        //Mostramos Loader GIF
        showLoader();
        // console.log(path[5]);
        ajaxPromise(friendlyURL("index.php?module=auth&op=verify_email"), 'POST', 'JSON', { 'token_email': path[5] })
            .then(function(data) {
                Swal.fire("Se ha activado tu cuenta!").then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                        window.location.href = friendlyURL('?module=auth');
                    }
                });
            })
            .catch(function() {
            console.log('Error: verify email error');
            });
    }else if (path[3] === 'recover_view') {
        // console.log('HOLA RECOVER VIEW');
        load_form_new_password();
    }
}


// Creamos el overlay y lo mostramos
function showLoader() {
    if (document.getElementById('loader-overlay')) return;

    const overlay = document.createElement('div');
        overlay.id = 'loader-overlay';
        Object.assign(overlay.style, {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    const img = document.createElement('img');
    img.src = '/REPLAY_Framework/view/assets/img/icegif-555.gif';
    img.alt = 'Cargando…';
    img.style.width = '100%';
    img.style.height = '100%';

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

// ------------------- LOAD MENU ------------------------ //
function load_menu() {
    // Menu navbar
    $('<div></div>').attr('class', 'container').appendTo('#navmenu')
    .html(`
            <ul>
                <!-- Pestaña shop -->
                <li><a href="${friendlyURL('?module=shop')}">Tienda</a></li>
                <!-- Search -->
                <div class="div_search">
                    <select class="search_tipo_consola" id="search_tipo_consola"></select>
                    <select class="search_modelo_consola" id="search_modelo_consola"></select>
                    <input type="text" id="search_ubicacion" autocomplete="off" placeholder="Ubicación"/>
                    <div id="search_autocomplete"></div>
                    <input type="button" value="buscar" id="search_btn"/>
                </div>
                <!-- Auth -->
                <div class="div_login" id="auth_btn"></div>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`
    )
}

// ------------------- AUTH BUTTON ------------------------ //
function load_auth_button() {
    // var sesion = JSON.parse(localStorage.getItem('sesion'));
    var token = localStorage.getItem('access_token');
    // console.log(token);

    //Vaciamos elementos
    $('#auth_btn').empty().removeClass("click_login click_dropdown");
    $('.user-dropdown').remove();
    
    if (token) {
        ajaxPromise(friendlyURL('?module=auth&op=data_user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                // console.log(data); //Datos login debug
                //Añadimos classe click_dropdown, y añadimos avatar + username
                $('#auth_btn')
                .addClass("click_dropdown")
                .append(
                    $('<img></img>').attr({ src: data[0].avatar, alt: "Robot" }),
                    $('<span></span>').text(data[0].username),
                    $('<span class="caret">◂</span>')
                );
            }).catch(function() {   
                console.log("Error al cargar los datos del user");
            });
        //Creamos el dropdown menu
        $('#auth_btn').after(`
            <div class="user-dropdown">
                <div class="dropdown-item click_profile">Perfil</div>
                <div class="dropdown-item click_logout">Logout</div>
            </div>
        `);
    } else {
        //Añadimos classe click_login, y preparamos para el login
        $('#auth_btn')
        .addClass("click_login")
        .append(
            $('<i class="bi bi-person"></i>'),
            $('<span>Identifícate</span>')
        );
    }
}

function logout(){
    ajaxPromise(friendlyURL('?module=auth&op=logout'), 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('access_token');
            Swal.fire("Has cerrado sesión!").then(() => {
                // window.location.href = '?module=home';
                window.location.href = friendlyURL('?module=home');
            });
        }).catch(function() {
            console.log('Error al cerrar sesión!');
        });
}

function auth_clicks() {
    //================ Click-Identificarse ================
    $('.click_login').on('click', function () {
        // window.location.href = '?module=auth';
        window.location.href = friendlyURL('?module=auth');
        $('.register_auth').hide();
    });

    //================ Click Menu User Dropdown ================
    $(document).on('click', '.click_dropdown', function() {
        $('.user-dropdown').toggle();
        $('.caret').toggleClass('rotate');
    });
    // Cerrar dropdown al hacer click fuera
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#auth_btn').length && !$(e.target).closest('.user-dropdown').length) {
            $('.user-dropdown').hide();
            $('.caret').removeClass('rotate');
        }
    });

    //================ LOG-OUT ================
    $(document).on('click', '.click_logout', function() {
        logout();
    });

}

$(document).ready(function () {
    load_content();
    load_menu();
    load_auth_button();
    auth_clicks();
    // console.log("Holaaa main_auth!");
});