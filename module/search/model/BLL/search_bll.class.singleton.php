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

		public function select_tipo_consola_BLL() {
			return $this -> dao -> select_tipo_consola($this->db);
		}

		public function select_modelo_consola_null_BLL() {
			return $this -> dao -> select_modelo_consola_null($this->db);
		}

		public function select_modelo_consola_BLL($args) {
			return $this -> dao -> select_modelo_consola($this->db, $args);
		}

        public function autocomplete_BLL($args) {
			return $this -> dao -> select_autocomplete($this->db, $args);
		}
		
	}
?>