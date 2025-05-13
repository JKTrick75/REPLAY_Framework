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

		//SHOP-LIST
		public function get_all_products_BLL($args) {
			return $this -> dao -> select_get_all_products($this->db, $args[0], $args[1], $args[2]);
		}

		public function filter_shop_BLL($args) {
			return $this -> dao -> select_filter_shop($this->db, $args[0], $args[1], $args[2], $args[3]);
		}

		public function filter_home_BLL($args) {
			return $this -> dao -> select_filter_home($this->db, $args[0], $args[1], $args[2], $args[3]);
		}

		public function filter_search_BLL($args) {
			return $this -> dao -> select_filter_search($this->db, $args[0], $args[1], $args[2], $args[3]);
		}

		//DETAILS
		public function count_popularity_BLL($args) {
			return $this -> dao -> select_count_popularity($this->db, $args);
		}

		public function get_details_BLL($args) {
			return $this -> dao -> select_get_details($this->db, $args);
		}

		public function count_related_BLL($args) {
			return $this -> dao -> select_count_related($this->db, $args[0], $args[1], $args[2], $args[3], $args[4]);
		}

		public function load_related_BLL($args) {
			return $this -> dao -> select_load_related($this->db, $args[0], $args[1], $args[2], $args[3], $args[4], $args[5], $args[6]);
		}

		//PAGINATION
		public function pagination_search_BLL($args) {
			return $this -> dao -> select_pagination_search($this->db, $args);
		}

		public function pagination_home_BLL($args) {
			return $this -> dao -> select_pagination_home($this->db, $args);
		}

		public function pagination_shop_BLL($args) {
			return $this -> dao -> select_pagination_shop($this->db, $args);
		}

		public function pagination_all_products_BLL() {
			return $this -> dao -> select_pagination_all_products($this->db);
		}

		public function count_products_BLL($args) {
			return $this -> dao -> select_count_products($this->db, $args);
		}

		//FILTERS
		public function get_filters_BLL() {
			return $this -> dao -> select_get_filters($this->db);
		}

		//LIKES
		public function highlight_likes_user_BLL($args) {
			// return $args;
			$token = middleware::decode_token($args);
			// return $args;
			return $this -> dao -> search_user_likes($this->db, $token['username']);
		}

		public function controller_likes_BLL($args) {
			// return $args;
			$token = middleware::decode_token($args[1]);
			// return $token;
			$rdo = $this -> dao -> select_likes($this->db, $args[0], $token['username']);

			if ($rdo === false) {
				echo json_encode("error");
				exit;
			}

			if (count($rdo) === 0) { //Si no tiene like en ese producto, lo añadimos a la tabla likes
				$rdo = $this -> dao -> like($this->db, $args[0], $token['username']);
				echo json_encode("0");
				exit;
			} else { //Si ya tenía puesto like en ese producto, lo borramos de la tabla likes (SOLO si no venía del redirect, ya que el usuario quería añadirlo, no borrarlo)
				if ($args[2] == "false"){
					$rdo = $this -> dao -> dislike($this->db, $args[0], $token['username']);
				}
				echo json_encode("1");
				exit;
			}
		}










        public function get_list_BLL($args) {
			return $this -> dao -> select_all_cars($this->db, $args[0], $args[1], $args[2]);
		}

        public function get_details_carousel_BLL($args) {
			return $this -> dao -> select_details_images($this->db, $args);
		}

		// public function get_filters_BLL() {
		// 	return $this -> dao -> select_filters($this->db);
		// }

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