<?php
if (isset($_GET['page'])) {
	switch ($_GET['page']) {
		case "controller_homepage";
			include("module/home/controller/" . $_GET['page'] . ".php");
			break;
		case "controller_shop";
			include("module/shop/controller/" . $_GET['page'] . ".php");
			break;
		case "controller_auth";
			include("module/auth/controller/" . $_GET['page'] . ".php");
			break;
		case "services";
			include("module/services/" . $_GET['page'] . ".html");
			break;
		case "aboutus";
			include("module/aboutus/" . $_GET['page'] . ".html");
			break;
		case "contactus";
			include("module/contact/" . $_GET['page'] . ".html");
			break;
		case "portfolio";
			include("module/portfolio/" . $_GET['page'] . ".html");
			break;
		case "team";
			include("module/team/" . $_GET['page'] . ".html");
			break;
		case "pricing";
			include("module/pricing/" . $_GET['page'] . ".html");
			break;
		case "blog";
			include("module/blog/" . $_GET['page'] . ".html");
			break;
		case "404";
			include("view/inc/error" . $_GET['page'] . ".html");
			break;
		case "503";
			include("view/inc/error" . $_GET['page'] . ".html");
			break;
		default;
			include("module/home/controller/controller_homepage.php");
			break;
	}
} else {
	$_GET['op'] = 'list';
	include("module/home/controller/controller_homepage.php");
}
