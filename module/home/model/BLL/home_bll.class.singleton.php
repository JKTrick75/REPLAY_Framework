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
			// return $this -> dao -> select_get_categories();
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