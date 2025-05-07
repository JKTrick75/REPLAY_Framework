<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        // public function select_get_categories() {
        //     return 'hola select_get_categories HOME';
        //     $sql = "SELECT * FROM categoria";

        //     $stmt = $db -> ejecutar($sql);
        //     return $db -> listar($stmt);
        // }

        public function select_get_categories($db) {
            // return 'hola select_get_categories HOME';
            $sql = "SELECT * FROM categoria";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_Carrousel_Productos_New($db) {
            // return 'hola select_get_categories HOME';
            $sql = "SELECT p.nom_producto, i.img_producto, p.id_producto
                    FROM producto p INNER JOIN img_producto i 
                    ON p.id_producto = i.id_producto
                    WHERE i.id_img = (SELECT MIN(i2.id_img) 
                                        FROM img_producto i2 
                                        WHERE i2.id_producto = p.id_producto)
                    ORDER BY p.id_producto DESC
                    LIMIT 8;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_get_marcas($db) {
            $sql = "SELECT * FROM marca";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_get_tipo_consola($db) {
            $sql = "SELECT * FROM tipo_consola";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_Carrousel_Populares($db) {
            $sql = "SELECT p.nom_producto, i.img_producto, p.id_producto
                    FROM producto p INNER JOIN img_producto i 
                    ON p.id_producto = i.id_producto
                    WHERE i.id_img = (SELECT MIN(i2.id_img) 
                                        FROM img_producto i2 
                                        WHERE i2.id_producto = p.id_producto)
                    ORDER BY p.popularidad DESC
                    LIMIT 8;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_Carrousel_Ciudades($db) {
            $sql = "SELECT * FROM ciudad";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_get_estado($db) {
            $sql = "SELECT * FROM estado";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_get_tipo_venta($db) {
            $sql = "SELECT * FROM tipo_venta";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }








        public function select_data_carrusel($db) {

            $sql = "SELECT * FROM brand LIMIT 6";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {

            $sql = "SELECT * FROM category LIMIT 3";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_type($db) {

            $sql = "SELECT * FROM type LIMIT 4";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>