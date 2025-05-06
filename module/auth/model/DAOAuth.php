<?php
    // include("model/connect.php");
	$path = $_SERVER['DOCUMENT_ROOT'] . '/REPLAY/9_REPLAY V3 (LOGIN)/';
    include($path . "model/connect.php");
    
	class DAOAuth{

        function select_username(){
			$username = $_POST['username_reg'];

			$sql = "SELECT * FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
        }

		function select_email(){
			$email = $_POST['email_reg'];

			$sql = "SELECT * FROM users WHERE email='$email'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}

		function insert_user(){
			//Recibimos datos del formulario de registro
			$username = $_POST['username_reg'];
			$email = $_POST['email_reg'];
			$password = $_POST['passwd1_reg'];

			//Generamos los datos encriptados
            $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
            $hashavatar = md5(strtolower(trim($username))); 
            $avatar = "https://api.dicebear.com/9.x/pixel-art/svg?seed=$hashavatar";

			//Insertamos usuario, por defecto tipo client, y un avatar random
            $sql ="   INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`) 
            VALUES ('$username','$hashed_pass','$email','client','$avatar')";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }

		function search_user(){
			//Recibimos usuario del formulario el username/email
			$username_email = $_POST['user_log'];

			//Buscamos ese usuario
			$sql = "SELECT * FROM users WHERE username='$username_email' or email='$username_email'";

			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);

            if ($res) {
                $value = get_object_vars($res);
                return $value;
            }else {
                return "error_user";
            }
        }

        function select_data_user($username){
			$sql = "SELECT * FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);

            if ($res) {
                $value = get_object_vars($res);
                return $value;
            }else {
                return "error_user";
            }
        }

        function select_refresh_token($username){
			$sql = "SELECT refresh_token FROM users WHERE username='$username'";
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);

            if ($res) {
                $value = get_object_vars($res);
                return $value['refresh_token'];
            }else {
                return "error_user";
            }
        }

        function save_refresh_token($username,$refresh_token){
			//Guardamos refresh_token en el usuario
			$sql = "UPDATE users SET refresh_token='$refresh_token' WHERE username='$username'";

            // error_log('Mostramos query refresh token');
            // error_log($sql);

			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }

        function delete_refresh_token($username){
			//Guardamos refresh_token en el usuario
			$sql = "UPDATE users SET refresh_token=NULL WHERE username='$username'";

            // error_log('Mostramos query refresh token');
            // error_log($sql);

			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }
		
	}