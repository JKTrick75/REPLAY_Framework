<?php
	class auth_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = auth_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function data_user_BLL($args) {
			// return $args;
			$token = middleware::decode_token($args);
			// return $args;
			return $this -> dao -> select_data_user($this->db, $token['username']);
		}

		public function logout_BLL() {
			//Borramos refresh_token en BBDD
			if (isset($_SESSION['username'])) {
				$this -> dao -> delete_refresh_token($this->db, $_SESSION['username']);
			}

			//Borramos cookies (usuario y el timestamp)
			unset($_SESSION['username']);
			unset($_SESSION['timestamp']);
			session_destroy();

			return 'Logout complete';
		}

		public function login_BLL($args) {
			if (!empty($this -> dao -> search_user($this->db, $args[0], $args[0]))) {
				$user = $this -> dao -> search_user($this->db, $args[0], $args[0]);

				if (password_verify($args[1], $user[0]['password'])) {

					//Creamos access_token y refresh_token con el usuario
                    $access_token= middleware::create_accesstoken($user[0]['username']);
                    $refresh_token= middleware::create_refreshtoken($user[0]['username']);

					//Guardamos refresh_token en BBDD
                    $this -> dao -> save_refresh_token($this->db, $user[0]['username'],$refresh_token);

					//Creamos cookies (usuario y el timestamp)
                    $_SESSION['username'] = $user[0]['username'];
                    $_SESSION['timestamp'] = time();

					//Devolvemos solamente el access_token para guardarlo en localStorage
					return $access_token;
				} else {
					return 'error_passwd';
				}
            } else {
				return "error_user";
			}
		}


	// case 'login':
    //     try {
    //         $daoLog = new DAOAuth();
    //         $rdo = $daoLog->search_user();

    //         if ($rdo == "error_user") {
    //             echo json_encode("error_user");
    //             exit;
    //         } else {
    //             if (password_verify($_POST['passwd_log'], $rdo['password'])) {
    //                 //Creamos access_token y refresh_token con el usuario
    //                 $access_token= create_accesstoken($rdo['username']);
    //                 $refresh_token= create_refreshtoken($rdo['username']);

    //                 //Guardamos refresh_token en BBDD
    //                 $daoLog->save_refresh_token($rdo['username'],$refresh_token);

    //                 //Creamos cookies (usuario y el timestamp)
    //                 $_SESSION['username'] = $rdo['username'];
    //                 $_SESSION['timestamp'] = time();
                    
    //                 //Devolvemos solamente el access_token para guardarlo en localStorage
    //                 echo json_encode($access_token);
    //                 exit;
    //             } else {
    //                 echo json_encode("error_passwd");
    //                 exit;
    //             }
    //         }
    //     } catch (Exception $e) {
    //         echo json_encode("error");
    //         exit;
    //     }
    //     break;























		public function get_register_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT);
			$hashavatar = md5(strtolower(trim($args[2]))); 
			$avatar = "https://robohash.org/$hashavatar";
			$token_email = common::generate_Token_secure(20);
			$id = common::generate_Token_secure(6);

			if (!empty($this -> dao -> select_user($this->db, $args[0], $args[2]))) {
				return 'error';
            } else {
				$this -> dao -> insert_user($this->db, $id, $args[0], $hashed_pass, $args[2], $avatar, $token_email);
				$message = [ 'type' => 'validate', 
								'token' => $token_email, 
								'toEmail' =>  $args[0]];
				$email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return;  
				}   
			}
		}

		public function get_login_BLL($args) {
			if (!empty($this -> dao -> select_user($this->db, $args[0], $args[0]))) {
				$user = $this -> dao -> select_user($this->db, $args[0], $args[0]);
				if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 1) {
					$jwt = jwt_process::encode($user[0]['username']);
					$_SESSION['username'] = $user[0]['username'];
					$_SESSION['tiempo'] = time();
                    session_regenerate_id();
					return json_encode($jwt);
				} else if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 0) {
					return 'activate error';
				} else {
					return 'error';
				}
            } else {
				return 'user error';
			}
		}

		public function get_social_login_BLL($args) {
			if (!empty($this -> dao -> select_user($this->db, $args[1], $args[2]))) {
				$user = $this -> dao -> select_user($this->db, $args[1], $args[2]);
				$jwt = jwt_process::encode($user[0]['username']);
				return json_encode($jwt);
            } else {
				$this -> dao -> insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
				$user = $this -> dao -> select_user($this->db, $args[1], $args[2]);
				$jwt = jwt_process::encode($user[0]['username']);
				return json_encode($jwt);
			}
		}

		public function get_verify_email_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				$this -> dao -> update_verify_email($this->db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}

		public function get_recover_email_BBL($args) {
			$user = $this -> dao -> select_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);

			if (!empty($user)) {
				$this -> dao -> update_recover_password($this->db, $args, $token);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return;  
				}   
            }else{
                return 'error';
            }
		}


		public function get_verify_token_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

		public function get_data_user_BLL($args) {
			$token = explode('"', $args);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> select_data_user($this->db, $decode);
		}

		public function get_activity_BLL() {
            if (!isset($_SESSION["tiempo"])) {  
				return "inactivo";
			} else {  
				if((time() - $_SESSION["tiempo"]) >= 1800) {  
						return "inactivo";
				}else{
					return (time() - $_SESSION["tiempo"]);
				}
			}
		}

		public function get_controluser_BLL($args) {
			$token = explode('"', $args);
			$void_email = "";
			$decode = middleware::decode_username($token[1]);
			$user = $this -> dao -> select_user($this->db, $decode, $void_email);

			if (!isset ($_SESSION['username']) != $user){
				if(isset ($_SESSION['username']) != $user) {
					return 'not_match';
				}
				return 'match';
			}
		}

		public function get_refresh_token_BLL($args) {
			$token = explode('"', $args);
			$void_email = "";
			$decode = middleware::decode_username($token[1]);
			$user = $this -> dao -> select_user($this->db, $decode, $void_email);

			$new_token = jwt_process::encode($user[0]['username']);

            return $new_token;
		}

		public function get_token_expires_BLL($args) {
			$token = explode('"', $args);
			$decode = middleware::decode_exp($token[1]);
			
            if(time() >= $decode) {  
				return "inactivo"; 
			} else{
				return "activo";
			}
		}
	}