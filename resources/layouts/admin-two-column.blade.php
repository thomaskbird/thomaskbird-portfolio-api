@extends('layouts.base-admin')

@section('content')

    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        @include('structure.nav-admin')
    </nav>

    <div class="row" id="admin-container">
        <div class="col-sm-8">
            @yield('content-main')
        </div>
        <div class="col-sm-4">
            @yield('sidebar-primary')
        </div>
    </div>
@stop