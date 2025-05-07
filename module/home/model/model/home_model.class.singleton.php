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