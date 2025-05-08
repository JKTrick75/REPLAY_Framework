<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_all_products_BLL($args) {
			return $this -> dao -> select_get_all_products($this->db, $args[0], $args[1], $args[2]);
		}









        public function get_list_BLL($args) {
			return $this -> dao -> select_all_cars($this->db, $args[0], $args[1], $args[2]);
		}

        public function get_details_carousel_BLL($args) {
			return $this -> dao -> select_details_images($this->db, $args);
		}

		public function get_filters_BLL() {
			return $this -> dao -> select_filters($this->db);
		}

		public function get_filters_search_BLL($args) {
			return $this -> dao -> filters($this->db, $args[0], $args[1], $args[2], json_decode($args[3]));
		}

		public function get_most_visit_BLL($args) {
			return $this -> dao -> update_view($this->db, $args[0]);
		}
		
		public function get_count_BLL() {
			return $this -> dao -> select_count($this->db);
		}

		public function get_count_filters_BLL($args) {
			return $this -> dao -> select_count_filters($this->db, json_decode($args));
		}

		public function get_cars_BLL($args) {
			return $this -> dao -> select_cars($this->db, $args[0], $args[1], $args[2], $args[3], $args[4]);
		}

		public function get_load_likes_BLL($args) {

			$token = explode('"', $args);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> select_load_likes($this->db, $decode);
		}

		public function get_control_likes_BLL($args) {

			$token = explode('"', $args[1]);
			$decode = middleware::decode_username($token[1]);

			if ($this -> dao -> select_likes($this->db, $args[0], $decode)) {
				return $this -> dao -> delete_likes($this->db, $args[0], $decode);
			}
			return $this -> dao -> insert_likes($this->db, $args[0], $decode);
		}
	}
?>