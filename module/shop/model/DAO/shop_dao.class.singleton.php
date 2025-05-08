<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_get_all_products($db, $total_prod, $items_page, $orderby) {
            //Recogemos orderby
			$orderby = isset($_POST['orderby'][0]['orderby']) ? $_POST['orderby'][0]['orderby'] : false;
			//Recogemos limit y offset
			$offset = $_POST['total_prod'];
			$limit = $_POST['items_page'];

			$sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long, p.count_likes,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					GROUP BY p.id_producto";
			
			if($orderby == 'priceASC'){
				$sql .= " ORDER BY p.precio ASC";
			}else if($orderby == 'priceDESC'){
				$sql .= " ORDER BY p.precio DESC";
			}else if($orderby == 'popularidad'){
				$sql .= " ORDER BY p.popularidad DESC";
			}else{ //Order por defecto, los más relevantes primero
				$sql .= " ORDER BY p.popularidad DESC";
			}

			$sql .= " LIMIT $offset, $limit";

            $stmt = $db->ejecutar($sql);
            $rows = $db->listar($stmt);

            $result = [];
            foreach ($rows as $row) {
                $row['img_producto'] = explode(':', $row['img_producto']);
                $result[] = $row;
            }

            return $result;
        }











        
        public function select_all_cars($db, $orderby, $total_prod, $items_page) {

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand " 
            . "AND c.type = t.cod_type AND c.category = ct.cod_category ORDER BY $orderby visits DESC LIMIT $total_prod, $items_page";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_details($db, $id){

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.type = t.cod_type AND c.category = ct.cod_category WHERE c.id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details_images($db, $id){

            $details = self::select_details($db, $id);
            $sql = "SELECT image_name FROM car_images WHERE id_car = '$id'";

            $stmt = $db->ejecutar($sql);
            
            $array = array();
            
            if (mysqli_num_rows($stmt) > 0) {
                foreach ($stmt as $row) {
                    array_push($array, $row);
                }
            }

            $rdo = array();
            $rdo[0] = $details;
            $rdo[1][] = $array;

            return $rdo;
            // return $db->listar($array);
            // return $db->listar($rdo);
        }

        public function select_filters($db) {

            $array_filters = array('type_name', 'category_name', 'color', 'extras', 'doors');  // 'brand_name', 
            $array_return = array();

            foreach ($array_filters as $row) {

                $sql = 'SELECT DISTINCT ' . $row . ' FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand AND c.type = t.cod_type AND c.category = ct.cod_category';
                
                $stmt = $db->ejecutar($sql);

                if (mysqli_num_rows($stmt) > 0) {
                    while ($row_inner[] = mysqli_fetch_assoc($stmt)) {
                        $array_return[$row] = $row_inner;
                    }
                    unset($row_inner);
                }
            }
            return $array_return;
        }

        function sql_filter($filters){
            $continue = "";
            $cont = 0;
            $cont1 = 0;
            $cont2 = 0;
            $select = ' WHERE ';
            foreach ($filters as $key => $row) {
                foreach ( $row as $key => $row_inner) {
                    if ($cont == 0) {
                        foreach ($row_inner as $value) {
                            if ($cont1 == 0) {
                                $continue = $key . ' IN ("'. $value . '"';
                            }else {
                                $continue = $continue  . ', "' . $value . '"';
                            }
                            $cont1++;
                        }
                        $continue = $continue . ')';
                    }else {
                        foreach ($row_inner as $value)  {
                            if ($cont2 == 0) {
                                $continue = ' AND ' . $key . ' IN ("' . $value . '"';
                            }else {
                                $continue = $continue . ', "' . $value . '"';
                            }
                            $cont2++;
                        }
                        $continue = $continue . ')';
                    }
                }
                $cont++;
                $cont2 = 0;
                $select = $select . $continue;
            }
            return $select;
        }

        public function filters($db, $orderby, $total_prod, $items_page, $query) {

            $sql_filter = self::sql_filter($query);

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.category = ct.cod_category AND c.type = t.cod_type $sql_filter ORDER BY $orderby visits DESC LIMIT $total_prod, $items_page";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function maps_details($db, $id){

            $sql = "SELECT id, city, lat, lng FROM cars WHERE id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_view($db, $id){

            $sql = "UPDATE cars c SET visits = visits + 1 WHERE id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count($db){

            $sql = "SELECT COUNT(*) AS num_cars FROM cars";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count_filters($db, $query){

            $filters = self::sql_filter($query);

            $sql = "SELECT COUNT(*) AS num_cars FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.category = ct.cod_category AND c.type = t.cod_type $filters";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_cars($db, $category, $type, $id, $loaded, $items){

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.type = t.cod_type AND c.category = ct.cod_category WHERE c.category = '$category' AND c.id <> $id OR c.type = '$type' AND c.id <> $id LIMIT $loaded, $items";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_load_likes($db, $username){

            $sql = "SELECT id_car FROM likes WHERE username='$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_likes($db, $id, $username){

            $sql = "SELECT username, id_car FROM likes WHERE username='$username' AND id_car='$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $id, $username){

            $sql = "INSERT INTO likes (username, id_car) VALUES ('$username','$id')";

            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $id, $username){

            $sql = "DELETE FROM likes WHERE username='$username' AND id_car='$id'";

            $stmt = $db->ejecutar($sql);
            return "unlike";
        }
    }

?>

