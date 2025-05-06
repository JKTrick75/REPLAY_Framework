<?php
    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_car_type($db){

			$sql = "SELECT DISTINCT type_name FROM type";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_car_brand($db){

            $sql = "SELECT DISTINCT brand_name FROM brand";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_car_type_brand($db, $car_type){

            $sql = "SELECT DISTINCT b.brand_name FROM cars c INNER JOIN type t INNER JOIN brand b ON c.brand = b.cod_brand AND c.type = t.cod_type WHERE t.type_name='$car_type'";
			
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_car_type($db, $car_type, $auto){

            $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN type t ON c.type = t.cod_type WHERE t.type_name='$car_type' AND c.city LIKE '$auto%'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_car_brand($db, $car_brand, $auto){

            $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN brand b ON c.brand = b.cod_brand WHERE b.brand_name='$car_brand' AND c.city LIKE '$auto%'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_car_type_brand($db, $car_type, $car_brand, $auto){

            $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN type t INNER JOIN brand b ON c.brand = b.cod_brand AND c.type = t.cod_type WHERE t.type_name='$car_type' AND b.brand_name='$car_brand' AND c.city LIKE '$auto%'";
			
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto($db, $auto){

            $sql = "SELECT DISTINCT city FROM cars WHERE city LIKE '$auto%'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
    }

?>