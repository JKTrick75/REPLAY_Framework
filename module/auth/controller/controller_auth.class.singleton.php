<?php
    class controller_auth {
        static $_instance;

		function __construct() {

		}

		public static function getInstance() {
            // echo json_encode('Hola getInstance auth :D');
            // exit;

			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        function view() {
            // echo json_encode('Hola controller_auth view :D');
            // exit;
            common::load_view('top_page_auth.html', VIEW_PATH_AUTH . 'auth.html');
        }

        function data_user() {
            // echo json_encode('Hola data_user auth');
            // exit;
            echo json_encode(common::load_model('auth_model', 'data_user', $_POST['token']));
        }

        function logout() {
            echo json_encode(common::load_model('auth_model', 'logout'));
        }

        function login() {
            // echo json_encode([$_POST['user_log'], $_POST['passwd_log']]);
            // exit;
            echo json_encode(common::load_model('auth_model', 'login', [$_POST['user_log'], $_POST['passwd_log']]));
        }

        function register() {
            // echo json_encode([$_POST['username_reg'], $_POST['passwd1_reg'], $_POST['email_reg']]);
            // exit;
            echo json_encode(common::load_model('auth_model', 'register', [$_POST['username_reg'], $_POST['passwd1_reg'], $_POST['email_reg']]));
        }

        function social_login() {
            // echo json_encode([$_POST['uid'], $_POST['username'], $_POST['email'], $_POST['avatar']]);
            // exit;
            echo json_encode(common::load_model('auth_model', 'social_login', [$_POST['uid'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
        }

        //ACTIVITY
        function check_actividad() {
            // echo json_encode("Hola check_actividad auth");
            // exit;
            echo json_encode(common::load_model('auth_model', 'check_actividad'));
        }

        function controluser() {
            echo json_encode(common::load_model('auth_model', 'controluser', $_POST['token']));
        }

        function controltimer() {
            echo json_encode(common::load_model('auth_model', 'controltimer', $_POST['token']));
        }

        function refresh_cookie() {
            echo json_encode(common::load_model('auth_model', 'refresh_cookie'));
        }













        function recover_view() {
            common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        }

        // function social_login() {
        //     echo json_encode(common::load_model('auth_model', 'get_social_login', [$_POST['id'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
        // } 
    
        function verify_email() {
            $verify = json_encode(common::load_model('auth_model', 'get_verify_email', $_POST['token_email']));
            echo json_encode($verify);
        }

        function send_recover_email() {
            echo json_encode(common::load_model('auth_model', 'get_recover_email', $_POST['email_forg']));
        }

        function verify_token() {
            echo json_encode(common::load_model('auth_model', 'get_verify_token', $_POST['token_email']));
        }

        function new_password() {
            echo json_encode(common::load_model('auth_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
        }
    
    }
    
?>