<nav class="navbar navbar-default navbar-fixed-top" role="navigation">

    <div class="container">

        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".menu">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <span class="logo logo-main">ThomasBird</span> <span class="logo logo-sub">FullStackDeveloper</span>
        </div>

        <nav class="collapse navbar-collapse menu">
            <ul id="menu-thomasbird" class="nav navbar-nav navbar-right">
                @foreach($navigation as $nav)
                    <li @if(Request::route()->getName() === $nav['route']) class="active" @endif >
                        <a title="{{ $nav['text'] }}" href="{{ route($nav['route'], $nav['route_params']) }}">
                            <span class="glyphicon glyphicon-{{ $nav['icon'] }}"></span>
                            {{ ucfirst($nav['text']) }}
                        </a>
                    </li>
                @endforeach
            </ul></nav>
    </div><!-- /.container-fluid -->

</nav>

<div id="twitter-feed">
    <div class="container">
        <b>Whats new:</b> Currently open to new fulltime, part time and contract roles
    </div>
</div>

@if( Session::has('alert') )
    <div class="alert alert-{{ Session::get('alert.class') }} alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{ Session::get('alert.msg') }}
    </div>
@endif