<?php
    class controller_search {
        static $_instance;

		function __construct() {

		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        function select_tipo_consola() {
            // echo json_encode("Hola select search tipo_consola");
            // exit;
            echo json_encode(common::load_model('search_model', 'select_tipo_consola'));
        }

        function select_modelo_consola_null() {
            echo json_encode(common::load_model('search_model', 'select_modelo_consola_null'));
        }

        function select_modelo_consola() {
            echo json_encode(common::load_model('search_model', 'select_modelo_consola', $_POST['tipo_consola']));
        }

        function autocomplete() {
            echo json_encode(common::load_model('search_model', 'autocomplete', $_POST['autocomplete']));
        }
        

    }
?>