-- Active: 1739809008759@@127.0.0.1@3306@replay
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-02-2025 a las 23:35:44
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

DROP DATABASE Replay;
CREATE DATABASE Replay;
USE Replay;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `replay`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nom_categoria` varchar(30) NOT NULL,
  `img_categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nom_categoria` (`nom_categoria`),
  UNIQUE KEY `img_categoria` (`img_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nom_categoria`, `img_categoria`) VALUES
(1, 'Consola', 'view/assets/img/categories/consola.jpg'),
(2, 'Accesorios', 'view/assets/img/categories/accesorio.jpeg'),
(3, 'Merchandising', 'view/assets/img/categories/merchandising.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
CREATE TABLE IF NOT EXISTS `ciudad` (
  `id_ciudad` int NOT NULL AUTO_INCREMENT,
  `nom_ciudad` varchar(30) NOT NULL,
  `img_ciudad` varchar(100) NOT NULL,
  PRIMARY KEY (`id_ciudad`),
  UNIQUE KEY `nom_ciudad` (`nom_ciudad`),
  UNIQUE KEY `img_ciudad` (`img_ciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id_ciudad`, `nom_ciudad`, `img_ciudad`) VALUES
(1, 'Madrid', 'view/assets/img/ciudades/madrid.jpg'),
(2, 'Barcelona', 'view/assets/img/ciudades/barcelona.jpg'),
(3, 'Valencia', 'view/assets/img/ciudades/valencia.jpg'),
(4, 'Sevilla', 'view/assets/img/ciudades/sevilla.jpg'),
(5, 'Bilbao', 'view/assets/img/ciudades/bilbao.jpeg'),
(6, 'Zaragoza', 'view/assets/img/ciudades/zaragoza.jpg'),
(7, 'Málaga', 'view/assets/img/ciudades/malaga.jpg'),
(8, 'Murcia', 'view/assets/img/ciudades/murcia.jpg'),
(9, 'Alicante', 'view/assets/img/ciudades/alicante.jpg'),
(10, 'Córdoba', 'view/assets/img/ciudades/cordoba.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `nom_estado` varchar(30) NOT NULL,
  `img_estado` varchar(100) NOT NULL,
  PRIMARY KEY (`id_estado`),
  UNIQUE KEY `nom_estado` (`nom_estado`),
  UNIQUE KEY `img_estado` (`img_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id_estado`, `nom_estado`, `img_estado`) VALUES
(1, 'Nuevo', 'view/assets/img/estados/nuevo.png'),
(2, 'Usado', 'view/assets/img/estados/usado.png'),
(3, 'Desgastado', 'view/assets/img/estados/desgastado.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_producto`
--

DROP TABLE IF EXISTS `img_producto`;
CREATE TABLE IF NOT EXISTS `img_producto` (
  `id_img` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `img_producto` varchar(200) NOT NULL,
  PRIMARY KEY (`id_img`),
  KEY `id_producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `img_producto`
--

INSERT INTO `img_producto` (`id_img`, `id_producto`, `img_producto`) VALUES
(1, 1, 'view/assets/img/productos/ps5_1.webp'),
(2, 1, 'view/assets/img/productos/ps5_2.webp'),
(3, 1, 'view/assets/img/productos/ps5_3.webp'),
(4, 2, 'view/assets/img/productos/xbox_series_x_1.webp'),
(5, 2, 'view/assets/img/productos/xbox_series_x_2.webp'),
(6, 3, 'view/assets/img/productos/nintendo_switch_1.webp'),
(7, 3, 'view/assets/img/productos/nintendo_switch_2.webp'),
(8, 4, 'view/assets/img/productos/ps4_1.webp'),
(9, 5, 'view/assets/img/productos/xbox_one_s_1.webp'),
(10, 6, 'view/assets/img/productos/nintendo_3ds_1.webp'),
(11, 7, 'view/assets/img/productos/ps3_1.webp'),
(12, 8, 'view/assets/img/productos/xbox_360_1.webp'),
(13, 9, 'view/assets/img/productos/nintendo_wii_1.webp'),
(14, 10, 'view/assets/img/productos/ps2_1.webp'),
(15, 5, 'view/assets/img/productos/xbox_one_s_2.webp'),
(16, 4, 'view/assets/img/productos/ps4_2.webp'),
(17, 6, 'view/assets/img/productos/nintendo_3ds_2.webp'),
(18, 6, 'view/assets/img/productos/nintendo_3ds_3.webp'),
(19, 7, 'view/assets/img/productos/ps3_2.webp'),
(20, 7, 'view/assets/img/productos/ps3_3.webp'),
(21, 8, 'view/assets/img/productos/xbox_360_2.webp'),
(22, 9, 'view/assets/img/productos/nintendo_wii_2.webp'),
(23, 9, 'view/assets/img/productos/nintendo_wii_3.webp'),
(24, 9, 'view/assets/img/productos/nintendo_wii_4.webp'),
(25, 10, 'view/assets/img/productos/ps2_2.webp'),
(26, 10, 'view/assets/img/productos/ps2_3.webp'),
(27, 11, 'view/assets/img/productos/camisa_mario_1.webp'),
(28, 11, 'view/assets/img/productos/camisa_mario_2.webp'),
(29, 11, 'view/assets/img/productos/camisa_mario_3.webp'),
(30, 12, 'view/assets/img/productos/pendientes_trifuerza_1.webp'),
(31, 12, 'view/assets/img/productos/pendientes_trifuerza_2.webp'),
(32, 12, 'view/assets/img/productos/pendientes_trifuerza_3.webp'),
(33, 12, 'view/assets/img/productos/pendientes_trifuerza_4.webp'),
(34, 12, 'view/assets/img/productos/pendientes_trifuerza_5.webp'),
(35, 13, 'view/assets/img/productos/mando_god_of_war_1.webp'),
(36, 13, 'view/assets/img/productos/mando_god_of_war_2.webp'),
(37, 13, 'view/assets/img/productos/mando_god_of_war_3.webp'),
(38, 13, 'view/assets/img/productos/mando_god_of_war_4.webp'),
(39, 13, 'view/assets/img/productos/mando_god_of_war_5.webp'),
(40, 14, 'view/assets/img/productos/pack_psp_1.webp'),
(41, 14, 'view/assets/img/productos/pack_psp_2.webp'),
(42, 14, 'view/assets/img/productos/pack_psp_3.webp'),
(43, 14, 'view/assets/img/productos/pack_psp_4.webp'),
(44, 14, 'view/assets/img/productos/pack_psp_5.webp'),
(45, 14, 'view/assets/img/productos/pack_psp_6.webp'),
(46, 14, 'view/assets/img/productos/pack_psp_7.webp'),
(47, 14, 'view/assets/img/productos/pack_psp_8.webp'),
(48, 14, 'view/assets/img/productos/pack_psp_9.webp'),
(49, 14, 'view/assets/img/productos/pack_psp_10.webp'),
(50, 15, 'view/assets/img/productos/pulseras_minecraft_1.webp'),
(51, 15, 'view/assets/img/productos/pulseras_minecraft_2.webp'),
(52, 16, 'view/assets/img/productos/psvita_1.webp'),
(53, 16, 'view/assets/img/productos/psvita_2.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

DROP TABLE IF EXISTS `marca`;
CREATE TABLE IF NOT EXISTS `marca` (
  `id_marca` int NOT NULL AUTO_INCREMENT,
  `nom_marca` varchar(30) NOT NULL,
  `img_marca` varchar(100) NOT NULL,
  PRIMARY KEY (`id_marca`),
  UNIQUE KEY `nom_marca` (`nom_marca`),
  UNIQUE KEY `img_marca` (`img_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_marca`, `nom_marca`, `img_marca`) VALUES
(1, 'Sony', 'view/assets/img/marca/sony.webp'),
(2, 'Microsoft', 'view/assets/img/marca/microsoft.webp'),
(3, 'Nintendo', 'view/assets/img/marca/nintendo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo_consola`
--

DROP TABLE IF EXISTS `modelo_consola`;
CREATE TABLE IF NOT EXISTS `modelo_consola` (
  `id_modelo_consola` int NOT NULL AUTO_INCREMENT,
  `nom_modelo_consola` varchar(30) NOT NULL,
  `id_tipo_consola` int NOT NULL,
  `img_modelo_consola` varchar(100) NOT NULL,
  PRIMARY KEY (`id_modelo_consola`),
  UNIQUE KEY `nom_modelo_consola` (`nom_modelo_consola`),
  UNIQUE KEY `img_modelo_consola` (`img_modelo_consola`),
  KEY `id_tipo_consola` (`id_tipo_consola`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `modelo_consola`
--

INSERT INTO `modelo_consola` (`id_modelo_consola`, `nom_modelo_consola`, `id_tipo_consola`, `img_modelo_consola`) VALUES
(1, 'PlayStation 5', 1, 'view/assets/img/modelos/ps5.jpg'),
(2, 'Xbox Series X', 2, 'view/assets/img/modelos/xbox_series_x.jpg'),
(3, 'Nintendo Switch', 3, 'view/assets/img/modelos/nintendo_switch.jpg'),
(4, 'PlayStation 4', 1, 'view/assets/img/modelos/ps4.webp'),
(5, 'Xbox One S', 2, 'view/assets/img/modelos/xbox_one_s.jpg'),
(6, 'Nintendo 3DS', 3, 'view/assets/img/modelos/nintendo_3ds.webp'),
(7, 'PlayStation 3', 1, 'view/assets/img/modelos/ps3.jpg'),
(8, 'Xbox 360', 2, 'view/assets/img/modelos/xbox_360.jpg'),
(9, 'Nintendo Wii', 3, 'view/assets/img/modelos/nintendo_wii.jpg'),
(10, 'PlayStation 2', 1, 'view/assets/img/modelos/ps2.jpg'),
(11, 'PSP', 1, 'view/assets/img/modelos/psp.jpg'),
(12, 'PSVita', 1, 'view/assets/img/modelos/psvita.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nom_producto` varchar(50) NOT NULL,
  `precio` int NOT NULL,
  `color` varchar(20) DEFAULT NULL,
  `marca` int NOT NULL,
  `tipo_consola` int DEFAULT NULL,
  `modelo_consola` int DEFAULT NULL,
  `tipo_accesorio` int DEFAULT NULL,
  `tipo_merchandising` int DEFAULT NULL,
  `estado` int NOT NULL,
  `ciudad` int NOT NULL,
  `fecha_publicacion` varchar(10) NOT NULL,
  `fecha_ult_mod` varchar(10) NOT NULL,
  `capacidad` varchar(10) DEFAULT NULL,
  `incluye_mando` varchar(10) DEFAULT NULL,
  `incluye_cargador` varchar(10) DEFAULT NULL,
  `incluye_juegos` varchar(10) DEFAULT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  `lat` varchar(50) NOT NULL,
  `long` varchar(50) NOT NULL,
  `popularidad` int NOT NULL,
  `count_likes` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `nom_producto` (`nom_producto`),
  KEY `modelo_consola` (`modelo_consola`),
  KEY `tipo_consola` (`tipo_consola`),
  KEY `tipo_accesorio` (`tipo_accesorio`),
  KEY `tipo_merch` (`tipo_merchandising`),
  KEY `FK_marca1` (`marca`),
  KEY `FK_estado` (`estado`),
  KEY `FK_ciudad` (`ciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nom_producto`, `precio`, `color`, `marca`, `tipo_consola`, `modelo_consola`, `tipo_accesorio`, `tipo_merchandising`, `estado`, `ciudad`, `fecha_publicacion`, `fecha_ult_mod`, `capacidad`, `incluye_mando`, `incluye_cargador`, `incluye_juegos`, `observaciones`, `lat`, `long`, `popularidad`, `count_likes`) VALUES
(1, 'PlayStation 5', 500, 'Blanco', 1, 1, 1, 1, NULL, 1, 1, '2022/04/01', '2022/04/05', '825GB', 'true', 'true', 'true', 'En perfecto estado! Lo he usado un par de veces pero me cansé enseguida. Precio regociable.','40.41727057356558','-3.683854299579285',0,0), 
(2, 'Xbox Series X', 450, 'Negro', 2, 2, 2, 1, NULL, 2, 2, '2022/03/25', '2022/04/05', '1TB', 'true', 'true', 'false', 'En perfecto estado! Lo conservo en su envoltorio original. Precio regociable.','41.40271948807589','2.1731289602000596',0,0), 
(3, 'Nintendo Switch', 300, 'Rojo/Azul', 3, 3, 3, 1, NULL, 1, 3, '2022/04/02', '2022/04/05', '32GB', 'true', 'true', 'true', 'Como nuevo, cualquier cosa no dudes en contactar.','39.47117193095414','-0.35663707468691064',0,0), 
(4, 'PlayStation 4', 200, 'Negro', 1, 1, 4, 1, NULL, 2, 4, '2022/03/30', '2022/04/05', '500GB', 'true', 'true', 'false', 'En perfecto estado! Lo he usado un par de veces. Precio regociable.','37.39304954015504','-5.9647240117188485',0,0), 
(5, 'Xbox One S', 250, 'Blanco', 2, 2, 5, 1, NULL, 1, 5, '2022/04/03', '2022/04/05', '1TB', 'true', 'true', 'true', 'Un pequeño rasguño pero nada más, funciona perfectamente.','43.257049363715275','-2.9292614260505956',0,0), 
(6, 'Nintendo 3DS', 100, 'Negro', 3, 3, 6, 1, NULL, 2, 6, '2022/03/28', '2022/04/05', '4GB', 'true', 'true', 'false', 'Nunca lo he abierto.','41.64340725290045','-0.881798579820348',0,0), 
(7, 'PlayStation 3', 80, 'Negro', 1, 1, 7, 1, NULL, 2, 7, '2022/03/27', '2022/04/05', '120GB', 'true', 'true', 'false', 'El precio se puede hablar','36.7132610962401','-4.443838892909804',0,0), 
(8, 'Xbox 360', 70, 'Blanco', 2, 2, 8, 1, NULL, 2, 8, '2022/03/26', '2022/04/05', '250GB', 'true', 'true', 'false', 'Si quieres más fotos del producto avísame.','37.98574108778889','-1.125271082773813',0,0), 
(9, 'Nintendo Wii', 50, 'Blanco', 3, 3, 9, 1, NULL, 2, 9, '2022/03/29', '2022/04/05', '512MB', 'true', 'true', 'false', 'El envío solo es dentro de la península.','38.35650172857275','-0.4821896091752586',0,0), 
(10, 'PlayStation 2', 40, 'Negro', 1, 1, 10, 1, NULL, 2, 10, '2022/03/24', '2022/04/05', NULL, 'true', 'true', 'false', 'Ni la he sacado de la caja Hulio.','37.88777781021533','-4.771431762412151',0,0), 
(11, 'Camisa Super Mario', 20, 'Azul', 3, NULL, NULL, NULL, 1, 2, 10, '2022/03/24', '2022/04/05', NULL, 'false', 'false', 'false', 'Me la he puesto un par de veces pero ya me viene pequeña.','37.88917067767973','-4.771265465449802',0,0), 
(12, 'Pendientes Trifuerza Zelda', 15, 'Dorado/Negro', 3, NULL, NULL, NULL, 4, 1, 1, '2022/03/24', '2022/04/05', NULL, 'false', 'false', 'false', 'Ya no me gustan.','40.440507800804866','-3.692247276319813',0,0), 
(13, 'Mando God of War', 75, 'Azul/Blanco', 1, NULL, NULL, 1, NULL, 2, 2, '2022/03/30', '2022/05/05', NULL, 'false', 'false', 'false', 'El mando funciona perfectamente, muy suave al tacto.','41.37951848145519','2.146449023271825',0,0), 
(14, 'Pack PSP con juegos y accesorios', 150, 'Blanco', 1, 1, 11, NULL, NULL, 3, 2, '2023/03/24', '2023/04/05', '20GB', 'true', 'true', 'true', 'Usada durante muchos años, busca nuevo dueño.','41.38077033611688','2.1338561482494653',0,0), 
(15, 'Pulseras minecraft', 15, 'Variocolor', 2, NULL, NULL, NULL, 4, 1, 4, '2024/03/24', '2024/04/05', NULL, 'false', 'false', 'false', 'Tengo demasiadas, alguien quiere alguna?','37.38874376406456','-5.9666806829716075',0,0), 
(16, 'PS Vita', 100, 'Negro', 1, 1, 12, NULL, NULL, 3, 3, '2022/07/24', '2022/08/05', '32GB', 'false', 'true', 'false', 'Poco usada, pero se ralentiza un poco al encender, lo demás perfecto. Cargador incluido','39.460735667871035','-0.36889040064505413',0,0);
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_categoria`
--

DROP TABLE IF EXISTS `producto_categoria`;
CREATE TABLE IF NOT EXISTS `producto_categoria` (
  `id_producto` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_producto`,`id_categoria`),
  KEY `FK_categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto_categoria`
--

INSERT INTO `producto_categoria` (`id_producto`, `id_categoria`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 3),
(12, 3),
(13, 2),
(14, 1),
(14, 2),
(15, 3),
(16, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_accesorio`
--

DROP TABLE IF EXISTS `tipo_accesorio`;
CREATE TABLE IF NOT EXISTS `tipo_accesorio` (
  `id_tipo_accesorio` int NOT NULL AUTO_INCREMENT,
  `nom_tipo_accesorio` varchar(30) NOT NULL,
  `id_marca` int NOT NULL,
  `img_tipo_accesorio` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_accesorio`),
  UNIQUE KEY `nom_tipo_accesorio` (`nom_tipo_accesorio`),
  UNIQUE KEY `img_tipo_accesorio` (`img_tipo_accesorio`),
  KEY `id_marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_accesorio`
--

INSERT INTO `tipo_accesorio` (`id_tipo_accesorio`, `nom_tipo_accesorio`, `id_marca`, `img_tipo_accesorio`) VALUES
(1, 'Mandos', 1, 'view/assets/img/tipo_accesorio/mandos.webp'),
(2, 'Cargadores', 2, 'view/assets/img/tipo_accesorio/cargadores.jpg'),
(3, 'Fundas', 3, 'view/assets/img/tipo_accesorio/fundas.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_consola`
--

DROP TABLE IF EXISTS `tipo_consola`;
CREATE TABLE IF NOT EXISTS `tipo_consola` (
  `id_tipo_consola` int NOT NULL AUTO_INCREMENT,
  `nom_tipo_consola` varchar(30) NOT NULL,
  `id_marca` int NOT NULL,
  `img_tipo_consola` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_consola`),
  UNIQUE KEY `nom_tipo_consola` (`nom_tipo_consola`),
  UNIQUE KEY `img_tipo_consola` (`img_tipo_consola`),
  KEY `id_marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_consola`
--

INSERT INTO `tipo_consola` (`id_tipo_consola`, `nom_tipo_consola`, `id_marca`, `img_tipo_consola`) VALUES
(1, 'PlayStation', 1, 'view/assets/img/tipo_consola/playstation.webp'),
(2, 'Xbox', 2, 'view/assets/img/tipo_consola/xbox.jpg'),
(3, 'Nintendo', 3, 'view/assets/img/tipo_consola/nintendo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_merchandising`
--

DROP TABLE IF EXISTS `tipo_merchandising`;
CREATE TABLE IF NOT EXISTS `tipo_merchandising` (
  `id_tipo_merchandising` int NOT NULL AUTO_INCREMENT,
  `nom_tipo_merchandising` varchar(30) NOT NULL,
  `id_marca` int NOT NULL,
  `img_tipo_merchandising` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_merchandising`),
  UNIQUE KEY `nom_tipo_merchandising` (`nom_tipo_merchandising`),
  UNIQUE KEY `img_tipo_merchandising` (`img_tipo_merchandising`),
  KEY `id_marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_merchandising`
--

INSERT INTO `tipo_merchandising` (`id_tipo_merchandising`, `nom_tipo_merchandising`, `id_marca`, `img_tipo_merchandising`) VALUES
(1, 'Camisetas', 1, 'view/assets/img/tipo_merchandising/camisetas.jpg'),
(2, 'Tazas', 2, 'view/assets/img/tipo_merchandising/tazas.jpg'),
(3, 'Figuras', 3, 'view/assets/img/tipo_merchandising/figuras.jpg'),
(4, 'Accesorios', 3, 'view/assets/img/tipo_merchandising/accesorio.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_venta`
--

DROP TABLE IF EXISTS `tipo_venta`;
CREATE TABLE IF NOT EXISTS `tipo_venta` (
  `id_tipo_venta` int NOT NULL AUTO_INCREMENT,
  `nom_tipo_venta` varchar(30) NOT NULL,
  `img_tipo_venta` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_venta`),
  UNIQUE KEY `nom_tipo_venta` (`nom_tipo_venta`),
  UNIQUE KEY `img_tipo_venta` (`img_tipo_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_venta`
--

INSERT INTO `tipo_venta` (`id_tipo_venta`, `nom_tipo_venta`, `img_tipo_venta`) VALUES
(1, 'Envio disponible', 'view/assets/img/tipo_venta/envio_disponible.png'),
(2, 'Recogida correos', 'view/assets/img/tipo_venta/recogida_correos.webp'),
(3, 'Presencial', 'view/assets/img/tipo_venta/presencial.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_venta_producto`
--

DROP TABLE IF EXISTS `tipo_venta_producto`;
CREATE TABLE IF NOT EXISTS `tipo_venta_producto` (
  `id_tipo_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_tipo_venta`,`id_producto`),
  KEY `FK_producto3` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_venta_producto`
--

INSERT INTO `tipo_venta_producto` (`id_tipo_venta`, `id_producto`) VALUES
(1, 1),
(2, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(2, 13),
(1, 14),
(1, 15),
(2, 15),
(3, 15),
(1, 16),
(2, 16),
(3, 16);

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `uid` varchar(50) DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(300) DEFAULT NULL,
  `token_email` varchar(50) DEFAULT NULL,
  `is_active` varchar(50) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `login_attempts` int DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `uid`, `username`, `password`, `email`, `type_user`, `avatar`, `refresh_token`, `token_email`, `is_active`, `provider`, `login_attempts`) VALUES
(1, '12345A', 'prueba', '$2y$12$vM5kakwVC8emd8VDjpFTZOuECuV3JxAK3EPk8raIzLZelgqHHaEbW', 'prueba@gmail.com', 'client', 'https://api.dicebear.com/9.x/pixel-art/svg?seed=c893bad68927b457dbed39460e6afd62','', '', 1, 'local', 0);
                        -- `Prueba123?`
--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_user` int(30) NOT NULL,
  `id_producto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `likes`
--

-- INSERT INTO `likes` (`id_like`, `id_user`, `id_producto`) VALUES
-- (11, 1, 1),
-- (12, 1, 2),
-- (13, 1, 3),
-- (14, 1, 4);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `FK_likes_product` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `FK_likes_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `img_producto`
--
ALTER TABLE `img_producto`
  ADD CONSTRAINT `FK_producto2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `modelo_consola`
--
ALTER TABLE `modelo_consola`
  ADD CONSTRAINT `FK_tipo_consola2` FOREIGN KEY (`id_tipo_consola`) REFERENCES `tipo_consola` (`id_tipo_consola`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK_ciudad` FOREIGN KEY (`ciudad`) REFERENCES `ciudad` (`id_ciudad`),
  ADD CONSTRAINT `FK_estado` FOREIGN KEY (`estado`) REFERENCES `estado` (`id_estado`),
  ADD CONSTRAINT `FK_marca1` FOREIGN KEY (`marca`) REFERENCES `marca` (`id_marca`),
  ADD CONSTRAINT `FK_modelo_consola` FOREIGN KEY (`modelo_consola`) REFERENCES `modelo_consola` (`id_modelo_consola`),
  ADD CONSTRAINT `FK_tipo_accesorio` FOREIGN KEY (`tipo_accesorio`) REFERENCES `tipo_accesorio` (`id_tipo_accesorio`),
  ADD CONSTRAINT `FK_tipo_consola1` FOREIGN KEY (`tipo_consola`) REFERENCES `tipo_consola` (`id_tipo_consola`),
  ADD CONSTRAINT `FK_tipo_merch` FOREIGN KEY (`tipo_merchandising`) REFERENCES `tipo_merchandising` (`id_tipo_merchandising`);

--
-- Filtros para la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD CONSTRAINT `FK_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `FK_producto1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `tipo_accesorio`
--
ALTER TABLE `tipo_accesorio`
  ADD CONSTRAINT `FK_marca3` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);

--
-- Filtros para la tabla `tipo_consola`
--
ALTER TABLE `tipo_consola`
  ADD CONSTRAINT `FK_marca2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);

--
-- Filtros para la tabla `tipo_merchandising`
--
ALTER TABLE `tipo_merchandising`
  ADD CONSTRAINT `FK_marca4` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);

--
-- Filtros para la tabla `tipo_venta_producto`
--
ALTER TABLE `tipo_venta_producto`
  ADD CONSTRAINT `FK_producto3` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `FK_tipo_venta` FOREIGN KEY (`id_tipo_venta`) REFERENCES `tipo_venta` (`id_tipo_venta`);
COMMIT;



-- ---------------------------------------------------------------------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------

DELIMITER $$
--
-- Procedimientos
--

-- DROP PROCEDURE IF EXISTS `update_like`$$
-- CREATE PROCEDURE `update_like` (IN `idRealEstate` INT, IN `idUser` INT)
-- BEGIN
--   DECLARE userLike INT;
    
--   SELECT COUNT(l.id_realestate)
--     FROM `real_estate` r LEFT JOIN `like` l ON r.id_realestate = l.id_realestate
--     WHERE l.id_realestate = idRealEstate AND l.id_user = idUser INTO userLike;
                
--   IF userLike = 1 THEN
--       DELETE FROM `like` l
--         WHERE l.id_realestate = idRealEstate AND l.id_user = idUser;
--       SELECT COUNT(l.id_realestate)
-- 	FROM `real_estate` r LEFT JOIN `like` l ON r.id_realestate = l.id_realestate
-- 	WHERE r.id_realestate = idRealEstate INTO countLike;
--   ELSE IF userLike = 0 THEN
--       INSERT INTO `like` VALUES(idRealEstate, idUser);
--       SELECT COUNT(l.id_realestate)
-- 	FROM `real_estate` r LEFT JOIN `like` l ON r.id_realestate = l.id_realestate
-- 	WHERE r.id_realestate = idRealEstate INTO countLike;
--   END IF;
-- END$$

--
-- Triggers
--

DROP TRIGGER IF EXISTS `add_like_AI`$$
CREATE TRIGGER `delete_like_AI` AFTER INSERT ON likes
FOR EACH ROW
BEGIN
    UPDATE `producto`
      SET count_likes = count_likes + 1
      WHERE id_producto = NEW.id_producto;
END$$

DROP TRIGGER IF EXISTS `delete_like_AD`$$
CREATE TRIGGER `delete_like_AD` AFTER DELETE ON likes
FOR EACH ROW
BEGIN
    UPDATE `producto`
      SET count_likes = count_likes - 1
      WHERE id_producto = OLD.id_producto;
END$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
