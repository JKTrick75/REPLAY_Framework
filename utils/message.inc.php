<?php
    class message {
        public static function send_message($message) {
            switch ($message['type']) {
                case 'inactive';
                    $message['bodyMessage'] = "Tu cuenta de Replay se ha inhabilitado temporalmente debido a los reiterados intentos de inicio de sesión.".
                                                "Aquí tienes tu código para volver a activar la cuenta:".
                                                "$message[token]";
                    break;
            }
            return self::send_ultramessage($message);
        }

        public static function send_ultramessage($values){
            // Include Composer autoload file to load Ultramessage classes...
            require __DIR__ . '/vendor/autoload.php';

            //Leer datos
            $config = parse_ini_file(__DIR__ . '/ultramessage.ini');
            $token = $config['ULTMSG_TOKEN'];
            $instanceID = $config['ULTMSG_INSTANCE_ID'];
            $toPhone = $config['ULTMSG_PHONE'];

            //Enviar mensaje
            $ultramsg_token=$token;
            $instance_id=$instanceID;
            $client = new UltraMsg\WhatsAppApi($ultramsg_token,$instance_id);

            try {
                $to=$toPhone; 
                $body=$values['bodyMessage'];
                $api=$client->sendChatMessage($to,$body);
                // print_r($api);
                return 'success';
            } catch (\Exception $e) {
                return 'error';
            }
        }
    }