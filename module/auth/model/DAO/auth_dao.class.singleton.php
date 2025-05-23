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
			$sql = "SELECT * FROM users WHERE (username='$username' or email='$email') AND provider='local'";

            // error_log($sql);
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function save_refresh_token($db, $username, $refresh_token){

			//Guardamos refresh_token en el usuario
			$sql = "UPDATE users SET refresh_token='$refresh_token' WHERE username='$username'";

            // error_log($sql);
            
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        //REGISTER
        public function select_user($db, $username, $email){

			$sql = "SELECT username, email FROM users WHERE (username = '$username' OR email = '$email') AND provider = 'local' ";

            // error_log($sql);
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_user_social($db, $username, $email){

			$sql = "SELECT username, email FROM users WHERE (username = '$username' OR email = '$email') AND provider = 'social' ";

            // error_log($sql);
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_user($db, $uid, $username, $hashed_pass, $email, $avatar, $token_email) {

            $sql ="   INSERT INTO `users`(`uid`, `username`, `password`, `email`, `type_user`, `avatar`, `token_email`, `is_active`, `provider`) 
            VALUES ('$uid','$username','$hashed_pass','$email','client','$avatar','$token_email','0','local')";

            return $stmt = $db->ejecutar($sql);
        }

        public function select_verify_email($db, $token_email){

			$sql = "SELECT token_email FROM users WHERE token_email = '$token_email'";

            // error_log($sql);

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token_email){

            $sql = "UPDATE users SET is_active = '1', token_email= '' WHERE token_email = '$token_email'";

            // error_log($sql);

            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function insert_social_login($db, $uid, $username, $email, $avatar){

            $sql ="INSERT INTO users (uid, username, password, email, type_user, avatar, token_email, is_active, provider)     
                VALUES ('$uid', '$username', '', '$email', 'client', '$avatar', '', '1', 'social')";

            // error_log($sql);

            return $stmt = $db->ejecutar($sql);
        }

        //RECOVER
        public function select_email_recover($db, $email){
			$sql = "SELECT `email` FROM `users` WHERE email = '$email' AND provider ='local'"; //Solamente cuentas locales, no social login
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_token_recover($db, $email, $token_email){
			$sql = "UPDATE users SET token_email= '$token_email', is_active='0' WHERE email = '$email' AND provider='local'"; //Solamente cuentas locales, no social login
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function update_new_passwoord($db, $token_email, $password){
            $sql = "UPDATE users SET password= '$password', token_email= '', is_active='1' WHERE token_email = '$token_email'";
            $stmt = $db->ejecutar($sql);
            // error_log($sql);
            return "ok";
        }

        public function update_user_attempts($db, $username, $email){

            $sql = "UPDATE users SET login_attempts=login_attempts+1 WHERE (username = '$username' OR email = '$email') AND provider='local' ";

            // error_log($sql);

            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function select_user_attempts($db, $username, $email){

			$sql = "SELECT login_attempts, email FROM users WHERE (username = '$username' OR email = '$email') AND provider = 'local' ";

            // error_log($sql);

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function inactive_user_attempts($db, $username, $email, $otp_token){

            $sql = "UPDATE users SET is_active='0', token_email='$otp_token' WHERE (username = '$username' OR email = '$email') AND provider='local' ";

            // error_log($sql);

            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function reset_user_attempts($db, $username, $email){

            $sql = "UPDATE users SET login_attempts=0 WHERE (username = '$username' OR email = '$email') AND provider='local' ";

            error_log($sql);

            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        //ACTIVITY
        public function select_refresh_token($db, $username){

			$sql = "SELECT refresh_token FROM users WHERE username='$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

    }

?>