<div class="container-fluid">

    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/"><span class="logo logo-main">ThomasBird</span> <span class="logo logo-sub">FullStackDeveloper</span></a>
    </div>

    <div class="collapse navbar-collapse" id="main-nav">

        <ul class="nav navbar-nav navbar-left">
            <li><a href="{{ route('dashboard') }}">Dashboard</a></li>

            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Content <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="{{ route('content') }}">Content</a></li>
                    <li><a href="{{ route('admin_services') }}">Services</a></li>
                    <li><a href="{{ route('tags') }}">Tags</a></li>
                    <li><a href="{{ route('skills') }}">Skills</a></li>
                    <li><a href="{{ route('jobs') }}">Jobs</a></li>
                </ul>
            </li>

            <li><a href="{{ route('message_list') }}">Messages</a></li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
            <li><a href="{{ route('logout') }}">Logout</a></li>
        </ul>

    </div>

</div><!-- /.container-fluid -->