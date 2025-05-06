<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
include($path . "module/auth/model/DAOAuth.php");
include($path . "/model/middleware_auth.php");
//Sesion start
@session_start();
if (isset($_SESSION["tiempo"])) {  
    $_SESSION["tiempo"] = time(); //Devuelve la fecha actual
}

switch ($_GET['op']) {
    case 'list';
        // $data = 'hola crtl auth';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        include("module/auth/view/auth.html");

        break;

    case 'register';
        //Comprobar que el username no exista
        try {
            $daoLog = new DAOAuth();
            $check_username = $daoLog->select_username();
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($check_username) {
            echo json_encode("error_username");
            exit;
        }

        // Comprobar que la email no exista
        try {
            $daoLog = new DAOAuth();
            $check_email = $daoLog->select_email();
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($check_email) {
            echo json_encode("error_email");
            exit;
        }

        // Si no existen los datos, creamos usuario
        try {
            $daoLog = new DAOAuth();
            $rdo = $daoLog->insert_user();
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error_registro");
            exit;
        } else {
            echo json_encode("ok");
            exit;
        }

        break;

    case 'login':
        try {
            $daoLog = new DAOAuth();
            $rdo = $daoLog->search_user();

            if ($rdo == "error_user") {
                echo json_encode("error_user");
                exit;
            } else {
                if (password_verify($_POST['passwd_log'], $rdo['password'])) {
                    //Creamos access_token y refresh_token con el usuario
                    $access_token= create_accesstoken($rdo['username']);
                    $refresh_token= create_refreshtoken($rdo['username']);

                    //Guardamos refresh_token en BBDD
                    $daoLog->save_refresh_token($rdo['username'],$refresh_token);

                    //Creamos cookies (usuario y el timestamp)
                    $_SESSION['username'] = $rdo['username'];
                    $_SESSION['timestamp'] = time();
                    
                    //Devolvemos solamente el access_token para guardarlo en localStorage
                    echo json_encode($access_token);
                    exit;
                } else {
                    echo json_encode("error_passwd");
                    exit;
                }
            }
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        break;
    
    case 'logout':
        // error_log('Borramos correctamente la sesión:');
        // error_log($_SESSION['username']);

        //Borramos refresh_token en BBDD
        if (isset($_SESSION['username'])) {
            $daoLog = new DAOAuth();
            $daoLog->delete_refresh_token($_SESSION['username']);
        }

        //Borramos cookies (usuario y el timestamp)
        unset($_SESSION['username']);
        unset($_SESSION['timestamp']);
        session_destroy();

        echo json_encode('Logout complete');
        break;

    case 'data_user':
        $json = decode_token($_POST['token']);
        $daoLog = new DAOAuth();
        $rdo = $daoLog->select_data_user($json['username']);
        echo json_encode($rdo);
        exit;
        break;

    /* ================================================================================ 
       ----------------------------------- ACTIVITY -----------------------------------
       ================================================================================ */

    case 'check_actividad':
        if (!isset($_SESSION["timestamp"])) {
            echo json_encode("inactivo");
            exit();
        } else { //Si está logeado e inactivo más de 30 minutos:
            if ((time() - $_SESSION["timestamp"]) >= 300) { //1800s=30min | 300=5min
                echo json_encode("inactivo");
                exit();
            } else {
                echo json_encode("activo");
                exit();
            }
        }
        break;

    case 'controluser':
        //Decodificamos access_token
        $acc_token_decoded = decode_token($_POST['token']);

        if (isset($_SESSION['username']) && ($_SESSION['username']) == $acc_token_decoded['username']) {
            echo json_encode("Correct_User");
            exit();
        } else {
            echo json_encode("Wrong_User");
            exit();
        }
        break;

    case 'controltimer':
        //Decodificamos access_token
        $acc_token_decoded = decode_token($_POST['token']);

        if ($acc_token_decoded['exp'] < time()) {
            //Obtenemos refresh_token de bbdd
            $daoLog = new DAOAuth();
            $rdo = $daoLog->select_refresh_token($acc_token_decoded['username']);

            //Decodificamos refresh_token
            $ref_token_decoded = decode_token($rdo);

            // error_log('Expiración access_token------------------------------------------------------');
            // error_log($acc_token_decoded['exp']);
            // error_log('Expiración refresh_token------------------------------------------------------');
            // error_log($ref_token_decoded['exp']);
            // error_log('Tiempo actual-----------------------------------------------------');
            // error_log(time());

            if (!$ref_token_decoded || $ref_token_decoded['exp'] < time()) { //Refresh_token expirado, cerramos sesión
                echo json_encode("Wrong_Timer"); 
                exit();
            } else { //Refresh_token vigente, regeneramos access_token
                $new_token = create_accesstoken($acc_token_decoded['username']);
                echo json_encode($new_token); 
                exit();
            }
        } else {
            echo json_encode("Correct_Timer"); //Access_token vigente
            exit();
        }
        break;

    case 'refresh_cookie':
        session_regenerate_id();
        echo json_encode("Done");
        exit;
        break;

    default;
        include("view/inc/error404.html");
        break;
}
