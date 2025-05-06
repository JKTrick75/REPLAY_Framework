<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_car_type_BLL() {
			return $this -> dao -> select_car_type($this->db);
		}

		public function get_car_brand_BLL() {
			return $this -> dao -> select_car_brand($this->db);
		}

        public function get_car_type_brand_BLL($args) {
			return $this -> dao -> select_car_type_brand($this->db, $args);
		}

		public function get_auto_car_type_BLL($args) {
            // return ($args[1]);
			return $this -> dao -> select_auto_car_type($this->db, $args[0], $args[1]);
		}

        public function get_auto_car_brand_BLL($args) {
			return $this -> dao -> select_auto_car_brand($this->db, $args[0], $args[1]);
		}

        public function get_auto_car_type_brand_BLL($args) {
			return $this -> dao -> select_auto_car_type_brand($this->db, $args[0], $args[1], $args[2]);
		}

        public function get_auto_BLL($args) {
			return $this -> dao -> select_auto($this->db, $args);
		}
		
	}
?>