<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_tipo_consola() {
            return $this -> bll -> select_tipo_consola_BLL();
        }

        public function select_modelo_consola_null() {
            return $this -> bll -> select_modelo_consola_null_BLL();
        }

        public function select_modelo_consola($args) {
            return $this -> bll -> select_modelo_consola_BLL($args);
        }

        public function autocomplete($args) {
            return $this -> bll -> autocomplete_BLL($args);
        }

    }