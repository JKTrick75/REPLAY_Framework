/* ============================================================================================ */
/*                                          LISTAR PRODUCTOS                                    */
/* ============================================================================================ */

function ajaxForSearch(url, total_prod, items_page, filter = undefined, orderby) {
    ajaxPromise(url, 'POST', 'JSON', { 'total_prod': total_prod, 'items_page': items_page, 'filter': filter, 'orderby': orderby })
        .then(function (data) {
            // console.log(data); //Mostrar productos listados

            //Vaciamos contenido del list-shop, details y marcadores, antes de volver a llenar con los productos buscados
            $('.content_shop_products').empty();
            $('.detalles_producto' && '.imagen_producto' && 'details_product_shop').empty();
            $('#details_product_shop').hide();
            markersInventory.clearLayers();

            //Añadir contenedor cabezera list
            $('<div></div>').attr({ 'class': 'encabezado_list' }).appendTo('.content_shop_products');

            //Añadir contador productos
            $('<div></div>').attr({ 'class': 'count_products' }).appendTo('.encabezado_list');
            
            //Añadir contenedor order_by
            $('<div></div>').attr({ 'class': 'order_products' }).appendTo('.encabezado_list')
            .html(
                '<select id="orderby">' +
                    '<option value = "*">-- Ordenar por --</option>' +
                    '<option value="priceASC">Precio menor a mayor</option>' +
                    '<option value="priceDESC">Precio mayor a menor</option>' +
                    '<option value="popularidad">Popularidad</option>' +
                '</select>' +
                '<input type="button" value="Ordenar" id="order_button" class="order_button"/>'
            )
            
            //Generar tarjetas productos
            for (row in data) {
                // console.log(data[row]);
                $('<div></div>').attr({ 'id': data[row].id_producto, 'class': 'list_content_shop' }).appendTo('.content_shop_products')
                    .html(
                        "<div class='list_product more_info_button' id='" + data[row].id_producto + "'>" +
                            "<div id='carousel_list_product-"+data[row].id_producto+"' class='img-container'></div>" + //Aquí va el carousel de las fotos list
                            "<div class='product-info'>" +
                                "<div class='product-content'>" +
                                    "<h1><b>" + data[row].nom_producto + " (" + data[row].precio + "€)<br>" +
                                        //Botón like
                                        "<a class='list__heart' id='" + data[row].id_producto + "'><i id=" + data[row].id_producto + " class='fa-solid fa-heart fa-lg'></i></a>" +
                                         "("+data[row].count_likes+")"+
                                    "</b></h1>" +
                                    "<ul>" +
                                        "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>Color: " + data[row].color + "</li>" +
                                        "<li> <i id='col-ico' class='fa-solid fa-certificate fa-xl'></i>Estado: " + data[row].nom_estado + "</li>" +
                                        "<li> <i id='col-ico' class='fa-solid fa-map-location-dot fa-xl'></i>Ciudad: " + data[row].nom_ciudad + "</li>" +
                                    "</ul>" +
                                    "<div class='buttons'>" +
                                        "<button class='button buy'>Comprar</button>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>"
                    )

                //Generamos los div de las imágenes de los productos, y lo convertimos en carousel (cada producto tiene una id dinámica para sus fotos)
                for (img in data[row].img_producto) {
                    // console.log(data[row].img_producto);
                    $('<div></div>').attr('id', data[row].img_producto[img]).appendTo(`#carousel_list_product-${data[row].id_producto}`)
                        .html(
                            "<img src= '" + data[row].img_producto[img] + "'" + "</img>"
                        );
                }
                //Iniciamos carrousel
                $(`#carousel_list_product-${data[row].id_producto}`).slick({
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    arrows: true
                });

                //Cargamos los marcadores al mapa por cada producto
                load_markers(data[row]);
            }
            //Cargamos los likes
            // highlight_likes_user();
    }).catch(function () {
        console.log('Error en el ajaxPromise de listar productos / No hay productos para estos filtros');
        $(".content_shop_products").empty();
        $('<div></div>').appendTo('.content_shop_products').html('<img src="view/assets/img/sad-gaming.gif" class="gif_no_stock image_gif">');
        $('<div></div>').appendTo('.content_shop_products').html('<h1>No hay productos con estos filtros</h1>');
    });
}

/* ============================================================================================ */
/*                                            FILTROS                                           */
/* ============================================================================================ */

//CONTROLADOR FILTROS
function loadProducts(total_prod = 0, items_page = 4) {
    // console.log("Hola loadProducts");
    //Filtros
    var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || false;
    var filter_home = JSON.parse(localStorage.getItem('filter_home')) || false;
    var filter_search = JSON.parse(localStorage.getItem('filter_search')) || false;
    //Orderby
    var orderby = JSON.parse(localStorage.getItem('orderby')) || false;
    //Likes
    var redirect_like = localStorage.getItem('redirect_like') || false;

    window.scrollTo(0, 0); //Mover la pantalla arriba del todo

    // if(redirect_like != false){
    //     redirect_login_like();
    // }else 
    if(filter_search){
        ajaxForSearch(friendlyURL('?module=shop&op=filter_search'), total_prod, items_page, filter_search, orderby);
    }else if(filter_home){
        ajaxForSearch(friendlyURL('?module=shop&op=filter_home'), total_prod, items_page, filter_home, orderby);
    }else if (filter_shop) {
        ajaxForSearch(friendlyURL('?module=shop&op=filter_shop'), total_prod, items_page, filter_shop, orderby);
    }else {
        ajaxForSearch(friendlyURL('?module=shop&op=get_all_products'), total_prod, items_page, undefined, orderby);
    }
}

//Cargamos filtros dinámicos
function load_filters() {
    $('<div class="div-filters"></div>').appendTo('.filters_shop')
        .html(
            '<h2>Buscar producto</h2>' +

            '<div class="categoria">' +
                '<h4>Categoria</h4>' +
            '</div>' +

            '<div class="ciudad">' +
                '<h4>Ubicación</h4>' +
                '<select class="filter_ciudad" id="filter_ciudad">' +
                    '<option value="*" class="default_filter">Todas</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="precio">' +
                '<h4>Precio</h4>' +
                '<div id="price-slider"></div>'+
                '<p>Min/Max: <span id="price-min"></span> - <span id="price-max"></span></p>'+
                '<input type="hidden" id="filter_precio_min" name="precio_min" />'+
                '<input type="hidden" id="filter_precio_max" name="precio_max" />'+
            '</div>' +

            '<div class="estado">' +
                '<h4>Estado</h4>' +
            '</div>' +

            '<div class="marca">' +
                '<h4>Marca</h4>' +
            '</div>' +
            
            '<div class="tipo_consola">' +
                '<h4>Tipo de consola</h4>' +
                '<select class="filter_tipo_consola" id="filter_tipo_consola">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="modelo_consola">' +
                '<h4>Modelo</h4>' +
                '<select class="filter_modelo_consola" id="filter_modelo_consola">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_accesorio">' +
                '<h4>Accesorios</h4>' +
                '<select class="filter_tipo_accesorio" id="filter_tipo_accesorio">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_merchandising">' +
                '<h4>Merchandising</h4>' +
                '<select class="filter_tipo_merchandising" id="filter_tipo_merchandising">' +
                    '<option value="*" class="default_filter">Todos</option>' +
                '</select><br>' +
            '</div>' +

            '<div class="tipo_venta">' +
                '<h4>Tipo de venta</h4>' +
            '</div><br>' +

            '<div id="overlay">' +
                '<div class= "cv-spinner" >' +
                    '<span class="spinner"></span>' +
                '</div >' +
            '</div > ' +
            '<button class="filter_button button_spinner" id="Button_filter">Filtrar</button>&nbsp&nbsp&nbsp' +
            '<button class="filter_remove" id="Remove_filter">Borrar filtros</button><br><br>'
        );

        //FILTROS DINAMICOS
        return ajaxPromise(friendlyURL('?module=shop&op=get_filters'), 'GET', 'JSON') //Ponemos return para controlar abajo en el $document.ready que se ejecute antes que algunas funciones
            .then(function (data) {

                // console.log(data); //Mostrar filtros recogidos

                // Rellenar filtros categoria
                for (row in data["categoria"]) {
                    $('.categoria').append(`<input type="checkbox" value="${data["categoria"][row].id_categoria}" id="categoria${data["categoria"][row].id_categoria}" class="filter_categoria"> ${data["categoria"][row].nom_categoria}</br>`);
                }

                // Rellenar filtros ciudad
                for (row in data["ciudad"]) {
                    $('.filter_ciudad').append(`<option value="${data["ciudad"][row].id_ciudad}">${data["ciudad"][row].nom_ciudad}</option>`);
                }
                
                // Rellenar filtros estado
                for (row in data["estado"]) {
                    $('.estado').append(`<input type="radio" name="filter_estado" value="${data["estado"][row].id_estado}" id="estado${data["estado"][row].id_estado}" class="filter_estado"> ${data["estado"][row].nom_estado}</br>`);                          
                }
                
                // Rellenar filtros marca filter_marca
                for (row in data["marca"]) {
                    $('.marca').append(`<input type="radio" name="filter_marca" value="${data["marca"][row].id_marca}" id="marca${data["marca"][row].id_marca}" class="filter_marca"> ${data["marca"][row].nom_marca}</br>`);
                                        
                }

                // Rellenar filtros tipo_consola
                for (row in data["tipo_consola"]) {
                    $('.filter_tipo_consola').append(`<option value="${data["tipo_consola"][row].id_tipo_consola}">${data["tipo_consola"][row].nom_tipo_consola}</option>`);
                }

                // Rellenar filtros modelo_consola
                for (row in data["modelo_consola"]) {
                    $('.filter_modelo_consola').append(`<option value="${data["modelo_consola"][row].id_modelo_consola}">${data["modelo_consola"][row].nom_modelo_consola}</option>`);
                }

                // Rellenar filtros tipo_accesorio
                for (row in data["tipo_accesorio"]) {
                    $('.filter_tipo_accesorio').append(`<option value="${data["tipo_accesorio"][row].id_tipo_accesorio}">${data["tipo_accesorio"][row].nom_tipo_accesorio}</option>`);
                }

                // Rellenar filtros tipo_merchandising
                for (row in data["tipo_merchandising"]) {
                    $('.filter_tipo_merchandising').append(`<option value="${data["tipo_merchandising"][row].id_tipo_merchandising}">${data["tipo_merchandising"][row].nom_tipo_merchandising}</option>`);
                }

                // Rellenar filtros tipo_venta
                for (row in data["tipo_venta"]) {
                    $('.tipo_venta').append(`<input type="checkbox" value="${data["tipo_venta"][row].id_tipo_venta}" id="tipo_venta${data["tipo_venta"][row].id_tipo_venta}" class="filter_tipo_venta"> ${data["tipo_venta"][row].nom_tipo_venta}</br>`);                          
                }

                //SLIDER FILTRO PRECIO
                var priceSlider = document.getElementById('price-slider');
                var priceMin = document.getElementById('price-min');
                var priceMax = document.getElementById('price-max');
                var filterPrecioMin = document.getElementById('filter_precio_min');
                var filterPrecioMax = document.getElementById('filter_precio_max');

                var precio_max = parseInt(data["precio_max"][0]["precio"]);

                noUiSlider.create(priceSlider, {
                    start: [0, precio_max], //Rango del filtro
                    connect: true,
                    range: {
                        'min': 0,
                        'max': precio_max
                    },
                    step: 10,
                });
                //Actualizar valores del slider
                priceSlider.noUiSlider.on('update', function (values) {
                    var min = Math.round(values[0]);
                    var max = Math.round(values[1]);
                    priceMin.textContent = min + '€';
                    priceMax.textContent = max + '€';
                    filterPrecioMin.value = min;
                    filterPrecioMax.value = max;
                });

            }).catch(function(error) {
                console.error("Error cargando las opciones de filtros:", error);
            });
}

//Capturamos click de filtrar, guardamos filtros en localStorage y recargamos la página para ir al controlador
function filter_click() {
    guardar_filtros_storage("set_filters_count");

    // Mostrar spinner
    document.getElementById('overlay').style.display = 'block';

    //Borramos los demás posibles filtros
    localStorage.removeItem('filter_home');
    localStorage.removeItem('filter_search');
    localStorage.removeItem('orderby');

    //Cooldown para ver el spinner antes de recargar
    setTimeout(function() {
        location.reload();
    }, 1500);
}

//Capturamos click de borrar filtros, y borramos todos los posibles filtros de localStorage, luego recargamos para mostrar todos los productos
function filter_remove(){
    localStorage.removeItem('filter_shop');
    localStorage.removeItem('filter_home');
    localStorage.removeItem('filter_search');
    localStorage.removeItem('orderby');
    //Recargamos página
    location.reload();
};

//Marcamos los filtros activos en el panel de filtros
function highlight_filters() {
    // console.log('Highlight');
    var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || false;
    var filter_home = JSON.parse(localStorage.getItem('filter_home')) || false;
    var filter_search = JSON.parse(localStorage.getItem('filter_search')) || false;

    //Si los filtros vienen del shop:
    if (filter_shop) {
        // console.log(filter_shop);
        var count_filters = 0;

        //Categoria
        if (filter_shop[0].categoria != '*') {
            // console.log(filter_shop[0].categoria);

            for (row in filter_shop[0].categoria) {
                // console.log("categoria"+filter_shop[0].categoria[row]);

                document.getElementById("categoria"+filter_shop[0].categoria[row]).setAttribute('checked', true);
            }
            count_filters += 1;
        }

        //Ciudad
        if (filter_shop[1].ciudad != '*') {
            // console.log(filter_shop[1].ciudad[0]);
            document.getElementById('filter_ciudad').value = filter_shop[1].ciudad[0];
            count_filters += 1;
        }

        //Estado
        if (filter_shop[2].estado != '*') {
            document.getElementById("estado"+filter_shop[2].estado[0]).setAttribute('checked', true);
            count_filters += 1;
        }

        //Marca
        if (filter_shop[3].marca != '*') {
            document.getElementById("marca"+filter_shop[3].marca[0]).setAttribute('checked', true);
            count_filters += 1;
        }

        //Tipo consola
        if (filter_shop[4].tipo_consola != '*') {
            document.getElementById('filter_tipo_consola').value = filter_shop[4].tipo_consola[0];
            count_filters += 1;
        }

        //Modelo consola
        if (filter_shop[5].modelo_consola != '*') {
            document.getElementById('filter_modelo_consola').value = filter_shop[5].modelo_consola[0];
            count_filters += 1;
        }

        //Tipo accesorio
        if (filter_shop[6].tipo_accesorio != '*') {
            document.getElementById('filter_tipo_accesorio').value = filter_shop[6].tipo_accesorio[0];
            count_filters += 1;
        }

        //Tipo merchandising
        if (filter_shop[7].tipo_merchandising != '*') {
            document.getElementById('filter_tipo_merchandising').value = filter_shop[7].tipo_merchandising[0];
            count_filters += 1;
        }

        //Tipo venta
        if (filter_shop[8].tipo_venta != '*') {
            // console.log(filter_shop[8].tipo_venta);

            for (row in filter_shop[8].tipo_venta) {
                document.getElementById("tipo_venta"+filter_shop[8].tipo_venta[row]).setAttribute('checked', true);
            }
            count_filters += 1;
        }

        // Precio min y max
        if (filter_shop[9].precio_min && filter_shop[10].precio_max) {
            //Recogemos valores y el slider
            var min = filter_shop[9].precio_min[0];
            var max = filter_shop[10].precio_max[0];
            var priceSlider = document.getElementById('price-slider');

            if (priceSlider.noUiSlider) {
                priceSlider.noUiSlider.set([min, max]);
            }

            //Actualizamos los valores
            document.getElementById('filter_precio_min').value = min;
            document.getElementById('filter_precio_max').value = max;
            document.getElementById('price-min').textContent = min + '€';
            document.getElementById('price-max').textContent = max + '€';

            if (min != 0 || max != 500){
                count_filters += 1;
            }
        }

        // console.log(count_filters);
        document.getElementById('filterToggle').style.setProperty('--number', `"${count_filters}"`);
    }

    //Si los filtros vienen del home:
    if (filter_home) {
        // console.log(filter_home);
        var count_filters = 0;
        var highlight_field = filter_home[0][0];
        var highlight_value = filter_home[0][1];

        //Categoria
        if (highlight_field == 'categoria') {
            document.getElementById("categoria"+highlight_value).setAttribute('checked', true);
            count_filters += 1;
        }

        //Marca
        if (highlight_field == 'marca') {
            document.getElementById("marca"+highlight_value).setAttribute('checked', true);
            count_filters += 1;
        }

        //Tipo consola
        if (highlight_field == 'tipo_consola') {
            document.getElementById('filter_tipo_consola').value = highlight_value;
            count_filters += 1;
        }

        //Ciudad
        if (highlight_field == 'ciudad') {
            document.getElementById('filter_ciudad').value = highlight_value;
            count_filters += 1;
        }

        //Estado
        if (highlight_field == 'estado') {
            document.getElementById("estado"+highlight_value).setAttribute('checked', true);
            count_filters += 1;
        }

        //Tipo venta
        if (highlight_field == 'tipo_venta') {
            document.getElementById("tipo_venta"+highlight_value).setAttribute('checked', true);
            count_filters += 1;
        }

        // console.log(count_filters);
        document.getElementById('filterToggle').style.setProperty('--number', `"${count_filters}"`);
    }

    //Si los filtros vienen del search:
    if (filter_search){
        // console.log(filter_search);
        var count_filters = 0;

        //Tipo_consola
        if (filter_search[0].tipo_consola != '*') {
            document.getElementById('filter_tipo_consola').value = filter_search[0].tipo_consola[0];
            count_filters += 1;
        }

        //Modelo consola
        if (filter_search[1].modelo_consola != '*') {
            document.getElementById('filter_modelo_consola').value = filter_search[1].modelo_consola[0];
            count_filters += 1;
        }

        //Ciudad
        if (filter_search[2].ciudad != '*') {
            document.getElementById('filter_ciudad').value = filter_search[2].ciudad[0];
            count_filters += 1;
        }

        // console.log(count_filters);
        document.getElementById('filterToggle').style.setProperty('--number', `"${count_filters}"`);
    }
}

//Marcamos los filtros activos del search
function highlight_search() {
    var highlight_search = JSON.parse(localStorage.getItem('filter_search')) || false;

    if (highlight_search){
        // console.log("Estos son los filtros a remarcar:");
        // console.log(highlight_search);

        //Tipo_consola
        if (highlight_search[0].tipo_consola != '*') {
            document.getElementById('search_tipo_consola').value = highlight_search[0].tipo_consola[0];
        }

        //Modelo consola
        if (highlight_search[1].modelo_consola != '*') {
            document.getElementById('search_modelo_consola').value = highlight_search[1].modelo_consola[0];
        }

        //Ciudad
        if (highlight_search[2].ciudad != '*') {
            document.getElementById('search_ubicacion').value = highlight_search[2].ciudad[1];
        }

    }
}

function highlight_orderby(){
    var order = JSON.parse(localStorage.getItem('orderby')) || false;
    if (order) {
        // console.log(order[0].orderby);
        document.getElementById('orderby').value = order[0].orderby;
    }
}

//Modal filtros
function modal_filters() {
    document.getElementById('filterToggle').addEventListener('click', function() {
        const filters = document.querySelector('.filters_shop');
        const btn = this;
        
        // Tratamiento de clases para mostrar/ocultar el modal y cambiar el icono/apariencia del botón
        filters.classList.toggle('active');
        btn.classList.toggle('active');
      });
}

//Contamos los productos que se han filtrado
function count_products(){
    var filters = JSON.parse(localStorage.getItem('filter_shop_update')) || false;

    ajaxPromise(friendlyURL('?module=shop&op=count_products'), 'POST', 'JSON', { 'filter': filters })
        .then(function(data) {
            // console.log(data);
            //Mostrando X resultados
            $(`<p class="results">"Mostrando ${data[0]["cantidad"]} resultados"</p>`).appendTo('.count_products');
            
        }).catch(function() {
            console.log('Error en el ajaxPromise de contar productos');
        });
}

//Contamos cuantos productos se filtrarán al pulsar botón filtrar
function update_count_products(){
    guardar_filtros_storage("update_filters_count");

    var filters = JSON.parse(localStorage.getItem('filter_shop_update')) || false;

    ajaxPromise(friendlyURL('?module=shop&op=count_products'), 'POST', 'JSON', { 'filter': filters })
        .then(function(data) {
            // console.log(data);
            $('.div-filters .results').remove();
            $(`<p class="results">"Mostrar ${data[0]["cantidad"]} resultados"</p>`).appendTo('.div-filters');
            
        }).catch(function() {
            console.log('Error en el ajaxPromise de contar productos');
        });
}

//Detectamos cambios en los filtros para actualizar el contador de productos
function radar_filter_update() {
    //Recogemos y tenemos en cuenta todos los elementos del filtro
    var filterElements = [
        '.filter_categoria',
        '.filter_ciudad',
        '.filter_estado',
        '.filter_marca',
        '.filter_tipo_consola',
        '.filter_modelo_consola',
        '.filter_tipo_accesorio',
        '.filter_tipo_merchandising',
        '.filter_tipo_venta',
        '#filter_precio_min',
        '#filter_precio_max'
    ];

    //Radar para selects/radio-buttons/checkboxes
    $(document).on('change input', filterElements.join(', '), function() {
        update_count_products();
    });

    //Radar para Slider precios
    var priceSlider = document.getElementById('price-slider');
    if (priceSlider && priceSlider.noUiSlider) {
        priceSlider.noUiSlider.on('set', function() {
            update_count_products();
        });
    }
}

//Recogemos valores de los filtros y guardamos en localStorage, dependiendo del parámetro de entrada guardaremos con un nombre u otro
function guardar_filtros_storage(modo_guardado){
    var filter = [];
    var categoria = [];
    var ciudad = [];
    var estado = [];
    var marca = [];
    var tipo_consola = [];
    var modelo_consola = [];
    var tipo_accesorio = [];
    var tipo_merchandising = [];
    var tipo_venta = [];
    var precio_min = [];
    var precio_max = [];

    // Filtro categoria
    $.each($("input[class='filter_categoria']:checked"), function() {
        categoria.push($(this).val());
    });

    if (categoria.length != 0) {
        filter.push({ "categoria": categoria });
    } else {
        filter.push({ "categoria": '*' });
    }

    // Filtro ciudad
    var ciu = document.getElementById("filter_ciudad").value;
    if (ciu != 0) {
        ciudad.push(ciu);
        if (ciudad == "*") {
            filter.push({ "ciudad": "*" });
        } else {
            filter.push({ "ciudad": ciudad });
        }
    } else {
        filter.push({ "ciudad": '*' });
    }

    // Filtro estado
    $.each($("input[class='filter_estado']:checked"), function() {
        estado.push($(this).val());
    });

    if (estado.length != 0) {
        filter.push({ "estado": estado });
    } else {
        filter.push({ "estado": '*' });
    }

    // Filtro marca
    $.each($("input[class='filter_marca']:checked"), function() {
        marca.push($(this).val());
    });

    if (marca.length != 0) {
        filter.push({ "marca": marca });
    } else {
        filter.push({ "marca": '*' });
    }

    // Filtro tipo_consola
    var t_con = document.getElementById("filter_tipo_consola").value;
    if (t_con != 0) {
        tipo_consola.push(t_con);
        if (tipo_consola == "*") {
            filter.push({ "tipo_consola": "*" });
        } else {
            filter.push({ "tipo_consola": tipo_consola });
        }
    } else {
        filter.push({ "tipo_consola": '*' });
    }

    // Filtro modelo_consola
    var m_con = document.getElementById("filter_modelo_consola").value;
    if (m_con != 0) {
        modelo_consola.push(m_con);
        if (modelo_consola == "*") {
            filter.push({ "modelo_consola": "*" });
        } else {
            filter.push({ "modelo_consola": modelo_consola });
        }
    } else {
        filter.push({ "modelo_consola": '*' });
    }

    // Filtro tipo_accesorio
    var t_acc = document.getElementById("filter_tipo_accesorio").value;
    if (t_acc != 0) {
        tipo_accesorio.push(t_acc);
        if (tipo_accesorio == "*") {
            filter.push({ "tipo_accesorio": "*" });
        } else {
            filter.push({ "tipo_accesorio": tipo_accesorio });
        }
    } else {
        filter.push({ "tipo_accesorio": '*' });
    }

    // Filtro tipo_merchandising
    var t_mer = document.getElementById("filter_tipo_merchandising").value;
    if (t_mer != 0) {
        tipo_merchandising.push(t_mer);
        if (tipo_merchandising == "*") {
            filter.push({ "tipo_merchandising": "*" });
        } else {
            filter.push({ "tipo_merchandising": tipo_merchandising });
        }
    } else {
        filter.push({ "tipo_merchandising": '*' });
    }

    // Filtro tipo_venta
    $.each($("input[class='filter_tipo_venta']:checked"), function() {
        tipo_venta.push($(this).val());
    });

    if (tipo_venta.length != 0) {
        filter.push({ "tipo_venta": tipo_venta });
    } else {
        filter.push({ "tipo_venta": '*' });
    }

    // Filtro precio min
    var p_min = document.getElementById('filter_precio_min').value;
    if (p_min != 0) {
        precio_min.push(p_min);
        if (precio_min == "*") {
            filter.push({ "precio_min": "0" });
        } else {
            filter.push({ "precio_min": precio_min });
        }
    } else {
        filter.push({ "precio_min": '0' });
    }
    // Filtro precio max
    var p_max = document.getElementById('filter_precio_max').value;
    if (p_max != 0) {
        precio_max.push(p_max);
        if (precio_max == "*") {
            filter.push({ "precio_max": "*" });
        } else {
            filter.push({ "precio_max": precio_max });
        }
    } else {
        filter.push({ "precio_max": '0' });
    }

    if (modo_guardado == "set_filters_count"){
        localStorage.removeItem('filter_shop');
        localStorage.setItem('filter_shop', JSON.stringify(filter));
    }else if (modo_guardado == "update_filters_count"){
        localStorage.removeItem('filter_shop_update');
        localStorage.setItem('filter_shop_update', JSON.stringify(filter));
    }
}

//Capturamos click de ordenar, guardamos valor en localStorage y recargamos la página para ir al controlador
function order_click() {
    var orderby = [];

    orderby.push({ "orderby": $('#orderby').val() });

    //Guardamos order en localStorage y recargamos la página
    localStorage.setItem('orderby', JSON.stringify(orderby));
    //Recargamos página
    location.reload();
}

/* ============================================================================================ */
/*                                       PAGINATION                                             */
/* ============================================================================================ */

function start_pagination() {
    var filter_shop = JSON.parse(localStorage.getItem('filter_shop')) || false;
    var filter_home = JSON.parse(localStorage.getItem('filter_home')) || false;
    var filter_search = JSON.parse(localStorage.getItem('filter_search')) || false;
    var filter = false;
    var url;

    if(filter_search){
        url = '?module=shop&op=pagination_search';
        filter = filter_search;
    }else if(filter_home){
        url = '?module=shop&op=pagination_home';
        filter = filter_home;
    }else if (filter_shop) {
        url = '?module=shop&op=pagination_shop';
        filter = filter_shop;
    } else {
        url = '?module=shop&op=pagination_all_products';
    }

    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filter': filter })
        .then(function(data) {
            // console.log(data[0]["cantidad"]);
            localStorage.setItem('total_products', data[0]["cantidad"]);
            load_pagination();
        }).catch(function() {
            console.log('Fail pagination');
        });
}

function load_pagination() {
    //Recogemos el total de productos y calculamos el total de páginas
    var total_prod = localStorage.getItem('total_products');
    var total_pages = Math.ceil(total_prod / 4) || 1;
    
    //Cargamos la paginación
    $('.pagination_list').empty(); //Limpiamos la paginación anterior
    for (let i = 1; i <= total_pages; i++) {
        $(`<li class="page_item" id="${i}">${i}</li>`).appendTo('.pagination_list');
    }

    //Clicks paginación y flechas
    $('.page_item').off('click').on('click', function() {
        click_page_pagination(this.getAttribute('id'));
    });

    click_flechas_pagination();

    //Pagina 1 por defecto
    setActivePage(1);
}

function setActivePage(page) {
    localStorage.setItem('current_page', page);
    $('.page_item').removeClass('active');
    $(`.page_item[id="${page}"]`).addClass('active');
    update_arrow_states(page, Math.ceil(localStorage.getItem('total_products') / 4));
}

//Clicks números de paginación
function click_page_pagination(pageID) {
    //Actualizamos la pagina activa
    setActivePage(pageID);

    //Calculamos offset
    var total_prod = 4 * (pageID - 1);

    //Cargar productos
    loadProducts(total_prod, 4);
    window.scrollTo(0, 0);
    setTimeout(function() {
        count_products();
        highlight_orderby();
    }, 200);
}

//Clicks flechas
function click_flechas_pagination() {
    $('.pagination_arrow').off('click').on('click', function() {
        var currentPage = parseInt(localStorage.getItem('current_page')) || 1;
        var newPage = $(this).hasClass('next') ? currentPage + 1 : currentPage - 1;
        //Vamos a la función del click pagination
        click_page_pagination(newPage);
    });
}

//Actualizar flechas (si se está en los extremos, desactiva esa flecha)
function update_arrow_states(currentPage, total_pages) {
    $('.prev').prop('disabled', currentPage <= 1);
    $('.next').prop('disabled', currentPage >= total_pages);
}

/* ============================================================================================ */
/*                                            MAPS                                              */
/* ============================================================================================ */

//Iniciamos variables globales del mapa
var map;
var map_details;
var markersInventory;

//Cargamos mapa del shop
function load_map_shop() {
    //Inicializamos mapa
    map = L.map('container_map').setView([40.41587070194395, -3.685132043276392], 6);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map);

    //Añadimos grupo de marcadores al mapa, a este grupo es donde añadimos los marcadores, que estará linkeado al mapa
    markersInventory = L.layerGroup().addTo(map);
}

//Cargamos mapa del details
function load_map_details(data) {
    //Destruir mapa details si existe
    if(typeof map_details !== 'undefined' && map_details !== null){
        map_details.remove();
        map_details = null;
    }
    $('#container_map_details').empty();

    //Recogemos datos
    var position = [parseFloat(data[0][0].lat),  parseFloat(data[0][0].long)];

    //Inicializamos mapa
    map_details = L.map('container_map_details').setView(position, 16);

    //Le añadimos la capa/skin visual
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map_details);

    //Añadimos escala y otras mejoras
    L.control.scale().addTo(map_details);
    map_details.zoomControl.setPosition('topright');
}

//Cargamos marcadores del shop
function load_markers(data) {
    // console.log(data);
    var position = [parseFloat(data.lat), parseFloat(data.long)];

    //Creamos el icono del marcador
    var marker_icon = L.icon({
        iconUrl: 'view/assets/img/marker.png',
        iconSize: [64, 64],
        shadowSize: [0, 0],
        iconAnchor: [32, 64],
        popupAnchor: [0, -70]
    });
    
    //Creamos el elemento del carrusel popup
    var carouselContainer = $(`<div id='carousel_popup-${data.id_producto}' class='img_container_popup'></div>`);
    
    //Añadimos las imágenes al carrousel
    for (img in data.img_producto) {
        carouselContainer.append(
            `<div><img src="${data.img_producto[img]}" class="img-popup-slide"></div>`
        );
    }
    
    //Creamos el marcador con el popup bindeado, e insertamos el carrousel ya montado //Añadimos el marcador a nuestro markersInventory
    var marker = L.marker(position, {icon: marker_icon}).addTo(markersInventory).bindPopup(
        `<div class='more_info_popup more_info_button' id='${data.id_producto}'>
            ${carouselContainer.prop('outerHTML')}
            <h4><b>${data.nom_producto}</b></h4>
            <table id='table_popup'>
                <tr>
                    <td><i class='fa-solid fa-location-dot fa-xl'></i>&nbsp;${data.nom_ciudad}</td>
                    <td><i class='fa-solid fa-palette fa-xl'></i>&nbsp;${data.color}</td>
                    <td><i class='fa-solid fa-coins fa-xl'></i>&nbsp;${data.precio} €</td>
                </tr>
            </table>
        </div>`
    );

    //Inicializamos carrousel cuando se abre el popup
    marker.on('popupopen', function() {
        $(`#carousel_popup-${data.id_producto}`).slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: false,
            arrows: true,
            dots: true
        });
    });
}

//Cargamos marcador details
function load_markers_details(data) {
    var position = [parseFloat(data[0][0].lat),  parseFloat(data[0][0].long)];
    // console.log(data);

    //Creamos los iconos del marcador
    var marker_icon = L.icon({
        iconUrl: 'view/assets/img/marker.png',
        iconSize: [64, 64],       // Tamaño de visualización (1/8 del original)
        shadowSize: [0, 0],       // Desactivar sombra
        iconAnchor: [32, 64],     // Punto de anclaje (centro inferior)
        popupAnchor: [0, -70]    // Posición del popup
    });

    L.marker(position, {icon: marker_icon}).addTo(map_details).bindPopup(data[0][0].nom_producto);
}

/* ============================================================================================ */
/*                                            DETAILS                                           */
/* ============================================================================================ */

//Cargamos detalles del producto
function loadDetails(id_producto) {
    ajaxPromise(friendlyURL('?module=shop&op=get_details'), 'POST', 'JSON', { 'id_producto': id_producto })
        .then(function (data) {
            console.log(data);
            window.scrollTo(0, 0); //Mover la pantalla arriba del todo

            $('.list_product_shop').empty();
            $('.imagen_producto_dentro').empty();
            $('.detalles_producto_dentro').empty();
            $('#details_product_shop').show();
            $('.list_product_shop').hide();

            //Apartado imágenes producto
            for (row in data[1][0]) {
                // console.log(data[1][0][row].img_producto);
                $('<div></div>').attr({ 'id': data[1][0][row].id_img, class: 'imagen_producto_dentro' }).appendTo('.imagen_producto')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_producto + "'>" + "</img>" +
                        "</div>"
                    )
            }

            //Apartado detalles producto
            $('<div></div>').attr({ 'id': data[0][0].id_producto, class: 'detalles_producto_dentro' }).appendTo('.detalles_producto')
            .html(
            "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                    "<div class='header-details'>" +
                        "<h1><b>" + data[0][0].nom_producto + "</b></h1>" +
                        //Botón like
                        "<p class='count_likes'><a class='details__heart' id='" + data[0][0].id_producto + "'>" +
                            "<i id='" + data[0][0].id_producto + "' class='fa-solid fa-heart fa-lg'></i>" +
                        "</a>"+
                        "("+data[0][0].count_likes+")</p>" +
                    "</div>" +
                    "<hr class='hr-shop'>" +
                    "<h3>Especificaciones generales:</h3>" +
                    "<table id='table-shop'>" +
                        "<tr>" +
                            "<td> <i id='col-ico' class='fa-solid fa-sack-dollar fa-2xl'></i> &nbsp; Precio inicial: " + data[0][0].precio + "€</td>" +
                            "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp; Color: " + data[0][0].color + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td> <i id='col-ico' class='fa-solid fa-box fa-2xl'></i> &nbsp; Capacidad: " + (data[0][0].capacidad ? data[0][0].capacidad : "N/A") + "</td>" +
                            "<td> <i id='col-ico' class='fa-brands fa-bandcamp fa-2xl'></i> &nbsp; Marca: " + data[0][0].nom_marca + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td> <i id='col-ico' class='fa-solid fa-certificate fa-2xl'></i> &nbsp; Estado: " + data[0][0].nom_estado + "</td>" +
                            "<td> <i id='col-ico' class='fa-solid fa-map-location-dot fa-2xl'></i> &nbsp; Ciudad: " + data[0][0].nom_ciudad + "</td>" +
                        "</tr>" +
                    "</table>" +
                        "<hr class='hr-shop'>" +
                        "<h3>Fechas:</h3>" +
                        "<table id='table-shop'>" +
                        "<tr>" +
                            "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp; Fecha publicación: " + data[0][0].fecha_publicacion + "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp; Última modificación: " + data[0][0].fecha_ult_mod + "</td>" +
                        "</tr>" +
                    "</table>" +
                    "<hr class='hr-shop'>" +
                    "<h3>Observaciones:</h3>" +
                    "<p>"+data[0][0].observaciones+"</p>" +
                "</div>" +
                "</div>" +
            "</div>"
            );

            //Apartado detalles extra
            $('<div></div>').attr({ 'id': data[0][0].id_producto, class: 'detalles_producto_dentro' }).appendTo('.detalles_extra')
            .html(
                "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                        "<div class='product-content_details'>" +
                            "<h3>Otros detalles:</h3>" +
                            "<hr class=hr-shop>" +
                            "<table id='table-shop'>"+
                                "<tr>" +
                                    "<td> <i class='bi bi-controller' style='font-size: 2rem'></i> &nbsp; Incluye mando: " + (data[0][0].incluye_mando === 'true' ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-dpad' style='font-size: 2rem'></i> &nbsp; Tipo consola: " + (data[0][0].nom_tipo_consola ? data[0][0].nom_tipo_consola : "N/A") + "</td>" +
                                    "<td> <i class='bi bi-dpad' style='font-size: 2rem'></i> &nbsp; Modelo consola: " + (data[0][0].nom_modelo_consola ? data[0][0].nom_modelo_consola : "N/A") + "</td>" +    
                                "</tr>" +
                                "<tr>" +
                                    "<td> <i class='bi bi-plug' style='font-size: 2rem'></i> &nbsp; Incluye cargador: " + (data[0][0].incluye_cargador === 'true' ? "Sí" : "No") + "</td>" +
                                    "<td> <i class='bi bi-plus-square' style='font-size: 2rem'></i></i> &nbsp; Tipo accesorio: " + (data[0][0].nom_tipo_accesorio ? data[0][0].nom_tipo_accesorio : "N/A") + "</td>" +
                                    "<td> </td>"+                                                
                                "</tr>" +
                                "<tr>" +
                                    "<td> <i class='bi bi-joystick' style='font-size: 2rem'></i> &nbsp; Incluye juegos: " + (data[0][0].incluye_juegos === 'true' ? "Sí" : "No") + "</td>" + 
                                    "<td> <i class='bi bi-boxes' style='font-size: 2rem'></i> &nbsp; Tipo merchandising: " + (data[0][0].nom_tipo_merchandising ? data[0][0].nom_tipo_merchandising : "N/A") + "</td>" +
                                    "<td> </td>"+
                                "</tr>" +
                            "</table>" +
                            "<hr class=hr-shop>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='buttons'>" +
                    "<button class='back_list button add'>Volver</button>" +
                "</div>" 
            );

            //Apartado compra
            $('<div></div>').attr({ 'id': data[0][0].id_producto, class: 'compra_producto_dentro' }).appendTo('.compra_producto')
            .html(
                "<h2>" + data[0][0].precio + "€</h2>" +
                "<div class='buttons_details'>" +
                    "<a class='button add' href='#'>Añadir a cesta</a>" +
                    "<a class='button buy' href='#'>Comprar</a>" +
                "</div>" +
                "<hr class='hr-shop'>" +
                "<h3>Opciones de envio:</h3>" +
                "<hr class='hr-shop'>" +
                "<div class='purchase-options'></div>"
            );

            //Cargamos las opciones de compra
            for (var row in data[2][0]) {
                $('<div></div>').attr({ class: 'purchase-item' }).appendTo('.purchase-options')
                .html(
                    "<img src='" + data[2][0][row].img_tipo_venta + "' alt='" + data[2][0][row].nom_tipo_venta + "'>" +
                    "<p>" + data[2][0][row].nom_tipo_venta + "</p>" +
                    "<button>Seleccionar</button>"
                );
            }

            //Cargamos carrousel de imágenes
            $('.imagen_producto').slick({
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 3000
            });

            //Cargamos el mapa con el marcador del producto
            load_map_details(data);
            load_markers_details(data);

            //Apartado productos relacionados
            related_products(data[0][0].id_producto,
                            data[0][0].marca,
                            data[0][0].tipo_consola,
                            data[0][0].modelo_consola,
                            data[0][0].ciudad);

            // //Cargamos los likes
            // highlight_likes_user();

        }).catch(function (data) {
            console.log('Error en el ajaxPromise de detalles producto');
        });
}

function load_related_products(offset, total_products, id, marca, tipo_consola, modelo_consola, ciudad) {
    let limit = 3;

    ajaxPromise(friendlyURL('?module=shop&op=load_related'), 'POST', 'JSON', 
        { 'offset': offset, 'limit': limit, 'id': id, 'marca': marca, 'tipo_consola': tipo_consola, 'modelo_consola': modelo_consola, 'ciudad': ciudad })
        .then(function(data) {
            for (row in data) {
                $('<div></div>').attr({ 'id': data[row].id_producto, 'class': 'more_info_button' }).appendTo('.lista_relacionados')
                    .html(
                        "<li class='portfolio-item'>" +
                            "<div class='item-main'>" +
                                "<img src= '" + data[row].img_producto[0] + "'>" + "</img>" +
                                "<h5>" + data[row].nom_producto + " | " + data[row].precio + "€</h5>" +
                            "</div>" +
                        "</li>"
                    )
            }

            //Calcular productos restantes
            offset += limit;
            var productos_restantes = total_products - offset;
            // console.log(productos_restantes);

            //Mostrar botón si quedan más de 3 productos restantes
            if (productos_restantes >= 3) {
                $('.more_car__button').empty();
                $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.lista_relacionados')
                    .html(
                        '<button class="load_more_button" id="load_more_button">Cargar más</button>'
                    )
            }
        }).catch(function() {
            console.log("error load_related_products");
        });
}

function related_products(id, marca, tipo_consola, modelo_consola, ciudad) {
    var offset = 0;
    ajaxPromise(friendlyURL('?module=shop&op=count_related'), 'POST', 'JSON', 
                { 'id': id, 'marca': marca, 'tipo_consola': tipo_consola, 'modelo_consola': modelo_consola, 'ciudad': ciudad })
        .then(function(data) {
            var total_products = data[0].cantidad;
            // console.log(total_products);
            load_related_products(0, total_products, id, marca, tipo_consola, modelo_consola, ciudad);
            //Cargamos más productos relacionados (eliminamos antes el botón y lo volvemos a cargar)
            $(document).off('click', '.load_more_button').on("click", '.load_more_button', function() {
                offset += 3;
                $('.more_car__button').empty();
                load_related_products(offset, total_products, id, marca, tipo_consola, modelo_consola, ciudad);
            });
        }).catch(function() {
            console.log('error related_products');
        });
}

function countPopularity(id_producto){
    ajaxPromise(friendlyURL('?module=shop&op=count_popularity'), 'POST', 'JSON', { 'id_producto': id_producto })
        .then(function(data) {}).catch(function() {});
}

/* ============================================================================================ */
/*                                            LIKES                                             */
/* ============================================================================================ */

function click_like(id_producto, lugar) {
    var token = localStorage.getItem('access_token');
    if (token) { //Si está logeado -> Añadir/Quitar like
        ajaxPromise(friendlyURL('?module=shop&op=controller_likes'), 'POST', 'JSON', { 'id_producto': id_producto, 'token': token })
            .then(function(data) {
                console.log(data);
                $("#" + id_producto + ".fa-heart").toggleClass('like_red');
            }).catch(function() {
                console.log("Error click like");
            });
    } else { //Si no está loggeado, redirigimos al login
        var redirect = [];
        redirect.push(id_producto, lugar);

        localStorage.setItem('redirect_like', redirect);
        localStorage.setItem('id_producto', id_producto);

        Swal.fire("Inicia sesión antes de dar like!").then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                window.location.href = 'index.php?page=controller_auth&op=list';
            }
        });
    }
}

function highlight_likes_user() {
    var token = localStorage.getItem('access_token');
    if (token) { //Si hay login
        ajaxPromise(friendlyURL('?module=shop&op=highlight_likes_user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                // console.log(data);
                for (row in data) {
                    $("#" + data[row].id_producto + ".fa-heart").addClass('like_red');
                }
            }).catch(function() {
                console.log("Error highlight like");
            });
    }
}

function redirect_login_like() {
    //Guardamos like una vez hacemos login:
    var token = localStorage.getItem('access_token');
    var id_producto = localStorage.getItem('id_producto');

    ajaxPromise(friendlyURL('?module=shop&op=controller_likes'), 'POST', 'JSON', { 'id_producto': id_producto, 'token': token, 'redirect': true })
    .then(function(data) {  })
    .catch(function() {
        console.log("Error redirect like");
    });

    var redirect = localStorage.getItem('redirect_like').split(",");
    if (redirect[1] == "details") { //Si estaba en el details, volvemos al details de ese producto
        localStorage.removeItem('redirect_like');
        loadDetails(redirect[0]);
    } else if (redirect[1] == "list_all") { //Si estaba en el list, volvemos al shop-list
        localStorage.removeItem('redirect_like');
        loadProducts();
    }
}

/* ============================================================================================ */
/*                                            CLICKS                                            */
/* ============================================================================================ */

//Capturamos clicks (details, volver atrás al shop, filtrar y borrar filtros)
function clicks() {
    // console.log("Cargamos clicks");
    $(document).on("click", ".more_info_button", function (e) {
        //Arreglamos posibles errores de clicks en cargar más
        $(document).off('click', '.load_more_button');

        // Elementos a excluir (carousel, corazón y botón comprar)
        var excludedElements = '.slick-arrow, .slick-dots, .buy, .list__heart, .fa-heart';
        //Si el elemento pulsado es uno de los de la lista, paramos el evento del click
        if ($(e.target).closest(excludedElements).length > 0) {
            return;
        }

        //Reiniciamos details
        if($('.imagen_producto').hasClass('slick-initialized')){
            $('.imagen_producto').slick('unslick');
        }
        $('.imagen_producto').empty();
        $('.detalles_producto').empty();
        $('.compra_producto').empty();
        $('.detalles_extra').empty();
        $('#container_map_details').empty();
        $('.lista_relacionados').empty();
        $('.container_valoraciones').empty();

        var id_producto = this.getAttribute('id');
        // console.log("Pillamos el id: " + id_producto);
        countPopularity(id_producto);
        loadDetails(id_producto);
    });

    $(document).on("click", ".back_list", function () {
        // console.log("Volvemos al list");
        window.location.href = "index.php?module=shop&op=view";
    });

    $(document).on('click', '.filter_button', function () {
        filter_click();
    });

    $(document).on('click', '.filter_remove', function() {
        filter_remove();
    });

    $(document).on('click', '.order_button', function () {
        order_click();
    });

    $(document).on("click", ".list__heart", function() {
        var id_producto = this.getAttribute('id');
        click_like(id_producto, "list_all");
    });

    $(document).on("click", ".details__heart", function() {
        var id_producto = this.getAttribute('id');
        click_like(id_producto, "details");
    });
}

//Ocultamos elementos
function ocultar_elementos() {
    document.getElementById('overlay').style.display = 'none'; //Ocultamos el spinner
}

$(document).ready(function () {
    load_map_shop();
    loadProducts();
    clicks();
    load_filters().then(function() {
        modal_filters();
        highlight_filters();
        highlight_search();
        highlight_orderby();
        update_count_products();
        count_products();
        radar_filter_update();
        ocultar_elementos();
        start_pagination();
    }).catch(function(error) {
        console.error("Error:", error);
    });
    // console.log("Bienvenido al Catálogo");
});