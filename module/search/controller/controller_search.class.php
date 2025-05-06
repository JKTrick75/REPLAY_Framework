<?php
    class controller_search {
        function car_type() {
            echo json_encode(common::load_model('search_model', 'get_car_type'));
        }

        function car_brand() {
            if(empty($_POST['car_type'])){
                echo json_encode(common::load_model('search_model', 'get_car_brand'));
            }else{
                echo json_encode(common::load_model('search_model', 'get_car_type_brand', $_POST['car_type']));
            }
        }
        
        function autocomplete() {
            if (!empty($_POST['car_type']) && empty($_POST['car_brand'])){
                echo json_encode(common::load_model('search_model', 'get_auto_car_type', [$_POST['car_type'], $_POST['complete']]));
            }else if(empty($_POST['car_type']) && !empty($_POST['categoria'])){
                echo json_encode(common::load_model('search_model', 'get_auto_car_brand', [$_POST['car_brand'], $_POST['complete']]));
            }else if(!empty($_POST['car_type']) && !empty($_POST['car_brand'])){
                echo json_encode(common::load_model('search_model', 'get_auto_car_type_brand', [$_POST['car_type'], $_POST['car_brand'], $_POST['complete']]));
            }else {
                echo json_encode(common::load_model('search_model', 'get_auto', $_POST['complete']));
            }
        }
    }
?>