<?php
class auth_model {
    private $bll;
    static $_instance;
    
    function __construct() {
        $this -> bll = auth_bll::getInstance();
    }

    public static function getInstance() {
        // echo json_encode('Hola getInstance aaaaaauth :D');
        // exit;
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function data_user($args) {
        // return "Hola data_user";
        return $this -> bll -> data_user_BLL($args);
    }

    //LOGOUT
    public function logout() {
        return $this -> bll -> logout_BLL();
    }

    //LOGIN
    public function login($args) {
        return $this -> bll -> login_BLL($args);
    }

    public function controller_attempts($args) {
        return $this -> bll -> controller_attempts_BLL($args);
    }

    public function reset_attempts($args) {
        return $this -> bll -> reset_attempts_BLL($args);
    }

    public function verify_message($args) {
        return $this -> bll -> verify_message_BLL($args);
    }

    //SOCIAL_LOGIN
    public function social_login($args) {
        return $this -> bll -> social_login_BLL($args);
    }

    //REGISTER
    public function register($args) {
        // return "Hola registerrrr";
        return $this -> bll -> register_BLL($args);
    }

    public function verify_email($args) {
        return $this -> bll -> verify_email_BLL($args);
    }

    //RECOVER
    public function send_recover_email($args) {
        return $this -> bll -> send_recover_email_BBL($args);
    }

    public function verify_token($args) {
        return $this -> bll -> verify_token_BLL($args);
    }

    public function new_password($args) {
        return $this -> bll -> new_password_BLL($args);
    }

    //ACTIVITY
    public function check_actividad() {
        return $this -> bll -> check_actividad_BLL();
    }

    public function controluser($args) {
        return $this -> bll -> controluser_BLL($args);
    }

    public function controltimer($args) {
        return $this -> bll -> controltimer_BLL($args);
    }

    public function refresh_cookie() {
        return $this -> bll -> refresh_cookie_BLL();
    }

}