<?php
    class mail {
        public static function send_email($email) {
            switch ($email['type']) {
                // case 'contact';
                //     $email['toEmail'] = '13salmu@gmail.com';
                //     $email['fromEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputEmail'] = 'secondchanceonti@gmail.com';
                //     $email['inputMatter'] = 'Email verification';
                //     $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/Ejercicios/Framework_PHP_OO_MVC/index.php?module=contact&op=view'>Click here for verify your email.</a>";
                //     break;
                case 'register';
                    $email['fromEmail'] = 'Replay <onboarding@resend.dev>';
                    $email['inputEmail'] = 'proyecto.david75@gmail.com';
                    $email['inputMatter'] = 'Activación de cuenta';
                    $email['inputMessage'] = "<h2>Activación de cuenta.</h2><a href='http://localhost/REPLAY_Framework/module/auth/verify_email/$email[token]'>Pulse aquí para activar su cuenta.</a>";
                    break;
                case 'recover';
                    $email['fromEmail'] = 'Replay <onboarding@resend.dev>';
                    $email['inputEmail'] = 'proyecto.david75@gmail.com';
                    $email['inputMatter'] = 'Recuperar contraseña';
                    $email['inputMessage'] = "<a href='http://localhost/REPLAY_Framework/module/auth/recover/$email[token]'>Pulse aquí para recuperar su contraseña.</a>";
                    break;
            }
            return self::resend_email($email);
        }

        public static function resend_email($values){
            // Include Composer autoload file to load Resend SDK classes...
            require __DIR__ . '/vendor/autoload.php';

            //Leer clave de API
            $config = parse_ini_file(__DIR__ . '/resend.ini');
            $key_client = $config['KEY_CLIENT'];

            $resend = Resend::client($key_client);

            try {
                // error_log($values['fromEmail']);
                // error_log($values['toEmail']);
                // error_log($values['inputMatter']);
                // error_log($values['inputMessage']);
                $result = $resend->emails->send([
                    'from' => $values['fromEmail'],
                    'to' => [$values['toEmail']],
                    'subject' => $values['inputMatter'],
                    'html' => $values['inputMessage'],
                ]);
                return 'success';
            } catch (\Exception $e) {
                return 'error';
            }
        }
    }