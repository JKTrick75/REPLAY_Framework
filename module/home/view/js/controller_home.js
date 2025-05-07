//Tarjetas categorias
function loadCategories() {
    ajaxPromise('index.php?module=home&op=get_categories', 'GET', 'JSON')
        .then(function (data) {
            console.log(data);
            var categories = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_categoria,
                    imagen = data[i].img_categoria,
                    id = data[i].id_categoria;

                // Crear tarjetas de categoría
                categories += "<div class='col-sm-4 categoria'>" +
                                    "<div class='categoria-inner text-center filter_categoria' id='" + id + "'>" +
                                        "<img src='" + imagen + "' class='img_categoria'>" +
                                        "<br/>" + nombre +
                                    "</div>" +
                                "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#categories").html(categories);
        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
            console.log('Error tarjetas categorias');
        });
}

//Carrousel productos nuevos
function carrousel_Productos_New() {
    ajaxPromise('index.php?module=home&op=Carrousel_Productos_New', 'GET', 'JSON')
        .then(function (data) {
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_producto).appendTo(".carousel__new__productos")
                    .html(
                        "<div class='col-sm-4 carousel__productos'>" +
                            "<div class='carousel__productos-inner text-center filter_home_product' id='" + data[row].id_producto + "'>" +
                                "<img class='carousel__img' src='" + data[row].img_producto + "' alt=''><br>" 
                                + data[row].nom_producto +
                            "</div>" +
                        "</div>"
                    )
            }
            $('.carousel__new__productos').slick({
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 4,
                dots:true,
                autoplay: true,
                autoplaySpeed: 1500
              });
        })
        .catch(function () {
            console.log('Error carrousel productos New');
        });
}

//Tarjetas marcas
function loadMarcas() {
    ajaxPromise('index.php?module=home&op=get_marcas', 'GET', 'JSON')
        .then(function (data) {
            var marcas = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_marca,
                    imagen = data[i].img_marca,
                    id = data[i].id_marca;

                // Crear tarjetas de marca
                marcas += "<div class='col-sm-4 marca'>" +
                    "<div class='marca-inner text-center filter_marca' id='" + id + "'>" +
                        "<img src='" + imagen + "' class='img_marca'>" +
                        "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#marcas").html(marcas);
        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Marcas HOME";
            console.log('Error tarjetas marcas');
        });
}

//Tarjetas tipo_consola
function loadTipoConsola() {
    ajaxPromise('index.php?module=home&op=get_tipo_consola', 'GET', 'JSON')
        .then(function (data) {
            var tipo_consola = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_tipo_consola,
                    imagen = data[i].img_tipo_consola,
                    id = data[i].id_tipo_consola;

                // Crear tarjetas de tipo_consola
                tipo_consola += "<div class='col-sm-4 tipo_consola'>" +
                    "<div class='tipo_consola-inner text-center filter_tipo_consola' id='" + id + "'>" +
                    "<img src='" + imagen + "' class='img_tipo_consola'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#tipo_consola").html(tipo_consola);
        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_tipo_consola HOME";
            console.log('Error tarjetas tipo_consola');
        });
}

//Carrousel productos más populares
function carrousel_Productos_Populares() {
    ajaxPromise('index.php?module=home&op=Carrousel_Populares', 'GET', 'JSON')
        .then(function (data) {
            // console.log(data);
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_producto).appendTo(".carousel__popular__productos")
                    .html(
                        "<div class='col-sm-4 carousel__productos'>" +
                            "<div class='carousel__productos-inner text-center filter_home_product' id='" + data[row].id_producto + "'>" +
                                "<img class='carousel__img' src='" + data[row].img_producto + "' alt=''><br>" 
                                + data[row].nom_producto +
                            "</div>" +
                        "</div>"
                    )
            }
            $('.carousel__popular__productos').slick({
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 4,
                dots:true,
                autoplay: true,
                autoplaySpeed: 1500
              });
        })
        .catch(function () {
            console.log('Error carrousel productos populares');
        });
}

//Carrousel ciudades
function carrousel_Ciudades() {
    ajaxPromise('index.php?module=home&op=Carrousel_Ciudades', 'GET', 'JSON')
        .then(function (data) {
            for (row in data) {
                $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].nom_ciudad).appendTo(".carousel__list__ciudades")
                    .html(
                        "<div class='col-sm-4 carousel__ciudad'>" +
                            "<div class='carousel__ciudad-inner text-center filter_ciudad' id='" + data[row].id_ciudad + "'>" +
                                "<img class='carousel__img' src='" + data[row].img_ciudad + "' alt=''><br>" + data[row].nom_ciudad +
                            "</div>" +
                        "</div>"
                    )
            }
            new Glider(document.querySelector('.carousel__list__ciudades'), {
                slidesToShow: 3,
                slidesToScroll: 3,
                draggable: true,
                rewind: true,
                dots: '.carousel__dots__ciudad',
                arrows: {
                    prev: '.prev_ciudades',
                    next: '.next_ciudades'
                }
            });
        })
        .catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
            console.log('Error carrousel ciudades');
        });
}

//Tarjetas estado
function loadEstado() {
    ajaxPromise('index.php?module=home&op=get_estado', 'GET', 'JSON')
        .then(function (data) {
            var estado = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_estado,
                    imagen = data[i].img_estado,
                    id = data[i].id_estado;

                // Crear tarjetas de estado
                estado += "<div class='col-sm-4 estado'>" +
                    "<div class='estado-inner text-center filter_estado' id='" + id + "'>" +
                    "<img src='" + imagen + "' class='img_estado'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#estado").html(estado);
        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_estado HOME";
            console.log('Error tarjetas estado');
        });
}

//Tarjetas tipo_venta
function loadTipoVenta() {
    ajaxPromise('index.php?module=home&op=get_tipo_venta', 'GET', 'JSON')
        .then(function (data) {
            var tipo_venta = "";

            for (var i = 0; i < data.length; i++) {
                var nombre = data[i].nom_tipo_venta,
                    imagen = data[i].img_tipo_venta
                    id = data[i].id_tipo_venta;

                // Crear tarjetas de tipo_venta
                tipo_venta += "<div class='col-sm-4 tipo_venta'>" +
                    "<div class='tipo_venta-inner text-center filter_tipo_venta' id='" + id + "'>" +
                    "<img src='" + imagen + "' class='img_tipo_venta'>" +
                    "<br/>" + nombre +
                    "</div>" +
                    "</div>";
            }
            // Añadir las tarjetas al contenedor
            $("#tipo_venta").html(tipo_venta);
        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_tipo_venta HOME";
            console.log('Error tarjetas tipo venta');
        });
}

//Salto del home al shop, capturamos click, guardamos id, y saltamos al home
function clicks(){
    $(document).on("click",'div.filter_categoria', function (){
        // console.log("pulsaste en categorias");
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["categoria",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    }); 

    $(document).on("click",'div.filter_home_product', function (){
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["id_producto",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    });
    
    $(document).on("click",'div.filter_marca', function (){
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["marca",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    });   

    $(document).on("click",'div.filter_tipo_consola', function (){
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["tipo_consola",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    }); 

    $(document).on("click",'div.filter_ciudad', function (){
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["ciudad",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    });

    $(document).on("click",'div.filter_estado', function (){
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["estado",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    }); 

    $(document).on("click",'div.filter_tipo_venta', function (){
        var filters = [];
        //Pillamos la id de la tarjeta pulsada
        filters.push(["tipo_venta",this.getAttribute('id')]);
        //Borramos todos los filtros posibles que haya en el localStorage
        localStorage.removeItem('filter_shop');
        localStorage.removeItem('filter_home');
        localStorage.removeItem('filter_search');
        localStorage.removeItem('orderby');
        //Añadimos el que nos interesa filtrar ahora
        localStorage.setItem('filter_home', JSON.stringify(filters)); 
        setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
        }, 200);  
    });
}

$(document).ready(function () {
    loadCategories();
    carrousel_Productos_New();
    loadMarcas();
    loadTipoConsola();
    carrousel_Productos_Populares();
    carrousel_Ciudades();
    loadEstado();
    loadTipoVenta();
    // clicks();
    console.log("Bienvenido al Home!");
});