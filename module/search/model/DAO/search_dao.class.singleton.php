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
        
        function select_tipo_consola($db){

			$sql= "SELECT * FROM tipo_consola";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_modelo_consola_null($db){

			$sql= "SELECT * FROM modelo_consola";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_modelo_consola($db, $tipo_consola){

            $sql= "SELECT * FROM modelo_consola m
                   WHERE m.id_tipo_consola = '$tipo_consola'";
			
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_autocomplete($db, $autocomplete){

            $sql= "SELECT * FROM ciudad c
                    WHERE c.nom_ciudad LIKE '%$autocomplete%'";
			
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
    }

?>