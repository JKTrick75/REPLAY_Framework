<?php
class middleware{
    public static function decode_username($get_token){
		$jwt = parse_ini_file(UTILS . "jwt.ini");
		$secret = $jwt['JWT_SECRET'];
		$token = $get_token;

		$JWT = new JWT;
		$json = $JWT -> decode($token, $secret);
		$json = json_decode($json, TRUE);

        $decode_user = $json['name'];
        return $decode_user;
    }

	public static function decode_exp($get_token){
		$jwt = parse_ini_file(UTILS . "jwt.ini");
		$secret = $jwt['JWT_SECRET'];
		$token = $get_token;

		$JWT = new JWT;
		$json = $JWT -> decode($token, $secret);
		$json = json_decode($json, TRUE);

        $decode_exp = $json['exp'];
        return $decode_exp;
    }

	public static function encode($user) {
        $jwt = parse_ini_file(UTILS . "jwt.ini");

        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $timer_token = $jwt['JWT_ACCESS_TOKEN_TIMER'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + ($timer_token), 'username' => $user]);

        $JWT = new jwt();
        return $JWT -> encode($header, $payload, $secret);
    }

    public static function decode_token($token){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $secret = $jwt['JWT_SECRET'];

        $JWT = new jwt;
        $token_dec = $JWT->decode($token, $secret);
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }

    public static function create_accesstoken($username){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $timer_token = $jwt['JWT_ACCESS_TOKEN_TIMER'];
        // error_log('----------------Timer----------------');
        // error_log($timer_token);
        $payload = '{"iat":"' . time() . '","exp":"' . time() + ($timer_token) . '","username":"' . $username . '"}';

        $JWT = new jwt;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_refreshtoken($username){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $timer_token = $jwt['JWT_REFRESH_TOKEN_TIMER'];
        // error_log('----------------Timer----------------');
        // error_log($timer_token);
        $payload = '{"iat":"' . time() . '","exp":"' . time() + ($timer_token) . '","username":"' . $username . '"}';

        $JWT = new jwt;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_registertoken($username){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $timer_token = $jwt['JWT_REGISTER_TOKEN_TIMER'];
        // error_log('----------------Timer----------------');
        // error_log($timer_token);
        $payload = '{"iat":"' . time() . '","exp":"' . time() + ($timer_token) . '","username":"' . $username . '"}';

        $JWT = new jwt;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_recovertoken($username){
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $timer_token = $jwt['JWT_RECOVER_TOKEN_TIMER'];
        // error_log('----------------Timer----------------');
        // error_log($timer_token);
        $payload = '{"iat":"' . time() . '","exp":"' . time() + ($timer_token) . '","username":"' . $username . '"}';

        $JWT = new jwt;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }
}