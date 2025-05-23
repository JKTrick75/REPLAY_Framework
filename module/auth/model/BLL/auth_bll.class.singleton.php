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

				if (password_verify($args[1], $user[0]['password']) && $user[0]['is_active'] == 1) {
					//Creamos access_token y refresh_token con el usuario
                    $access_token= middleware::create_accesstoken($user[0]['username']);
                    $refresh_token= middleware::create_refreshtoken($user[0]['username']);

					//Guardamos refresh_token en BBDD
                    $this -> dao -> save_refresh_token($this->db, $user[0]['username'], $refresh_token);

					//Creamos cookies (usuario y el timestamp)
                    $_SESSION['username'] = $user[0]['username'];
                    $_SESSION['timestamp'] = time();

					//Devolvemos solamente el access_token para guardarlo en localStorage
					return $access_token;
				} else if (password_verify($args[1], $user[0]['password']) && $user[0]['is_active'] == 0) {
					return 'error_activate';
				} else {
					return 'error_passwd';
				}
            } else {
				return "error_user";
			}
		}

		public function controller_attempts_BLL($args) {
			//AUMENTAR EN 1 LOS ATTEMPTS
			$this -> dao -> update_user_attempts($this->db, $args, $args);

			//CONTROLAR SI EL USUARIO HA LLEGADO A 3
			$attempts = $this -> dao -> select_user_attempts($this->db, $args, $args);

				//SI HA LLEGADO A 3, IS_ACTIVE A 0, GENERAMOS OTP Y ENVIAMOS WHATSAPP
				if($attempts[0]['login_attempts'] >= 3){
					$otp_token = common::generate_Token_secure(6);
					$this -> dao -> inactive_user_attempts($this->db, $args, $args, $otp_token);

					$message = ['type' => 'inactive', 
								'token' => $otp_token];
					$message_result = message::send_message($message);

					if ($message_result === 'success') {
						return json_encode('mensaje_enviado');
					} else {
						return json_encode('error_sending_message');
					}
				}

			return 'active';
				
		}

		public function reset_attempts_BLL($args) {
			//RESETEAR A 0 LOS ATTEMPTS
			$this -> dao -> reset_user_attempts($this->db, $args, $args);

			return 'ok';
				
		}

		public function verify_message_BLL($args) {
			//COMPROBAMOS SI EL CODIGO COINCIDE
			$verify = $this -> dao -> select_verify_message($this->db, $args[1], $args[1]);

			if (!empty($verify) && $verify[0]['token_email'] == $args[0]) {
				//Volvemos a habilitar la cuenta
				$this -> dao -> verify_user_account($this->db, $args[1], $args[1]);
				return 'success';
			}
			return 'error';
				
		}

		public function social_login_BLL($args) {
			if (!empty($this -> dao -> select_user_social($this->db, $args[1], $args[2]))) { //SI YA ESTABA REGISTRADO
				//Buscamos usuario en bbdd
				$user = $this -> dao -> select_user_social($this->db, $args[1], $args[2]);

				//Creamos access_token y refresh_token con el usuario
				$access_token= middleware::create_accesstoken($user[0]['username']);
				$refresh_token= middleware::create_refreshtoken($user[0]['username']);

				//Guardamos refresh_token en BBDD
				$this -> dao -> save_refresh_token($this->db, $user[0]['username'], $refresh_token);

				//Creamos cookies (usuario y el timestamp)
				$_SESSION['username'] = $user[0]['username'];
				$_SESSION['timestamp'] = time();

				//Devolvemos solamente el access_token para guardarlo en localStorage
				return $access_token;
            } else { //SI ES LA PRIMERA VEZ QUE INICIA SESIÓN CON SOCIAL_LOGIN
				//Generamos avatar
				$hashavatar = md5(strtolower(trim($args[1]))); 
				$avatar = "https://api.dicebear.com/9.x/pixel-art/svg?seed=$hashavatar";
				//Insertamos usuario en bbdd
				$this -> dao -> insert_social_login($this->db, $args[0], $args[1], $args[2], $avatar);
				//Buscamos usuario en bbdd
				$user = $this -> dao -> select_user_social($this->db, $args[1], $args[2]);

				//Creamos access_token y refresh_token con el usuario
				$access_token= middleware::create_accesstoken($user[0]['username']);
				$refresh_token= middleware::create_refreshtoken($user[0]['username']);

				//Guardamos refresh_token en BBDD
				$this -> dao -> save_refresh_token($this->db, $user[0]['username'], $refresh_token);

				//Creamos cookies (usuario y el timestamp)
				$_SESSION['username'] = $user[0]['username'];
				$_SESSION['timestamp'] = time();

				//Devolvemos solamente el access_token para guardarlo en localStorage
				return $access_token;
			}
		}

		public function register_BLL($args) {
			//Recibimos datos del formulario de registro
			$username = $args[0];
			$password = $args[1];
			$email = $args[2];
			//Generamos datos para el registro
			$hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
			$hashavatar = md5(strtolower(trim($username))); 
			$avatar = "https://api.dicebear.com/9.x/pixel-art/svg?seed=$hashavatar";
			$token_email = common::generate_Token_secure(20);
			$uid = common::generate_Token_secure(6);

			//Comprobamos si existe el usuario
			if (!empty($this -> dao -> select_user($this->db, $username, $email))) {
				$resultado = $this -> dao -> select_user($this->db, $username, $email);

				if ($resultado[0]['username'] == $username) {
					return 'error_username';
				} else {
					return 'error_email';
				}
            } else {
				$this -> dao -> insert_user($this->db, $uid, $username, $hashed_pass, $email, $avatar, $token_email);
				$message = ['type' => 'register', 
							'token' => $token_email, 
							'toEmail' =>  $email];
				$email_result = mail::send_email($message);

				if ($email_result === 'success') {
					return json_encode("success");
				} else {
					return json_encode("error_sending_email");
				}
			}
		}

		public function verify_email_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				$this -> dao -> update_verify_email($this->db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}

		//RECOVER
		public function send_recover_email_BBL($args) {
			$user = $this -> dao -> select_email_recover($this->db, $args);
			$token = common::generate_Token_secure(20);
			$jwt = middleware::create_recovertoken($args);

			if (!empty($user)) {
				$this -> dao -> update_token_recover($this->db, $args, $token);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = mail::send_email($message);
				if (!empty($email)) {
					return $jwt;  
				}
            }else{
                return 'error';
            }
		}

		public function verify_token_BLL($args) {
			//decodificar recover_token
			$recover_token_decoded = middleware::decode_token($args[1]);
			
			//Comprobamos el tiempo de expiración del recover_token
			if ($recover_token_decoded['exp'] > time()) {
				if($this -> dao -> select_verify_email($this->db, $args[0])){
					return 'verify';
				}
			}
			return 'fail';
		}

		public function new_password_BLL($args) {
			//Recibimos datos del formulario de registro
			$token_email = $args[0];
			$password = $args[1];
			//Encriptamos contraseña y updateamos
			$hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $token_email, $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

		//ACTIVITY
		public function check_actividad_BLL() {
			if (!isset($_SESSION["timestamp"])) {
				return "inactivo";
			} else { //Si está logeado e inactivo más de 30 minutos:
				if ((time() - $_SESSION["timestamp"]) >= 300) { //1800s=30min | 300=5min
					return "inactivo";
				} else {
					return "activo";
				}
			}
		}

		public function controluser_BLL($args) {
			//Decodificamos access_token
			$acc_token_decoded = middleware::decode_token($args);
			//Comprobamos que sean iguales username cookies y username access_token
			if (isset($_SESSION['username']) && ($_SESSION['username']) == $acc_token_decoded['username']) {
				return "Correct_User";
			} else {
				return "Wrong_User";
			};
		}

		public function controltimer_BLL($args) {
			//Decodificamos access_token
			$acc_token_decoded = middleware::decode_token($args);
			//Comprobamos el tiempo de expiración del access token
			if ($acc_token_decoded['exp'] < time()) {
				//Obtenemos refresh_token de bbdd
				$rdo = $this -> dao -> select_refresh_token($this->db, $acc_token_decoded['username']);

				//Decodificamos refresh_token
				$ref_token_decoded = middleware::decode_token($rdo);

				if (!$ref_token_decoded || $ref_token_decoded['exp'] < time()) { //Refresh_token expirado, cerramos sesión
					return "Wrong_Timer"; 
				} else { //Refresh_token vigente, regeneramos access_token
					$new_token = middleware::create_accesstoken($acc_token_decoded['username']);
					return json_encode($new_token); 
				}
			} else {
				return "Correct_Timer"; //Access_token vigente
			}
		}

		public function refresh_cookie_BLL() {
			session_regenerate_id();
			return "Done";
		}

	}