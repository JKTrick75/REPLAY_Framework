function load_car_type(){
    ajaxPromise(friendlyURL('?module=search&op=car_type'), 'POST', 'JSON')
    .then(function(data) {
        // console.log(data);
        for (row in data) {
            let content = data[row].type_name.replace(/_/g, " ");
            $('#type_select').append('<option value = "' + data[row].type_name + '">' + content + '</option>');
        }
    }).catch(function() {
        console.log('Error: load car type');
    });
}

function load_car_brand(data = undefined){
    ajaxPromise(friendlyURL('?module=search&op=car_brand'), 'POST', 'JSON', data)
    .then(function(data) {
        // console.log(data);
        $('#brand_select').empty();
        $('#brand_select').append('<option value = "0">Car brand...</option>');
        for (row in data) {
            let content = data[row].brand_name.replace(/_/g, " ");
            $('#brand_select').append('<option value = "' + data[row].brand_name + '">' + content + '</option>');
        }
    }).catch(function() {
        console.log('Error: load car brand');
    }); 
}

function launch_search() {
    load_car_type();
    load_car_brand();
    $('#type_select').on('change', function(){
        let type_name = $(this).val();
        if (type_name === 0) {
            load_car_brand();
        }else {
            load_car_brand({car_type: type_name});
        }
    });
}

function autocomplete(){

    $("#autocom").on("keyup", function () {
        $('#search_auto').css('display', 'block');
        let auto_complete_data = {complete: $(this).val()};
        if (($('#type_select').val() != 0)){
            auto_complete_data.car_type = $('#type_select').val();
            if(($('#type_select').val() != 0) && ($('#brand_select').val() != 0)){
                auto_complete_data.car_brand = $('#brand_select').val();
             }
        }
        if(($('#type_select').val() == 0) && ($('#brand_select').val() != 0)){ 
            auto_complete_data.car_brand = $('#brand_select').val();
        }
            
        ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', auto_complete_data)
        .then(function(data) {
            $('#search_auto').empty();
            $('#search_auto').fadeIn(10000000);
            console.log(data);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({'class': 'search_element', 'id': data[row].city});
                }
            $(document).on('click', '.search_element', function() {
                $('#autocom').val(this.getAttribute('id'));
                $('#search_auto').fadeOut(1000);
            });
            $(document).on('click scroll', function(event) {
                if (event.target.id !== 'autocom') {
                    $('#search_auto').fadeOut(1000);
                }
            });
        }).catch(function() {
            $('#search_auto').fadeOut(500);
        });
    });
}

function search_button() {
    $('#search_button').on('click', function() {
           
        var search = [];

        if(($('#type_select').val() == 0) && ($('#brand_select').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"city":[$('#autocom').val()]});
            }
        }else if(($('#type_select').val() != 0) && ($('#brand_select').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"city":[$('#autocom').val()]});
            }
            search.push({"type_name":[$('#type_select').val()]});
        }else if(($('#type_select').val() == 0) && ($('#brand_select').val() != 0)){
            if($('#autocom').val() != ""){
                search.push({"city":[$('#autocom').val()]});
            }
            search.push({"brand_name":[$('#brand_select').val()]});
        }else{
            if($('#autocom').val() != ""){
                search.push({"city":[$('#autocom').val()]});
            }
            search.push({"type_name":[$('#type_select').val()]});
            search.push({"brand_name":[$('#brand_select').val()]});
        }
        
        localStorage.removeItem('filters');
        localStorage.setItem('currentPage', 'shop-list');

        if(search.length != 0){
            localStorage.setItem('filters', JSON.stringify(search));
        }
        window.location.href = friendlyURL('index.php?module=shop&op=view');

    });
}

$(document).ready(function() {
    launch_search();
    autocomplete();
    search_button();
});