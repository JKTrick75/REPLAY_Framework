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

        //SHOP-LIST
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

        public function select_count_popularity($db, $id) {

            $sql = "UPDATE producto
					SET popularidad = popularidad + 1
					WHERE id_producto = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


        //DETAILS
        function select_details($db, $id){

            $sql = "SELECT
                        p.id_producto,
                        p.nom_producto, 
                        p.precio, 
                        p.color, 
                        p.fecha_publicacion, 
                        p.fecha_ult_mod,
                        p.capacidad, 
                        p.incluye_mando, 
                        p.incluye_cargador, 
                        p.incluye_juegos,
                        p.observaciones,
                        m.nom_marca, 
                        e.nom_estado, 
                        ci.nom_ciudad, 
                        mc.nom_modelo_consola,
                        tc.nom_tipo_consola, 
                        tm.nom_tipo_merchandising, 
                        ta.nom_tipo_accesorio,
                        p.lat,
                        p.long,
                        p.marca,
                        p.tipo_consola,
                        p.modelo_consola,
                        p.ciudad,
                        p.count_likes
                    FROM producto p
                    INNER JOIN marca m ON p.marca = m.id_marca
                    INNER JOIN estado e ON p.estado = e.id_estado
                    INNER JOIN ciudad ci ON p.ciudad = ci.id_ciudad
                    LEFT JOIN tipo_consola tc ON p.tipo_consola = tc.id_tipo_consola
                    LEFT JOIN modelo_consola mc ON p.modelo_consola = mc.id_modelo_consola
                    LEFT JOIN tipo_merchandising tm ON p.tipo_merchandising = tm.id_tipo_merchandising
                    LEFT JOIN tipo_accesorio ta ON p.tipo_accesorio = ta.id_tipo_accesorio
                    WHERE p.id_producto = '$id';";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_images($db, $id){

            $sql = "SELECT *
                    FROM img_producto
                    WHERE id_producto = '$id';";

            $stmt = $db->ejecutar($sql);

            $imgArray = array();
			if (mysqli_num_rows($stmt) > 0) {
				foreach ($stmt as $row) {
					array_push($imgArray, $row);
				}
			}
			return $imgArray;
        }

        function select_sales($db, $id){

            $sql = "SELECT tv.nom_tipo_venta, tv.img_tipo_venta
                    FROM tipo_venta_producto tp INNER JOIN tipo_venta tv
                    ON tp.id_tipo_venta = tv.id_tipo_venta
                    WHERE id_producto = '$id';";

            $stmt = $db->ejecutar($sql);

            $imgArray = array();
			if (mysqli_num_rows($stmt) > 0) {
				foreach ($stmt as $row) {
					array_push($imgArray, $row);
				}
			}
			return $imgArray;
        }

        public function select_get_details($db, $id){

            $details = self::select_details($db, $id);
            $images = self::select_images($db, $id);
            $sales = self::select_sales($db, $id);

            $rdo = array();
            $rdo[0] = $details;
            $rdo[1][] = $images;
            $rdo[2][] = $sales;

            return $rdo;
            // return $db->listar($array);
            // return $db->listar($rdo);
        }

        public function select_count_related($db, $id, $marca, $tipo_consola, $modelo_consola, $ciudad) {

			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					WHERE ((p.marca = '$marca') 
						OR (p.tipo_consola = '$tipo_consola') 
						OR (p.modelo_consola = '$modelo_consola') 
						OR (p.ciudad = '$ciudad'))
					AND p.id_producto != '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_load_related($db, $offset, $limit, $id, $marca, $tipo_consola, $modelo_consola, $ciudad) {

            $sql= "SELECT p.id_producto, p.nom_producto, p.precio, p.color, e.nom_estado, c.nom_ciudad, p.lat, p.long,
						  GROUP_CONCAT(i.img_producto SEPARATOR ':') AS img_producto
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					WHERE ((p.marca = '$marca') 
						OR (p.tipo_consola = '$tipo_consola') 
						OR (p.modelo_consola = '$modelo_consola') 
						OR (p.ciudad = '$ciudad'))
					AND p.id_producto != '$id'
					GROUP BY p.id_producto
					LIMIT $offset, $limit";

            $stmt = $db->ejecutar($sql);
            $rows = $db->listar($stmt);

            $result = [];
            foreach ($rows as $row) {
                $row['img_producto'] = explode(':', $row['img_producto']);
                $result[] = $row;
            }

            return $result;
        }

        //PAGINATION
        public function select_pagination_search($db, $filter) {

            $tipo_consola = $filter[0]['tipo_consola'];
			$modelo_consola = $filter[1]['modelo_consola'];
			$ciudad = $filter[2]['ciudad'];

			//Montamos query dinámica
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					WHERE 1=1";

			if ($tipo_consola != '*') {
				$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
			}
			if ($modelo_consola != '*'){
				$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
			}
			if ($ciudad != '*'){
				$sql .= " AND p.ciudad = '$ciudad[0]'";
			}

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination_home($db, $filter) {

            $filter_field = $filter[0][0];
			$filter_value = $filter[0][1];

            // error_log("=========================================================");
            // error_log($filter_field);
            // error_log($filter_value);
            // error_log($filter[0]);
            // error_log($filter[1]);
            // error_log($filter[0][2]);

			//Montamos query dinámica
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
					INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
					WHERE 1=1";

			if ($filter_field == 'categoria') {
				$sql .= " AND pc.id_categoria = '$filter_value'";
			}
			if ($filter_field == 'id_producto') {
				$sql .= " AND p.id_producto = '$filter_value'";
			}
			if ($filter_field == 'marca') {
				$sql .= " AND p.marca = '$filter_value'";
			}
			if ($filter_field == 'tipo_consola') {
				$sql .= " AND p.tipo_consola = '$filter_value'";
			}
			if ($filter_field == 'ciudad') {
				$sql .= " AND p.ciudad = '$filter_value'";
			}
			if ($filter_field == 'estado') {
				$sql .= " AND p.estado = '$filter_value'";
			}
			if ($filter_field == 'tipo_venta') {
				$sql .= " AND tvp.id_tipo_venta = '$filter_value'";
			}

            // error_log($sql);

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination_shop($db, $filter) {

            $categoria = $filter[0]['categoria'];
			$ciudad = $filter[1]['ciudad'];
			$estado = $filter[2]['estado'];
			$marca = $filter[3]['marca'];
			$tipo_consola = $filter[4]['tipo_consola'];
			$modelo_consola = $filter[5]['modelo_consola'];
			$tipo_accesorio = $filter[6]['tipo_accesorio'];
			$tipo_merchandising = $filter[7]['tipo_merchandising'];
			$tipo_venta = $filter[8]['tipo_venta'];
			$precioMin = $filter[9]['precio_min'];
			$precioMax = $filter[10]['precio_max'];

			//Montamos query dinámica
			$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN img_producto i ON p.id_producto = i.id_producto
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad
					INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
					INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
					WHERE 1=1";

			if ($categoria != '*') {
				$categoria_sql = implode(", ", $categoria);
				$sql .= " AND pc.id_categoria IN ($categoria_sql)";
			}
			if ($ciudad != '*'){
				$sql .= " AND p.ciudad = '$ciudad[0]'";
			}
			if ($estado != '*'){
				$sql .= " AND p.estado = '$estado[0]'";
			}
			if ($marca != '*'){
				$sql .= " AND p.marca = '$marca[0]'";
			}
			if ($tipo_consola != '*'){
				$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
			}
			if ($modelo_consola != '*'){
				$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
			}
			if ($tipo_accesorio != '*'){
				$sql .= " AND p.tipo_accesorio = '$tipo_accesorio[0]'";
			}
			if ($tipo_merchandising != '*'){
				$sql .= " AND p.tipo_merchandising = '$tipo_merchandising[0]'";
			}
			if ($tipo_venta != '*') {
				$tipo_venta_sql = implode(", ", $tipo_venta);
				$sql .= " AND tvp.id_tipo_venta IN ($tipo_venta_sql)";
			}
			if (isset($precioMin) && isset($precioMax)) {
				$sql .= " AND p.precio BETWEEN $precioMin[0] AND $precioMax[0]";
			}

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination_all_products($db) {

            $sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
					FROM producto p 
					INNER JOIN estado e ON p.estado = e.id_estado
					INNER JOIN ciudad c ON p.ciudad = c.id_ciudad";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count_products($db, $filter) {

            if ($filter == "false"){
				$sql = "SELECT COUNT(*) as cantidad
						FROM producto";
			}else{
				$categoria = $filter[0]['categoria'];
				$ciudad = $filter[1]['ciudad'];
				$estado = $filter[2]['estado'];
				$marca = $filter[3]['marca'];
				$tipo_consola = $filter[4]['tipo_consola'];
				$modelo_consola = $filter[5]['modelo_consola'];
				$tipo_accesorio = $filter[6]['tipo_accesorio'];
				$tipo_merchandising = $filter[7]['tipo_merchandising'];
				$tipo_venta = $filter[8]['tipo_venta'];
				$precioMin = $filter[9]['precio_min'];
				$precioMax = $filter[10]['precio_max'];

				$sql= "SELECT COUNT(DISTINCT p.id_producto) as cantidad
						FROM producto p
						INNER JOIN producto_categoria pc ON p.id_producto = pc.id_producto
						INNER JOIN tipo_venta_producto tvp ON p.id_producto = tvp.id_producto
						WHERE 1=1";

				if ($categoria != '*') {
					$categoria_sql = implode(", ", $categoria);
					$sql .= " AND pc.id_categoria IN ($categoria_sql)";
				}
				if ($ciudad != '*'){
					$sql .= " AND p.ciudad = '$ciudad[0]'";
				}
				if ($estado != '*'){
					$sql .= " AND p.estado = '$estado[0]'";
				}
				if ($marca != '*'){
					$sql .= " AND p.marca = '$marca[0]'";
				}
				if ($tipo_consola != '*'){
					$sql .= " AND p.tipo_consola = '$tipo_consola[0]'";
				}
				if ($modelo_consola != '*'){
					$sql .= " AND p.modelo_consola = '$modelo_consola[0]'";
				}
				if ($tipo_accesorio != '*'){
					$sql .= " AND p.tipo_accesorio = '$tipo_accesorio[0]'";
				}
				if ($tipo_merchandising != '*'){
					$sql .= " AND p.tipo_merchandising = '$tipo_merchandising[0]'";
				}
				if ($tipo_venta != '*') {
					$tipo_venta_sql = implode(", ", $tipo_venta);
					$sql .= " AND tvp.id_tipo_venta IN ($tipo_venta_sql)";
				}
				if (isset($precioMin) && isset($precioMax)) {
					$sql .= " AND p.precio BETWEEN $precioMin[0] AND $precioMax[0]";
				}
			}

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        //FILTERS
        public function select_get_filters($db) {

             //Montamos configuración de filtros
            $filters = [
                'categoria'           => ['table' => 'categoria',           'column' => 'id_categoria, nom_categoria',                      'orderBy' => '1'],
                'ciudad'              => ['table' => 'ciudad',              'column' => 'id_ciudad, nom_ciudad',                            'orderBy' => '1'],
                'estado'              => ['table' => 'estado',              'column' => 'id_estado, nom_estado',                            'orderBy' => '1'],
                'marca'               => ['table' => 'marca',               'column' => 'id_marca, nom_marca',                              'orderBy' => '1'],
                'tipo_consola'        => ['table' => 'tipo_consola',        'column' => 'id_tipo_consola, nom_tipo_consola',                'orderBy' => '1'],
                'modelo_consola'      => ['table' => 'modelo_consola',      'column' => 'id_modelo_consola, nom_modelo_consola',            'orderBy' => '1'],
                'tipo_accesorio'      => ['table' => 'tipo_accesorio',      'column' => 'id_tipo_accesorio, nom_tipo_accesorio',            'orderBy' => '1'],
                'tipo_merchandising'  => ['table' => 'tipo_merchandising',  'column' => 'id_tipo_merchandising, nom_tipo_merchandising',    'orderBy' => '1'],
                'tipo_venta'          => ['table' => 'tipo_venta',          'column' => 'id_tipo_venta, nom_tipo_venta',                    'orderBy' => '1'],
                'precio_max'          => ['table' => 'producto',            'column' => 'id_producto, MAX(precio) AS precio',               'orderBy' => null],
            ];

            $result = [];

            foreach ($filters as $key => $info) {
                // Montamos la consulta genérica
                $column = $info['column'];
                $table  = $info['table'];
                $order  = $info['orderBy'] ? " ORDER BY {$info['orderBy']}" : '';

                $sql = "SELECT DISTINCT {$column} FROM {$table}{$order}";
                // error_log($sql);

                //Ejecutamos query y guardamos el resultado en el array
                $rows = $db->ejecutar($sql);
                $result_row = $db->listar($rows);

                $result[$key] = $result_row;
            }

            return $result;
        }


























        
        public function select_all_cars($db, $orderby, $total_prod, $items_page) {

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand " 
            . "AND c.type = t.cod_type AND c.category = ct.cod_category ORDER BY $orderby visits DESC LIMIT $total_prod, $items_page";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_details_backup($db, $id){

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

