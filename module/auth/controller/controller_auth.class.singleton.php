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
            echo json_encode(common::load_model('auth_model', 'register', [$_POST['username_reg'], $_POST['pass_reg'], $_POST['email_reg']]));
        }












        // function recover_view() {
        //     common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
        // }
    
        // function login() {
        //     echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
        // }

        // function register() {
        //     echo json_encode(common::load_model('login_model', 'get_register', [$_POST['username_reg'], $_POST['pass_reg'], $_POST['email_reg']]));
        // }

        function social_login() {
            echo json_encode(common::load_model('login_model', 'get_social_login', [$_POST['id'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
        } 
    
        function verify_email() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
            echo json_encode($verify);
        }

        function send_recover_email() {
            echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email_forg']));
        }

        function verify_token() {
            echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
        }

        function new_password() {
            echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
        }  
    
        // function logout() {
        //     echo json_encode('Done');
        // } 

        // function data_user() {
        //     echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
        // }

        function activity() {
            echo json_encode(common::load_model('login_model', 'get_activity'));
        }

        function controluser() {
            echo json_encode(common::load_model('login_model', 'get_controluser', $_POST['token']));
        }

        function refresh_token() {
            echo json_encode(common::load_model('login_model', 'get_refresh_token', $_POST['token']));
        } 
        
        function token_expires() {
            echo json_encode(common::load_model('login_model', 'get_token_expires', $_POST['token']));
        }

        function refresh_cookie() {
            session_regenerate_id();
        } 
    
    }
    
?>