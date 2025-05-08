<?php
    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            // return 'hola __construct SHOP';
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            // return 'hola getInstance SHOP';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_all_products($args) {
            // return 'hola get_all_products SHOP';
            return $this -> bll -> get_all_products_BLL($args);
        }

        public function count_popularity($args) {
            return $this -> bll -> count_popularity_BLL($args);
        }

        public function get_details($args) {
            return $this -> bll -> get_details_BLL($args);
        }













        public function get_list($args) {
            return $this -> bll -> get_list_BLL($args);
        }

        public function get_details_carousel($args) {
            return $this -> bll -> get_details_carousel_BLL($args);
        }

        public function get_filters() {
            return $this -> bll -> get_filters_BLL();
        }
        
        public function get_filters_search($args) {
            return $this -> bll -> get_filters_search_BLL($args);
        }

        public function get_most_visit($args) {
            return $this -> bll -> get_most_visit_BLL($args);
        }

        public function get_count() {
            return $this -> bll -> get_count_BLL();
        }

        public function get_count_filters($args) {
            return $this -> bll -> get_count_filters_BLL($args);
        }

        public function get_cars($args) {
            return $this -> bll -> get_cars_BLL($args);
        }

        public function get_load_likes($args) {
            return $this -> bll -> get_load_likes_BLL($args);
        }

        public function get_control_likes($args) {
            return $this -> bll -> get_control_likes_BLL($args);
        }
    }
?>
