<?php
    class auth_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_user($db, $username){

			$sql = "SELECT * FROM users WHERE username='$username'";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function delete_refresh_token($db, $username){

            //Borramos refresh_token del usuario
			// $sql = "UPDATE users SET refresh_token=NULL WHERE username='$username'";
            $sql = "UPDATE users SET refresh_token=NULL";
            
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function search_user($db, $username, $email){

			//Buscamos ese usuario
			$sql = "SELECT * FROM users WHERE username='$username' or email='$email'";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function save_refresh_token($db, $username, $refresh_token){

			//Guardamos refresh_token en el usuario
			$sql = "UPDATE users SET refresh_token='$refresh_token' WHERE username='$username'";

            error_log($sql);
            
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        //REGISTER
        public function select_user($db, $username, $email){

			$sql = "SELECT username, email FROM users WHERE username = '$username' OR email = '$email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_user($db, $username, $hashed_pass, $email, $avatar) {

            $sql ="   INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`) 
            VALUES ('$username','$hashed_pass','$email','client','$avatar')";

            return $stmt = $db->ejecutar($sql);
        }

        //ACTIVITY
        public function select_refresh_token($db, $username){

			$sql = "SELECT refresh_token FROM users WHERE username='$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

















        // public function insert_user($db, $id, $username_reg, $hashed_pass, $email_reg, $avatar, $token_email) {

        //     $sql = "INSERT INTO users (id, username, password, email, user_type, avatar, token_email, activate)
        // VALUES ('$id', '$username_reg', '$hashed_pass', '$email_reg', 'client', '$avatar', '$token_email', 0)";

        //     return $stmt = $db->ejecutar($sql);
        // }
       
        // public function select_user($db, $username, $email){

		// 	$sql = "SELECT id, username, password, email, user_type, avatar, token_email, activate FROM users WHERE username = '$username' OR email = '$email'";

        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

        public function select_social_login($db, $id){

			$sql = "SELECT * FROM users WHERE id='$id'";
            $stmt = $db->ejecutar($sql);

            return $db->listar($stmt);
        }

        public function insert_social_login($db, $id, $username, $email, $avatar){

            $sql ="INSERT INTO users (id, username, password, email, user_type, avatar, token_email, activate)     
                VALUES ('$id', '$username', '', '$email', 'client', '$avatar', '', 1)";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET activate = 1, token_email= '' WHERE token_email = '$token_email'";

            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_recover_password($db, $email){
			$sql = "SELECT `email` FROM `users` WHERE email = '$email' AND password NOT LIKE ('')";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        


        public function update_recover_password($db, $email, $token_email){
			$sql = "UPDATE `users` SET `token_email`= '$token_email' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function update_new_passwoord($db, $token_email, $password){
            $sql = "UPDATE `users` SET `password`= '$password', `token_email`= '' WHERE `token_email` = '$token_email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }




        // public function select_data_user($db, $username){

		// 	$sql = "SELECT id, username, password, email, user_type, avatar, token_email, activate FROM users WHERE username = '$username'";
            
        //     $stmt = $db->ejecutar($sql);
        //     return $db->listar($stmt);
        // }

    }

?>