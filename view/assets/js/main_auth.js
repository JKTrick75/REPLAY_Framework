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
                    $('<img></img>').attr({ src: data.avatar, alt: "Robot" }),
                    $('<span></span>').text(data.username),
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
                window.location.href = '?module=home&op=view';
            });
        }).catch(function() {
            console.log('Error al cerrar sesión!');
        });
}

function auth_clicks() {
    //================ Click-Identificarse ================
    $('.click_login').on('click', function () {
        window.location.href = '?module=auth&op=view';
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
    load_auth_button();
    auth_clicks();
    // console.log("Holaaa main_auth!");
});