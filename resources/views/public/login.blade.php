@extends('layouts.base-public')

@section('content')
<div class="container">

    <div class="col-sm-8 col-sm-offset-2">
        <div class="panel panel-default">
            <div class="panel-heading">Login</div>
            <div class="panel-body">

                {!! Form::open(['url' => '/login', 'method' => 'post']) !!}

                <p>If you're having trouble logging in contact an administrator</p>

                <div class="input-group form-group">
                    <span class="input-group-addon" id="basic-addon1"><span class="fa fa-envelope"></span></span>
                    {!! Form::email('email', null, ['class' => 'form-control', 'placeholder' => 'Email...']) !!}
                </div>

                <div class="input-group form-group">
                    <span class="input-group-addon" id="basic-addon1"><span class="fa fa-lock"></span></span>
                    {!! Form::password('password', ['class' => 'form-control', 'placeholder' => 'Password...']) !!}
                </div>

                <button type="submit" class="btn btn-primary">Login</button>

                {!! Form::close() !!}

            </div>
        </div>
    </div>

</div>
@stop