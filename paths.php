<?php
    define('PROJECT', '/REPLAY_Framework/');

    //SITE_ROOT
    define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT);
    
    //SITE_PATH
    define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . PROJECT);
    
    //PRODUCTION
    define('PRODUCTION', true);
    
    //MODEL
    define('MODEL_PATH', SITE_ROOT . 'model/');
    
    //MODULES
    define('MODULES_PATH', SITE_ROOT . 'module/');
    
    //RESOURCES
    define('RESOURCES', SITE_ROOT . 'resources/');
    
    //UTILS
    define('UTILS', SITE_ROOT . 'utils/');

    //VIEW
    define('VIEW_PATH_INC', SITE_ROOT . 'view/inc/');

    //CSS
    define('CSS_PATH', SITE_ROOT . 'view/css/');
    
    //JS
    define('JS_PATH', SITE_ROOT . 'view/js/');
    
    //IMG
    define('IMG_PATH', SITE_ROOT . 'view/images/');
    
    //MODEL_HOME
    define('UTILS_HOME', SITE_ROOT . 'module/home/utils/');
    define('DAO_HOME', SITE_ROOT . 'module/home/model/DAO/');
    define('BLL_HOME', SITE_ROOT . 'module/home/model/BLL/');
    define('MODEL_HOME', SITE_ROOT . 'module/home/model/model/');
    define('JS_VIEW_HOME', SITE_PATH . 'module/home/view/js/');
    define ('VIEW_PATH_HOME', SITE_ROOT . 'module/home/view/');

    //MODEL_SHOP
    define('UTILS_SHOP', SITE_ROOT . 'module/shop/utils/');
    define('DAO_SHOP', SITE_ROOT . 'module/shop/model/DAO/');
    define('BLL_SHOP', SITE_ROOT . 'module/shop/model/BLL/');
    define('MODEL_SHOP', SITE_ROOT . 'module/shop/model/model/');
    define('JS_VIEW_SHOP', SITE_PATH . 'module/shop/view/js/');
    define ('VIEW_PATH_SHOP', SITE_ROOT . 'module/shop/view/');

    //MODEL_SEARCH
    define('DAO_SEARCH', SITE_ROOT . 'module/search/model/DAO/');
    define('BLL_SEARCH', SITE_ROOT . 'module/search/model/BLL/');
    define('MODEL_SEARCH', SITE_ROOT . 'module/search/model/model/');
    define('JS_VIEW_SEARCH', SITE_PATH . 'module/search/view/js/');







    

    
    // //MODEL_CONTACT
    // define('MODEL_CONTACT', SITE_ROOT . 'module/contact/model/model/');
    // define('JS_VIEW_CONTACT', SITE_PATH . 'module/contact/view/js/');
    // define ('VIEW_PATH_CONTACT', SITE_ROOT . 'module/contact/view/');
    
    // //MODEL_LOGIN
    // define('UTILS_LOGIN', SITE_ROOT . 'module/login/utils/');
    // define('DAO_LOGIN', SITE_ROOT . 'module/login/model/DAO/');
    // define('BLL_LOGIN', SITE_ROOT . 'module/login/model/BLL/');
    // define('MODEL_LOGIN', SITE_ROOT . 'module/login/model/model/');
    // define('JS_VIEW_LOGIN', SITE_PATH . 'module/login/view/js/');
    // define ('VIEW_PATH_LOGIN', SITE_ROOT . 'module/login/view/');

    //MODEL_AUTH
    define('UTILS_AUTH', SITE_ROOT . 'module/auth/utils/');
    define('DAO_AUTH', SITE_ROOT . 'module/auth/model/DAO/');
    define('BLL_AUTH', SITE_ROOT . 'module/auth/model/BLL/');
    define('MODEL_AUTH', SITE_ROOT . 'module/auth/model/model/');
    define('JS_VIEW_AUTH', SITE_PATH . 'module/auth/view/js/');
    define ('VIEW_PATH_AUTH', SITE_ROOT . 'module/auth/view/');

    // Friendly
    define('URL_FRIENDLY', TRUE);
