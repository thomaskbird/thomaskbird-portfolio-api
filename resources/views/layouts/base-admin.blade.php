<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thomas K Bird | Home - Thomas K Bird</title>

    <link rel="pingback" href="http://thomaskbird.com/xmlrpc.php" />
    <link rel="shortcut icon" href="http://thomaskbird.com/wp-content/themes/ThomasBird/img/fav.png"/>

    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,200italic,300italic,400italic,600italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Oswald:300,400,700' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="/css/dependencies.css" />
    <link rel="stylesheet" href="/css/app.css" />

    @include('structure.seo')

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-40542612-8', 'auto');
        ga('send', 'pageview');
    </script>

</head>
<body data-token="{{ csrf_token() }}">

<div class="container-fluid administration">
    @yield('content')
</div>

@include('structure.footer-admin')

</body>
</html>