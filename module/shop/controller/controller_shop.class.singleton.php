<?php
    class controller_shop {
        static $_instance;

        function __construct() {
            
        }

        public static function getInstance() {
            // return 'hola getInstance SHOP';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function view() {
            // echo json_encode('Hola controller_shop view :D');
            // exit;
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        //SHOP-LIST
        function get_all_products() {
            // echo json_encode($_POST['filter']);
            // exit;
            // echo json_encode(common::load_model('shop_model', 'get_all_products'));
            echo json_encode(common::load_model('shop_model', 'get_all_products', [$_POST['total_prod'], $_POST['items_page'], $_POST['orderby'] ]));
        }

        function filter_shop() {
            // echo json_encode("Hola filter shop :)");
            // exit;
            echo json_encode(common::load_model('shop_model', 'filter_shop', [$_POST['total_prod'], $_POST['items_page'], $_POST['filter'], $_POST['orderby'] ]));
        }

        function filter_home() {
            echo json_encode(common::load_model('shop_model', 'filter_home', [$_POST['total_prod'], $_POST['items_page'], $_POST['filter'], $_POST['orderby'] ]));
        }

        function filter_search() {
            echo json_encode(common::load_model('shop_model', 'filter_search', [$_POST['total_prod'], $_POST['items_page'], $_POST['filter'], $_POST['orderby'] ]));
        }

        //DETAILS
        function count_popularity() {
            echo json_encode(common::load_model('shop_model', 'count_popularity', $_POST['id_producto']));
        }

        function get_details() {
            echo json_encode(common::load_model('shop_model', 'get_details', $_POST['id_producto']));
        }

        function count_related() {
            echo json_encode(common::load_model('shop_model', 'count_related', [$_POST['id'], $_POST['marca'], $_POST['tipo_consola'], $_POST['modelo_consola'], $_POST['ciudad'] ]));
        }

        function load_related() {
            echo json_encode(common::load_model('shop_model', 'load_related', [$_POST['offset'], $_POST['limit'], $_POST['id'], $_POST['marca'], $_POST['tipo_consola'], $_POST['modelo_consola'], $_POST['ciudad'] ]));
        }

        //PAGINATION
        function pagination_search() {
            echo json_encode(common::load_model('shop_model', 'pagination_search', $_POST['filter']));
        }

        function pagination_home() {
            echo json_encode(common::load_model('shop_model', 'pagination_home', $_POST['filter']));
        }

        function pagination_shop() {
            echo json_encode(common::load_model('shop_model', 'pagination_shop', $_POST['filter']));
        }

        function pagination_all_products() {
            // echo json_encode($_POST['filter']);
            // exit;
            echo json_encode(common::load_model('shop_model', 'pagination_all_products'));
        }

        function count_products() {
            echo json_encode(common::load_model('shop_model', 'count_products', $_POST['filter']));
        }

        //FILTERS
        function get_filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }






        function list() {
            echo json_encode(common::load_model('shop_model', 'get_list', [$_POST['orderby'], $_POST['total_prod'], $_POST['items_page']]));
        }
        
        function details_carousel() {
            echo json_encode(common::load_model('shop_model', 'get_details_carousel', $_GET['id']));
        }
        
        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }
        
        function filters_search() {
            echo json_encode(common::load_model('shop_model', 'get_filters_search', [$_POST['orderby'], $_POST['total_prod'],$_POST['items_page'], $_POST['filters']]));
        }

        function most_visit() {
            echo json_encode(common::load_model('shop_model', 'get_most_visit_BLL', $_POST['id']));
        }

        function count() {
            echo json_encode(common::load_model('shop_model', 'get_count'));
        }

        function count_filters() {
            echo json_encode(common::load_model('shop_model', 'get_count_filters', $_POST['filters']));
        }

        function cars() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('shop_model', 'get_cars', [$_POST['category'], $_POST['type'], $_POST['id'], $_POST['loaded'], $_POST['items']]));
        }

        function load_likes() {
            // echo json_encode($_POST['token']);
            echo json_encode(common::load_model('shop_model', 'get_load_likes', $_POST['token']));
        }

        function control_likes() {
            echo json_encode(common::load_model('shop_model', 'get_control_likes', [$_POST['id'], $_POST['token']]));
        }

    }
?>
