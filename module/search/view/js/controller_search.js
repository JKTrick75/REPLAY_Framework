//Cargamos select tipo_consola
function load_tipo_consola() {
    ajaxPromise(friendlyURL('?module=search&op=select_tipo_consola'), 'GET', 'JSON')
        .then(function (data) {
            // console.log(data);
            $('<option>Tipo consola</option>').attr('selected', true).attr('disabled', true).appendTo('.search_tipo_consola');
            
            for (row in data) {
                $('<option value="' + data[row].id_tipo_consola + '">' + data[row].nom_tipo_consola + '</option>').appendTo('.search_tipo_consola')
            }
            // Establecer el tooltip inicial
            $('.search_tipo_consola').attr('title', $('.search_tipo_consola option:selected').text());
        }).catch(function () {
            console.error("Error cargando el select tipo_consola search");
        });
}

//Cargamos select modelo_consola, dinámico si se selecciona un tipo_consola
function load_modelo_consola(tipo_consola) {
    $('.search_modelo_consola').empty();

    //Por defecto, si no tiene nada seleccionado, selecciona todos los modelo_consola
    if (tipo_consola == undefined) {
        ajaxPromise(friendlyURL('?module=search&op=select_modelo_consola_null'), 'GET', 'JSON')
            .then(function (data) {
                $('<option>Modelo</option>').attr('selected', true).attr('disabled', true).appendTo('.search_modelo_consola');
                
                for (row in data) {
                    $('<option value="' + data[row].id_modelo_consola + '">' + data[row].nom_modelo_consola + '</option>').appendTo('.search_modelo_consola')
                }
                // Establecer el tooltip inicial
                $('.search_modelo_consola').attr('title', $('.search_modelo_consola option:selected').text());
            }).catch(function () {
                console.error("Error cargando el select modelo_consola_null search");
            });
    } //Si se selecciona un tipo_consola, cargamos los modelos de ese tipo
    else {
        ajaxPromise(friendlyURL('?module=search&op=select_modelo_consola'), 'POST', 'JSON', {'tipo_consola': tipo_consola})
            .then(function (data) {
                $('<option>Modelo</option>').attr('selected', true).attr('disabled', true).appendTo('.search_modelo_consola');
                for (row in data) {
                    $('<option value="' + data[row].id_modelo_consola + '">' + data[row].nom_modelo_consola + '</option>').appendTo('.search_modelo_consola')
                }
                // Establecer el tooltip inicial
                $('.search_modelo_consola').attr('title', $('.search_modelo_consola option:selected').text());
            }).catch(function () {
                console.error("Error cargando el select modelo_consola search");
            });
    }
}

//CONTROLADOR SELECTS, cargamos los selects primero, y actualiza el select del modelo_consola si se selecciona algun tipo_consola
function load_search() {
    load_tipo_consola();
    load_modelo_consola();
    $(document).on('change', '.search_tipo_consola', function () { //Si detecta cambio
        let tipo_consola = $(this).val();
        if (tipo_consola === 0) {
            load_modelo_consola();
        } else {
            load_modelo_consola(tipo_consola);
        }
        //Actualizar el valor visual cuando cambia la selección (el "tooltip")
        $(this).attr('title', $(this).find('option:selected').text());
    });
    //Actualizar el valor visual cuando cambia la selección en el segundo select (el "tooltip")
    $(document).on('change', '.search_modelo_consola', function () {
        $(this).attr('title', $(this).find('option:selected').text());
    });
}

//Cuadro autocomplete, se actualiza cada vez que se escribe en el input
function autocomplete() {
    $("#search_ubicacion").on("keyup", function () {
        let sdata = $(this).val();
        ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', {'autocomplete': sdata})
            .then(function (data) {
                // console.log(data);
                $('#search_autocomplete').empty();

                if(data.length > 0) {
                    for (row in data) {
                        $('<div></div>').attr({ 'class': 'searchElement', 'id': data[row].id_ciudad , 'value': data[row].nom_ciudad }).html(data[row].nom_ciudad).appendTo('#search_autocomplete');
                    }
                    //Añadimos campo hidden para guardar la id del autocompletado
                    $('<input type="hidden" id="hidden_ciudad_id"></input>').appendTo('#search_autocomplete');
                    
                    $('#search_autocomplete').css({
                        'left': $('#search_ubicacion').offset().left - $('.div_search').offset().left,
                        'width': $('#search_ubicacion').outerWidth(),
                        'top': $('#search_ubicacion').offset().top + 30
                    }).fadeIn(300);
                } else {
                    $('#search_autocomplete').fadeOut(300);
                }
            }).catch(function () {
                $('#search_autocomplete').fadeOut(300);
            });
    });

    //Cerrar autocompletado al hacer click fuera
    $(document).on('click', function(e) {
        if(!$(e.target).closest('#search_autocomplete').length && !$(e.target).is('#search_ubicacion')) {
            $('#search_autocomplete').fadeOut(300);
        }
    });

    //Guardamos datos al seleccionar un elemento
    $(document).on('click', '.searchElement', function () {
        $('#search_ubicacion').val(this.getAttribute('value')); //Guardar nombre
        $('#hidden_ciudad_id').val(this.getAttribute('id')); //Guardar id
        $('#search_autocomplete').fadeOut(300);
    });
}

//Click search, guardamos en localStorage los valores del search, y saltamos al shop
function click_search() {
    $('#search_btn').on('click', function () {
        var filter = [];

        // Filtro tipo_consola
        if ($('#search_tipo_consola').val() != undefined) {
            filter.push({ "tipo_consola": [$('#search_tipo_consola').val()] });
        } else {
            filter.push({ "tipo_consola": "*" });
        }

        // Filtro modelo_consola
        if ($('#search_modelo_consola').val() != undefined) {
            filter.push({ "modelo_consola": [$('#search_modelo_consola').val()] });
        } else {
            filter.push({ "modelo_consola": "*" });
        }

        // Filtro ciudad
        if (($('#hidden_ciudad_id').val() != undefined) && ($('#hidden_ciudad_id').val().length > 0)) {
            filter.push({ "ciudad": [$('#hidden_ciudad_id').val(),$('#search_ubicacion').val()] });
        } else {
            filter.push({ "ciudad": "*" });
        }

        //Borramos posibles filtros
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');

        // Guardamos en localStorage los filtros
        if (filter.length != 0) {
            localStorage.setItem('filter_search', JSON.stringify(filter));
        }

        window.location.href = '?module=shop&op=view';

    });
}

$(document).ready(function () {
    load_search();
    autocomplete();
    click_search();
    // console.log("Bienvenido al Search!");
});