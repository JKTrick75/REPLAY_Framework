<?php
    class controller_home {

        static $_instance;
        
        function __construct() {

        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function view() {
            // echo json_encode('Hola controller_home view :D');
            // exit;
            common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
        }

        function get_categories() {
            // echo json_encode('Hola get_categories');
            // exit;
            echo json_encode(common::load_model('home_model', 'get_categories'));
        }

        function Carrousel_Productos_New() {
            // echo json_encode('Hola Carrousel_Productos_New');
            // exit;
            echo json_encode(common::load_model('home_model', 'Carrousel_Productos_New'));
        }

        function get_marcas() {
            echo json_encode(common::load_model('home_model', 'get_marcas'));
        }

        function get_tipo_consola() {
            echo json_encode(common::load_model('home_model', 'get_tipo_consola'));
        }

        function Carrousel_Populares() {
            echo json_encode(common::load_model('home_model', 'Carrousel_Populares'));
        }

        function Carrousel_Ciudades() {
            echo json_encode(common::load_model('home_model', 'Carrousel_Ciudades'));
        }

        function get_estado() {
            echo json_encode(common::load_model('home_model', 'get_estado'));
        }

        function get_tipo_venta() {
            echo json_encode(common::load_model('home_model', 'get_tipo_venta'));
        }





        function carrusel() {
            echo json_encode('Hola controller_home carrusel :D');
            exit;
            echo json_encode(common::load_model('home_model', 'get_carrusel'));
        }

        function category() {
            echo json_encode(common::load_model('home_model', 'get_category'));
        }
        
        function type() {
            // echo json_encode('Hola');
            echo json_encode(common::load_model('home_model', 'get_type'));
        }
    }
?>