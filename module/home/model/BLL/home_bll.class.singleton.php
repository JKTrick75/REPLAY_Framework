<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			// echo 'hola getInstance home_bll constructor';
			// exit;
			$this -> dao = home_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			// echo 'hola getInstance home_bll';
			// exit;
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_categories_BLL() {
			// return 'hola get_categories HOME';
			return $this -> dao -> select_get_categories($this -> db);
		}

		public function Carrousel_Productos_New_BLL() {
			// return 'hola Carrousel_Productos_New HOME';
			return $this -> dao -> select_Carrousel_Productos_New($this -> db);
		}

		public function get_marcas_BLL() {
			return $this -> dao -> select_get_marcas($this -> db);
		}

		public function get_tipo_consola_BLL() {
			return $this -> dao -> select_get_tipo_consola($this -> db);
		}

		public function Carrousel_Populares_BLL() {
			return $this -> dao -> select_Carrousel_Populares($this -> db);
		}

		public function Carrousel_Ciudades_BLL() {
			return $this -> dao -> select_Carrousel_Ciudades($this -> db);
		}

		public function get_estado_BLL() {
			return $this -> dao -> select_get_estado($this -> db);
		}

		public function get_tipo_venta_BLL() {
			return $this -> dao -> select_get_tipo_venta($this -> db);
		}





		public function get_carrusel_BLL() {
			return $this -> dao -> select_data_carrusel($this -> db);
		}

		public function get_category_BLL() {
			return $this -> dao -> select_data_category($this -> db);
		}

		public function get_type_BLL() {
			return $this -> dao -> select_data_type($this -> db);
		}
	}
?>