<?php
    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            // return 'hola getInstance HOME constructor';
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            // return 'hola getInstance HOME';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_categories() {
            // return 'hola get_categories HOME';
            return $this -> bll -> get_categories_BLL();
        }

        public function Carrousel_Productos_New() {
            // return 'hola get_categories HOME';
            return $this -> bll -> Carrousel_Productos_New_BLL();
        }

        public function get_marcas() {
            return $this -> bll -> get_marcas_BLL();
        }

        public function get_tipo_consola() {
            return $this -> bll -> get_tipo_consola_BLL();
        }

        public function Carrousel_Populares() {
            return $this -> bll -> Carrousel_Populares_BLL();
        }

        public function Carrousel_Ciudades() {
            return $this -> bll -> Carrousel_Ciudades_BLL();
        }

        public function get_estado() {
            return $this -> bll -> get_estado_BLL();
        }

        public function get_tipo_venta() {
            return $this -> bll -> get_tipo_venta_BLL();
        }




        public function get_carrusel() {
            // return 'hola get_carrusel HOME';
            return $this -> bll -> get_carrusel_BLL();
        }

        public function get_category() {
            return $this -> bll -> get_category_BLL();
        }

        public function get_type() {
            // return 'hola car type';
            return $this -> bll -> get_type_BLL();
        }

    }
?>