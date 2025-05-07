<?php
    class common {
        public static function load_error() {
            require_once (VIEW_PATH_INC . 'top_page_home.html');
            require_once (VIEW_PATH_INC . 'header.html');
            require_once (VIEW_PATH_INC . 'error404.html');
            require_once (VIEW_PATH_INC . 'footer.html');
        }
        
        public static function load_view($topPage, $view) {
            // echo json_encode($topPage);
            // echo json_encode($view);
            // exit;

            $topPage = VIEW_PATH_INC . $topPage;
            if ((file_exists($topPage)) && (file_exists($view))) {
                require_once ($topPage);
                // require_once ('C:/xampp/htdocs/Ejercicios/Framework_PHP_OO_MVC/view/inc/header.html');
                require_once (VIEW_PATH_INC . 'header.html');
                require_once ($view);
                require_once (VIEW_PATH_INC . 'footer.html');
                require_once (VIEW_PATH_INC . 'bottom_page.html');
            }else {
                self::load_error();
            }
        }
        
        public static function load_model($model, $function = null, $args = null) {
            // echo json_encode('Hola load_model_categories');
            // echo json_encode($model);
            // echo json_encode($function);
            // exit;
            $dir = explode('_', $model);
            $path = constant('MODEL_' . strtoupper($dir[0])) .  $model . '.class.singleton.php';
            if (file_exists($path)) {
                require_once ($path);
                if (method_exists($model, $function)) { // Si existe ese método/función en esa class (es decir en home_model por ejemplo) -> fichero home_model.class.singleton.php
                    $obj = $model::getInstance();

                    // return $obj; //Debug get_instance / constructor

                    if ($args != null) {
                        return call_user_func(array($obj, $function), $args);
                    }
                    // return $function; //Debug método
                    return call_user_func(array($obj, $function));
                }
            }
            throw new Exception();
        }

        public static function generate_token_secure($longitud){
            if ($longitud < 4) {
                $longitud = 4;
            }
            return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
        }

        function friendlyURL_php($url) {
            $link = "";
            if (URL_FRIENDLY) {
                $url = explode("&", str_replace("?", "", $url));
                foreach ($url as $key => $value) {
                    $aux = explode("=", $value);
                    $link .=  $aux[1]."/";
                }
            } else {
                $link = "index.php?" . $url;
            }
            return SITE_PATH . $link;
        }
    }
?>