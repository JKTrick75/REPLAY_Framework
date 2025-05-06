function filters() {

    var type_name = [];
    var category_name = [];
    var color = [];
    var extras = [];
    var doors = [];
    var filters = [];
    
    localStorage.removeItem('filters');

    $.each($("input[id='type_name']:checked"), function(){            
        type_name.push($(this).val());
    });
    if(type_name.length != 0){
        filters.push({"type_name":type_name});
    }

    $.each($("input[id='category_name']:checked"), function(){            
        category_name.push($(this).val());
    });
    if(category_name.length != 0){
        filters.push({"category_name":category_name});
    }
    
    $.each($("input[id='color']:checked"), function(){            
        color.push($(this).val());
    });
    if(color.length != 0){
        filters.push({"color":color});
    }

    $.each($("input[id='extras']:checked"), function(){            
        extras.push($(this).val());
    });
    if(extras.length != 0){
        filters.push({"extras":extras});
    }

    $.each($("input[id='doors']:checked"), function(){            
        doors.push($(this).val());
    });
    
    if(doors.length != 0){
        filters.push({"doors":doors});
    }

    if(filters.length != 0){
        localStorage.setItem('filters', JSON.stringify(filters));
    }

    document.filter.submit();
    document.filter.action = friendlyURL("?module=shop&op=view");
}

function load_filters() {
    ajaxPromise(friendlyURL("?module=shop&op=filters"), 'POST', 'JSON')
    .then(function(data) {
        // console.log(data);
        if(data.length == 0){
            $(".shop_details").empty();
            $(".filters_container").append('<div><h3>Su búsqueda no dió resultados.</h3></div>');
        }else{
            $(".shop_details").empty();
            for (row in data) {
                let content = row.replace(/_/g, " ");
                $('<label></label>').attr('class', 'filters_title').appendTo('.filters_content')
                .html(content.toUpperCase());
                for (row_inner in data[row]) {
                    content_2 = data[row][row_inner][row].replace(/_/g, " ");
                    $('<div></div>').attr('class', 'filters_input').appendTo('.filters_content')
                    .html(
                    "<input class='check' type='checkbox' id="+ row +" name="+ data[row][row_inner][row] +" value='"+ data[row][row_inner][row] +"'/>" +
                    "<label class='etiquetas' for="+ row +" value='"+ content_2 +"'>"+ content_2 + "</label>");                  
                }
            }
            $(".filters_container").append(
                "<div class='filters_input'><input class='filter_button' name='Submit' type='button' id='filter' value='Filter' onclick='filters()'/>"+
                "<input class='remove_button' name='Submit' type='button' id='remove-filters' value='Remove'/></div>"+
                "</div></form>"
            ) 
        }
        highlight_filters();
        load_list_cars();
    })
    .catch(function() {
        console.log('Error: Filters error');
    });
}

function orderby() {
    
    var orderby = [];

    localStorage.setItem('orderby', orderby);

    $('#orderby_select').on('change', function(){ 
        let orderby_val = $(this).val();
        if (orderby_val == 0) {
            orderby = "";
        } else if (orderby_val == 1){
            orderby = "price ASC,";
        } else if (orderby_val == 2){
            orderby = "price DESC,";
        }
        localStorage.setItem('orderby', orderby);
    });
}

function visit(){

    $.ajax({
        type: "POST",
        data: {id: localStorage.getItem('id')},
        url: friendlyURL("?module=shop&op=most_visit"),
    })
    .done(function( ) {
        console.log("Visits updated");
    })
    .fail(function( ) {
        console.log('Error: Most visit error');
    }); 
}

function redirect() {
    $(document).on("click", ".list_car_desc", function(){
        localStorage.setItem('currentPage', 'shop-details');
        localStorage.setItem('id',  $(this).attr('id'));
        location.reload();
    });
    $(document).on("click", ".popup", function(){
        localStorage.setItem('currentPage', 'shop-details');
        localStorage.setItem('id',  $(this).attr('id'));
        location.reload();
    });
    $(document).on("click", ".related_elements", function(){
        localStorage.setItem('currentPage', 'shop-details');
        localStorage.setItem('id',  $(this).attr('id'));
        location.reload();
    });
    $(document).on("click", ".back_list" ,function(){
        localStorage.setItem('currentPage', 'shop-list');
        location.reload();
    });
    $(document).on("click", "#orderby_button" ,function(){
        load_list_cars();
    });
}

function highlight_filters() {
    $('.filters_input').removeClass('active-filter');
    if (localStorage.getItem('filters')) {
        const filters = JSON.parse(localStorage.getItem('filters'));
        for (row in filters) {
            for (row_inner in filters[row]) {
                filters[row][row_inner].forEach(e => {
                    $('input[name='+ e +'][value='+ e +']').attr('checked', true);
                });
            }
        }
    }
}

function remove_filters() {
    $(document).on('click', '#remove-filters', function() {
        localStorage.removeItem('filters');
        highlight_filters();
        location.reload();
        load_list_cars();
    });
}

function load_list_cars(total_prod = 0, items_page = 5) {

    var filters = localStorage.getItem('filters') || false;
    var orderby = localStorage.getItem('orderby');
   
    if (filters != false) {
        var url = friendlyURL("?module=shop&op=filters_search");
    }else {
        var url = friendlyURL("?module=shop&op=list");
    }

    $('.list_content_2').empty();
    $(".shop_details").empty();
    ajaxPromise(url, 'POST', 'JSON', {orderby: orderby, filters: filters, items_page: items_page, total_prod: total_prod})
    .then(function(data) {
        // console.log(data);
        if(data.length == 0){
            $('.list_car').empty();
            $(".shop_details").empty();
            $(".list_content").append('<div class=no_results><h3>Su búsqueda no dió resultados.</h3></div>');
        }else{
            $('.list_car').empty();
            $(".shop_details").empty();
            for (row in data) {
                let content = data[row].color.replace(/_/g, " ");
                $('<div></div>').attr('class',"list_car").attr('id', data[row].id).appendTo(".list_content_2").html(
                    "<div class='list_car_desc' id='"+ data[row].id +"'>" +
                    "<div class='img_car'><img class='list_img' src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/view/images/img_cars/" + data[row].car_image +"'></div>" +
                    "<div class='description_car'>" +
                    "<div class='car'><h2>"+ data[row].brand_name + " " + data[row].model + "</h2><h2> - </h2><h2 class='price'>"+ data[row].price + " €" + "</h2></div>"+
                    "<h4>"+ data[row].km + " km - " + data[row].type_name + "</h4>"+
                    "<h4>"+ content + " - " + data[row].license_number +  " - " + data[row].car_plate + "</h4></div></div>" +
                    "<div class='list_heart' id='"+ data[row].id +"'><i id='like' class='bx bx-heart'></i></div>"
                )   
            }
        }
        load_map(data);
        load_like();
    })
    .catch(function() {
        console.log('Error: List cars error');
    });  
}

function load_map(data) {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJja3p6cG1jcXIwY255M2JwNjZzM28wcTkzIn0.3tzNN-ErSH4vKXouoVYBDA';
    const map = new mapboxgl.Map({
    container: 'maps',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-1.5, 40.5],
    zoom: 4.5
    });

    for (row in data) {
    
        const popup = new mapboxgl.Popup({offset: 25}).setHTML(
            "<div class='popup' id='"+ data[row].id +"'>"+
                "<img class='popup_img' src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/view/images/img_cars/" + data[row].car_image +"'>" +
                "<div class='popup_desc_car'><h2>"+ data[row].brand_name + " " + data[row].model + " - " + data[row].price + " €" + "</h2>"+
                    "<h3>"+ data[row].km + " km - " + data[row].type_name + "</h3>"+
                    "<h3>"+ data[row].color + " - " + data[row].city + "</h3>"+
                "</div>"+
            "</div>"
        );

        const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat([data[row].lng, data[row].lat])
        .setPopup(popup)
        .addTo(map);
    }
}

function load_details() {
    $("#list_view").empty();
    ajaxPromise(friendlyURL("?module=shop&op=details_carousel"), 'GET', 'JSON', {id: localStorage.getItem('id')})
    .then(function(data) {
        // console.log(data[1][0][1].image_name);
        visit();
        $(".shop_details_content").append(
            "<div class='details_box'>" +
                "<div class='details_content'>" +
                    "<div class='carrusel_details'></div>"+
                    "<div class='car_details'>" +
                        "<div class='table_details'>" +
                            "<table class='details_table'>" +
                                "<tr><th class='titles' colspan='2'>"+ data[0][0].brand_name + " " + data[0][0].model + "</th></tr> " +
                                "<tr><th class='titles' colspan='2'>"+ data[0][0].price +  " €" + "</th></tr>"+
                                "<tr><th class='attributes'>"+ data[0][0].type_name + "</th><th class='attributes_2'>"+ data[0][0].km + " km" + "</th></tr>"+
                                "<tr><th class='attributes'>"+ data[0][0].color + "</th><th class='attributes_2'>"+ data[0][0].car_plate + "</th></tr>" +
                            "</table>" +
                        "</div>"+
                        "<div class='like_details'>" +
                            "<div class='list_heart' id='"+ data[0][0].id +"'><i id='like' class='bx bx-heart'></i></div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='back_content'>" +
                    "<div class='back_list'>" +
                        "<div class='back_but'>" +
                            "<i id='back' class='bx bx-x'></i>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" 
        )
        for (row in data[1][0]) {
            $('<div></div>').attr('class',"carousel_details_elements").appendTo(".carrusel_details").html( 
                "<img class='carousel_details_img' src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/" + data[1][0][row].image_name +"' alt=''>"
            )
        }
        $('.carrusel_details').slick();
        $('<div></div>').attr('class',"maps_details").attr('id',"maps_details").appendTo(".shop_details_content").html(
        )
        $('<div></div>').attr('class',"back_list").appendTo(".shop_details_content").html(
            "<div class='list_button' id='list-filters' data-tr='Back'>Back</div>"
        )
        load_map_details(data);
        load_more(data);
        load_like();
    })
    .catch(function() {
        console.log('Error: Details error');
    });
}

function load_map_details(data) {

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJja3p6cG1jcXIwY255M2JwNjZzM28wcTkzIn0.3tzNN-ErSH4vKXouoVYBDA';
    const map = new mapboxgl.Map({
        container: 'maps_details',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [data[0][0].lng, data[0][0].lat],
        zoom: 8
    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        "<div class='popup_details' id='"+ data[0][0].id +"'>"+
        "<img class='popup_img' src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/view/images/img_cars/" + data[0][0].car_image +"'>" +
        "<div class='popup_desc_car'><h2>"+ data[0][0].brand_name + " " + data[0][0].model + " - " + data[0][0].price +  " €" + "</h2>"+
            "<h3>"+ data[0][0].km + " km - " + data[0][0].type_name + "</h3>"+
            "<h3>"+ data[0][0].color + " - " + data[0][0].city + "</h3>"+
        "</div>"+
        "</div>"
    );

    const marker1 = new mapboxgl.Marker({ color: 'red'})
    .setLngLat([data[0][0].lng, data[0][0].lat])
    .setPopup(popup)
    .addTo(map);
}

function cars(car_data, loadeds = 0) {

    let loaded = loadeds;
    let items = 3;

    
    ajaxPromise(friendlyURL("?module=shop&op=cars"), 'POST', 'JSON', {category: car_data[0][0].category, type: car_data[0][0].type, id: car_data[0][0].id, loaded: loaded, items: items})
    .then(function(data) {
        for (row in data) {
            // content = data[row].category_name.replace(/_/g, " ");
            $('<div></div>').attr('class', "more_related_elements").attr('id', data[row].id).appendTo("#cat").html(
            "<div class='col-4 col-12-medium'>"+
                "<section class='box feature'>"+
                    "<div class='related_elements' id='"+ data[row].id +"'>" +
                        "<img class='list_img' src='http://localhost/Ejercicios/Framework_PHP_OO_MVC/view/images/img_cars/" + data[row].car_image +"'>" +
                        "<div class='inner'>"+        
                            "<h2 class='category_title'>"+ data[row].brand_name + " " + data[row].model +"</h2>"+
                        "</div>"+
                    "</div>"+
                    "<div class='like_related'>" +
                        "<div class='list_heart' id='"+ data[row].id +"'><i id='like' class='bx bx-heart'></i></div>" +
                    "</div>" +
                "</section>"+
            "</div>"
            )
        }
    }).catch(function() {
        console.log('Error: Number of cars error');
    }); 
}

function load_more(data) {
    
    car_data = data;
    total_items = 9;
    cars(car_data);

    $(document).on("click",'#load_more_button', function (){
        var items = $('.more_related_elements').length + 3;
        if (total_items <= items) {
          $('.load_more_button').remove();
        }
        cars(car_data, $('.more_related_elements').length);
    });
}

function load_pagination(){

    var filters = localStorage.getItem('filters') || false;

    if (localStorage.getItem('filters')) {
        var url = friendlyURL("?module=shop&op=count_filters");
    }else {
        var url = friendlyURL("?page=shop&op=count");
    }

    ajaxPromise(url, 'POST', 'JSON', {filters: filters})
    .then(function(data) {

        var total_pages = 0;
        var total_prod = data[0].num_cars;

        if(total_prod >= 5){
            total_pages = Math.ceil(total_prod / 5);
        }else{
            total_pages = 1;
        }

        $('#pagination').bootpag({
            total: total_pages,
            page: 1,
            maxVisible: total_pages
        }).on('page', function(event, num){
            total_prod = 5 * (num - 1);
            load_list_cars(total_prod, 5);
            $('html, body').animate({scrollTop: $(".list_content_2")});
        });
    }).catch(function() {
        console.log('Error: Pagination error');
    }); 
}

function load_like(){
    if(localStorage.getItem('token') == null){
        var local = localStorage.getItem('likes');
        if(local != null){
            var like = JSON.parse(local);
        }else{
            var like = [];
        }
        like.forEach(load);
    
        function load(item, index){
            if($("div.list_heart#" + item).children("i").hasClass("bx-heart")){
                $("div.list_heart#" + item).children("i").removeClass("bx-heart").addClass("bxs-heart");
            }
        }
    }else{
        ajaxPromise(friendlyURL("?module=shop&op=load_likes"), 'POST', 'JSON', {token: localStorage.getItem('token')})
        .then(function(data) { 
            // console.log(data);
            localStorage.removeItem('likes');
            for (row in data) {
                if($("#" + data[row].id_car + ".list_heart").children("i").hasClass("bx-heart")){
                    $("#" + data[row].id_car + ".list_heart").children("i").removeClass("bx-heart").addClass("bxs-heart");
                }
            }
        }).catch(function() {
            console.log('Error: Load like error');
        });   
    }
}

function click_like(){
    $(document).on('click', '.list_heart', function() {
        if(localStorage.getItem('token') == null) {
            localStorage.setItem('product', this.getAttribute('id'));
            window.location.href = friendlyURL("?module=login&op=view");
            if($(this).children("i").hasClass("bx-heart")){
                $(this).children("i").removeClass("bx-heart").addClass("bxs-heart");
                like_storage(this.getAttribute('id'), like);
            }else{
                $(this).children("i").removeClass("bxs-heart").addClass("bx-heart");
                like_storage(this.getAttribute('id'), like);
            }
        }else{
            ajaxPromise(friendlyURL("?module=shop&op=control_likes"), 'POST', 'JSON', {id: this.getAttribute('id'), token: localStorage.getItem('token')})
            .then(function(data) { 
                console.log(data);
            }).catch(function() {
                console.log('Error: Click like error');
            });  

            if($(this).children("i").hasClass("bx-heart")){
                $(this).children("i").removeClass("bx-heart").addClass("bxs-heart");
            }else{
                $(this).children("i").removeClass("bxs-heart").addClass("bx-heart");
            }
        }
    });
}

function like_storage(id){

    var local = localStorage.getItem('likes');
    
    if(local != null){
        var like = JSON.parse(local);
    }else{
        var like = [];
    }

    if(like.indexOf(id) === -1){
        like.push(id);
    }else if(like.indexOf(id) !== -1){
        like.splice(like.indexOf(id),1);
    } 
   
    localStorage.setItem('likes', JSON.stringify(like));
}

function load_content_shop(){
    if (localStorage.getItem('currentPage') == 'shop-details') {
        load_details();
        redirect();
    }else {
        orderby();
        load_pagination();
        load_filters();
        redirect();
        remove_filters();
    }
}

$(document).ready(function() {
    load_content_shop();
    click_like();
});
