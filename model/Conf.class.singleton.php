<?php
    class Conf {
        private $_userdb;
        private $_passdb;
        private $_hostdb;
        private $_db;
        static $_instance;

        private function __construct() {
            $cnfg = parse_ini_file(UTILS."db.ini");
            $this->_userdb = $cnfg['DB_USER'];
            $this->_passdb = $cnfg['DB_PASSWORD'];
            $this->_hostdb = $cnfg['DB_HOST'];
            $this->_db = $cnfg['DB'];
        }

        private function __clone() {

        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self))
                self::$_instance = new self();
            return self::$_instance;
        }

        public function getUserDB() {
            $var = $this->_userdb;
            return $var;
        }

        public function getHostDB() {
            $var = $this->_hostdb;
            return $var;
        }

        public function getPassDB() {
            $var = $this->_passdb;
            return $var;
        }

        public function getDB() {
            $var = $this->_db;
            return $var;
        }
    }
